#!/usr/bin/env python3
"""Scrape Schedule I Fandom Wiki pages via MediaWiki API using only stdlib."""

import json
import re
import time
import urllib.request
from html.parser import HTMLParser
from html import unescape

BASE_API = "https://schedule-1.fandom.com/api.php"
HEADERS = {"User-Agent": "Schedule1WikiBot/1.0 (https://github.com/schedule1-wiki)"}

PAGES = [
    "Drugs", "Ingredients", "Properties", "Achievements", "Mixing",
    "Customers", "NPCs", "Maps", "Items", "Weapons",
    "Equipment", "Dealers", "Stashes", "Businesses", "Vehicles",
    "Quests", "Effects", "Quality", "Prices", "Addiction"
]

OUTDIR = "/opt/data/home/projects/schedule1-wiki/data/fandom"


def fetch_page(page_name):
    url = f"{BASE_API}?action=parse&page={page_name}&format=json&prop=text"
    req = urllib.request.Request(url, headers=HEADERS)
    resp = urllib.request.urlopen(req, timeout=30)
    data = json.loads(resp.read())
    if "error" in data:
        raise Exception(f"API error: {data['error']}")
    return data["parse"]["text"]["*"]


class WikiHTMLParser(HTMLParser):
    """Parse Fandom wiki HTML into structured data using only stdlib."""

    def __init__(self):
        super().__init__()
        self.sections = []
        self.current_section = self._new_section("Introduction", 0)
        self.tag_stack = []
        self.current_text = ""
        self.in_heading = False
        self.heading_level = 0
        self.in_table = False
        self.table_rows = []
        self.current_row = []
        self.in_cell = False
        self.cell_text = ""
        self.cell_tag = None
        self.in_list = False
        self.list_tag = None
        self.list_items = []
        self.current_li = ""
        self.in_li = False
        self.in_toc = False
        self.in_infobox = False
        self.skip_depth = 0
        self.element_count = 0
        # Track class attributes
        self._pending_attrs = {}

    def _new_section(self, heading, level):
        return {"heading": heading, "level": level, "content": [], "lists": [], "tables": []}

    def _save_section(self):
        s = self.current_section
        if s["content"] or s["lists"] or s["tables"]:
            self.sections.append(s)

    def handle_starttag(self, tag, attrs):
        attrs_dict = dict(attrs)
        cls = attrs_dict.get("class", "")
        self.element_count += 1

        # Skip TOC
        if "toc" in cls.split() or "toctoggle" in cls:
            self.in_toc = True
            return

        # Headings
        if tag in ("h2", "h3", "h4"):
            self.in_heading = True
            self.heading_level = int(tag[1])
            self.current_text = ""
            return

        # Tables
        if tag == "table":
            if not self.in_table:
                self.in_table = True
                self.table_rows = []
            return
        if self.in_table:
            if tag == "tr":
                self.current_row = []
            elif tag in ("td", "th"):
                self.in_cell = True
                self.cell_text = ""
                self.cell_tag = tag
            return

        # Lists
        if tag in ("ul", "ol") and not self.in_table:
            if not self.in_list:
                self.in_list = True
                self.list_tag = tag
                self.list_items = []
            return
        if self.in_list and tag == "li":
            self.in_li = True
            self.current_li = ""
            return

        # Links in text
        if tag == "a" and self.in_cell:
            return

    def handle_endtag(self, tag):
        # TOC
        if self.in_toc:
            if tag == "div":
                self.in_toc = False
            return

        # Headings
        if tag in ("h2", "h3", "h4") and self.in_heading:
            heading_text = self.current_text.strip()
            heading_text = re.sub(r"\[edit\]", "", heading_text).strip()
            if heading_text and heading_text.lower() not in ("contents", "navigation menu"):
                self._save_section()
                self.current_section = self._new_section(heading_text, self.heading_level)
            self.in_heading = False
            self.current_text = ""
            return

        # Tables
        if tag == "table" and self.in_table:
            self.in_table = False
            if self.table_rows and len(self.table_rows) >= 2:
                headers = self.table_rows[0]
                rows = []
                for row in self.table_rows[1:]:
                    entry = {}
                    for j, cell in enumerate(row):
                        key = headers[j] if j < len(headers) else f"col_{j}"
                        entry[key] = cell
                    rows.append(entry)
                self.current_section["tables"].append({"headers": headers, "rows": rows})
            elif self.table_rows:
                self.current_section["tables"].append({"headers": [], "rows": self.table_rows})
            self.table_rows = []
            return

        if self.in_table:
            if tag == "tr":
                self.table_rows.append(self.current_row)
            elif tag in ("td", "th"):
                self.in_cell = False
                self.current_row.append(self.cell_text.strip())

        # Lists
        if tag in ("ul", "ol") and self.in_list and not self.in_table:
            self.in_list = False
            if self.list_items:
                self.current_section["lists"].append(self.list_items)
            self.list_items = []
            return
        if tag == "li" and self.in_li:
            self.in_li = False
            text = self.current_li.strip()
            if text:
                self.list_items.append({"text": text})

    def handle_data(self, data):
        if self.in_toc:
            return
        if self.in_heading:
            self.current_text += data
            return
        if self.in_cell:
            self.cell_text += data
            return
        if self.in_li:
            self.current_li += data
            return

    def handle_entityref(self, name):
        self.handle_data(unescape(f"&{name};"))

    def handle_charref(self, name):
        self.handle_data(unescape(f"&#{name};"))


def strip_html_tags(html_text):
    """Remove all HTML tags, return plain text."""
    return re.sub(r"<[^>]+>", "", html_text).strip()


