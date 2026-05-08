import { motion } from 'motion/react';
import { BookOpen, ChevronRight, ArrowUpRight } from 'lucide-react';
import React from 'react';
import { blogData } from '../data/blog';

export default function KnowledgeFeed() {
  return (
    <section className="py-24 px-6 max-w-7xl mx-auto" aria-label="ICEPAB Knowledge Base & System Logs">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
        <div>
          <div className="flex items-center gap-4 mb-8">
            <h2 className="text-xs font-mono text-text-dim uppercase tracking-[0.2em]" id="knowledge-feed-label">ICEPAB Knowledge Feed</h2>
            <div className="h-[1px] flex-grow bg-accent-border" />
          </div>

          <div className="space-y-6" role="feed" aria-labelledby="knowledge-feed-label">
            {blogData.slice(0, 4).map((post, i) => (
              <motion.article
                key={post.id}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group border-b border-white/5 pb-6 cursor-pointer"
                aria-labelledby={`post-${post.id}`}
              >
                <div className="flex justify-between items-start gap-4">
                  <div>
                    <h3 id={`post-${post.id}`} className="text-lg font-medium group-hover:text-electric-blue transition-colors mb-2 uppercase tracking-tight">
                      {post.title}
                    </h3>
                    <div className="flex items-center gap-3 font-mono text-[9px] text-text-dim tracking-widest uppercase">
                      <time dateTime={post.date.replace(/\./g, '-')}>{post.date}</time>
                      <span className="w-1 h-1 rounded-full bg-white/20" />
                      <span>{post.category}</span>
                    </div>
                  </div>
                  <ArrowUpRight aria-hidden="true" size={16} className="text-white/20 group-hover:text-electric-blue transition-colors translate-y-1" />
                </div>
              </motion.article>
            ))}
          </div>
        </div>

        <div>
          <div className="flex items-center gap-4 mb-8">
            <h2 className="text-xs font-mono text-text-dim uppercase tracking-[0.2em]">ICEPAB System Logs</h2>
            <div className="h-[1px] flex-grow bg-accent-border" />
          </div>
          
          <div className="bg-surface/30 p-6 border border-accent-border font-mono text-xs leading-relaxed space-y-2" role="log" aria-live="polite">
            <p><span className="text-electric-blue">[LOG]</span> ICEPAB network core deployed successfully to global edge nodes.</p>
            <p><span className="text-electric-blue">[LOG]</span> SaaS architecture AEO metadata fully synchronized across all documents.</p>
            <p><span className="text-electric-blue">[LOG]</span> Automated security scans passed by Clement IfeOluwa Admin.</p>
            <p><span className="text-electric-blue">[LOG]</span> React UI/UX frontend rendering initiated.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
