
import React, { useState } from 'react';
import AdminSidebar from '../components/AdminSidebar';
import { Category } from '../types';
import { Plus, Trash2, Edit2 } from 'lucide-react';

interface AdminCategoriesProps {
  categories: Category[];
  setCategories: React.Dispatch<React.SetStateAction<Category[]>>;
}

const AdminCategories: React.FC<AdminCategoriesProps> = ({ categories, setCategories }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({ name: '', image: '' });

  const handleSave = () => {
    if (editingId) {
      setCategories(prev => prev.map(c => c.id === editingId ? { ...c, ...formData } : c));
    } else {
      const newCat: Category = {
        id: Date.now().toString(),
        ...formData
      };
      setCategories(prev => [...prev, newCat]);
    }
    closeModal();
  };

  const openModal = (cat?: Category) => {
    if (cat) {
      setEditingId(cat.id);
      setFormData({ name: cat.name, image: cat.image });
    } else {
      setEditingId(null);
      setFormData({ name: '', image: '' });
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingId(null);
    setFormData({ name: '', image: '' });
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this category?')) {
      setCategories(prev => prev.filter(c => c.id !== id));
    }
  };

  return (
    <div className="flex bg-gray-50 min-h-screen">
      <AdminSidebar />
      <div className="flex-grow lg:ml-64 p-4 md:p-8 pt-20 lg:pt-8 overflow-x-hidden">
        <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <div>
            <h1 className="text-2xl md:text-3xl font-black text-gray-800 tracking-tight">Category Management</h1>
            <p className="text-sm md:text-base text-gray-500 font-medium">Add or edit your product groups.</p>
          </div>
          <button 
            onClick={() => openModal()}
            className="w-full sm:w-auto bg-primary text-white flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl font-black shadow-xl shadow-primary/20 hover:scale-105 transition-all active:scale-95 text-base"
          >
            <Plus size={20} /> Add Category
          </button>
        </header>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
           <div className="overflow-x-auto custom-scrollbar">
             <table className="w-full text-left min-w-[600px]">
                <thead className="bg-gray-50 text-gray-400 uppercase text-[10px] font-black border-b tracking-widest">
                   <tr>
                      <th className="px-6 py-4">Image</th>
                      <th className="px-6 py-4">Name</th>
                      <th className="px-6 py-4">ID</th>
                      <th className="px-6 py-4 text-right">Actions</th>
                   </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                   {categories.map((cat) => (
                     <tr key={cat.id} className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4">
                          <img src={cat.image} className="w-12 h-12 object-cover rounded-xl shadow-sm border border-gray-100" />
                        </td>
                        <td className="px-6 py-4 font-black text-sm text-gray-800">{cat.name}</td>
                        <td className="px-6 py-4 text-gray-400 text-[10px] font-bold uppercase">{cat.id}</td>
                        <td className="px-6 py-4 text-right space-x-1">
                           <button onClick={() => openModal(cat)} className="p-2.5 text-blue-600 hover:bg-blue-50 rounded-xl transition-all"><Edit2 size={18} /></button>
                           <button onClick={() => handleDelete(cat.id)} className="p-2.5 text-red-600 hover:bg-red-50 rounded-xl transition-all"><Trash2 size={18} /></button>
                        </td>
                     </tr>
                   ))}
                </tbody>
             </table>
           </div>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-[70] p-4">
           <div className="bg-white rounded-3xl w-full max-w-md p-6 md:p-8 shadow-2xl overflow-y-auto max-h-[90vh]">
              <h2 className="text-2xl font-black text-black mb-6">{editingId ? 'Edit Category' : 'New Category'}</h2>
              <div className="space-y-4">
                 <div>
                    <label className="block text-xs md:text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1.5 ml-1">Category Name</label>
                    <input 
                      type="text" 
                      className="w-full p-4 border-2 border-gray-50 bg-gray-50 focus:bg-white focus:border-primary rounded-2xl outline-none font-bold text-gray-800"
                      value={formData.name}
                      onChange={e => setFormData({...formData, name: e.target.value})}
                      placeholder="e.g. Handles"
                    />
                 </div>
                 <div>
                    <label className="block text-xs md:text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1.5 ml-1">Image URL</label>
                    <input 
                      type="text" 
                      className="w-full p-4 border-2 border-gray-50 bg-gray-50 focus:bg-white focus:border-primary rounded-2xl outline-none font-bold text-gray-800 text-sm"
                      value={formData.image}
                      onChange={e => setFormData({...formData, image: e.target.value})}
                      placeholder="https://..."
                    />
                 </div>
              </div>
              <div className="flex gap-4 mt-8">
                 <button onClick={closeModal} className="flex-grow py-4 border-2 border-gray-100 rounded-2xl font-black text-gray-400 hover:bg-gray-50 transition-colors uppercase tracking-widest text-xs">Cancel</button>
                 <button onClick={handleSave} className="flex-grow py-4 bg-primary text-white rounded-2xl font-black shadow-lg shadow-primary/20 hover:scale-[1.02] transition-all uppercase tracking-widest text-xs">Save</button>
              </div>
           </div>
        </div>
      )}
    </div>
  );
};

export default AdminCategories;
