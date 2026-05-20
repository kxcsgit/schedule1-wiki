import Link from 'next/link';

interface CardProps {
  title: string;
  href?: string;
  children: React.ReactNode;
  className?: string;
}

export function Card({ title, href, children, className = '' }: CardProps) {
  const content = (
    <div className={`
      bg-white/80 backdrop-blur-sm 
      border border-gray-200 
      rounded-lg 
      shadow-sm 
      hover:shadow-md 
      transition-shadow 
      duration-200
      ${className}
    `}>
      <div className="px-4 py-3 border-b border-gray-100">
        <h3 className="font-mono text-sm font-medium text-gray-900">{title}</h3>
      </div>
      <div className="px-4 py-3">
        {children}
      </div>
    </div>
  );

  if (href) {
    return <Link href={href}>{content}</Link>;
  }

  return content;
}

interface StatCardProps {
  label: string;
  value: string;
  description?: string;
}

export function StatCard({ label, value, description }: StatCardProps) {
  return (
    <div className="bg-white/80 backdrop-blur-sm border border-gray-200 rounded-lg p-4">
      <p className="font-mono text-xs text-gray-500 uppercase tracking-wider">{label}</p>
      <p className="font-mono text-2xl font-bold text-gray-900 mt-1">{value}</p>
      {description && (
        <p className="text-sm text-gray-600 mt-1">{description}</p>
      )}
    </div>
  );
}

interface DataTableProps {
  headers: string[];
  rows: (string | number | React.ReactNode)[][];
  className?: string;
}

export function DataTable({ headers, rows, className = '' }: DataTableProps) {
  return (
    <div className={`overflow-x-auto ${className}`}>
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-gray-200">
            {headers.map((header, i) => (
              <th key={i} className="font-mono text-xs text-gray-500 uppercase tracking-wider text-left px-4 py-2">
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i} className="border-b border-gray-100 hover:bg-gray-50/50">
              {row.map((cell, j) => (
                <td key={j} className="px-4 py-2 text-gray-900">
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

interface TagProps {
  children: React.ReactNode;
  variant?: 'default' | 'accent' | 'success' | 'warning';
  className?: string;
}

export function Tag({ children, variant = 'default', className = '' }: TagProps) {
  const variants = {
    default: 'bg-gray-100 text-gray-700',
    accent: 'bg-blue-50 text-blue-700',
    success: 'bg-green-50 text-green-700',
    warning: 'bg-yellow-50 text-yellow-700'
  };

  return (
    <span className={`
      inline-block 
      font-mono 
      text-xs 
      px-2 
      py-1 
      rounded 
      ${variants[variant]}
    `}>
      {children}
    </span>
  );
}

interface BadgeProps {
  children: React.ReactNode;
  className?: string;
}

export function Badge({ children, className = '' }: BadgeProps) {
  return (
    <span className={`
      inline-flex 
      items-center 
      justify-center
      font-mono 
      text-xs 
      font-medium
      px-2.5 
      py-0.5 
      rounded-full 
      bg-[#3847f5] 
      text-white
      ${className}
    `}>
      {children}
    </span>
  );
}

interface SectionHeaderProps {
  title: string;
  description?: string;
  children?: React.ReactNode;
}

export function SectionHeader({ title, description, children }: SectionHeaderProps) {
  return (
    <div className="mb-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-mono text-lg font-bold text-gray-900">{title}</h2>
          {description && (
            <p className="text-sm text-gray-600 mt-1">{description}</p>
          )}
        </div>
        {children}
      </div>
    </div>
  );
}

interface BreadcrumbProps {
  items: { label: string; href?: string }[];
}

export function Breadcrumb({ items }: BreadcrumbProps) {
  return (
    <nav className="font-mono text-xs text-gray-500 mb-4">
      {items.map((item, i) => (
        <span key={i}>
          {i > 0 && <span className="mx-2">/</span>}
          {item.href ? (
            <Link href={item.href} className="hover:text-gray-900 transition-colors">
              {item.label}
            </Link>
          ) : (
            <span className="text-gray-900">{item.label}</span>
          )}
        </span>
      ))}
    </nav>
  );
}
