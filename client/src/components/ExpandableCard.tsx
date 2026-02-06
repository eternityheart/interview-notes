import { ChevronDown, ExternalLink } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'wouter';

interface SubItem {
  id: string;
  title: string;
  description?: string;
  hasDetail?: boolean;
  href?: string;
}

interface ExpandableCardProps {
  id: string;
  title: string;
  icon: React.ReactNode;
  description: string;
  items: SubItem[];
  bgImage?: string;
  iconBgColor: string;
}

/**
 * Design Philosophy: Modern Academic Aesthetic
 * - Smooth expand/collapse animation with 300ms duration
 * - Progressive disclosure of content
 * - Responsive design for mobile and desktop
 * - Accessible keyboard navigation
 */

export default function ExpandableCard({
  id,
  title,
  icon,
  description,
  items,
  bgImage,
  iconBgColor,
}: ExpandableCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleToggle = () => {
    setIsExpanded(!isExpanded);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleToggle();
    }
  };

  return (
    <div className="card-section overflow-hidden transition-smooth">
      {/* Card Header */}
      <div
        role="button"
        tabIndex={0}
        className="p-4 md:p-6 cursor-pointer hover:bg-blue-50 transition-smooth"
        onClick={handleToggle}
        onKeyDown={handleKeyDown}
        aria-expanded={isExpanded}
        aria-controls={`${id}-content`}
      >
        <div className="flex items-start justify-between gap-3 md:gap-4">
          <div className="flex items-start gap-3 md:gap-4 flex-1 min-w-0">
            {/* Icon */}
            <div
              className={`flex-shrink-0 w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center text-white text-lg md:text-xl ${iconBgColor}`}
            >
              {icon}
            </div>

            {/* Title and Description */}
            <div className="flex-1 min-w-0">
              <h3 className="text-base md:text-lg font-semibold text-gray-900 mb-1">
                {title}
              </h3>
              <p className="text-xs md:text-sm text-gray-600 line-clamp-2">
                {description}
              </p>
            </div>
          </div>

          {/* Chevron Icon */}
          <ChevronDown
            className={`flex-shrink-0 w-5 h-5 text-blue-500 transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''
              }`}
            aria-hidden="true"
          />
        </div>
      </div>

      {/* Expandable Content */}
      <div
        id={`${id}-content`}
        className={`overflow-hidden transition-all duration-300 ease-out ${isExpanded ? 'max-h-[600px]' : 'max-h-0'
          }`}
      >
        <div className="border-t border-blue-200 bg-gradient-to-b from-blue-50 to-white px-4 md:px-6 py-4">
          <ul className="space-y-2 md:space-y-3">
            {items.map((item, index) => {
              const ItemContent = () => (
                <div className="flex items-start gap-2 md:gap-3">
                  <span className={`flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center text-xs font-semibold mt-0.5 ${item.hasDetail ? 'bg-blue-500 text-white' : 'bg-blue-200 text-blue-700'}`}>
                    {index + 1}
                  </span>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <p className={`text-xs md:text-sm font-medium break-words ${item.hasDetail ? 'text-blue-600 group-hover:text-blue-800' : 'text-gray-900'}`}>
                        {item.title}
                      </p>
                      {item.hasDetail && <ExternalLink className="w-3 h-3 text-blue-400" />}
                    </div>
                    {item.description && (
                      <p className="text-xs text-gray-600 mt-0.5 md:mt-1 break-words">
                        {item.description}
                      </p>
                    )}
                  </div>
                </div>
              );

              return (
                <li
                  key={item.id}
                  className={`animate-slide-in ${isExpanded ? 'opacity-100' : 'opacity-0'}`}
                  style={{
                    animationDelay: isExpanded ? `${index * 50}ms` : '0ms',
                    animationFillMode: 'both',
                  }}
                >
                  {item.hasDetail && item.href ? (
                    <Link href={item.href}>
                      <div className="group cursor-pointer p-1 -m-1 rounded hover:bg-blue-50 transition-colors">
                        <ItemContent />
                      </div>
                    </Link>
                  ) : (
                    <ItemContent />
                  )}
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
}
