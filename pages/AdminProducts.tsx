
import React, { useState } from 'react';
import AdminSidebar from '../components/AdminSidebar';
import { Product, Category } from '../types';
import { Plus, Trash2, Edit2, Package, Image as ImageIcon, X } from 'lucide-react';

interface AdminProductsProps {
  products: Product[];
  categories: Category[];
  setProducts: React.Dispatch<React.SetStateAction<Product[]>>;
}

const AdminProducts: React.FC<AdminProductsProps> = ({ products, categories, setProducts }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({ 
    name: '', 
    categoryId: '', 
    description: '', 
    imageUrls: '' 
  });

  const handleSave = () => {
    const images = formData.imageUrls.split(/[\n,]+/).map(s => s.trim()).filter(s => s !== '');
    
    if (editingId) {
      setProducts(prev => prev.map(p => p.id === editingId ? { 
        ...p, 
        name: formData.name,
        categoryId: formData.categoryId,
        description: formData.description,
        images: images.length > 0 ? images : p.images 
      } : p));
    } else {
      const newProd: Product = {
        id: Date.now().toString(),
        name: formData.name,
        categoryId: formData.categoryId,
        description: formData.description,
        images: images.length > 0 ? images : ['https://picsum.photos/seed/placeholder/600/400']
      };
      setProducts(prev => [...prev, newProd]);
    }
    closeModal();
  };

  const openModal = (prod?: Product) => {
    if (prod) {
      setEditingId(prod.id);
      setFormData({ 
        name: prod.name, 
        categoryId: prod.categoryId, 
        description: prod.description,
        imageUrls: prod.images.join('\n')
      });
    } else {
      setEditingId(null);
      setFormData({ 
        name: '', 
        categoryId: categories[0]?.id || '', 
        description: '', 
        imageUrls: '' 
      });
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingId(null);
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Delete this product?')) {
      setProducts(prev => prev.filter(p => p.id !== id));
    }
  };

  return (
    <div className="flex bg-gray-50 min-h-screen">
      <AdminSidebar />
      <div className="flex-grow lg:ml-64 p-4 md:p-8 pt-20 lg:pt-8 overflow-x-hidden">
        <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <div>
            <h1 className="text-2xl md:text-3xl font-black text-gray-800 tracking-tight">Product Items</h1>
            <p className="text-sm md:text-base text-gray-500 font-medium">Manage items inside your categories.</p>
          </div>
          <button 
            onClick={() => openModal()}
            className="w-full sm:w-auto bg-primary text-white flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl font-black shadow-xl shadow-primary/20 hover:scale-105 transition-all active:scale-95 text-base"
          >
            <Plus size={20} /> Add New Item
          </button>
        </header>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
           <div className="overflow-x-auto custom-scrollbar">
             <table className="w-full text-left min-w-[700px]">
                <thead className="bg-gray-50 text-gray-400 uppercase text-[10px] font-black border-b tracking-widest">
                   <tr>
                      <th className="px-6 py-4">Item Details</th>
                      <th className="px-6 py-4">Category</th>
                      <th className="px-6 py-4">Images</th>
                      <th className="px-6 py-4 text-right">Actions</th>
                   </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                   {products.map((prod) => {
                      const cat = categories.find(c => c.id === prod.categoryId);
                      return (
                        <tr key={prod.id} className="hover:bg-gray-50/50 transition-colors">
                            <td className="px-6 py-5">
                              <div className="flex items-center gap-4">
                                 <img src={prod.images[0]} className="w-10 h-10 md:w-12 md:h-12 object-cover rounded-xl shadow-sm border border-gray-100" />
                                 <div className="flex flex-col">
                                   <span className="font-extrabold text-xs md:text-sm text-gray-900 line-clamp-1">{prod.name}</span>
                                   <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">ID: {prod.id}</span>
                                 </div>
                              </div>
                            </td>
                            <td className="px-6 py-5">
                               <span className="text-[9px] md:text-[10px] bg-primary/10 text-primary px-3 py-1 rounded-full font-black uppercase tracking-wider">
                                 {cat?.name || 'General'}
                               </span>
                            </td>
                            <td className="px-6 py-5">
                               <div className="flex items-center gap-1 text-gray-500 font-bold text-xs">
                                 <ImageIcon size={14} /> {prod.images.length}
                               </div>
                            </td>
                            <td className="px-6 py-5 text-right space-x-1">
                              <button onClick={() => openModal(prod)} className="p-2.5 text-blue-600 hover:bg-blue-50 rounded-xl transition-all"><Edit2 size={18} /></button>
                              <button onClick={() => handleDelete(prod.id)} className="p-2.5 text-red-600 hover:bg-red-50 rounded-xl transition-all"><Trash2 size={18} /></button>
                            </td>
                        </tr>
                      )
                   })}
                   {products.length === 0 && (
                     <tr>
                       <td colSpan={4} className="px-6 py-20 text-center text-gray-400 font-bold">No products found.</td>
                     </tr>
                   )}
                </tbody>
             </table>
           </div>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-[70] p-2 md:p-4">
           <div className="bg-white rounded-3xl w-full max-w-2xl p-6 md:p-8 shadow-2xl overflow-y-auto max-h-[95vh] relative custom-scrollbar">
              <div className="flex justify-between items-center mb-8 sticky top-0 bg-white z-10 py-2">
                <h2 className="text-xl md:text-2xl font-black text-black">{editingId ? 'Edit Product Item' : 'Create New Item'}</h2>
                <button onClick={closeModal} className="text-gray-400 hover:text-black transition-colors p-2"><X size={24} /></button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                 <div className="md:col-span-2">
                    <label className="block text-xs md:text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1.5 ml-1">Product Name</label>
                    <input 
                      type="text" 
                      className="w-full p-4 border-2 border-gray-50 bg-gray-50 focus:bg-white focus:border-primary rounded-2xl outline-none font-bold text-gray-800"
                      value={formData.name}
                      onChange={e => setFormData({...formData, name: e.target.value})}
                    />
                 </div>
                 <div>
                    <label className="block text-xs md:text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1.5 ml-1">Parent Category</label>
                    <select 
                      className="w-full p-4 border-2 border-gray-50 bg-gray-50 focus:bg-white focus:border-primary rounded-2xl outline-none font-bold text-gray-800 appearance-none cursor-pointer"
                      value={formData.categoryId}
                      onChange={e => setFormData({...formData, categoryId: e.target.value})}
                    >
                      {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                    </select>
                 </div>
                 <div>
                    <label className="block text-xs md:text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1.5 ml-1">Gallery URLs</label>
                    <textarea 
                      rows={1}
                      className="w-full p-4 border-2 border-gray-50 bg-gray-50 focus:bg-white focus:border-primary rounded-2xl outline-none font-bold text-gray-800 text-sm"
                      value={formData.imageUrls}
                      onChange={e => setFormData({...formData, imageUrls: e.target.value})}
                      placeholder="One URL per line"
                    />
                 </div>
                 <div className="md:col-span-2">
                    <label className="block text-xs md:text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1.5 ml-1">Description / Specs</label>
                    <textarea 
                      rows={5}
                      className="w-full p-4 border-2 border-gray-50 bg-gray-50 focus:bg-white focus:border-primary rounded-2xl outline-none font-bold text-gray-800 text-base leading-relaxed"
                      value={formData.description}
                      onChange={e => setFormData({...formData, description: e.target.value})}
                    ></textarea>
                 </div>
              </div>
              
              <div className="flex gap-4 mt-10 sticky bottom-0 bg-white py-4 border-t border-gray-50">
                 <button onClick={closeModal} className="flex-grow py-4 border-2 border-gray-100 rounded-2xl font-black text-gray-400 hover:bg-gray-50 transition-colors uppercase tracking-widest text-xs">Cancel</button>
                 <button onClick={handleSave} className="flex-grow py-4 bg-primary text-white rounded-2xl font-black shadow-lg shadow-primary/20 hover:scale-[1.02] transition-all uppercase tracking-widest text-xs">
                   {editingId ? 'Update' : 'Publish'}
                 </button>
              </div>
           </div>
        </div>
      )}
    </div>
  );
};

export default AdminProducts;
