export interface BlogPost {
  id: string;
  title: string;
  category: string;
  date: string;
  url: string;
  readTime: string;
}

export const blogData: BlogPost[] = [
  {
    id: '1',
    title: 'The Future of Distributed Storage',
    category: 'Architecture',
    date: '2026.04.14',
    url: '#',
    readTime: '8 min',
  },
  {
    id: '2',
    title: 'Zero-Latency Edge Protocols',
    category: 'Networking',
    date: '2026.04.10',
    url: '#',
    readTime: '12 min',
  },
  {
    id: '3',
    title: 'Building for the Mesh Economy',
    category: 'Ecosystem',
    date: '2026.03.28',
    url: '#',
    readTime: '15 min',
  },
  {
    id: '4',
    title: 'Security in the Post-Cloud Era',
    category: 'Security',
    date: '2026.03.15',
    url: '#',
    readTime: '10 min',
  },
];
