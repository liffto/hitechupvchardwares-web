
import React, { useState } from 'react';
import AdminSidebar from '../components/AdminSidebar';
import { Testimonial } from '../types';
import { Plus, Trash2, Edit2, User, Quote } from 'lucide-react';

interface AdminTestimonialsProps {
  testimonials: Testimonial[];
  setTestimonials: React.Dispatch<React.SetStateAction<Testimonial[]>>;
}

const AdminTestimonials: React.FC<AdminTestimonialsProps> = ({ testimonials, setTestimonials }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({ 
    name: '', 
    company: '', 
    content: '', 
    avatar: '' 
  });

  const handleSave = () => {
    if (editingId) {
      setTestimonials(prev => prev.map(t => t.id === editingId ? { ...t, ...formData } : t));
    } else {
      const newTestimonial: Testimonial = {
        id: Date.now().toString(),
        ...formData
      };
      setTestimonials(prev => [...prev, newTestimonial]);
    }
    closeModal();
  };

  const openModal = (testimonial?: Testimonial) => {
    if (testimonial) {
      setEditingId(testimonial.id);
      setFormData({ 
        name: testimonial.name, 
        company: testimonial.company, 
        content: testimonial.content, 
        avatar: testimonial.avatar 
      });
    } else {
      setEditingId(null);
      setFormData({ name: '', company: '', content: '', avatar: '' });
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingId(null);
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this testimonial?')) {
      setTestimonials(prev => prev.filter(t => t.id !== id));
    }
  };

  return (
    <div className="flex bg-gray-50 min-h-screen">
      <AdminSidebar />
      <div className="flex-grow lg:ml-64 p-4 md:p-8 pt-20 lg:pt-8 overflow-x-hidden">
        <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800 tracking-tight">Client Testimonials</h1>
            <p className="text-sm md:text-base text-gray-500 font-medium">Manage reviews shown on the homepage.</p>
          </div>
          <button 
            onClick={() => openModal()}
            className="w-full sm:w-auto bg-primary text-white flex items-center justify-center gap-2 px-6 py-4 rounded-2xl font-bold shadow-lg shadow-primary/20 hover:scale-105 transition-all active:scale-95 text-base"
          >
            <Plus size={20} /> Add Testimonial
          </button>
        </header>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
           <div className="overflow-x-auto custom-scrollbar">
             <table className="w-full text-left min-w-[600px]">
                <thead className="bg-gray-50 text-gray-400 uppercase text-[10px] font-black border-b tracking-widest">
                   <tr>
                      <th className="px-6 py-4">Client</th>
                      <th className="px-6 py-4">Review Content</th>
                      <th className="px-6 py-4 text-right">Actions</th>
                   </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                   {testimonials.map((t) => (
                     <tr key={t.id} className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-5">
                          <div className="flex items-center gap-4">
                             <img src={t.avatar || 'https://i.pravatar.cc/150'} className="w-12 h-12 object-cover rounded-full border border-gray-100" />
                             <div className="flex flex-col">
                               <span className="font-extrabold text-sm text-gray-900">{t.name}</span>
                               <span className="text-[10px] text-gray-400 font-bold uppercase">{t.company}</span>
                             </div>
                          </div>
                        </td>
                        <td className="px-6 py-5 max-w-md">
                          <p className="text-xs text-gray-600 line-clamp-2 italic">"{t.content}"</p>
                        </td>
                        <td className="px-6 py-5 text-right space-x-2">
                          <button onClick={() => openModal(t)} className="p-2.5 text-blue-600 hover:bg-blue-50 rounded-xl transition-colors"><Edit2 size={18} /></button>
                          <button onClick={() => handleDelete(t.id)} className="p-2.5 text-red-600 hover:bg-red-50 rounded-xl transition-colors"><Trash2 size={18} /></button>
                        </td>
                     </tr>
                   ))}
                   {testimonials.length === 0 && (
                     <tr>
                       <td colSpan={3} className="px-6 py-20 text-center text-gray-400 font-bold">No testimonials yet.</td>
                     </tr>
                   )}
                </tbody>
             </table>
           </div>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
           <div className="bg-white rounded-3xl w-full max-w-xl p-8 shadow-2xl overflow-y-auto max-h-[90vh]">
              <h2 className="text-2xl font-black text-black mb-6">{editingId ? 'Edit Testimonial' : 'New Testimonial'}</h2>
              <div className="space-y-4">
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-xs md:text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1.5 ml-1">Client Name</label>
                        <input 
                          type="text" 
                          className="w-full p-4 border-2 border-gray-50 bg-gray-50 focus:bg-white focus:border-primary rounded-2xl outline-none transition-all font-bold text-gray-800 text-base"
                          value={formData.name}
                          onChange={e => setFormData({...formData, name: e.target.value})}
                          placeholder="e.g. John Smith"
                        />
                    </div>
                    <div>
                        <label className="block text-xs md:text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1.5 ml-1">Company / Position</label>
                        <input 
                          type="text" 
                          className="w-full p-4 border-2 border-gray-50 bg-gray-50 focus:bg-white focus:border-primary rounded-2xl outline-none transition-all font-bold text-gray-800 text-base"
                          value={formData.company}
                          onChange={e => setFormData({...formData, company: e.target.value})}
                          placeholder="e.g. CEO at BuildWell"
                        />
                    </div>
                 </div>
                 <div>
                    <label className="block text-xs md:text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1.5 ml-1">Avatar Image URL</label>
                    <input 
                      type="text" 
                      className="w-full p-4 border-2 border-gray-50 bg-gray-50 focus:bg-white focus:border-primary rounded-2xl outline-none transition-all font-bold text-gray-800 text-sm"
                      value={formData.avatar}
                      onChange={e => setFormData({...formData, avatar: e.target.value})}
                      placeholder="https://..."
                    />
                 </div>
                 <div>
                    <label className="block text-xs md:text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1.5 ml-1">Testimonial Content</label>
                    <textarea 
                      rows={5}
                      className="w-full p-4 border-2 border-gray-50 bg-gray-50 focus:bg-white focus:border-primary rounded-2xl outline-none transition-all font-bold text-gray-800 leading-relaxed text-base"
                      value={formData.content}
                      onChange={e => setFormData({...formData, content: e.target.value})}
                      placeholder="Write the client review here..."
                    ></textarea>
                 </div>
              </div>
              <div className="flex gap-4 mt-8">
                 <button onClick={closeModal} className="flex-grow py-4 border-2 border-gray-100 rounded-2xl font-black text-gray-400 hover:bg-gray-50 transition-colors uppercase tracking-widest text-xs">Cancel</button>
                 <button onClick={handleSave} className="flex-grow py-4 bg-primary text-white rounded-2xl font-black shadow-lg shadow-primary/20 hover:scale-[1.02] transition-all uppercase tracking-widest text-xs">
                   {editingId ? 'Update Review' : 'Publish Review'}
                 </button>
              </div>
           </div>
        </div>
      )}
    </div>
  );
};

export default AdminTestimonials;
