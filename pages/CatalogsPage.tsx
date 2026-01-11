
import React from 'react';
import Layout from '../components/Layout';
import { Catalog, SiteSettings } from '../types';
import { Download } from 'lucide-react';

interface CatalogsPageProps {
  catalogs: Catalog[];
  settings: SiteSettings;
}

const CatalogsPage: React.FC<CatalogsPageProps> = ({ catalogs, settings }) => {
  return (
    <Layout settings={settings}>
      <div className="bg-primary py-10 text-center text-white">
        <h1 className="text-4xl font-bold">Catalogs</h1>
      </div>
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {catalogs.map((cat) => (
            <div key={cat.id} className="bg-white p-6 rounded-2xl shadow-xl flex flex-col items-center border border-gray-100">
              <div className="w-full h-[400px] bg-gray-100 rounded-xl mb-6 overflow-hidden shadow-inner">
                 <img src={cat.image} alt={cat.name} className="w-full h-full object-cover" />
              </div>
              <h3 className="text-2xl font-bold text-center mb-6">{cat.name}</h3>
              <a 
                href={cat.fileUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-3 border-2 border-primary text-primary px-8 py-3 rounded-xl font-bold hover:bg-primary hover:text-white transition-all"
              >
                Download <Download size={20} />
              </a>
            </div>
          ))}
          {catalogs.length === 0 && (
            <div className="col-span-full py-20 text-center text-gray-400 font-bold">No catalogs available yet.</div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default CatalogsPage;
