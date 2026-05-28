import React, { useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowLeft, Clock, Calendar } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import SEO from './SEO';
import { useBlog } from '../contexts/BlogContext';

import { Helmet } from 'react-helmet-async';

export default function SingleStoryPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { stories } = useBlog();
  
  const story = stories.find(s => s.id === id);

  useEffect(() => {
    if (!story) navigate('/stories');
  }, [story, navigate]);

  if (!story) return null;

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": story.title,
    "description": story.excerpt,
    "author": {
      "@type": "Person",
      "name": story.author
    },
    "datePublished": story.date,
    "url": `https://icepab.name.ng/stories/${story.id}`
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="w-full pt-24 min-h-screen"
    >
      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify(articleSchema)}
        </script>
      </Helmet>
      <SEO title={story.title} description={story.excerpt} />
      
      <div className="max-w-3xl mx-auto px-6 pt-12 pb-24">
        <Link to="/stories" className="inline-flex items-center gap-2 text-xs font-mono text-electric-blue uppercase tracking-widest mb-12 hover:px-2 transition-all">
          <ArrowLeft size={14} /> Back to Transmissions
        </Link>
        
        <header className="mb-16">
          <div className="flex items-center gap-4 mb-6 font-mono text-[10px] tracking-[0.3em] text-text-dim uppercase">
            <span className="flex items-center gap-2"><Calendar size={12} /> {story.date}</span>
            <span className="w-1 h-1 rounded-full bg-electric-blue" />
            <span>BY {story.author}</span>
            <span className="flex items-center gap-2 ml-auto">
              <Clock size={12} /> {story.readTime}
            </span>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-black leading-[1.1] tracking-tighter mb-8 uppercase text-white">
            {story.title}
          </h1>
          
          <div className="h-[1px] w-full bg-gradient-to-r from-electric-blue/50 via-white/10 to-transparent" />
        </header>

        <div className="prose prose-invert prose-p:text-gray-300 prose-p:leading-relaxed prose-headings:text-electric-blue prose-headings:uppercase prose-headings:tracking-tighter prose-a:text-lime-green max-w-none prose-table:border prose-table:border-white/10 prose-td:p-4 prose-th:p-4 prose-th:bg-white/5 prose-th:text-white">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>
            {story.content}
          </ReactMarkdown>
        </div>
      </div>
    </motion.div>
  );
}
