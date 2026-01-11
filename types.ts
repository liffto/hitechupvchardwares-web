
export interface Category {
  id: string;
  name: string;
  image: string;
  description?: string;
}

export interface Product {
  id: string;
  categoryId: string;
  name: string;
  description: string;
  images: string[];
}

export interface Catalog {
  id: string;
  name: string;
  image: string;
  fileUrl: string;
}

export interface Testimonial {
  id: string;
  name: string;
  company: string;
  content: string;
  avatar: string;
}

export interface GalleryImage {
  id: string;
  url: string;
  caption?: string;
}

export interface StrengthItem {
  id: string;
  iconName: string;
  text: string;
}

export interface SiteSettings {
  whatsapp: string;
  email: string;
  facebook: string; // New property
  headOfficePhone: string;
  coimbatorePhone: string;
  maduraiPhone: string;
  adminPhone: string;
  heroBanners: string[];
  // Dynamic Content
  aboutText: string;
  aboutImage: string;
  aboutTextSecondary: string;
  aboutImageSecondary: string;
  strengthImage: string;
  contactImage: string;
  // Logos
  headerLogo: string;
  footerLogo: string;
  poweredByLogo: string;
  // Strengths List
  strengths: StrengthItem[];
}
