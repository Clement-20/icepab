import React from 'react';
import { motion } from 'motion/react';
import { BookOpen, Clock } from 'lucide-react';

const stories = [
  {
    id: '1',
    title: 'The Architecture of Personal Operating Systems',
    excerpt: 'How we transition from static portfolios to dynamic, living digital environments. The journey of building the IcePab Life OS...',
    date: 'APRIL 14, 2026',
    author: 'IcePab Root',
    readTime: '12 MIN'
  },
  {
    id: '2',
    title: 'Decentralization and the Future of Social Identity',
    excerpt: 'Exploring the intersection of cryptographic verifiable identity and the human need for authentic connection in a post-human era...',
    date: 'MARCH 22, 2026',
    author: 'IcePab Systems',
    readTime: '15 MIN'
  }
];

export default function EditorialStories() {
  return (
    <section className="py-24 px-6 max-w-4xl mx-auto">
      <div className="flex items-center gap-4 mb-20 text-center">
        <div className="h-[1px] flex-grow bg-white/10" />
        <h2 className="text-3xl font-extralight tracking-[0.4em] uppercase">Stories</h2>
        <div className="h-[1px] flex-grow bg-white/10" />
      </div>

      <div className="space-y-32">
        {stories.map((story, i) => (
          <motion.article 
            key={story.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="group"
          >
            <div className="flex items-center gap-4 mb-6 font-mono text-[10px] tracking-[0.3em] text-text-dim uppercase">
              <span>{story.date}</span>
              <span className="w-1 h-1 rounded-full bg-electric-blue" />
              <span>BY {story.author}</span>
              <span className="flex items-center gap-1 ml-auto">
                <Clock size={10} /> {story.readTime}
              </span>
            </div>

            <h3 className="text-4xl md:text-6xl font-black mb-8 leading-[0.9] tracking-tighter uppercase group-hover:text-electric-blue transition-colors duration-500">
              {story.title}
            </h3>

            <p className="text-lg md:text-xl text-gray-400 leading-relaxed font-light mb-10">
              {story.excerpt}
            </p>

            <button className="flex items-center gap-4 text-xs font-bold uppercase tracking-[0.5em] group-hover:gap-6 transition-all duration-300">
              Read Chapter <div className="h-[1px] w-12 bg-electric-blue" />
            </button>
          </motion.article>
        ))}
      </div>

      <div className="mt-40 p-12 bg-surface/30 border border-accent-border backdrop-blur-md rounded-2xl flex flex-col items-center text-center">
        <BookOpen className="text-electric-blue w-12 h-12 mb-6" />
        <h4 className="text-2xl font-bold uppercase tracking-tight mb-4">Subscribe to the Feed</h4>
        <p className="text-text-dim max-w-md mb-8">Receive encoded transmissions regarding design systems, distributed infrastructure, and digital philosophy.</p>
        <div className="flex w-full max-w-sm border border-white/10 bg-black/20 p-1 rounded-full">
          <input 
            type="email" 
            placeholder="ENCRYPTED_EMAIL@HOST" 
            className="flex-grow bg-transparent px-6 py-2 outline-none text-xs font-mono"
          />
          <button className="bg-electric-blue text-charcoal px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-widest">Connect</button>
        </div>
      </div>
    </section>
  );
}
