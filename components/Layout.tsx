
import React from 'react';
import Header from './Header';
import Footer from './Footer';
import FloatingActions from './FloatingActions';
import { SiteSettings } from '../types';

interface LayoutProps {
  children: React.ReactNode;
  settings: SiteSettings;
}

const Layout: React.FC<LayoutProps> = ({ children, settings }) => {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header settings={settings} />
      <main className="flex-grow">
        {children}
      </main>
      <Footer settings={settings} />
      <FloatingActions settings={settings} />
    </div>
  );
};

export default Layout;
