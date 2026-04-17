export interface NodeData {
  id: string;
  title: string;
  description: string;
  status: 'active' | 'standby' | 'syncing';
  load: number;
  tags: string[];
}

export interface Post {
  id: string;
  date: string;
  title: string;
  category: string;
  readTime: string;
}
