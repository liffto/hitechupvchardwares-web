
import React from 'react';
import { Link } from 'react-router-dom';
import Layout from '../components/Layout';
import { Category, SiteSettings } from '../types';

interface ProductsPageProps {
  categories: Category[];
  settings: SiteSettings;
}

const ProductsPage: React.FC<ProductsPageProps> = ({ categories, settings }) => {
  return (
    <Layout settings={settings}>
      <div className="bg-primary py-8 text-center text-white">
        <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight">Our Products</h1>
      </div>
      <div className="max-w-7xl mx-auto px-4 py-10">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {categories.map((cat) => (
            <Link 
              key={cat.id} 
              to={`/category/${cat.id}`}
              className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all group p-2.5 border border-gray-100"
            >
              <div className="h-48 md:h-60 overflow-hidden rounded-lg flex items-center justify-center bg-gray-50">
                <img 
                  src={cat.image} 
                  alt={cat.name} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                />
              </div>
              <div className="py-5 px-2">
                <h3 className="text-base md:text-lg font-extrabold text-black tracking-tight">{cat.name}</h3>
                {cat.description && (
                  <p className="text-gray-500 text-xs md:text-sm mt-1 line-clamp-2 font-medium">{cat.description}</p>
                )}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default ProductsPage;
