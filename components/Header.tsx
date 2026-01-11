
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Phone, Box } from 'lucide-react';
import { SiteSettings } from '../types';

interface HeaderProps {
  settings: SiteSettings;
}

const Header: React.FC<HeaderProps> = ({ settings }) => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Products', path: '/products' },
    { name: 'Gallery', path: '/gallery' },
    { name: 'About Us', path: '/about' },
    { name: 'Catalogs', path: '/catalogs' },
  ];

  const isActive = (path: string) => location.pathname === path;

  const tickerText = `Hitech Head: ${settings.adminPhone} | Tirupur (Ho): ${settings.headOfficePhone} | Coimbatore: ${settings.coimbatorePhone} | Madurai: ${settings.maduraiPhone}`;

  return (
    <header className="w-full z-50">
      <div className="ticker-container py-2.5 border-b text-xs md:text-[11px] font-bold text-gray-500 uppercase tracking-widest bg-gray-50">
        <div className="ticker-wrapper">
          <div className="ticker-item gap-4">
             <Phone size={14} className="text-primary md:w-[12px] md:h-[12px]" />
             <span>{tickerText}</span>
          </div>
          <div className="ticker-item gap-4">
             <Phone size={14} className="text-primary md:w-[12px] md:h-[12px]" />
             <span>{tickerText}</span>
          </div>
        </div>
      </div>

      <div className="bg-primary text-white sticky top-0 shadow-sm">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-center py-3 md:py-3">
            <Link to="/" className="flex items-center group">
              {settings.headerLogo ? (
                <img 
                  src={settings.headerLogo} 
                  alt="Logo" 
                  className="h-10 md:h-12 w-auto object-contain transition-transform group-hover:scale-105" 
                />
              ) : (
                <div className="flex items-center gap-2.5">
                  <div className="bg-white p-1.5 rounded-lg shadow-sm transition-transform group-hover:scale-105">
                     <Box size={24} className="text-primary md:w-[24px] md:h-[24px]" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xl md:text-xl font-black leading-none tracking-tight">HITECH</span>
                    <span className="text-[10px] md:text-[8px] font-bold tracking-[0.2em] uppercase opacity-90">UPVC hardware</span>
                  </div>
                </div>
              )}
            </Link>

            <nav className="hidden lg:flex items-center space-x-7">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`text-[13px] font-bold transition-all hover:text-white/80 ${
                    isActive(link.path) ? 'border-b-2 border-white pb-0.5' : 'opacity-90 hover:opacity-100'
                  }`}
                >
                  {link.name}
                </Link>
              ))}
              <Link
                to="/contact"
                className="bg-white text-primary px-5 py-2 rounded font-bold text-[13px] hover:bg-gray-50 transition-all shadow-sm"
              >
                Contact Us
              </Link>
            </nav>

            <button className="lg:hidden p-2" aria-label="Toggle Menu" onClick={() => setIsOpen(!isOpen)}>
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="lg:hidden bg-white text-gray-800 border-b shadow-2xl absolute w-full z-40">
          <div className="px-4 pt-2 pb-6 space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className="block px-3 py-5 text-lg font-bold border-b border-gray-100 last:border-0"
                onClick={() => setIsOpen(false)}
              >
                {link.name}
              </Link>
            ))}
            <Link
              to="/contact"
              className="block w-full text-center mt-6 bg-primary text-white py-5 rounded-2xl font-black text-lg"
              onClick={() => setIsOpen(false)}
            >
              Contact Us
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
