
import { Category, Product, Catalog, Testimonial, SiteSettings, GalleryImage } from './types';

export const INITIAL_SETTINGS: SiteSettings = {
  whatsapp: '916382488657',
  email: 'hitechupvc@gmail.com',
  facebook: 'https://facebook.com/hitechupvc', // Default value
  headOfficePhone: '+91 81224 76567',
  coimbatorePhone: '+91 63817 78251',
  maduraiPhone: '+91 86674 59835',
  adminPhone: '+91 63824 88657',
  heroBanners: [
    'https://images.unsplash.com/photo-1533090161767-e6ffed986c88?auto=format&fit=crop&q=80&w=1920',
    'https://images.unsplash.com/photo-1505691938895-1758d7eaa511?auto=format&fit=crop&q=80&w=1920'
  ],
  aboutText: 'We, Hi-Tech UPVC Hardwares, are a leading ISO 9001:2015 certified uPVC Hardware provider, with a complete range of uPVC Hardware, Tools, & Accessories, that offers integrated innovative solutions in the area of uPVC Hardware products. Head Office: 527/c Thiruvalluvar Thottam, Karuvampalayam, Tirupur, Tamil Nadu, 641604 Hitech Head Number: +91 63824 88657 Tirupur (Ho): +91 81224 76567 Branches: Coimbatore: +91 63817 78251 Madurai: +91 86674 59835',
  aboutImage: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&q=80&w=800',
  aboutTextSecondary: "Over the past few years, we have shown tremendous growth towards of range of uPVC products and based on our prestigious client's request, we have started our own manufacturing towards the usage of uPVC and Aluminum Windows & Doors. We have expansion of our warehouse and manufacturing unit as well. Apart from the above we are now an authorized distributor for SIEGENIA hardware, WACKAR Silicone products. We have a team of competent professionals assuring to deliver the best of services for our clients and to facilitate you with a highly perfect solutions to our hardware related queries. We have a dedicated experienced team in dispatch to give the best and faster delivery to our clients. Our products are the most reliable and guaranteed items. We have more than 1000+ prestigious clients who are frequently purchasing our products in a bulk, from various cities in India.",
  aboutImageSecondary: 'https://images.unsplash.com/photo-1516455590571-18256e5bb9ff?auto=format&fit=crop&q=80&w=800',
  strengthImage: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=800',
  contactImage: 'https://images.unsplash.com/photo-1534536281715-e28d76689b4d?auto=format&fit=crop&q=80&w=800',
  headerLogo: '', // Empty means use default icon
  footerLogo: '',
  poweredByLogo: 'https://via.placeholder.com/120x40?text=POWERED+BY',
  strengths: [
    { id: '1', iconName: 'Heart', text: 'Generosity in the market.' },
    { id: '2', iconName: 'ShieldCheck', text: 'Ethical business dealings.' },
    { id: '3', iconName: 'Users', text: 'A competent team for delivery.' },
    { id: '4', iconName: 'Globe', text: 'Wide range of network distribution.' },
    { id: '5', iconName: 'BadgePercent', text: 'Most competitive pricing.' },
  ]
};

export const INITIAL_CATEGORIES: Category[] = [
  { id: '1', name: 'Handle', image: 'https://picsum.photos/seed/handle/400/300' },
  { id: '2', name: 'Sliding Folding', image: 'https://picsum.photos/seed/sliding/400/300' },
  { id: '3', name: 'Tilt & Turn', image: 'https://picsum.photos/seed/tilt/400/300' },
  { id: '4', name: 'Wonder Series', image: 'https://picsum.photos/seed/wonder/400/300' },
  { id: '5', name: 'Verticle Sliding', image: 'https://picsum.photos/seed/verticle/400/300' },
  { id: '6', name: 'Hinges', image: 'https://picsum.photos/seed/hinges/400/300' },
  { id: '7', name: 'Rollers', image: 'https://picsum.photos/seed/rollers/400/300' },
  { id: '8', name: 'Friction Stay', image: 'https://picsum.photos/seed/friction/400/300' },
  { id: '9', name: 'Door Sets', image: 'https://picsum.photos/seed/doorsets/400/300' },
];

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: 'p1',
    categoryId: '7',
    name: 'Mesh Roller Steel Frame 7.5MM/10MM',
    description: 'Introducing the 7.5mm Roller MS by Vintech uPVC Hardware, a high-quality and durable solution designed to enhance the performance of your uPVC windows and doors. Crafted with precision and engineering excellence, these rollers are an essential component for smooth and effortless movement.',
    images: ['https://picsum.photos/seed/p1-1/600/400', 'https://picsum.photos/seed/p1-2/600/400']
  },
  {
    id: 'p2',
    categoryId: '7',
    name: 'Standard Mesh Roller',
    description: 'A durable mesh roller for standard window configurations.',
    images: ['https://picsum.photos/seed/p2/600/400']
  },
  {
    id: 'p3',
    categoryId: '1',
    name: 'Silver Curve Handle',
    description: 'Elegant silver finish handle with ergonomic grip.',
    images: ['https://picsum.photos/seed/p3/600/400']
  }
];

export const INITIAL_CATALOGS: Catalog[] = [
  { id: 'c1', name: 'Hi-Tech UPVC Hardwares', image: 'https://picsum.photos/seed/cat1/300/400', fileUrl: '#' },
  { id: 'c2', name: 'Lesso UPVC Window & Doors', image: 'https://picsum.photos/seed/cat2/300/400', fileUrl: '#' },
  { id: 'c3', name: 'Gemplast Technical Manual', image: 'https://picsum.photos/seed/cat3/300/400', fileUrl: '#' },
];

export const TESTIMONIALS: Testimonial[] = [
  { id: 't1', name: 'John Doe', company: 'SomeCompany LLC.', content: 'Windseal is the best UPVC Hardware seller for Doors and Windows. We got instant response and quick delivery.', avatar: 'https://i.pravatar.cc/150?u=john' },
  { id: 't2', name: 'Jane Doe', company: 'BuildFast Corp.', content: 'Hi Windseal Hardwares, Excellent delivery on time. All the best. Keep it up. We love to shop with you.', avatar: 'https://i.pravatar.cc/150?u=jane' },
];

export const INITIAL_GALLERY: GalleryImage[] = [
  { id: 'g1', url: 'https://picsum.photos/seed/gal1/800/600', caption: 'Installation View 1' },
  { id: 'g2', url: 'https://picsum.photos/seed/gal2/800/600', caption: 'Premium Hardware Display' },
  { id: 'g3', url: 'https://picsum.photos/seed/gal3/800/600', caption: 'Showroom Interior' },
  { id: 'g4', url: 'https://picsum.photos/seed/gal4/800/600', caption: 'Testing Unit' },
  { id: 'g5', url: 'https://picsum.photos/seed/gal5/800/600', caption: 'Packaging Area' },
  { id: 'g6', url: 'https://picsum.photos/seed/gal6/800/600', caption: 'Warehouse Stock' },
];
