import { motion } from 'motion/react';
import { Activity, Database, Server, Zap } from 'lucide-react';
import React, { useState } from 'react';
import { NodeData } from '../types';

const nodes: NodeData[] = [
  {
    id: '001-ALPHA',
    title: 'OAU CBT Elite',
    description: 'High-concurrency node for academic evaluation protocols. Optimized for zero-latency response.',
    status: 'active',
    load: 88,
    tags: ['Primary Unit']
  },
  {
    id: '002-BETA',
    title: 'Flex Store',
    description: 'Distributed ephemeral storage. Adaptive scaling for variable workload demands.',
    status: 'active',
    load: 14,
    tags: ['Ecomm']
  },
  {
    id: 'LATENCY',
    title: '14ms',
    description: 'Edge Global Network synchronization active.',
    status: 'active',
    load: 100,
    tags: ['Network']
  },
  {
    id: '003-GAMMA',
    title: 'System Core Framework',
    description: 'Central arbitration unit managing node distribution and consensus stability.',
    status: 'active',
    load: 42,
    tags: ['Development']
  }
];

export default function BentoGrid() {
  const [nodeList, setNodeList] = useState<NodeData[]>(nodes);

  const toggleNode = (id: string) => {
    setNodeList(prev => prev.map(node => {
      if (node.id === id) {
        return {
          ...node,
          status: node.status === 'active' ? 'syncing' : 'active',
          load: node.status === 'active' ? Math.floor(Math.random() * 20) : Math.floor(Math.random() * 80) + 20
        };
      }
      return node;
    }));
  };

  return (
    <section className="py-24 px-6 max-w-7xl mx-auto">
      <div className="flex items-center gap-4 mb-12">
        <Activity className="text-electric-blue w-6 h-6" />
        <h2 className="text-2xl font-bold tracking-tighter uppercase italic">Active Nodes</h2>
        <div className="h-[1px] flex-grow bg-white/10" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[300px]">
        {nodeList.map((node, i) => (
          <motion.div
            key={node.id}
            onClick={() => toggleNode(node.id)}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1, duration: 0.8 }}
            className={`relative group overflow-hidden border border-accent-border bg-surface p-6 transition-all hover:border-electric-blue/50 no-scrollbar cursor-pointer active:scale-[0.98] ${
              i === 0 ? 'md:col-span-2' : ''
            } ${i === 3 ? 'md:col-span-2' : ''}`}
          >
            <div className="relative z-10 h-full flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-start mb-4">
                  <span className="font-mono text-[11px] text-text-dim uppercase tracking-widest">NODE_ID_{node.id}</span>
                  <div className="flex gap-2">
                    {node.tags.map(tag => (
                      <span key={tag} className="text-[10px] uppercase font-mono px-2 py-0.5 rounded-full border border-electric-blue text-electric-blue">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <h3 className="text-2xl font-bold mb-2 group-hover:text-electric-blue transition-colors">
                  {node.title === '14ms' ? (node.status === 'active' ? '14ms' : 'OVERLOAD') : node.title}
                </h3>
                <p className="text-text-dim text-sm leading-relaxed max-w-sm">
                  {node.status === 'syncing' ? 'Node initialization in progress. Recalibrating distributed buffers...' : node.description}
                </p>
              </div>

              <div className="mt-6 flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className={`w-1.5 h-1.5 rounded-full ${
                      node.status === 'active' ? 'bg-electric-blue shadow-[0_0_8px_var(--color-electric-blue)]' : 
                      'bg-yellow-500 animate-pulse'
                    }`} />
                    <span className="text-[10px] uppercase font-mono text-electric-blue">{node.status}</span>
                  </div>
                  <span className="text-[11px] font-mono text-text-dim">{node.load}% LOAD</span>
                </div>
                
                <div className="w-full h-[2px] bg-electric-blue/10 relative overflow-hidden">
                  <motion.div 
                    animate={{ width: `${node.load}%` }}
                    transition={{ duration: 0.5 }}
                    className="absolute h-full bg-electric-blue shadow-[0_0_10px_var(--color-electric-blue)]" 
                  />
                </div>
              </div>
            </div>
            
            {/* Click Feedback */}
            <div className="absolute inset-0 bg-electric-blue/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
          </motion.div>
        ))}
      </div>
    </section>
  );
}
