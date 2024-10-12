import React from 'react';
import Link from 'next/link';

interface HeaderProps {
  links: { label: string; href: string; isButton?: boolean; position: 'left' | 'right' }[];
}

const Header: React.FC<HeaderProps> = ({ links }) => {
  const leftLinks = links.filter(link => link.position === 'left');
  const rightLinks = links.filter(link => link.position === 'right');

  return (
    <header className="w-full bg-white border-b border-gray-200 p-4">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-4">
          {leftLinks.map((link, index) => (
            <Link key={index} href={link.href}>
              {link.isButton ? (
                <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors">
                  {link.label}
                </button>
              ) : (
                <span className="text-gray-800 font-semibold hover:text-blue-600 transition-colors cursor-pointer">
                  {link.label}
                </span>
              )}
            </Link>
          ))}
        </div>

        <div className="flex items-center space-x-4">
          {rightLinks.map((link, index) => (
            <Link key={index} href={link.href}>
              {link.isButton ? (
                <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors">
                  {link.label}
                </button>
              ) : (
                <span className="text-gray-800 font-semibold hover:text-blue-600 transition-colors cursor-pointer">
                  {link.label}
                </span>
              )}
            </Link>
          ))}
        </div>
      </div>
    </header>
  );
};

export default Header;
