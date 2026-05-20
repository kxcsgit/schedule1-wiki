import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Schedule I Wiki - Drugs, Ingredients, Properties & Achievements",
  description: "A comprehensive wiki for Schedule I game. Find all drugs, ingredients, mixing recipes, properties, and achievements.",
  keywords: ["Schedule I", "wiki", "drugs", "ingredients", "mixing", "recipes", "achievements", "guide"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
