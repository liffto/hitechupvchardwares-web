
import React from 'react';
import Layout from '../components/Layout';
import { GalleryImage, SiteSettings } from '../types';

interface GalleryPageProps {
  gallery: GalleryImage[];
  settings: SiteSettings;
}

const GalleryPage: React.FC<GalleryPageProps> = ({ gallery, settings }) => {
  return (
    <Layout settings={settings}>
      <div className="bg-primary py-12 md:py-16 text-center text-white">
        <h1 className="text-2xl md:text-3xl font-black tracking-tight">Image Gallery</h1>
        <p className="mt-4 opacity-90 font-medium text-sm md:text-lg">Explore our product applications and showroom displays</p>
      </div>

      <div className="max-w-[1080px] mx-auto px-4 py-12 md:py-20">
        {gallery.length === 0 ? (
          <div className="text-center py-32 bg-gray-50 rounded-3xl border-2 border-dashed border-gray-200">
            <p className="text-gray-400 font-bold text-lg">Our gallery is currently being updated. Check back soon!</p>
          </div>
        ) : (
          <div className="columns-1 sm:columns-2 md:columns-3 gap-6 space-y-6">
            {gallery.map((img) => (
              <div 
                key={img.id} 
                className="relative break-inside-avoid group rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 border border-gray-50"
              >
                <img 
                  src={img.url} 
                  alt={img.caption || 'Hi-Tech Hardware Gallery'} 
                  className="w-full h-auto block transition-transform duration-700 group-hover:scale-105" 
                  loading="lazy"
                />
                {img.caption && (
                  <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <p className="text-white font-bold text-xs md:text-sm">{img.caption}</p>
                  </div>
                )}
                {/* Visual refinement: small accent on hover */}
                <div className="absolute inset-0 ring-1 ring-inset ring-white/10 group-hover:ring-primary/20 transition-all pointer-events-none rounded-2xl"></div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Trust Quote / Footer CTA */}
      <div className="bg-[#F4F9F1] py-16 text-center">
         <div className="max-w-2xl mx-auto px-4">
            <h2 className="text-xl md:text-2xl font-black text-black mb-4 italic">"Quality Hardware, Quality Life."</h2>
            <p className="text-gray-500 font-medium text-sm">We take pride in every piece of hardware that goes into your home.</p>
         </div>
      </div>
    </Layout>
  );
};

export default GalleryPage;
