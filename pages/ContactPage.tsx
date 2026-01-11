
import React from 'react';
import Layout from '../components/Layout';
import { Phone, Mail, MapPin } from 'lucide-react';
import { SiteSettings } from '../types';
import { WhatsAppIcon } from '../components/IconRenderer';

interface ContactPageProps {
  settings: SiteSettings;
}

const ContactPage: React.FC<ContactPageProps> = ({ settings }) => {
  return (
    <Layout settings={settings}>
      <div className="bg-primary py-10 text-center text-white">
        <h1 className="text-4xl font-bold">Contact Us</h1>
      </div>
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
          <div className="rounded-2xl overflow-hidden shadow-2xl h-[450px]">
            <img src={settings.contactImage} className="w-full h-full object-cover" alt="Support" />
          </div>
          
          <div className="space-y-4">
            <h3 className="text-2xl font-bold mb-6 text-black">Quick Connect</h3>
            <a href={`https://wa.me/${settings.whatsapp}`} target="_blank" rel="noopener noreferrer" className="flex items-center justify-between bg-white border-2 border-gray-50 p-4 rounded-2xl shadow-sm hover:shadow-lg transition-all group">
               <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-[#25D366] rounded-full flex items-center justify-center text-white shadow-lg">
                    <WhatsAppIcon size={24} />
                  </div>
                  <span className="text-lg font-bold text-gray-700">WhatsApp Support</span>
               </div>
            </a>
            <a href={`tel:${settings.adminPhone}`} className="flex items-center justify-between bg-white border-2 border-gray-50 p-4 rounded-2xl shadow-sm hover:shadow-lg transition-all group">
               <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-white shadow-lg"><Phone size={24} /></div>
                  <span className="text-lg font-bold text-gray-700">Call Support</span>
               </div>
            </a>
            <a href={`mailto:${settings.email}`} className="flex items-center justify-between bg-white border-2 border-gray-50 p-4 rounded-2xl shadow-sm hover:shadow-lg transition-all group">
               <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gray-800 rounded-full flex items-center justify-center text-white shadow-lg"><Mail size={24} /></div>
                  <span className="text-lg font-bold text-gray-700">E-mail</span>
               </div>
            </a>
          </div>
        </div>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
           <div className="bg-gray-50 p-6 rounded-3xl border border-gray-100">
              <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center text-white mb-4"><MapPin size={20} /></div>
              <h4 className="text-xl font-bold mb-2 text-black">Head Office</h4>
              <div className="text-gray-600 text-sm">
                <p className="leading-relaxed">527/c Thiruvalluvar Thottam, Karuvampalayam, Tirupur, Tamil Nadu, 641604.</p>
                <div className="mt-4 pt-4 border-t border-gray-200">
                   <p className="font-bold">Tel: <span className="text-black">{settings.adminPhone}</span></p>
                   <p className="font-bold">Tirupur (Ho): <span className="text-black">{settings.headOfficePhone}</span></p>
                </div>
              </div>
           </div>
           <div className="bg-gray-50 p-6 rounded-3xl border border-gray-100">
              <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center text-white mb-4"><MapPin size={20} /></div>
              <h4 className="text-xl font-bold mb-2 text-black">Coimbatore Office</h4>
              <div className="text-gray-600 text-sm">
                <p className="leading-relaxed">527/c Thiruvalluvar Thottam, Karuvampalayam, Tirupur, Tamil Nadu, 641604.</p>
                <div className="mt-4 pt-4 border-t border-gray-200">
                   <p className="font-bold">Tel: <span className="text-black">{settings.coimbatorePhone}</span></p>
                </div>
              </div>
           </div>
           <div className="bg-gray-50 p-6 rounded-3xl border border-gray-100">
              <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center text-white mb-4"><MapPin size={20} /></div>
              <h4 className="text-xl font-bold mb-2 text-black">Madurai Office</h4>
              <div className="text-gray-600 text-sm">
                <p className="leading-relaxed">527/c Thiruvalluvar Thottam, Karuvampalayam, Tirupur, Tamil Nadu, 641604.</p>
                <div className="mt-4 pt-4 border-t border-gray-200">
                   <p className="font-bold">Tel: <span className="text-black">{settings.maduraiPhone}</span></p>
                </div>
              </div>
           </div>
        </div>
      </div>
    </Layout>
  );
};

export default ContactPage;
