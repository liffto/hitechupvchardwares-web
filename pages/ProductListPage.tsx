
import React from 'react';
import { Link, useParams } from 'react-router-dom';
import Layout from '../components/Layout';
import { Category, Product, SiteSettings } from '../types';
import { ChevronLeft } from 'lucide-react';

interface ProductListPageProps {
  categories: Category[];
  products: Product[];
  settings: SiteSettings;
}

const ProductListPage: React.FC<ProductListPageProps> = ({ categories, products, settings }) => {
  const { id } = useParams<{ id: string }>();
  const category = categories.find(c => c.id === id);
  const filteredProducts = products.filter(p => p.categoryId === id);

  if (!category) return <div className="p-20 text-center">Category not found</div>;

  return (
    <Layout settings={settings}>
      <div className="bg-primary py-8 text-center text-white">
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-center gap-4 relative">
          <Link to="/products" className="absolute left-4 p-2 bg-white/20 rounded-lg hover:bg-white/40 transition-colors">
            <ChevronLeft size={24} />
          </Link>
          <h1 className="text-3xl font-extrabold tracking-tight">{category.name}</h1>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-10">
        {filteredProducts.length === 0 ? (
          <div className="text-center py-20 text-gray-400 font-bold">
            No items found in this category yet.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <Link 
                key={product.id} 
                to={`/product/${product.id}`}
                className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all group p-2.5 border border-gray-100"
              >
                <div className="h-56 overflow-hidden rounded-lg flex items-center justify-center bg-gray-50">
                  <img 
                    src={product.images[0]} 
                    alt={product.name} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                  />
                </div>
                <div className="py-4 px-2">
                  <h3 className="font-extrabold text-black text-lg leading-tight line-clamp-2">{product.name}</h3>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
};

export default ProductListPage;
