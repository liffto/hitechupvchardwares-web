
import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, Facebook, Box, ArrowRight } from 'lucide-react';
import { SiteSettings } from '../types';
import { WhatsAppIcon } from './IconRenderer';

interface FooterProps {
  settings: SiteSettings;
}

const Footer: React.FC<FooterProps> = ({ settings }) => {
  return (
    <footer className="bg-[#1a1d1a] text-white pt-16 pb-8 border-t-4 border-primary">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand Column */}
          <div className="space-y-6">
            <Link to="/" className="inline-block group">
              {settings.footerLogo ? (
                <img 
                  src={settings.footerLogo} 
                  alt="Footer Logo" 
                  className="h-14 md:h-16 w-auto object-contain transition-transform group-hover:scale-105" 
                />
              ) : (
                <div className="flex items-center gap-3">
                  <div className="bg-white p-2 rounded-xl shadow-md transition-transform group-hover:scale-105">
                     <Box size={32} className="text-primary" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-3xl font-black leading-none tracking-tight">HITECH</span>
                    <span className="text-xs font-bold tracking-[0.2em] uppercase text-primary">UPVC hardware</span>
                  </div>
                </div>
              )}
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed font-medium">
              We, Hi-Tech UPVC Hardwares, are a leading ISO 9001:2015 certified uPVC Hardware provider, with a complete range of uPVC Hardware, Tools, & Accessories, that offers integrated innovative solutions in the area of uPVC Hardware products.
            </p>
            <div className="flex gap-3">
              <a href={`https://wa.me/${settings.whatsapp}`} target="_blank" rel="noopener noreferrer" className="bg-[#25D366]/10 text-[#25D366] p-3 rounded-xl hover:bg-[#25D366] hover:text-white transition-all flex items-center justify-center"><WhatsAppIcon size={20} /></a>
              <a href={`tel:${settings.adminPhone}`} className="bg-primary/10 text-primary p-3 rounded-xl hover:bg-primary hover:text-white transition-all"><Phone size={20} /></a>
              <a href={`mailto:${settings.email}`} className="bg-blue-500/10 text-blue-400 p-3 rounded-xl hover:bg-blue-500 hover:text-white transition-all"><Mail size={20} /></a>
              <a href={settings.facebook} target="_blank" rel="noopener noreferrer" className="bg-white/5 text-white p-3 rounded-xl hover:bg-white hover:text-black transition-all" aria-label="Facebook"><Facebook size={20} /></a>
            </div>
          </div>

          {/* Quick Links Column */}
          <div className="lg:pl-8">
            <h4 className="text-sm font-black uppercase tracking-[0.2em] text-primary mb-8">Explore</h4>
            <ul className="space-y-4">
              {[
                { name: 'Home', path: '/' },
                { name: 'Product Catalog', path: '/products' },
                { name: 'About Our Company', path: '/about' },
                { name: 'Technical Manuals', path: '/catalogs' },
                { name: 'Project Gallery', path: '/gallery' },
                { name: 'Contact Support', path: '/contact' }
              ].map((link) => (
                <li key={link.name}>
                  <Link to={link.path} className="text-gray-400 hover:text-white text-sm font-bold flex items-center gap-2 group transition-colors">
                    <ArrowRight size={14} className="opacity-0 group-hover:opacity-100 -ml-4 group-hover:ml-0 transition-all text-primary" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Presence Column */}
          <div className="lg:col-span-2">
            <h4 className="text-sm font-black uppercase tracking-[0.2em] text-primary mb-8">Our Presence</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-10">
              {/* Head Office */}
              <div className="flex gap-4 col-span-1 md:col-span-2">
                <MapPin size={20} className="text-primary flex-shrink-0 mt-1" />
                <div className="text-sm">
                  <p className="font-bold text-white mb-2 uppercase tracking-wide">Head Office (Tirupur)</p>
                  <p className="text-gray-400 leading-relaxed font-medium mb-3">527/c Thiruvalluvar Thottam, Karuvampalayam, Tirupur, Tamil Nadu, 641604.</p>
                  <div className="space-y-1">
                    <p className="text-gray-300 font-bold">Hitech Head Number: <span className="text-white">{settings.adminPhone}</span></p>
                    <p className="text-gray-300 font-bold">Tirupur (Ho): <span className="text-white">{settings.headOfficePhone}</span></p>
                  </div>
                </div>
              </div>

              {/* Coimbatore Office */}
              <div className="flex gap-4">
                <MapPin size={20} className="text-primary flex-shrink-0 mt-1" />
                <div className="text-sm">
                  <p className="font-bold text-white mb-2 uppercase tracking-wide">Coimbatore Office</p>
                  <p className="text-gray-400 leading-relaxed font-medium mb-2">527/c Thiruvalluvar Thottam, Karuvampalayam, Tirupur, Tamil Nadu, 641604.</p>
                  <p className="text-gray-300 font-bold">Call: <span className="text-white">{settings.coimbatorePhone}</span></p>
                </div>
              </div>

              {/* Madurai Office */}
              <div className="flex gap-4">
                <MapPin size={20} className="text-primary flex-shrink-0 mt-1" />
                <div className="text-sm">
                  <p className="font-bold text-white mb-2 uppercase tracking-wide">Madurai Office</p>
                  <p className="text-gray-400 leading-relaxed font-medium mb-2">527/c Thiruvalluvar Thottam, Karuvampalayam, Tirupur, Tamil Nadu, 641604.</p>
                  <p className="text-gray-300 font-bold">Call: <span className="text-white">{settings.maduraiPhone}</span></p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-600">
            © {new Date().getFullYear()} HI-TECH UPVC HARDWARES • ALL RIGHTS RESERVED
          </p>
          
          <div className="flex items-center gap-6">
            {settings.poweredByLogo && (
              <div className="flex items-center gap-3">
                 <span className="text-[9px] font-black text-gray-700 uppercase tracking-widest">Powered By</span>
                 <img src={settings.poweredByLogo} alt="Powered By" className="h-6 w-auto opacity-30 hover:opacity-100 transition-opacity grayscale hover:grayscale-0" />
              </div>
            )}
            <Link to="/admin" className="text-[10px] font-black text-gray-700 hover:text-primary uppercase tracking-widest transition-colors">Admin Access</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
