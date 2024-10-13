import React from 'react';
import Link from 'next/link';

interface HeaderProps {
  links: { label: string; href: string; isButton?: boolean; position: 'left' | 'right' }[];
}

const Header: React.FC<HeaderProps> = ({ links }) => {
  const leftLinks = links.filter(link => link.position === 'left');
  const rightLinks = links.filter(link => link.position === 'right');

  return (
    <header className="w-full absolute top-0 left-0 z-10 p-4">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-4">
          {leftLinks.map((link, index) => (
            <Link key={index} href={link.href}>
              <button className="bg-blue-200 bg-opacity-40 text-white px-4 py-2 rounded-2xl hover:bg-blue-500 transition-colors">
                {link.label}
              </button>
            </Link>
          ))}
        </div>

        <div className="flex items-center space-x-4">
          {rightLinks.map((link, index) => (
            <Link key={index} href={link.href}>
              <button className="bg-blue-200 bg-opacity-40 text-white px-4 py-2 rounded-2xl hover:bg-blue-500 transition-colors">
                {link.label}
              </button>
            </Link>
          ))}
        </div>
      </div>
    </header>
  );
};

export default Header;
