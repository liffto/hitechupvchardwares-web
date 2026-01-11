
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Layout from '../components/Layout';
import { Category, Catalog, Product, SiteSettings, Testimonial, GalleryImage } from '../types';
import IconRenderer, { WhatsAppIcon } from '../components/IconRenderer';
import { ChevronLeft, ChevronRight, Download, ArrowRight, Phone, Mail, Facebook } from 'lucide-react';

interface HomePageProps {
  categories: Category[];
  products: Product[];
  catalogs: Catalog[];
  settings: SiteSettings;
  testimonials: Testimonial[];
  gallery: GalleryImage[];
}

const HomePage: React.FC<HomePageProps> = ({ categories, catalogs, settings, testimonials }) => {
  const [activeBanner, setActiveBanner] = useState(0);
  const [testimonialPage, setTestimonialPage] = useState(0);

  const nextBanner = () => {
    setActiveBanner((prev) => (prev + 1) % settings.heroBanners.length);
  };

  const prevBanner = () => {
    setActiveBanner((prev) => (prev - 1 + settings.heroBanners.length) % settings.heroBanners.length);
  };

  // Testimonial Pagination
  const itemsPerPage = 3;
  const totalPages = Math.ceil(testimonials.length / itemsPerPage);
  const currentTestimonials = testimonials.slice(testimonialPage * itemsPerPage, (testimonialPage + 1) * itemsPerPage);

  const nextTestimonials = () => {
    setTestimonialPage((prev) => (prev + 1) % totalPages);
  };

  const prevTestimonials = () => {
    setTestimonialPage((prev) => (prev - 1 + totalPages) % totalPages);
  };

  return (
    <Layout settings={settings}>
      {/* Hero Slider */}
      <section className="relative h-[250px] md:h-[400px] lg:h-[500px] bg-gray-200 overflow-hidden">
        {settings.heroBanners.length > 0 ? (
          settings.heroBanners.map((banner, idx) => (
            <img 
              key={idx}
              src={banner} 
              alt={`Hero Banner ${idx + 1}`} 
              className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${idx === activeBanner ? 'opacity-100' : 'opacity-0'}`}
            />
          ))
        ) : (
          <div className="absolute inset-0 bg-gray-300 flex items-center justify-center text-gray-400">No Banners</div>
        )}
        <div className="absolute inset-0 bg-black/10 flex items-center justify-between px-4">
          <button onClick={prevBanner} className="p-2 bg-white/40 rounded-full hover:bg-white/80 transition-colors" aria-label="Previous Slide">
            <ChevronLeft size={24} />
          </button>
          <button onClick={nextBanner} className="p-2 bg-white/40 rounded-full hover:bg-white/80 transition-colors" aria-label="Next Slide">
            <ChevronRight size={24} />
          </button>
        </div>
      </section>

      {/* About Section */}
      <section className="py-12 md:py-20 max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-center">
          <div className="rounded-2xl overflow-hidden shadow-lg border-4 border-primary/5">
            <img src={settings.aboutImage} alt="About Hi-Tech" className="w-full h-full object-cover" />
          </div>
          <div>
            <span className="text-primary font-bold uppercase tracking-widest text-xs md:text-xs">About us</span>
            <h2 className="text-3xl md:text-3xl font-extrabold mt-2 mb-6 text-black tracking-tight leading-tight">Hi-Tech UPVC Hardwares</h2>
            <div className="space-y-4 text-gray-700 leading-relaxed text-base md:text-lg">
              <p className="line-clamp-6">
                {settings.aboutText}
              </p>
            </div>
            <Link to="/about" className="mt-8 inline-block bg-primary text-white px-8 py-4 rounded-xl font-bold hover:bg-primary-dark transition-all shadow-lg shadow-primary/20 text-base">
              Read More &rarr;
            </Link>
          </div>
        </div>
      </section>

      {/* Our Products Section */}
      <section className="py-12 md:py-20 bg-[#F4F9F1]">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-3xl lg:text-4xl font-extrabold text-black tracking-tight">Our Products</h2>
            <div className="w-16 h-1 bg-primary mx-auto mt-4 rounded-full"></div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
            {categories.slice(0, 8).map((cat, index) => (
              <Link 
                key={cat.id} 
                to={`/category/${cat.id}`}
                className={`bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all group p-4 border border-gray-100 ${index >= 6 ? 'hidden sm:block' : ''}`}
              >
                <div className="h-52 md:h-52 overflow-hidden rounded-xl flex items-center justify-center bg-gray-50">
                  <img src={cat.image} alt={cat.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                </div>
                <div className="py-6 px-1">
                  <h3 className="font-extrabold text-black text-lg md:text-lg text-center lg:text-left">{cat.name}</h3>
                </div>
              </Link>
            ))}
          </div>
          <div className="mt-14 text-center">
            <Link to="/products" className="bg-primary text-white px-10 py-5 rounded-2xl font-bold hover:bg-primary-dark transition-all inline-flex items-center gap-2 shadow-xl shadow-primary/20 text-base md:text-lg">
              View All Products <ArrowRight size={22} />
            </Link>
          </div>
        </div>
      </section>

      {/* Catalogs Section */}
      <section className="py-12 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-3xl lg:text-4xl font-extrabold text-black tracking-tight">Catalogs</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10">
            {catalogs.slice(0, 3).map((cat) => (
              <div key={cat.id} className="bg-white p-6 rounded-3xl shadow-lg flex flex-col items-start border border-gray-100 group">
                <div className="w-full h-[350px] md:h-[400px] bg-white rounded-2xl mb-6 overflow-hidden border border-gray-100 shadow-inner">
                   <img src={cat.image} alt={cat.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000" />
                </div>
                <div className="w-full px-1">
                   <h3 className="text-xl md:text-xl font-black text-black mb-5 h-16 line-clamp-2 leading-tight">{cat.name}</h3>
                   <a 
                     href={cat.fileUrl} 
                     target="_blank" 
                     rel="noopener noreferrer"
                     className="w-full md:w-auto flex items-center justify-center gap-2 border-2 border-gray-100 text-gray-700 px-8 py-4 rounded-2xl hover:bg-primary hover:text-white hover:border-primary transition-all font-bold text-base shadow-sm"
                   >
                     Download <Download size={20} />
                   </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section Preview */}
      <section className="py-12 md:py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-3xl lg:text-4xl font-extrabold text-black tracking-tight">Contact Us</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16">
            <div className="rounded-3xl overflow-hidden shadow-2xl h-[350px] md:h-[450px]">
              <img src={settings.contactImage} className="w-full h-full object-cover" alt="Contact Support" />
            </div>
            <div className="grid grid-cols-1 gap-4 md:gap-6">
              <a href={`https://wa.me/${settings.whatsapp}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-5 bg-white p-6 rounded-3xl shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all border border-gray-100">
                <div className="w-14 h-14 bg-[#25D366] rounded-2xl flex items-center justify-center text-white shadow-lg shadow-green-500/30">
                  <WhatsAppIcon size={32} />
                </div>
                <span className="font-black text-black text-lg md:text-xl">WhatsApp Support</span>
              </a>
              <a href={`tel:${settings.adminPhone}`} className="flex items-center gap-5 bg-white p-6 rounded-3xl shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all border border-gray-100">
                <div className="w-14 h-14 bg-primary rounded-2xl flex items-center justify-center text-white shadow-lg shadow-primary/30"><Phone size={28} /></div>
                <span className="font-black text-black text-lg md:text-xl">Call Us Now</span>
              </a>
              <a href={`mailto:${settings.email}`} className="flex items-center gap-5 bg-white p-6 rounded-3xl shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all border border-gray-100">
                <div className="w-14 h-14 bg-gray-900 rounded-2xl flex items-center justify-center text-white shadow-lg"><Mail size={28} /></div>
                <span className="font-black text-black text-lg md:text-xl">E-mail Us</span>
              </a>
              <a href={settings.facebook} target="_blank" rel="noopener noreferrer" className="flex items-center gap-5 bg-white p-6 rounded-3xl shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all border border-gray-100">
                <div className="w-14 h-14 bg-blue-600 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-blue-500/30"><Facebook size={28} /></div>
                <span className="font-black text-black text-lg md:text-xl">Facebook Page</span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default HomePage;
