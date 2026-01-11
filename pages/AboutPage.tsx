
import React from 'react';
import Layout from '../components/Layout';
import IconRenderer from '../components/IconRenderer';
import { SiteSettings } from '../types';

interface AboutPageProps {
  settings: SiteSettings;
}

const AboutPage: React.FC<AboutPageProps> = ({ settings }) => {
  return (
    <Layout settings={settings}>
      {/* Header */}
      <div className="bg-[#F4F9F1] py-14 text-center">
        <h1 className="text-3xl md:text-4xl font-black text-black tracking-tight">About Us</h1>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-16 md:py-24 space-y-24 md:space-y-32">
        {/* Section 1: Image Left, Text Right */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-20 items-center">
          <div className="rounded-2xl overflow-hidden shadow-2xl">
            <img 
              src={settings.aboutImage} 
              className="w-full h-auto object-cover" 
              alt="Hi-Tech Hardware Primary" 
            />
          </div>
          <div className="space-y-6">
            <span className="text-gray-500 font-bold uppercase tracking-[0.2em] text-xs">About us</span>
            <h2 className="text-3xl md:text-4xl font-black text-black tracking-tight leading-tight">
              Hi-Tech UPVC Hardwares
            </h2>
            <div className="text-gray-600 leading-relaxed font-medium text-base md:text-lg">
               {settings.aboutText}
            </div>
          </div>
        </div>
      </div>

      {/* Section 2: Text Left, Image Right (Full width background) */}
      <div className="bg-[#F4F9F1] py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-20 items-center">
            <div className="order-2 lg:order-1 text-gray-600 leading-relaxed font-medium text-base md:text-lg">
               {settings.aboutTextSecondary}
            </div>
            <div className="order-1 lg:order-2 rounded-2xl overflow-hidden shadow-2xl border-4 border-white">
              <img 
                src={settings.aboutImageSecondary} 
                className="w-full h-auto object-cover" 
                alt="Hardware Excellence" 
              />
            </div>
          </div>
        </div>
      </div>

      {/* Strength Section */}
      <div className="max-w-7xl mx-auto px-4 py-20 md:py-32">
        <div className="text-center mb-16 md:mb-20">
          <h2 className="text-3xl md:text-4xl font-black text-black mb-4">Our Strength</h2>
          <p className="text-gray-500 max-w-3xl mx-auto font-medium text-base md:text-lg">
            Distinct approach towards our services and immaculate product range together compiles as our strength.
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-24 items-center">
          <div className="rounded-2xl overflow-hidden shadow-2xl">
            <img 
              src={settings.strengthImage} 
              alt="Strengths Teamwork" 
              className="w-full h-auto rounded-lg" 
            />
          </div>
          <div className="space-y-8">
            {settings.strengths.map((s) => (
              <div key={s.id} className="flex items-center gap-6 group">
                <div className="flex-shrink-0 w-14 h-14 rounded-2xl bg-[#F4F9F1] flex items-center justify-center text-primary shadow-sm transition-transform group-hover:scale-110">
                  <IconRenderer name={s.iconName} size={28} />
                </div>
                <p className="font-black text-gray-800 text-lg md:text-xl leading-tight">
                  {s.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AboutPage;
