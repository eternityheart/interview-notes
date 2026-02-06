import { Menu, X } from 'lucide-react';
import { useState } from 'react';

/**
 * Design Philosophy: Modern Academic Aesthetic
 * - Clean, minimal header with blue accent
 * - Responsive navigation for mobile and desktop
 * - Smooth transitions and hover effects
 */

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { label: '面试简历', href: '#resume' },
    { label: '算法题目', href: '#algorithms' },
    { label: '项目准备', href: '#projects' },
    { label: '日常学习', href: '#learning' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-blue-200 shadow-sm">
      <div className="max-w-6xl mx-auto px-4 md:px-8 py-4 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white font-bold text-lg">
            M
          </div>
          <div className="hidden sm:block">
            <h1 className="text-lg font-bold text-gray-900">明德惟馨</h1>
            <p className="text-xs text-gray-500">面试心得</p>
          </div>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="text-gray-600 hover:text-blue-600 transition-colors duration-200 text-sm font-medium"
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="md:hidden p-2 hover:bg-blue-50 rounded-lg transition-colors duration-200"
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? (
            <X className="w-6 h-6 text-gray-900" />
          ) : (
            <Menu className="w-6 h-6 text-gray-900" />
          )}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t border-blue-200 bg-gradient-to-b from-blue-50 to-white">
          <nav className="px-4 py-4 space-y-3">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="block px-4 py-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors duration-200 text-sm font-medium"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {item.label}
              </a>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
