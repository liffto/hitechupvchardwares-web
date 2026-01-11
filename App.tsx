
import React, { useState, useEffect } from 'react';
import { HashRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { INITIAL_CATEGORIES, INITIAL_PRODUCTS, INITIAL_CATALOGS, INITIAL_SETTINGS, TESTIMONIALS as INITIAL_TESTIMONIALS, INITIAL_GALLERY } from './constants';
import { Category, Product, Catalog, SiteSettings, Testimonial, GalleryImage } from './types';

// Pages
import HomePage from './pages/HomePage';
import ProductsPage from './pages/ProductsPage';
import ProductListPage from './pages/ProductListPage';
import ProductDetailPage from './pages/ProductDetailPage';
import AboutPage from './pages/AboutPage';
import CatalogsPage from './pages/CatalogsPage';
import ContactPage from './pages/ContactPage';
import GalleryPage from './pages/GalleryPage';
import AdminDashboard from './pages/AdminDashboard';
import AdminCategories from './pages/AdminCategories';
import AdminProducts from './pages/AdminProducts';
import AdminCatalogs from './pages/AdminCatalogs';
import AdminSettings from './pages/AdminSettings';
import AdminTestimonials from './pages/AdminTestimonials';
import AdminGallery from './pages/AdminGallery';
import AdminLogin from './pages/AdminLogin';

// Private Route Wrapper
const PrivateRoute: React.FC<{ children: React.ReactElement }> = ({ children }) => {
  const isAuthenticated = sessionStorage.getItem('hitech_auth') === 'true';
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/admin/login" state={{ from: location }} replace />;
  }

  return children;
};

const App: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>(() => {
    const saved = localStorage.getItem('hitech_categories');
    return saved ? JSON.parse(saved) : INITIAL_CATEGORIES;
  });

  const [products, setProducts] = useState<Product[]>(() => {
    const saved = localStorage.getItem('hitech_products');
    return saved ? JSON.parse(saved) : INITIAL_PRODUCTS;
  });

  const [catalogs, setCatalogs] = useState<Catalog[]>(() => {
    const saved = localStorage.getItem('hitech_catalogs');
    return saved ? JSON.parse(saved) : INITIAL_CATALOGS;
  });

  const [settings, setSettings] = useState<SiteSettings>(() => {
    const saved = localStorage.getItem('hitech_settings');
    return saved ? JSON.parse(saved) : INITIAL_SETTINGS;
  });

  const [testimonials, setTestimonials] = useState<Testimonial[]>(() => {
    const saved = localStorage.getItem('hitech_testimonials');
    return saved ? JSON.parse(saved) : INITIAL_TESTIMONIALS;
  });

  const [gallery, setGallery] = useState<GalleryImage[]>(() => {
    const saved = localStorage.getItem('hitech_gallery');
    return saved ? JSON.parse(saved) : INITIAL_GALLERY;
  });

  const [adminPassword, setAdminPassword] = useState<string>(() => {
    const saved = localStorage.getItem('hitech_admin_pass');
    return saved || 'hitech@123';
  });

  useEffect(() => {
    localStorage.setItem('hitech_categories', JSON.stringify(categories));
  }, [categories]);

  useEffect(() => {
    localStorage.setItem('hitech_products', JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem('hitech_catalogs', JSON.stringify(catalogs));
  }, [catalogs]);

  useEffect(() => {
    localStorage.setItem('hitech_settings', JSON.stringify(settings));
  }, [settings]);

  useEffect(() => {
    localStorage.setItem('hitech_testimonials', JSON.stringify(testimonials));
  }, [testimonials]);

  useEffect(() => {
    localStorage.setItem('hitech_gallery', JSON.stringify(gallery));
  }, [gallery]);

  useEffect(() => {
    localStorage.setItem('hitech_admin_pass', adminPassword);
  }, [adminPassword]);

  return (
    <HashRouter>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<HomePage categories={categories} products={products} catalogs={catalogs} settings={settings} testimonials={testimonials} gallery={gallery} />} />
        <Route path="/about" element={<AboutPage settings={settings} />} />
        <Route path="/products" element={<ProductsPage categories={categories} settings={settings} />} />
        <Route path="/category/:id" element={<ProductListPage categories={categories} products={products} settings={settings} />} />
        <Route path="/product/:id" element={<ProductDetailPage products={products} settings={settings} />} />
        <Route path="/catalogs" element={<CatalogsPage catalogs={catalogs} settings={settings} />} />
        <Route path="/gallery" element={<GalleryPage gallery={gallery} settings={settings} />} />
        <Route path="/contact" element={<ContactPage settings={settings} />} />

        {/* Admin Login */}
        <Route path="/admin/login" element={<AdminLogin adminPassword={adminPassword} />} />

        {/* Protected Admin Routes */}
        <Route path="/admin" element={<PrivateRoute><AdminDashboard categories={categories} products={products} catalogs={catalogs} /></PrivateRoute>} />
        <Route 
          path="/admin/categories" 
          element={<PrivateRoute><AdminCategories categories={categories} setCategories={setCategories} /></PrivateRoute>} 
        />
        <Route 
          path="/admin/products" 
          element={<PrivateRoute><AdminProducts products={products} categories={categories} setProducts={setProducts} /></PrivateRoute>} 
        />
        <Route 
          path="/admin/catalogs" 
          element={<PrivateRoute><AdminCatalogs catalogs={catalogs} setCatalogs={setCatalogs} /></PrivateRoute>} 
        />
        <Route 
          path="/admin/settings" 
          element={<PrivateRoute><AdminSettings settings={settings} setSettings={setSettings} adminPassword={adminPassword} setAdminPassword={setAdminPassword} /></PrivateRoute>} 
        />
        <Route 
          path="/admin/testimonials" 
          element={<PrivateRoute><AdminTestimonials testimonials={testimonials} setTestimonials={setTestimonials} /></PrivateRoute>} 
        />
        <Route 
          path="/admin/gallery" 
          element={<PrivateRoute><AdminGallery gallery={gallery} setGallery={setGallery} /></PrivateRoute>} 
        />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </HashRouter>
  );
};

export default App;
