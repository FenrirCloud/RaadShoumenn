import React from 'react';

const navLinks = ['Experience', 'Skills', 'Education', 'Contact'];

const Header = () => {
  return (
    <header className="fixed top-0 left-0 w-full z-40 bg-primary-dark/70 backdrop-blur-sm animate-fade-in">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-3 flex justify-between items-center">
        <div className="font-mono text-lg text-white">
          <a href="#" aria-label="Back to top">RKS // DE</a>
        </div>
        <nav className="hidden md:flex items-center space-x-6">
          {navLinks.map(link => (
            <a
              key={link}
              href={`#${link.toLowerCase()}`}
              className="text-light-text hover:text-accent transition-colors duration-300 font-sans"
            >
              {link}
            </a>
          ))}
        </nav>
        {/* Mobile menu could be added here later */}
      </div>
    </header>
  );
};

export default Header;
