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
  },
  {
    id: 'saas-automation',
    name: 'Workflow Automation',
    tagline: 'Custom SaaS & Business Operations',
    description: 'Engineered backend integrations, cron schedulers, and admin dashboards designed to streamline daily operational workflows for growing digital enterprises.',
    icon: 'Infrastructure',
    url: '#',
    status: 'live',
    category: 'Infrastructure',
    features: ['API Integrations', 'Automated Schedulers', 'Admin Consoles'],
    color: '#00FF41',
  },
  {
    id: 'graphic-systems',
    name: 'Brand Systems & Prototyping',
    tagline: 'Visual Architecture & Creative UI/UX',
    description: 'Bespoke corporate visual identity systems, vector asset prints, and interactive high-fidelity user interface prototypes built with a pixel-perfect ethos.',
    icon: 'Social',
    url: '#',
    status: 'live',
    category: 'Social',
    features: ['Figma Prototyping', 'Brand Identity', 'Vector Illustration'],
    color: '#FF00E5',
  },
  {
    id: 'digital-stores',
    name: 'Modern Web Storefronts',
    tagline: 'Digital Asset Delivery',
    description: 'High-speed, lightweight e-commerce storefront architectures optimized for fast load times and instant digital asset downloads.',
    icon: 'Market',
    url: '#',
    status: 'live',
    category: 'Market',
    features: ['Fast Performance', 'Responsive Checkout', 'Secure Delivery'],
    color: '#FFD700',
  },
];
