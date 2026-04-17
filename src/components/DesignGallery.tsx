import React from 'react';
import { motion } from 'motion/react';
import { ExternalLink, Layers } from 'lucide-react';

const designs = [
  {
    id: '01',
    title: 'Cyber-Node V1',
    category: 'Interface Design',
    image: 'https://picsum.photos/seed/cyber1/800/600',
    process: 'Iterative wireframing followed by high-fidelity prototyping in Figma. Focused on high-contrast accessibility.'
  },
  {
    id: '02',
    title: 'Distributed Mesh',
    category: 'Visualization',
    image: 'https://picsum.photos/seed/mesh2/800/600',
    process: 'Developed using D3.js and SVG filters to simulate real-time network propagation and node stress.'
  },
  {
    id: '03',
    title: 'Sleek Terminal',
    category: 'UI/UX',
    image: 'https://picsum.photos/seed/tool3/800/600',
    process: 'User research into terminal ergonomics leads to a layout that prioritizes command history and quick diagnostics.'
  },
  {
    id: '04',
    title: 'Edge Protocol',
    category: 'Brand Identity',
    image: 'https://picsum.photos/seed/brand4/800/600',
    process: 'An exploration of geometric minimalism representing data encapsulation and secure transmission.'
  }
];

export default function DesignGallery() {
  return (
    <section className="py-24 px-6 max-w-7xl mx-auto">
      <div className="flex items-center gap-4 mb-12">
        <Layers className="text-electric-blue w-6 h-6" />
        <h2 className="text-2xl font-bold tracking-tighter uppercase italic">Design Gallery</h2>
        <div className="h-[1px] flex-grow bg-white/10" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {designs.map((design, i) => (
          <motion.div
            key={design.id}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="group relative bg-surface border border-accent-border overflow-hidden rounded-xl"
          >
            <div className="aspect-video overflow-hidden">
              <img 
                src={design.image} 
                alt={design.title} 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 grayscale group-hover:grayscale-0"
                referrerPolicy="no-referrer"
              />
            </div>
            
            <div className="p-8 relative z-10">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <span className="text-[10px] text-electric-blue font-mono uppercase tracking-[0.2em]">{design.category}</span>
                  <h3 className="text-2xl font-bold mt-1 uppercase tracking-tight">{design.title}</h3>
                </div>
                <button className="p-2 border border-white/10 rounded-full hover:bg-electric-blue hover:text-charcoal transition-colors">
                  <ExternalLink size={16} />
                </button>
              </div>

              <div className="mt-6 flex items-center justify-between">
                <button 
                  onClick={() => alert(`Transparency Log: ${design.process}`)}
                  className="text-[10px] uppercase font-bold tracking-[0.3em] text-text-dim hover:text-white transition-colors"
                >
                  View Process // xAI Transparent
                </button>
                <span className="text-[10px] font-mono opacity-20">ID_{design.id}</span>
              </div>
            </div>

            {/* Hover Glitch Effect Overlay */}
            <div className="absolute inset-0 bg-electric-blue/5 opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-300" />
          </motion.div>
        ))}
      </div>
    </section>
  );
}
