
import React, { useState, useEffect } from 'react';
import AdminSidebar from '../components/AdminSidebar';
import { SiteSettings, StrengthItem } from '../types';
import { Save, Plus, Trash2, Phone, Image as ImageIcon, Briefcase, Star, Layout, ShieldAlert, Key, Globe, Mail, Facebook } from 'lucide-react';
import { ICON_MAP } from '../components/IconRenderer';

interface AdminSettingsProps {
  settings: SiteSettings;
  setSettings: React.Dispatch<React.SetStateAction<SiteSettings>>;
  adminPassword: string;
  setAdminPassword: (pass: string) => void;
}

const AdminSettings: React.FC<AdminSettingsProps> = ({ settings, setSettings, adminPassword, setAdminPassword }) => {
  const [formData, setFormData] = useState<SiteSettings>(settings);
  const [newBanner, setNewBanner] = useState('');
  const [newStrength, setNewStrength] = useState({ text: '', iconName: 'Star' });

  // Password change local state
  const [passData, setPassData] = useState({ current: '', new: '', confirm: '' });
  const [passError, setPassError] = useState('');

  // Sync formData with settings when settings change externally
  useEffect(() => {
    setFormData(settings);
  }, [settings]);

  const handleSave = () => {
    setSettings(formData);
    alert('Settings saved successfully!');
  };

  const handleUpdatePassword = () => {
    if (passData.current !== adminPassword) {
      setPassError('Current password is incorrect.');
      return;
    }
    if (passData.new !== passData.confirm) {
      setPassError('New passwords do not match.');
      return;
    }
    if (passData.new.length < 4) {
      setPassError('Password must be at least 4 characters.');
      return;
    }

    setAdminPassword(passData.new);
    setPassData({ current: '', new: '', confirm: '' });
    setPassError('');
    alert('Admin password updated successfully!');
  };

  const addStrength = () => {
    if (newStrength.text.trim()) {
      const item: StrengthItem = {
        id: Date.now().toString(),
        ...newStrength
      };
      setFormData({ ...formData, strengths: [...formData.strengths, item] });
      setNewStrength({ text: '', iconName: 'Star' });
    }
  };

  const removeStrength = (id: string) => {
    setFormData({ ...formData, strengths: formData.strengths.filter(s => s.id !== id) });
  };

  const addBanner = () => {
    if (newBanner.trim()) {
      setFormData({ ...formData, heroBanners: [...formData.heroBanners, newBanner] });
      setNewBanner('');
    }
  };

  const removeBanner = (index: number) => {
    setFormData({ 
      ...formData, 
      heroBanners: formData.heroBanners.filter((_, i) => i !== index) 
    });
  };

  return (
    <div className="flex bg-gray-50 min-h-screen">
      <AdminSidebar />
      <div className="flex-grow lg:ml-64 p-4 md:p-8 pt-20 lg:pt-8 overflow-x-hidden">
        <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <div>
            <h1 className="text-2xl md:text-3xl font-black text-gray-800 tracking-tight">System Settings</h1>
            <p className="text-base text-gray-500 font-medium">Manage global branding, content, and security.</p>
          </div>
          <button 
            onClick={handleSave}
            className="w-full sm:w-auto bg-primary text-white flex items-center justify-center gap-2 px-8 py-4 rounded-2xl font-black shadow-xl shadow-primary/20 hover:scale-105 transition-all active:scale-95 text-base"
          >
            <Save size={20} /> Save Changes
          </button>
        </header>

        {/* Security Section */}
        <div className="bg-white p-6 md:p-8 rounded-3xl shadow-sm border border-gray-100 mb-8 overflow-hidden relative">
          <h2 className="text-xl font-black text-black mb-6 flex items-center gap-2">
            <ShieldAlert size={22} className="text-primary" /> Security & Access
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
             <div>
                <label className="block text-sm font-black text-gray-600 uppercase tracking-wider mb-2">Current Password</label>
                <input 
                  type="password" 
                  className="w-full p-4 border-2 border-gray-100 bg-gray-50 rounded-2xl outline-none font-bold text-gray-800 text-base focus:border-primary focus:bg-white transition-all"
                  value={passData.current}
                  onChange={e => setPassData({...passData, current: e.target.value})}
                />
             </div>
             <div>
                <label className="block text-sm font-black text-gray-600 uppercase tracking-wider mb-2">New Password</label>
                <input 
                  type="password" 
                  className="w-full p-4 border-2 border-gray-100 bg-gray-50 rounded-2xl outline-none font-bold text-gray-800 text-base focus:border-primary focus:bg-white transition-all"
                  value={passData.new}
                  onChange={e => setPassData({...passData, new: e.target.value})}
                />
             </div>
             <div className="flex gap-4 items-end">
                <div className="flex-grow">
                   <label className="block text-sm font-black text-gray-600 uppercase tracking-wider mb-2">Confirm New</label>
                   <input 
                    type="password" 
                    className="w-full p-4 border-2 border-gray-100 bg-gray-50 rounded-2xl outline-none font-bold text-gray-800 text-base focus:border-primary focus:bg-white transition-all"
                    value={passData.confirm}
                    onChange={e => setPassData({...passData, confirm: e.target.value})}
                  />
                </div>
                <button 
                  onClick={handleUpdatePassword}
                  className="bg-gray-900 text-white p-5 rounded-2xl hover:bg-black transition-colors shadow-lg active:scale-90"
                  title="Update Password"
                >
                  <Key size={22} />
                </button>
             </div>
          </div>
          {passError && <p className="text-red-600 text-xs font-black uppercase mt-4 ml-1 tracking-wider">{passError}</p>}
        </div>

        {/* Hero Banners Management */}
        <div className="bg-white p-6 md:p-8 rounded-3xl shadow-sm border border-gray-100 mb-8">
          <h2 className="text-xl font-black text-black mb-6 flex items-center gap-2">
            <ImageIcon size={22} className="text-primary" /> Hero Banners
          </h2>
          <div className="space-y-4 mb-6">
            {formData.heroBanners.map((url, idx) => (
              <div key={idx} className="flex gap-3 items-center bg-gray-50 p-3 rounded-2xl border border-gray-100 group">
                <img src={url} className="w-16 h-10 object-cover rounded-lg shadow-sm" alt="" />
                <span className="flex-grow text-sm font-bold text-gray-600 truncate">{url}</span>
                <button 
                  onClick={() => removeBanner(idx)}
                  className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            ))}
          </div>
          <div className="flex gap-3">
            <input 
              type="text" 
              className="flex-grow p-4 border-2 border-gray-100 bg-gray-50 rounded-2xl outline-none font-bold text-gray-800 text-base"
              placeholder="Paste image URL here..."
              value={newBanner}
              onChange={e => setNewBanner(e.target.value)}
            />
            <button 
              onClick={addBanner}
              className="bg-primary text-white px-6 rounded-2xl font-black hover:bg-primary-dark transition-all active:scale-95"
            >
              Add Banner
            </button>
          </div>
        </div>

        {/* Contact Details Section */}
        <div className="bg-white p-6 md:p-8 rounded-3xl shadow-sm border border-gray-100 mb-8">
          <h2 className="text-xl font-black text-black mb-6 flex items-center gap-2">
            <Phone size={22} className="text-primary" /> Contact Information
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-black text-gray-600 uppercase tracking-wider mb-2">WhatsApp Number</label>
              <input type="text" className="w-full p-4 border-2 border-gray-100 bg-gray-50 rounded-2xl outline-none font-bold text-gray-800 text-base" value={formData.whatsapp} onChange={e => setFormData({...formData, whatsapp: e.target.value})} />
            </div>
            <div>
              <label className="block text-sm font-black text-gray-600 uppercase tracking-wider mb-2">Official Email</label>
              <input type="email" className="w-full p-4 border-2 border-gray-100 bg-gray-50 rounded-2xl outline-none font-bold text-gray-800 text-base" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} />
            </div>
            <div>
              <label className="block text-sm font-black text-gray-600 uppercase tracking-wider mb-2">Facebook Page URL</label>
              <input type="text" className="w-full p-4 border-2 border-gray-100 bg-gray-50 rounded-2xl outline-none font-bold text-gray-800 text-base" value={formData.facebook} onChange={e => setFormData({...formData, facebook: e.target.value})} placeholder="https://facebook.com/yourpage" />
            </div>
            <div>
              <label className="block text-sm font-black text-gray-600 uppercase tracking-wider mb-2">Hitech Head (Admin)</label>
              <input type="text" className="w-full p-4 border-2 border-gray-100 bg-gray-50 rounded-2xl outline-none font-bold text-gray-800 text-base" value={formData.adminPhone} onChange={e => setFormData({...formData, adminPhone: e.target.value})} />
            </div>
            <div>
              <label className="block text-sm font-black text-gray-600 uppercase tracking-wider mb-2">Tirupur (Head Office)</label>
              <input type="text" className="w-full p-4 border-2 border-gray-100 bg-gray-50 rounded-2xl outline-none font-bold text-gray-800 text-base" value={formData.headOfficePhone} onChange={e => setFormData({...formData, headOfficePhone: e.target.value})} />
            </div>
            <div>
              <label className="block text-sm font-black text-gray-600 uppercase tracking-wider mb-2">Coimbatore Branch</label>
              <input type="text" className="w-full p-4 border-2 border-gray-100 bg-gray-50 rounded-2xl outline-none font-bold text-gray-800 text-base" value={formData.coimbatorePhone} onChange={e => setFormData({...formData, coimbatorePhone: e.target.value})} />
            </div>
            <div>
              <label className="block text-sm font-black text-gray-600 uppercase tracking-wider mb-2">Madurai Branch</label>
              <input type="text" className="w-full p-4 border-2 border-gray-100 bg-gray-50 rounded-2xl outline-none font-bold text-gray-800 text-base" value={formData.maduraiPhone} onChange={e => setFormData({...formData, maduraiPhone: e.target.value})} />
            </div>
          </div>
        </div>

        {/* Content & Section Images */}
        <div className="bg-white p-6 md:p-8 rounded-3xl shadow-sm border border-gray-100 mb-8">
          <h2 className="text-xl font-black text-black mb-8 flex items-center gap-2">
            <Briefcase size={22} className="text-primary" /> Section Content & Visuals
          </h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* About Us */}
            <div className="space-y-6">
              <h3 className="text-sm font-black text-gray-400 uppercase tracking-[0.2em] border-b pb-2">About Section</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-black text-gray-600 uppercase tracking-wider mb-2">Section Image URL</label>
                  <input type="text" className="w-full p-4 border-2 border-gray-100 bg-gray-50 rounded-2xl outline-none font-bold text-gray-800 text-base" value={formData.aboutImage} onChange={e => setFormData({...formData, aboutImage: e.target.value})} />
                </div>
                <div>
                  <label className="block text-sm font-black text-gray-600 uppercase tracking-wider mb-2">Main Text Content</label>
                  <textarea rows={5} className="w-full p-4 border-2 border-gray-100 bg-gray-50 rounded-2xl outline-none font-bold text-gray-800 text-base leading-relaxed" value={formData.aboutText} onChange={e => setFormData({...formData, aboutText: e.target.value})} />
                </div>
              </div>
            </div>

            {/* Other Images */}
            <div className="space-y-6">
              <h3 className="text-sm font-black text-gray-400 uppercase tracking-[0.2em] border-b pb-2">Support Assets</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-black text-gray-600 uppercase tracking-wider mb-2">Strength Image (About Page)</label>
                  <input type="text" className="w-full p-4 border-2 border-gray-100 bg-gray-50 rounded-2xl outline-none font-bold text-gray-800 text-base" value={formData.strengthImage} onChange={e => setFormData({...formData, strengthImage: e.target.value})} />
                </div>
                <div>
                  <label className="block text-sm font-black text-gray-600 uppercase tracking-wider mb-2">Contact Page Header Image</label>
                  <input type="text" className="w-full p-4 border-2 border-gray-100 bg-gray-50 rounded-2xl outline-none font-bold text-gray-800 text-base" value={formData.contactImage} onChange={e => setFormData({...formData, contactImage: e.target.value})} />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Branding & Logos */}
        <div className="bg-white p-6 md:p-8 rounded-3xl shadow-sm border border-gray-100 mb-12">
          <h2 className="text-xl font-black text-black mb-6 flex items-center gap-2">
            <Layout size={22} className="text-primary" /> Branding
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-black text-gray-600 uppercase tracking-wider mb-2">Header Logo URL</label>
              <input type="text" className="w-full p-4 border-2 border-gray-100 bg-gray-50 rounded-2xl outline-none font-bold text-gray-800 text-base" value={formData.headerLogo} onChange={e => setFormData({...formData, headerLogo: e.target.value})} />
            </div>
            <div>
              <label className="block text-sm font-black text-gray-600 uppercase tracking-wider mb-2">Footer Logo URL</label>
              <input type="text" className="w-full p-4 border-2 border-gray-100 bg-gray-50 rounded-2xl outline-none font-bold text-gray-800 text-base" value={formData.footerLogo} onChange={e => setFormData({...formData, footerLogo: e.target.value})} />
            </div>
            <div>
              <label className="block text-sm font-black text-gray-600 uppercase tracking-wider mb-2">Powered By Logo</label>
              <input type="text" className="w-full p-4 border-2 border-gray-100 bg-gray-50 rounded-2xl outline-none font-bold text-gray-800 text-base" value={formData.poweredByLogo} onChange={e => setFormData({...formData, poweredByLogo: e.target.value})} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminSettings;
