import React from 'react';
import { motion } from 'motion/react';
import { BookOpen, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useBlog } from '../contexts/BlogContext';

export default function EditorialStories() {
  const { stories } = useBlog();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Blog",
    "name": "ICEPAB Digital Editorials",
    "description": "Tech insights from Banmeke IfeOluwa Elijah on SaaS, UI/UX, and Systems.",
    "blogPost": stories.map(story => ({
      "@type": "BlogPosting",
      "headline": story.title,
      "datePublished": story.date,
      "author": {
        "@type": "Person",
        "name": story.author
      },
      "description": story.excerpt
    }))
  };

  return (
    <section className="py-24 px-6 max-w-4xl mx-auto" aria-labelledby="editorial-heading">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="flex items-center gap-4 mb-20 text-center">
        <div className="h-[1px] flex-grow bg-white/10" />
        <h2 id="editorial-heading" className="text-3xl font-extralight tracking-[0.4em] uppercase">Stories</h2>
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

            <Link to={`/stories/${story.id}`} className="flex items-center gap-4 text-xs font-bold uppercase tracking-[0.5em] group-hover:gap-6 transition-all duration-300">
              Read Chapter <div className="h-[1px] w-12 bg-electric-blue" />
            </Link>
          </motion.article>
        ))}
      </div>

      <div className="mt-40 p-12 bg-white/[0.04] border border-white/10 backdrop-blur-2xl rounded-2xl flex flex-col items-center text-center shadow-[0_12px_40px_rgba(0,0,0,0.5),inset_0_1px_1px_rgba(255,255,255,0.08)]">
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
