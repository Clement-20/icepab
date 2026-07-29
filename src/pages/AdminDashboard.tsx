import React, { useState } from 'react';
import { PageWrapper } from '../components/PageContainers';

export default function AdminDashboard() {
  const [newProject, setNewProject] = useState({ name: '', description: '', price: '', url: '', image: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('New listing:', newProject);
    // In a real app, this would persist to a database or local storage
    alert('Listing created (simulation)');
  };

  return (
    <PageWrapper>
      <div className="py-24 px-6 max-w-4xl mx-auto">
        <h1 className="text-4xl font-black uppercase tracking-tighter mb-8">Admin Dashboard</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input type="text" placeholder="Name" className="w-full p-4 bg-surface border border-accent-border rounded" onChange={(e) => setNewProject({...newProject, name: e.target.value})} />
          <textarea placeholder="Description" className="w-full p-4 bg-surface border border-accent-border rounded" onChange={(e) => setNewProject({...newProject, description: e.target.value})} />
          <input type="text" placeholder="Price (e.g. $100)" className="w-full p-4 bg-surface border border-accent-border rounded" onChange={(e) => setNewProject({...newProject, price: e.target.value})} />
          <input type="text" placeholder="URL/Image Link" className="w-full p-4 bg-surface border border-accent-border rounded" onChange={(e) => setNewProject({...newProject, url: e.target.value})} />
          <button type="submit" className="px-8 py-4 bg-lime-green text-black font-black uppercase tracking-widest rounded">Post Listing</button>
        </form>
      </div>
    </PageWrapper>
  );
}
