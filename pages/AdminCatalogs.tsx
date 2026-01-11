
import React, { useState } from 'react';
import AdminSidebar from '../components/AdminSidebar';
import { Catalog } from '../types';
import { Plus, Trash2, Edit2, FileText, ExternalLink } from 'lucide-react';

interface AdminCatalogsProps {
  catalogs: Catalog[];
  setCatalogs: React.Dispatch<React.SetStateAction<Catalog[]>>;
}

const AdminCatalogs: React.FC<AdminCatalogsProps> = ({ catalogs, setCatalogs }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({ name: '', image: '', fileUrl: '' });

  const handleSave = () => {
    if (editingId) {
      setCatalogs(prev => prev.map(c => c.id === editingId ? { ...c, ...formData } : c));
    } else {
      const newCat: Catalog = {
        id: Date.now().toString(),
        ...formData
      };
      setCatalogs(prev => [...prev, newCat]);
    }
    closeModal();
  };

  const openModal = (cat?: Catalog) => {
    if (cat) {
      setEditingId(cat.id);
      setFormData({ name: cat.name, image: cat.image, fileUrl: cat.fileUrl });
    } else {
      setEditingId(null);
      setFormData({ name: '', image: '', fileUrl: '' });
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingId(null);
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this catalog?')) {
      setCatalogs(prev => prev.filter(c => c.id !== id));
    }
  };

  return (
    <div className="flex bg-gray-50 min-h-screen">
      <AdminSidebar />
      <div className="flex-grow lg:ml-64 p-4 md:p-8 pt-20 lg:pt-8 overflow-x-hidden">
        <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800 tracking-tight">Catalog Management</h1>
            <p className="text-sm md:text-base text-gray-500 font-medium">Manage your downloadable PDF catalogs.</p>
          </div>
          <button 
            onClick={() => openModal()}
            className="w-full sm:w-auto bg-primary text-white flex items-center justify-center gap-2 px-6 py-4 rounded-2xl font-bold shadow-lg shadow-primary/20 hover:scale-105 transition-all active:scale-95 text-base"
          >
            <Plus size={20} /> Add Catalog
          </button>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
           {catalogs.map((cat) => (
             <div key={cat.id} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col group transition-all hover:shadow-md">
                <div className="w-full h-64 bg-gray-100 rounded-lg mb-4 overflow-hidden relative border border-gray-50">
                   <img src={cat.image} className="w-full h-full object-cover" />
                   <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
                      <button onClick={() => openModal(cat)} className="p-3 bg-white text-blue-600 rounded-full hover:scale-110 transition-transform shadow-lg"><Edit2 size={20} /></button>
                      <button onClick={() => handleDelete(cat.id)} className="p-3 bg-white text-red-600 rounded-full hover:scale-110 transition-transform shadow-lg"><Trash2 size={20} /></button>
                   </div>
                </div>
                <h3 className="font-bold text-lg mb-1">{cat.name}</h3>
                <p className="text-gray-400 text-xs font-medium truncate mb-4">{cat.fileUrl || 'No link added'}</p>
                
                <div className="mt-auto pt-4 border-t border-gray-50 flex justify-between items-center">
                   <a 
                     href={cat.fileUrl} 
                     target="_blank" 
                     rel="noopener noreferrer"
                     className="flex items-center gap-1.5 text-primary text-sm font-black uppercase tracking-wider hover:underline"
                   >
                     <ExternalLink size={16} /> Open File
                   </a>
                   <span className="text-[10px] text-gray-300 font-bold uppercase tracking-widest">ID: {cat.id}</span>
                </div>
             </div>
           ))}
           {catalogs.length === 0 && (
             <div className="col-span-full py-32 flex flex-col items-center justify-center border-2 border-dashed border-gray-200 rounded-3xl bg-white">
                <FileText size={48} className="text-gray-200 mb-4" />
                <p className="text-gray-400 font-bold">No catalogs added yet.</p>
             </div>
           )}
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
           <div className="bg-white rounded-3xl w-full max-w-md p-8 shadow-2xl overflow-y-auto max-h-[90vh]">
              <h2 className="text-2xl font-black text-black mb-6">{editingId ? 'Edit Catalog' : 'New Catalog'}</h2>
              <div className="space-y-4">
                 <div>
                    <label className="block text-xs md:text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1.5 ml-1">Catalog Title</label>
                    <input 
                      type="text" 
                      className="w-full p-4 border-2 border-gray-50 bg-gray-50 focus:bg-white focus:border-primary rounded-2xl outline-none transition-all font-bold text-gray-800 text-base"
                      value={formData.name}
                      onChange={e => setFormData({...formData, name: e.target.value})}
                      placeholder="e.g. Technical Manual 2024"
                    />
                 </div>
                 <div>
                    <label className="block text-xs md:text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1.5 ml-1">Cover Image URL</label>
                    <input 
                      type="text" 
                      className="w-full p-4 border-2 border-gray-50 bg-gray-50 focus:bg-white focus:border-primary rounded-2xl outline-none transition-all font-bold text-gray-800 text-sm"
                      value={formData.image}
                      onChange={e => setFormData({...formData, image: e.target.value})}
                      placeholder="https://..."
                    />
                 </div>
                 <div>
                    <label className="block text-xs md:text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1.5 ml-1">File URL (PDF/Link)</label>
                    <input 
                      type="text" 
                      className="w-full p-4 border-2 border-gray-50 bg-gray-50 focus:bg-white focus:border-primary rounded-2xl outline-none transition-all font-bold text-gray-800 text-sm"
                      value={formData.fileUrl}
                      onChange={e => setFormData({...formData, fileUrl: e.target.value})}
                      placeholder="https://drive.google.com/..."
                    />
                 </div>
              </div>
              <div className="flex gap-4 mt-10">
                 <button onClick={closeModal} className="flex-grow py-4 border-2 border-gray-100 rounded-2xl font-black text-gray-400 hover:bg-gray-50 transition-colors uppercase tracking-widest text-xs">Cancel</button>
                 <button onClick={handleSave} className="flex-grow py-4 bg-primary text-white rounded-2xl font-black shadow-lg shadow-primary/20 hover:scale-[1.02] transition-all uppercase tracking-widest text-xs">
                   {editingId ? 'Update Catalog' : 'Publish Catalog'}
                 </button>
              </div>
           </div>
        </div>
      )}
    </div>
  );
};

export default AdminCatalogs;
