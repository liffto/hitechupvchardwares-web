
import React from 'react';
import AdminSidebar from '../components/AdminSidebar';
import { Category, Product, Catalog } from '../types';
import { Users, Package, Layers, FileText } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface AdminDashboardProps {
  categories: Category[];
  products: Product[];
  catalogs: Catalog[];
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ categories, products, catalogs }) => {
  const stats = [
    { label: 'Total Categories', value: categories.length, icon: <Layers className="text-blue-500" />, color: 'bg-blue-50' },
    { label: 'Total Products', value: products.length, icon: <Package className="text-green-500" />, color: 'bg-green-50' },
    { label: 'Catalogs Published', value: catalogs.length, icon: <FileText className="text-orange-500" />, color: 'bg-orange-50' },
    { label: 'Avg Products/Cat', value: (products.length / (categories.length || 1)).toFixed(1), icon: <Users className="text-purple-500" />, color: 'bg-purple-50' },
  ];

  // Chart data: Products per category
  const chartData = categories.map(cat => ({
    name: cat.name,
    count: products.filter(p => p.categoryId === cat.id).length
  }));

  return (
    <div className="flex bg-gray-50 min-h-screen">
      <AdminSidebar />
      <div className="flex-grow lg:ml-64 p-4 md:p-8 pt-20 lg:pt-8 overflow-x-hidden">
        <header className="mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800 tracking-tight">System Dashboard</h1>
          <p className="text-sm md:text-base text-gray-500">Welcome back to Hi-Tech Management Portal.</p>
        </header>

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 md:gap-6 mb-8 md:mb-10">
          {stats.map((stat, i) => (
            <div key={i} className={`p-5 md:p-6 rounded-2xl border border-white shadow-sm flex items-center gap-4 ${stat.color} transition-all hover:translate-y-[-2px]`}>
              <div className="p-3 md:p-4 bg-white rounded-xl shadow-sm">{stat.icon}</div>
              <div>
                <p className="text-xs md:text-sm font-bold text-gray-400 uppercase tracking-wider">{stat.label}</p>
                <p className="text-xl md:text-2xl font-black text-gray-800">{stat.value}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 md:gap-8">
          <div className="bg-white p-5 md:p-6 rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
             <h2 className="text-lg font-black mb-6 text-gray-800">Product Distribution</h2>
             <div className="h-64 md:h-80 w-full">
                <ResponsiveContainer width="100%" height="100%">
                   <BarChart data={chartData}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                      <XAxis dataKey="name" tick={{fontSize: 10}} />
                      <YAxis tick={{fontSize: 10}} />
                      <Tooltip 
                        contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }}
                      />
                      <Bar dataKey="count" fill="#6CAF44" radius={[4, 4, 0, 0]} />
                   </BarChart>
                </ResponsiveContainer>
             </div>
          </div>

          <div className="bg-white p-5 md:p-6 rounded-2xl shadow-sm border border-gray-100">
             <h2 className="text-lg font-black mb-6 text-gray-800">Recent Products</h2>
             <div className="space-y-1">
                {products.slice(-5).reverse().map(p => (
                   <div key={p.id} className="flex items-center gap-4 p-3 hover:bg-gray-50 rounded-xl transition-all border-b border-gray-50 last:border-0 group">
                      <img src={p.images[0]} className="w-10 h-10 md:w-12 md:h-12 object-cover rounded-lg shadow-sm group-hover:scale-105 transition-transform" />
                      <div className="flex-grow">
                        <p className="font-extrabold text-xs md:text-sm text-gray-800 line-clamp-1">{p.name}</p>
                        <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">ID: {p.id}</p>
                      </div>
                   </div>
                ))}
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
