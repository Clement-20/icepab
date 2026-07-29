import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ExternalLink, Layers, Network } from 'lucide-react';
import { projectData } from '../data/projects';
import { galleryData } from '../data/gallery';
import { SITE_METADATA } from '../metadata';

type Category = 'All' | 'Websites' | 'Designs';

export default function WorkShowcase() {
  const [activeCategory, setActiveCategory] = useState<Category>('All');

  const websites = projectData.map(p => ({
    id: p.id,
    title: p.name,
    type: 'Website' as const,
    description: p.description,
    link: p.url,
    image: '', // Needs a thumbnail if available
    category: 'Websites' as Category,
    price: p.price
  }));

  const designs = galleryData.map(g => ({
    id: g.id,
    title: g.alt,
    type: 'Design' as const,
    description: g.caption,
    link: '#',
    image: g.url,
    category: 'Designs' as Category,
    price: g.price
  }));

  const allItems = [...websites, ...designs];
  const filteredItems = activeCategory === 'All' 
    ? allItems 
    : allItems.filter(item => item.category === activeCategory);

  return (
    <section className="py-24 px-6 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
        <div>
          <span className="text-electric-blue font-mono text-xs uppercase tracking-[0.4em] mb-4 block">Showcase // Portfolio</span>
          <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter leading-[0.8]">Work Showcase</h2>
        </div>
        <div className="flex gap-2 p-1 bg-white/[0.03] border border-white/10 rounded-full">
          {(['All', 'Websites', 'Designs'] as Category[]).map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-6 py-2 rounded-full text-xs font-black uppercase tracking-widest transition-all ${activeCategory === cat ? 'bg-electric-blue text-charcoal' : 'text-white/40 hover:text-white'}`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <AnimatePresence mode='wait'>
          {filteredItems.map((item, i) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ delay: i * 0.05 }}
              className="group relative bg-surface border border-accent-border overflow-hidden rounded-2xl"
            >
              {item.image ? (
                <div className="aspect-video overflow-hidden">
                  <img src={item.image} alt={item.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                </div>
              ) : (
                <div className="aspect-video flex items-center justify-center bg-white/[0.05]">
                  <Network size={48} className="text-white/10" />
                </div>
              )}
              
              <div className="p-6">
                <div className="flex justify-between items-start">
                  <span className="text-[10px] text-electric-blue font-mono uppercase tracking-[0.2em]">{item.type}</span>
                  {item.price && <span className="text-sm font-black text-white">{item.price}</span>}
                </div>
                <h3 className="text-xl font-bold mt-1 uppercase tracking-tight">{item.title}</h3>
                <p className="text-sm text-text-dim mt-2 line-clamp-2">{item.description}</p>
                <div className="flex items-center gap-4 mt-4">
                  {item.link !== '#' && (
                    <a href={item.link} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest hover:text-electric-blue transition-colors">
                      View <ExternalLink size={14} />
                    </a>
                  )}
                  <a href={SITE_METADATA.social.whatsapp.url} target="_blank" rel="noopener noreferrer" className="px-4 py-2 bg-lime-green text-black text-[10px] font-black uppercase tracking-[0.2em] rounded-full hover:bg-white transition-colors">
                    Order Now
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </section>
  );
}
