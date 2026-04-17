import React from 'react';
import { motion } from 'motion/react';
import { Cpu, Globe, Lock, Share2, Zap } from 'lucide-react';

const nodes = [
  { id: 'origin', icon:Globe, label: 'External Ingress', x: '10%', y: '50%' },
  { id: 'firewall', icon: Lock, label: 'Proxy Node', x: '35%', y: '50%' },
  { id: 'core', icon: Cpu, label: 'System Core', x: '60%', y: '30%' },
  { id: 'storage', icon: Share2, label: 'Flex Store', x: '60%', y: '70%' },
  { id: 'output', icon: Zap, label: 'Edge Delivery', x: '90%', y: '50%' },
];

const paths = [
  { from: 'origin', to: 'firewall' },
  { from: 'firewall', to: 'core' },
  { from: 'firewall', to: 'storage' },
  { from: 'core', to: 'output' },
  { from: 'storage', to: 'output' },
];

export default function SystemTransparency() {
  return (
    <section className="py-24 px-6 max-w-7xl mx-auto">
      <div className="flex items-center gap-4 mb-12">
        <Cpu className="text-electric-blue w-6 h-6" />
        <h2 className="text-2xl font-bold tracking-tighter uppercase italic">System Transparency</h2>
        <div className="h-[1px] flex-grow bg-white/10" />
      </div>

      <div className="relative w-full aspect-[21/9] md:aspect-[2.5/1] rounded-2xl overflow-hidden border border-white/10 bg-white/5 backdrop-blur-md shadow-[0_20px_50px_rgba(0,0,0,0.3)]">
        {/* Glassmorphic Background Effect */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent pointer-events-none" />
        
        {/* Connection Lines (Static SVG) */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none">
          {paths.map((path, i) => {
            const from = nodes.find(n => n.id === path.from)!;
            const to = nodes.find(n => n.id === path.to)!;
            return (
              <line
                key={i}
                x1={from.x}
                y1={from.y}
                x2={to.x}
                y2={to.y}
                stroke="var(--color-electric-blue)"
                strokeWidth="1"
                strokeOpacity="0.1"
              />
            );
          })}
        </svg>

        {/* Logic Flow Packets */}
        {paths.map((path, i) => {
          const from = nodes.find(n => n.id === path.from)!;
          const to = nodes.find(n => n.id === path.to)!;
          return (
            <motion.div
              key={`packet-${i}`}
              className="absolute w-1.5 h-1.5 bg-electric-blue rounded-full shadow-[0_0_10px_var(--color-electric-blue)] z-10"
              initial={{ left: from.x, top: from.y, opacity: 0 }}
              animate={{ 
                left: [from.x, to.x], 
                top: [from.y, to.y],
                opacity: [0, 1, 1, 0]
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Infinity,
                ease: "linear",
                delay: Math.random() * 5
              }}
            />
          );
        })}

        {/* Nodes */}
        <div className="absolute inset-0 p-8 flex items-center justify-between">
          {nodes.map((node) => (
            <div
              key={node.id}
              className="absolute flex flex-col items-center gap-3 -translate-x-1/2 -translate-y-1/2"
              style={{ left: node.x, top: node.y }}
            >
              <motion.div 
                whileHover={{ scale: 1.1, borderColor: 'rgba(0, 229, 255, 0.5)' }}
                className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-white/5 border border-white/10 flex items-center justify-center backdrop-blur-xl group transition-colors"
              >
                <node.icon className="w-5 h-5 md:w-6 md:h-6 text-white group-hover:text-electric-blue transition-colors" />
                
                {/* Ping rings */}
                <div className="absolute inset-0 rounded-full border border-electric-blue/20 animate-ping opacity-20" />
                <div className="absolute inset-[-4px] rounded-full border border-electric-blue/5 animate-[ping_2s_infinite] opacity-10" />
              </motion.div>
              
              <div className="text-center">
                <span className="text-[9px] md:text-[10px] uppercase font-mono tracking-[0.2em] text-text-dim group-hover:text-electric-blue">
                  {node.label}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Monitor Overlays */}
        <div className="absolute top-6 left-6 flex items-center gap-2">
          <div className="w-1 h-1 rounded-full bg-red-500 animate-pulse" />
          <span className="text-[10px] font-mono text-white/40 uppercase tracking-widest leading-none">Live Monitoring Active</span>
        </div>
        
        <div className="absolute bottom-6 right-6 flex items-center gap-6">
          <div className="flex flex-col items-end">
            <span className="text-[8px] font-mono text-white/30 truncate uppercase">Throughput</span>
            <span className="text-[10px] font-mono text-electric-blue">1.2 TB / S</span>
          </div>
          <div className="flex flex-col items-end">
            <span className="text-[8px] font-mono text-white/30 truncate uppercase">Sync Status</span>
            <span className="text-[10px] font-mono text-electric-blue">NOMINAL</span>
          </div>
        </div>
      </div>
      
      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 bg-white/5 border border-white/10 rounded-xl backdrop-blur-md">
          <h4 className="text-[10px] font-mono uppercase text-electric-blue mb-2">Protocol Transparency</h4>
          <p className="text-xs text-text-dim leading-relaxed">
            Real-time visualization of digital asset migration across our distributed edge nodes. Every packet is verified via the system core.
          </p>
        </div>
        <div className="p-6 bg-white/5 border border-white/10 rounded-xl backdrop-blur-md">
          <h4 className="text-[10px] font-mono uppercase text-electric-blue mb-2">Node Distribution</h4>
          <p className="text-xs text-text-dim leading-relaxed">
            Our adaptive routing ensures minimal hop-count by dynamically repositioning ingress points based on regional demand spikes.
          </p>
        </div>
        <div className="p-6 bg-white/5 border border-white/10 rounded-xl backdrop-blur-md">
          <h4 className="text-[10px] font-mono uppercase text-electric-blue mb-2">Logic Architecture</h4>
          <p className="text-xs text-text-dim leading-relaxed">
            Multi-layered security protocols operate at the proxy level before any data reaches the high-performance system core.
          </p>
        </div>
      </div>
    </section>
  );
}
