export interface GalleryImage {
  id: string;
  url: string;
  alt: string;
  caption: string;
  width: number;
  height: number;
  category: string;
}

export const galleryData: GalleryImage[] = [
  {
    id: '1',
    url: 'https://images.unsplash.com/photo-1614850523296-d8c1af93d400?q=80&w=2070&auto=format&fit=crop',
    alt: 'IcePab System Architecture - Liquid Cooling Simulation',
    caption: 'Thermal dynamics visualization of the IcePab core mesh networking nodes.',
    width: 1200,
    height: 800,
    category: 'Systems',
  },
  {
    id: '2',
    url: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?q=80&w=2064&auto=format&fit=crop',
    alt: 'Decentralized Node Visualization',
    caption: 'Real-time topological map of distributed storage clusters across the West African region.',
    width: 800,
    height: 1200,
    category: 'Architecture',
  },
  {
    id: '3',
    url: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2070&auto=format&fit=crop',
    alt: 'Cybersecurity Mesh Interface',
    caption: 'Encryption layer visualization highlighting the AES-256-GCM hardware-accelerated pathways.',
    width: 1200,
    height: 1200,
    category: 'Security',
  },
  {
    id: '4',
    url: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc51?q=80&w=2026&auto=format&fit=crop',
    alt: 'OAU CBT Server Farm infrastructure',
    caption: 'High-density compute nodes optimized for sub-millisecond educational testing responses.',
    width: 1000,
    height: 1500,
    category: 'Infrastructure',
  },
  {
    id: '5',
    url: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop',
    alt: 'System Analytics Dashboard Abstract',
    caption: 'Predictive throughput analytics for the Flex Store ephemeral storage protocol.',
    width: 1400,
    height: 900,
    category: 'Analytics',
  },
  {
    id: '6',
    url: 'https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=2070&auto=format&fit=crop',
    alt: 'Silicon Wafer Photolithography Detail',
    caption: 'The physical substrate of IcePab custom-silicon accelerators.',
    width: 1200,
    height: 800,
    category: 'Hardware',
  },
];
