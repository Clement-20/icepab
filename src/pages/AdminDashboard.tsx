import React, { useState } from 'react';
import { PageWrapper } from '../components/PageContainers';
import { projectData } from '../data/projects';
import { ExternalLink, Layers, Plus, Edit2, Trash2, CheckCircle2, Clock, Key, ShieldCheck } from 'lucide-react';

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<'listings' | 'automations' | 'portal'>('listings');
  
  // Work Listings State
  const [projects, setProjects] = useState(projectData);
  const [editingProject, setEditingProject] = useState<any>(null);
  const [newProject, setNewProject] = useState({
    id: '',
    name: '',
    description: '',
    category: 'Utility',
    price: '',
    url: '',
    image: '',
    features: ['Responsive UI', 'Custom Logic']
  });

  // Client Automations State
  const [clientMilestones, setClientMilestones] = useState([
    { id: '1', client: 'OAU CBT Board', project: 'ExamGuard OAU CBT Upgrade', phase: 'Core Development & API Engine', progress: 85, status: 'Active' },
    { id: '2', client: 'Flex Store Global', project: 'E-Commerce Marketplace', phase: 'Wireframing & UI/UX Design', progress: 100, status: 'Completed' }
  ]);

  const [magicKeys, setMagicKeys] = useState([
    { code: 'DEMO-CLIENT-2026', client: 'ICEPAB Global Client', status: 'Active', filesCount: 4 },
    { code: 'EXAMGUARD-OAU-99', client: 'OAU Institutional Admin', status: 'Active', filesCount: 2 }
  ]);

  const [newKeyInput, setNewKeyInput] = useState('');
  const [newClientInput, setNewClientInput] = useState('');

  const handleSaveListing = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingProject) {
      setProjects(projects.map(p => p.id === editingProject.id ? editingProject : p));
      setEditingProject(null);
      alert('Work listing successfully updated!');
    } else {
      const created = {
        ...newProject,
        id: `proj-${Date.now()}`,
        tagline: newProject.description,
        icon: 'Layers',
        status: 'live' as const,
        color: '#00E5FF',
        category: newProject.category as any
      };
      setProjects([created, ...projects]);
      setNewProject({ id: '', name: '', description: '', category: 'Utility', price: '', url: '', image: '', features: ['Responsive UI'] });
      alert('New work listing published successfully!');
    }
  };

  const handleCreateMagicKey = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newKeyInput.trim() || !newClientInput.trim()) return;
    setMagicKeys([...magicKeys, { code: newKeyInput.trim().toUpperCase(), client: newClientInput.trim(), status: 'Active', filesCount: 3 }]);
    setNewKeyInput('');
    setNewClientInput('');
    alert('Client Portal Access Key generated!');
  };

  return (
    <PageWrapper>
      <div className="py-20 px-6 max-w-6xl mx-auto text-white">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10 pb-6 border-b border-white/10">
          <div>
            <span className="text-electric-blue font-mono text-xs uppercase tracking-[0.4em] mb-2 block">Control Console // Admin</span>
            <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tighter">Admin Dashboard</h1>
          </div>

          <div className="flex gap-2 p-1.5 bg-white/[0.03] border border-white/10 rounded-2xl">
            <button 
              onClick={() => setActiveTab('listings')}
              className={`px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all ${
                activeTab === 'listings' ? 'bg-electric-blue text-charcoal' : 'text-text-dim hover:text-white'
              }`}
            >
              Work Listings
            </button>
            <button 
              onClick={() => setActiveTab('automations')}
              className={`px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all ${
                activeTab === 'automations' ? 'bg-electric-blue text-charcoal' : 'text-text-dim hover:text-white'
              }`}
            >
              Status Trackers
            </button>
            <button 
              onClick={() => setActiveTab('portal')}
              className={`px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all ${
                activeTab === 'portal' ? 'bg-electric-blue text-charcoal' : 'text-text-dim hover:text-white'
              }`}
            >
              Portal Keys
            </button>
          </div>
        </div>

        {/* --- TAB 1: WORK LISTINGS MANAGER --- */}
        {activeTab === 'listings' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Col: Existing Listings */}
            <div className="lg:col-span-2 space-y-4">
              <h2 className="text-xl font-black uppercase tracking-tight flex items-center justify-between">
                <span>Active Work Listings ({projects.length})</span>
              </h2>

              <div className="space-y-3">
                {projects.map((p) => (
                  <div key={p.id} className="p-4 bg-surface border border-accent-border rounded-2xl flex items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                      {p.image ? (
                        <img src={p.image} alt={p.name} className="w-14 h-14 object-cover rounded-xl border border-white/10" />
                      ) : (
                        <div className="w-14 h-14 bg-white/5 rounded-xl flex items-center justify-center border border-white/10 text-xs font-mono text-text-dim">
                          NO IMG
                        </div>
                      )}
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="font-bold text-sm uppercase tracking-tight">{p.name}</h3>
                          {p.price && <span className="text-xs font-black text-lime-green font-mono">{p.price}</span>}
                        </div>
                        <p className="text-xs text-text-dim line-clamp-1 mt-0.5">{p.description}</p>
                        {p.url && (
                          <a href={p.url} target="_blank" rel="noopener noreferrer" className="text-[10px] font-mono text-electric-blue hover:underline inline-flex items-center gap-1 mt-1">
                            Preview Site <ExternalLink size={10} />
                          </a>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <button 
                        onClick={() => setEditingProject(p)} 
                        className="px-3 py-2 bg-electric-blue/20 hover:bg-electric-blue text-electric-blue hover:text-charcoal text-xs font-bold uppercase rounded-xl transition-colors"
                      >
                        Edit
                      </button>
                      <button 
                        onClick={() => setProjects(projects.filter(proj => proj.id !== p.id))}
                        className="p-2 text-white/40 hover:text-red-400 transition-colors"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Col: Listing Form */}
            <div className="bg-surface border border-accent-border p-6 rounded-3xl h-fit">
              <h2 className="text-lg font-black uppercase tracking-tight mb-4">
                {editingProject ? 'Edit Work Listing' : 'Post New Listing'}
              </h2>

              <form onSubmit={handleSaveListing} className="space-y-4 font-mono text-xs">
                <div>
                  <label className="text-[10px] text-text-dim uppercase mb-1 block">Title / Project Name</label>
                  <input 
                    type="text" 
                    required
                    value={editingProject ? editingProject.name : newProject.name} 
                    onChange={(e) => editingProject ? setEditingProject({...editingProject, name: e.target.value}) : setNewProject({...newProject, name: e.target.value})}
                    placeholder="e.g. ExamGuard OAU CBT" 
                    className="w-full p-3 bg-black/60 border border-white/10 rounded-xl text-white focus:outline-none focus:border-electric-blue" 
                  />
                </div>

                <div>
                  <label className="text-[10px] text-text-dim uppercase mb-1 block">Price Tag</label>
                  <input 
                    type="text" 
                    value={editingProject ? (editingProject.price || '') : newProject.price} 
                    onChange={(e) => editingProject ? setEditingProject({...editingProject, price: e.target.value}) : setNewProject({...newProject, price: e.target.value})}
                    placeholder="e.g. $450" 
                    className="w-full p-3 bg-black/60 border border-white/10 rounded-xl text-white focus:outline-none focus:border-electric-blue" 
                  />
                </div>

                <div>
                  <label className="text-[10px] text-text-dim uppercase mb-1 block">Live Preview Link (URL)</label>
                  <input 
                    type="text" 
                    value={editingProject ? (editingProject.url || '') : newProject.url} 
                    onChange={(e) => editingProject ? setEditingProject({...editingProject, url: e.target.value}) : setNewProject({...newProject, url: e.target.value})}
                    placeholder="https://..." 
                    className="w-full p-3 bg-black/60 border border-white/10 rounded-xl text-white focus:outline-none focus:border-electric-blue" 
                  />
                </div>

                <div>
                  <label className="text-[10px] text-text-dim uppercase mb-1 block">Image Preview URL (JPEG, PNG, PSD thumbnail)</label>
                  <input 
                    type="text" 
                    value={editingProject ? (editingProject.image || '') : newProject.image} 
                    onChange={(e) => editingProject ? setEditingProject({...editingProject, image: e.target.value}) : setNewProject({...newProject, image: e.target.value})}
                    placeholder="https://images.unsplash.com/..." 
                    className="w-full p-3 bg-black/60 border border-white/10 rounded-xl text-white focus:outline-none focus:border-electric-blue" 
                  />
                </div>

                <div>
                  <label className="text-[10px] text-text-dim uppercase mb-1 block">Description</label>
                  <textarea 
                    rows={3}
                    value={editingProject ? editingProject.description : newProject.description} 
                    onChange={(e) => editingProject ? setEditingProject({...editingProject, description: e.target.value}) : setNewProject({...newProject, description: e.target.value})}
                    placeholder="Describe design features or tech specs..." 
                    className="w-full p-3 bg-black/60 border border-white/10 rounded-xl text-white focus:outline-none focus:border-electric-blue" 
                  />
                </div>

                <div className="pt-2 flex gap-2">
                  <button type="submit" className="flex-1 py-3 bg-lime-green text-charcoal font-black uppercase tracking-wider rounded-xl hover:bg-white transition-colors">
                    {editingProject ? 'Save Changes' : 'Publish Listing'}
                  </button>
                  {editingProject && (
                    <button type="button" onClick={() => setEditingProject(null)} className="px-4 py-3 bg-white/10 text-white font-bold uppercase rounded-xl">
                      Cancel
                    </button>
                  )}
                </div>
              </form>
            </div>
          </div>
        )}

        {/* --- TAB 2: CLIENT STATUS TRACKERS --- */}
        {activeTab === 'automations' && (
          <div className="space-y-6">
            <h2 className="text-xl font-black uppercase tracking-tight">Active Client Status Progress Trackers</h2>

            <div className="space-y-4">
              {clientMilestones.map((ms) => (
                <div key={ms.id} className="p-6 bg-surface border border-accent-border rounded-3xl flex flex-col md:flex-row md:items-center justify-between gap-6">
                  <div>
                    <span className="text-[10px] font-mono uppercase text-electric-blue tracking-widest">{ms.client}</span>
                    <h3 className="text-lg font-bold uppercase tracking-tight text-white mt-1">{ms.project}</h3>
                    <p className="text-xs font-mono text-text-dim mt-1">Current Active Phase: <span className="text-white">{ms.phase}</span></p>
                  </div>

                  <div className="flex items-center gap-6">
                    <div className="w-48">
                      <div className="flex justify-between text-xs font-mono text-lime-green mb-1">
                        <span>Phase Progress</span>
                        <span>{ms.progress}%</span>
                      </div>
                      <input 
                        type="range" 
                        min="0" 
                        max="100" 
                        value={ms.progress} 
                        onChange={(e) => {
                          const val = parseInt(e.target.value);
                          setClientMilestones(clientMilestones.map(m => m.id === ms.id ? { ...m, progress: val } : m));
                        }}
                        className="w-full accent-lime-green" 
                      />
                    </div>

                    <button className="px-4 py-2 bg-white/10 hover:bg-white/20 text-xs font-bold uppercase rounded-xl transition-colors">
                      Update Stage
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* --- TAB 3: CLIENT PORTAL ACCESS KEYS --- */}
        {activeTab === 'portal' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-4">
              <h2 className="text-xl font-black uppercase tracking-tight">Active Client Access Keys</h2>

              <div className="space-y-3">
                {magicKeys.map((k, idx) => (
                  <div key={idx} className="p-5 bg-surface border border-accent-border rounded-2xl flex items-center justify-between">
                    <div>
                      <div className="flex items-center gap-3">
                        <Key size={18} className="text-lime-green" />
                        <span className="font-mono font-bold text-sm text-white">{k.code}</span>
                      </div>
                      <p className="text-xs text-text-dim mt-1">Client: {k.client} • {k.filesCount} Deliverables Linked</p>
                    </div>

                    <span className="text-[10px] font-mono text-lime-green uppercase bg-lime-green/10 px-3 py-1 rounded-full border border-lime-green/30">
                      {k.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-surface border border-accent-border p-6 rounded-3xl h-fit">
              <h2 className="text-lg font-black uppercase tracking-tight mb-4">Generate Access Key</h2>
              <form onSubmit={handleCreateMagicKey} className="space-y-4 font-mono text-xs">
                <div>
                  <label className="text-[10px] text-text-dim uppercase mb-1 block">Client Name</label>
                  <input 
                    type="text" 
                    value={newClientInput}
                    onChange={(e) => setNewClientInput(e.target.value)}
                    placeholder="e.g. OAU Institutional Admin"
                    className="w-full p-3 bg-black/60 border border-white/10 rounded-xl text-white focus:outline-none focus:border-electric-blue" 
                  />
                </div>

                <div>
                  <label className="text-[10px] text-text-dim uppercase mb-1 block">Magic Key Code</label>
                  <input 
                    type="text" 
                    value={newKeyInput}
                    onChange={(e) => setNewKeyInput(e.target.value)}
                    placeholder="e.g. OAU-2026-KEY"
                    className="w-full p-3 bg-black/60 border border-white/10 rounded-xl text-white focus:outline-none focus:border-electric-blue" 
                  />
                </div>

                <button type="submit" className="w-full py-3 bg-electric-blue text-charcoal font-black uppercase tracking-wider rounded-xl hover:bg-white transition-colors">
                  Generate & Link Portal
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </PageWrapper>
  );
}
