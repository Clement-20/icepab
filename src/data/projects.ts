export interface ProjectApp {
  id: string;
  name: string;
  tagline: string;
  description: string;
  icon: string;
  url: string;
  status: 'live' | 'beta' | 'in-dev';
  category: 'Utility' | 'Market' | 'Social' | 'Infrastructure';
  features: string[];
  color: string;
  price?: string;
  image?: string;
}

export const projectData: ProjectApp[] = [
  {
    id: 'oau-cbt',
    name: 'ExamGuard (OAU CBT)',
    tagline: 'Secure Custom Testing Engine',
    description: 'High-concurrency, secure computer-based testing environment engineered for scale, evaluation integrity, and latency-optimized performance in institutional exams.',
    icon: 'Utility',
    url: 'https://oau.cbt.icepab.name.ng',
    status: 'live',
    category: 'Utility',
    features: ['Secure Sandbox', 'Automated Grading', 'Integrity Protocols'],
    color: '#00E5FF',
    price: '$450',
    image: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=600&auto=format&fit=crop',
  },
  {
    id: 'ice-net',
    name: 'Workflow Automation',
    tagline: 'Custom SaaS & Business Operations',
    description: 'Engineered backend integrations, cron schedulers, and admin dashboards designed to streamline daily operational workflows for growing digital enterprises.',
    icon: 'Infrastructure',
    url: '#',
    status: 'live',
    category: 'Infrastructure',
    features: ['API Integrations', 'Automated Schedulers', 'Admin Consoles'],
    color: '#00FF41',
    price: '$200',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=600&auto=format&fit=crop',
  },
  {
    id: 'sync-lab',
    name: 'Brand Systems & Prototyping',
    tagline: 'Visual Architecture & Creative UI/UX',
    description: 'Bespoke corporate visual identity systems, vector asset prints, and interactive high-fidelity user interface prototypes built with a pixel-perfect ethos.',
    icon: 'Social',
    url: '#',
    status: 'live',
    category: 'Social',
    features: ['Figma Prototyping', 'Brand Identity', 'Vector Illustration'],
    color: '#FF00E5',
    price: '$150',
    image: 'https://images.unsplash.com/photo-1558655146-d09347e92766?q=80&w=600&auto=format&fit=crop',
  },
  {
    id: 'flex-store',
    name: 'Modern Web Storefronts',
    tagline: 'Digital Asset Delivery',
    description: 'High-speed, lightweight e-commerce storefront architectures optimized for fast load times and instant digital asset downloads.',
    icon: 'Market',
    url: '#',
    status: 'live',
    category: 'Market',
    features: ['Fast Performance', 'Responsive Checkout', 'Secure Delivery'],
    color: '#FFD700',
    price: '$300',
    image: 'https://images.unsplash.com/photo-1557821552-17105176677c?q=80&w=600&auto=format&fit=crop',
  },
];
