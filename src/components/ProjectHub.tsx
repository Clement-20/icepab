import React from 'react';
import { motion } from 'motion/react';
import { ShoppingCart, GraduationCap, Network, Users, ArrowUpRight, CheckCircle2, Clock } from 'lucide-react';
import { projectData } from '../data/projects';

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

function ProjectCard({ project, index }: { project: typeof projectData[0]; index: number }) {
  const [mousePos, setMousePos] = React.useState({ x: 0, y: 0 });
  const [isConnecting, setIsConnecting] = React.useState(false);

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const handleCardClick = (e: React.MouseEvent) => {
    // Prevent double triggers if clicking on an interactive link inside the card
    if ((e.target as HTMLElement).closest('a')) return;
    setIsConnecting(true);
    setTimeout(() => {
      setIsConnecting(false);
      if (project.url.startsWith('http')) {
        window.open(project.url, '_blank', 'noreferrer');
      }
    }, 1200);
  };

  const IconComponent = iconMap[project.icon as keyof typeof iconMap] || Network;
  const spanClass = index % 4 === 0 || index % 4 === 3 ? 'md:col-span-2 lg:col-span-8' : 'md:col-span-1 lg:col-span-4';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      onMouseMove={handleMouseMove}
      onClick={handleCardClick}
      className={`${spanClass} group relative flex flex-col bg-white/[0.04] backdrop-blur-2xl border border-white/10 rounded-[2rem] overflow-hidden hover:border-white/25 hover:bg-white/[0.07] shadow-[0_12px_40px_rgba(0,0,0,0.6),inset_0_1px_1px_rgba(255,255,255,0.08)] transition-all duration-500 cursor-pointer`}
      style={
        {
          '--x': `${mousePos.x}px`,
          '--y': `${mousePos.y}px`,
        } as React.CSSProperties
      }
    >
      {/* Individual spotlight glow that tracks the pointer flawlessly */}
      <div 
        className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500 pointer-events-none"
        style={{ background: `radial-gradient(350px circle at var(--x) var(--y), ${project.color}, transparent 45%)` }}
      />
      
      {/* Laser connecting overlay simulating system access */}
      {isConnecting && (
        <div className="absolute inset-0 bg-black/90 z-20 flex flex-col items-center justify-center font-mono p-4 text-[10px] space-y-2 animate-[flicker_0.15s_ease-out]">
          <div className="w-1.5 h-1.5 rounded-full bg-lime-green animate-ping" />
          <span className="text-lime-green tracking-[0.2em] font-bold uppercase animate-pulse">ESTABLISHING COGNITIVE INTERACTIVE PROTOCOL...</span>
          <span className="text-white/40 text-[8px] tracking-wide font-mono">NODE_ROUTE: {project.url.split('/').pop() || 'ROOT'}</span>
        </div>
      )}

      <div className="p-8 flex flex-col h-full z-10">
        <div className="flex items-start justify-between mb-auto">
          <div className="p-4 bg-white/[0.06] backdrop-blur-md border border-white/10 rounded-2xl group-hover:scale-110 group-hover:bg-white/10 transition-all duration-500 shadow-[inset_0_1px_0_rgba(255,255,255,0.1)]">
            <IconComponent 
              size={28} 
              style={{ color: project.color }} 
              className="filter drop-shadow-[0_0_12px_rgba(255,255,255,0.2)]"
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
            target={project.url.startsWith('http') ? '_blank' : undefined}
            rel={project.url.startsWith('http') ? 'noopener noreferrer' : undefined}
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
}

export default function ProjectHub() {
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
        {projectData.map((project, i) => (
          <ProjectCard key={project.id} project={project} index={i} />
        ))}
      </div>

      <motion.div 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        className="mt-20 flex flex-col items-center text-center"
      >
        <div className="w-12 h-[1px] bg-electric-blue/50 mb-8" />
        <h4 className="text-[10px] uppercase tracking-[0.6em] text-white/30 mb-4">Engineering Focus</h4>
        <p className="text-xs text-text-dim max-w-sm leading-relaxed">
          All systems are fully engineered from the database layer to user interactions, optimized for absolute performance and security.
        </p>
      </motion.div>
    </section>
  );
}
