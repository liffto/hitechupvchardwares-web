
import React, { useState } from 'react';
import AdminSidebar from '../components/AdminSidebar';
import { GalleryImage } from '../types';
import { Plus, Trash2, Edit2, Image as ImageIcon } from 'lucide-react';

interface AdminGalleryProps {
  gallery: GalleryImage[];
  setGallery: React.Dispatch<React.SetStateAction<GalleryImage[]>>;
}

const AdminGallery: React.FC<AdminGalleryProps> = ({ gallery, setGallery }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({ url: '', caption: '' });

  const handleSave = () => {
    if (editingId) {
      setGallery(prev => prev.map(img => img.id === editingId ? { ...img, ...formData } : img));
    } else {
      const newImg: GalleryImage = {
        id: Date.now().toString(),
        ...formData
      };
      setGallery(prev => [newImg, ...prev]);
    }
    closeModal();
  };

  const openModal = (img?: GalleryImage) => {
    if (img) {
      setEditingId(img.id);
      setFormData({ url: img.url, caption: img.caption || '' });
    } else {
      setEditingId(null);
      setFormData({ url: '', caption: '' });
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingId(null);
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Remove this image from the gallery?')) {
      setGallery(prev => prev.filter(img => img.id !== id));
    }
  };

  return (
    <div className="flex bg-gray-50 min-h-screen">
      <AdminSidebar />
      <div className="flex-grow lg:ml-64 p-4 md:p-8 pt-20 lg:pt-8 overflow-x-hidden">
        <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800 tracking-tight">Gallery Management</h1>
            <p className="text-sm md:text-base text-gray-500 font-medium">Manage images shown in the homepage gallery.</p>
          </div>
          <button 
            onClick={() => openModal()}
            className="w-full sm:w-auto bg-primary text-white flex items-center justify-center gap-2 px-6 py-4 rounded-2xl font-bold shadow-lg shadow-primary/20 hover:scale-105 transition-all active:scale-95 text-base"
          >
            <Plus size={20} /> Add Gallery Image
          </button>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
           {gallery.map((img) => (
             <div key={img.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden flex flex-col group">
                <div className="relative h-48 overflow-hidden bg-gray-100">
                   <img src={img.url} className="w-full h-full object-cover transition-transform group-hover:scale-110" />
                   <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                      <button onClick={() => openModal(img)} className="p-3 bg-white text-blue-600 rounded-full hover:scale-110 transition-transform shadow-md"><Edit2 size={18} /></button>
                      <button onClick={() => handleDelete(img.id)} className="p-3 bg-white text-red-600 rounded-full hover:scale-110 transition-transform shadow-md"><Trash2 size={18} /></button>
                   </div>
                </div>
                <div className="p-4 bg-white flex-grow">
                   <p className="text-sm font-bold text-gray-800 line-clamp-1">{img.caption || 'No caption'}</p>
                   <p className="text-[10px] text-gray-400 mt-1 uppercase font-black">ID: {img.id}</p>
                </div>
             </div>
           ))}
           {gallery.length === 0 && (
             <div className="col-span-full py-32 flex flex-col items-center justify-center border-2 border-dashed border-gray-200 rounded-3xl bg-white">
                <ImageIcon size={48} className="text-gray-200 mb-4" />
                <p className="text-gray-400 font-bold">Your gallery is empty.</p>
             </div>
           )}
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
           <div className="bg-white rounded-3xl w-full max-w-md p-8 shadow-2xl overflow-y-auto max-h-[90vh]">
              <h2 className="text-2xl font-black text-black mb-6">{editingId ? 'Edit Image' : 'New Gallery Image'}</h2>
              <div className="space-y-4">
                 <div>
                    <label className="block text-xs md:text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1.5 ml-1">Image URL</label>
                    <input 
                      type="text" 
                      className="w-full p-4 border-2 border-gray-50 bg-gray-50 focus:bg-white focus:border-primary rounded-2xl outline-none transition-all font-bold text-gray-800 text-sm"
                      value={formData.url}
                      onChange={e => setFormData({...formData, url: e.target.value})}
                      placeholder="https://..."
                    />
                 </div>
                 <div>
                    <label className="block text-xs md:text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1.5 ml-1">Caption (Optional)</label>
                    <input 
                      type="text" 
                      className="w-full p-4 border-2 border-gray-50 bg-gray-50 focus:bg-white focus:border-primary rounded-2xl outline-none transition-all font-bold text-gray-800 text-base"
                      value={formData.caption}
                      onChange={e => setFormData({...formData, caption: e.target.value})}
                      placeholder="e.g. Modern Handle Installation"
                    />
                 </div>
              </div>
              <div className="flex gap-4 mt-8">
                 <button onClick={closeModal} className="flex-grow py-4 border-2 border-gray-100 rounded-2xl font-black text-gray-400 hover:bg-gray-50 transition-colors uppercase tracking-widest text-xs">Cancel</button>
                 <button onClick={handleSave} className="flex-grow py-4 bg-primary text-white rounded-2xl font-black shadow-lg shadow-primary/20 hover:scale-[1.02] transition-all uppercase tracking-widest text-xs">
                   {editingId ? 'Update Image' : 'Add to Gallery'}
                 </button>
              </div>
           </div>
        </div>
      )}
    </div>
  );
};

export default AdminGallery;
