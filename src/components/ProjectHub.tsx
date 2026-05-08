import React from 'react';
import { motion } from 'motion/react';
import { ShoppingCart, GraduationCap, Network, Users, ArrowUpRight, CheckCircle2, Clock } from 'lucide-react';
import { projectData, ProjectApp } from '../data/projects';

const iconMap = {
  Market: ShoppingCart,
  Utility: GraduationCap,
  Infrastructure: Network,
  Social: Users,
};

const statusColors = {
  live: 'text-green-400 bg-green-400/10 border-green-400/20',
  beta: 'text-blue-400 bg-blue-400/10 border-blue-400/20',
  'in-dev': 'text-yellow-400 bg-yellow-400/10 border-yellow-400/20',
};

export default function ProjectHub() {
  const [mousePos, setMousePos] = React.useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <section className="py-24 px-6 max-w-7xl mx-auto" aria-label="ICEPAB SaaS Ecosystem Directory">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
        <div>
          <span className="text-electric-blue font-mono text-xs uppercase tracking-[0.4em] mb-4 block">Central Hub / Ecosystem</span>
          <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter leading-[0.8]">ICEPAB Software Directory</h2>
        </div>
        <p className="max-w-md text-text-dim text-lg leading-relaxed md:mb-1">
          Explore the SaaS projects and platforms built within the ICEPAB network by Clement IfeOluwa. Each node in this directory represents a modular solution targeting UI/UX and process automation.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 auto-rows-[280px] gap-6">
        {projectData.map((project, i) => {
          const IconComponent = iconMap[project.icon as keyof typeof iconMap] || Network;
          
          // Pattern: 1st card large (6 cols), 2nd card (6 cols), 3rd (4 cols), 4th (8 cols) etc.
          // For simplicity and scalability, let's use a modular pattern
          const spanClass = i % 4 === 0 ? 'lg:col-span-8' : i % 4 === 3 ? 'lg:col-span-8' : 'lg:col-span-4';

          return (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              onMouseMove={handleMouseMove}
              className={`${spanClass} group relative flex flex-col bg-white/5 border border-white/10 rounded-[2rem] overflow-hidden hover:border-white/25 transition-all duration-500`}
              style={
                {
                  '--x': `${mousePos.x}px`,
                  '--y': `${mousePos.y}px`,
                } as React.CSSProperties
              }
            >
              {/* Card Glow */}
              <div 
                className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500 pointer-events-none"
                style={{ background: `radial-gradient(600px circle at var(--x) var(--y), ${project.color}, transparent 40%)` }}
              />

              <div className="p-8 flex flex-col h-full z-10">
                <div className="flex items-start justify-between mb-auto">
                  <div className="p-4 bg-white/5 border border-white/5 rounded-2xl group-hover:scale-110 group-hover:bg-white/10 transition-all duration-500">
                    <IconComponent 
                      size={28} 
                      style={{ color: project.color }} 
                      className="filter drop-shadow-[0_0_10px_rgba(255,255,255,0.2)]"
                    />
                  </div>
                  <div className={`px-3 py-1 rounded-full border text-[9px] font-black uppercase tracking-widest flex items-center gap-2 ${statusColors[project.status]}`}>
                    {project.status === 'live' ? <CheckCircle2 size={10} /> : <Clock size={10} />}
                    {project.status}
                  </div>
                </div>

                <div className="mt-8">
                  <span className="text-[10px] font-mono text-text-dim uppercase tracking-[0.2em]">{project.tagline}</span>
                  <h3 className="text-3xl font-bold uppercase tracking-tight mt-1 group-hover:text-electric-blue transition-colors">{project.name}</h3>
                  <p className="text-text-dim text-sm mt-3 line-clamp-2 leading-relaxed font-light">
                    {project.description}
                  </p>
                </div>

                <div className="mt-6 pt-6 border-t border-white/5 flex items-center justify-between opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500">
                  <div className="flex gap-2">
                    {project.features.slice(0, 2).map((feature) => (
                      <span key={feature} className="text-[9px] font-mono text-white/30 uppercase tracking-widest">{feature}</span>
                    ))}
                  </div>
                  <a 
                    href={project.url}
                    className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest hover:text-electric-blue transition-colors"
                  >
                    Open App <ArrowUpRight size={14} />
                  </a>
                </div>
              </div>

              {/* Decorative Progress bar for "In Dev / Beta" */}
              {project.status !== 'live' && (
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/5">
                  <motion.div 
                    initial={{ width: 0 }}
                    whileInView={{ width: project.status === 'beta' ? '75%' : '35%' }}
                    className="h-full"
                    style={{ backgroundColor: project.color }}
                  />
                </div>
              )}
            </motion.div>
          );
        })}
      </div>

      <motion.div 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        className="mt-20 flex flex-col items-center text-center"
      >
        <div className="w-12 h-[1px] bg-electric-blue/50 mb-8" />
        <h4 className="text-[10px] uppercase tracking-[0.6em] text-white/30 mb-4">Scalable Directory Protocol</h4>
        <p className="text-xs text-text-dim max-w-sm">
          System automatically synchronizes with the network manifest. New projects are encrypted and indexed on deployment.
        </p>
      </motion.div>
    </section>
  );
}
