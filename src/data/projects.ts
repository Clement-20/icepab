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
    id: 'flex-store',
    name: 'Flex Store',
    tagline: 'Modern Digital Assets',
    description: 'A lightning-fast marketplace for distributed digital resources and high-fidelity project templates.',
    icon: 'Market',
    url: '#',
    status: 'live',
    category: 'Market',
    features: ['Instant Sync', 'Secure Vault', 'P2P Delivery'],
    color: '#00E5FF',
  },
  {
    id: 'oau-cbt',
    name: 'OAU CBT Elite',
    tagline: 'Educational Excellence',
    description: 'High-concurrency testing environment designed for scale and zero-latency performance in academic nodes.',
    icon: 'Utility',
    url: '#',
    status: 'live',
    category: 'Utility',
    features: ['Auto-Grade', 'Mesh Backup', 'Offline Mode'],
    color: '#FF00E5',
  },
  {
    id: 'ice-net',
    name: 'IceNet Core',
    tagline: 'Mesh Protocol V2',
    description: 'The backbone of the IcePab ecosystem. Managing data routing and system integrity across global ingress points.',
    icon: 'Infrastructure',
    url: '#',
    status: 'beta',
    category: 'Infrastructure',
    features: ['AES-256', 'Low Latency', 'Auto-Healing'],
    color: '#00FF41',
  },
  {
    id: 'sync-lab',
    name: 'Sync Lab',
    tagline: 'Collaborative Editor',
    description: 'Real-time collaborative environment for distributed teams to build and sync infrastructure in one view.',
    icon: 'Social',
    url: '#',
    status: 'in-dev',
    category: 'Social',
    features: ['Live Auth', 'Conflict Resolution', 'Glass UI'],
    color: '#FFD700',
  },
];