def extract_sections_simple(html):
    """Simpler but more robust regex-based section extraction."""
    sections = []
    # Split by headings
    parts = re.split(r"(?i)(<h[234][^>]*>.*?</h[234]>)", html)

    current_heading = "Introduction"
    current_level = 0

    for part in parts:
        heading_match = re.match(r"<h([234])[^>]*>(.*?)</h\1>", part, re.DOTALL | re.IGNORECASE)
        if heading_match:
            current_level = int(heading_match.group(1))
            heading_text = strip_html_tags(heading_match.group(2))
            heading_text = re.sub(r"\[edit\]", "", heading_text).strip()
            if heading_text.lower() in ("contents", "navigation menu"):
                continue
            current_heading = heading_text
            continue

        # Process this section's content
        if not part.strip():
            continue

        section = {
            "heading": current_heading,
            "level": current_level,
            "content": [],
            "lists": [],
            "tables": []
        }

        # Extract tables
        for table_match in re.finditer(r"<table[^>]*>(.*?)</table>", part, re.DOTALL | re.IGNORECASE):
            table_html = table_match.group(1)
            rows = re.findall(r"<tr[^>]*>(.*?)</tr>", table_html, re.DOTALL | re.IGNORECASE)
            if len(rows) < 2:
                continue

            parsed_rows = []
            for row_html in rows:
                cells = re.findall(r"<t[hd][^>]*>(.*?)</t[hd]>", row_html, re.DOTALL | re.IGNORECASE)
                cells = [strip_html_tags(c).strip() for c in cells]
                parsed_rows.append(cells)

            if parsed_rows:
                headers = parsed_rows[0]
                data_rows = []
                for row in parsed_rows[1:]:
                    entry = {}
                    for j, cell in enumerate(row):
                        key = headers[j] if j < len(headers) else f"col_{j}"
                        entry[key] = cell
                    data_rows.append(entry)
                section["tables"].append({"headers": headers, "rows": data_rows})

        # Extract list items
        for list_match in re.finditer(r"<(?:ul|ol)[^>]*>(.*?)</(?:ul|ol)>", part, re.DOTALL | re.IGNORECASE):
            items = re.findall(r"<li[^>]*>(.*?)</li>", list_match.group(1), re.DOTALL | re.IGNORECASE)
            items = [{"text": strip_html_tags(i).strip()} for i in items if strip_html_tags(i).strip()]
            if items:
                section["lists"].append(items)

        # Extract paragraphs
        for p_match in re.finditer(r"<p[^>]*>(.*?)</p>", part, re.DOTALL | re.IGNORECASE):
            text = strip_html_tags(p_match.group(1)).strip()
            if text and len(text) > 10:
                section["content"].append({"text": text})

        # Also extract meaningful div text
        for div_match in re.finditer(r'<div[^>]*class="[^"]*mw-parser-output[^"]*"[^>]*>(.*?)</div>', part, re.DOTALL | re.IGNORECASE):
            pass  # skip, already processed

        if section["content"] or section["lists"] or section["tables"]:
            sections.append(section)

    return sections


def extract_links(html):
    """Extract wiki links from HTML."""
    links = []
    seen = set()
    for m in re.finditer(r'<a[^>]*href="(/wiki/[^"]*)"[^>]*>(.*?)</a>', html, re.DOTALL):
        href = m.group(1)
        text = strip_html_tags(m.group(2)).strip()
        if text and ":" not in href.split("/wiki/")[1] and text not in seen:
            seen.add(text)
            links.append({"text": text, "href": href})
    return links


def parse_page(page_name, html):
    result = {
        "page": page_name,
        "url": f"https://schedule-1.fandom.com/wiki/{page_name}",
    }

    sections = extract_sections_simple(html)
    result["sections"] = sections

    links = extract_links(html)
    result["related_links"] = links

    all_tables = []
    for sec in sections:
        for t in sec.get("tables", []):
            t["section"] = sec["heading"]
            all_tables.append(t)
    result["all_tables"] = all_tables

    return result


def main():
    import os
    os.makedirs(OUTDIR, exist_ok=True)

    all_data = {}
    for page_name in PAGES:
        try:
            print(f"Fetching: {page_name}...", end=" ", flush=True)
            html = fetch_page(page_name)
            print(f"OK ({len(html)} bytes)", end=" ", flush=True)

            parsed = parse_page(page_name, html)
            num_sections = len(parsed.get("sections", []))
            num_tables = len(parsed.get("all_tables", []))
            num_links = len(parsed.get("related_links", []))
            print(f"-> {num_sections} sections, {num_tables} tables, {num_links} links")

            filename = os.path.join(OUTDIR, f"{page_name.lower()}.json")
            with open(filename, "w", encoding="utf-8") as f:
                json.dump(parsed, f, ensure_ascii=False, indent=2)

            all_data[page_name] = parsed
            time.sleep(0.5)

        except Exception as e:
            print(f"ERROR: {e}")
            import traceback
            traceback.print_exc()
            all_data[page_name] = {"page": page_name, "error": str(e)}

    combined_path = os.path.join(OUTDIR, "all_pages.json")
    with open(combined_path, "w", encoding="utf-8") as f:
        json.dump(all_data, f, ensure_ascii=False, indent=2)

    print(f"\nDone! Saved {len(all_data)} pages.")
    # Print file sizes
    for p in PAGES:
        fp = os.path.join(OUTDIR, f"{p.lower()}.json")
        if os.path.exists(fp):
            sz = os.path.getsize(fp)
            print(f"  {p.lower()}.json: {sz:,} bytes")
    print(f"  all_pages.json: {os.path.getsize(combined_path):,} bytes")


if __name__ == "__main__":
    main()
