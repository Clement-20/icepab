import React from 'react';
import { motion } from 'motion/react';
import { Star, ExternalLink } from 'lucide-react';
import { reviewsData } from '../data/reviews';

export default function ReviewsSection() {
  return (
    <section className="py-24 px-6 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-6">
        <div>
          <span className="font-mono text-xs text-lime-green tracking-[0.2em] uppercase block mb-3">// VERIFIED FEEDBACK & TESTIMONIALS</span>
          <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter leading-[0.8]">Customer Reviews</h2>
        </div>
        <a
          href="https://g.page/r/CQs_XxkTjtm3EBE/review"
          target="_blank"
          rel="noopener noreferrer"
          className="px-6 py-3.5 bg-electric-blue text-black text-xs font-black uppercase tracking-[0.2em] rounded-full hover:bg-white transition-all flex items-center gap-2 shadow-[0_0_25px_rgba(0,229,255,0.3)]"
        >
          <span>Leave Google Review</span>
          <ExternalLink size={16} />
        </a>
      </div>
      
      {reviewsData.length === 0 ? (
        <div className="text-center p-12 border border-dashed border-white/20 rounded-2xl">
          <p className="text-text-dim mb-6">No reviews listed yet.</p>
          <a
            href="https://g.page/r/CQs_XxkTjtm3EBE/review"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 bg-lime-green text-black font-black text-xs uppercase tracking-widest rounded-full hover:bg-white transition-colors"
          >
            <span>Rate IcePab on Google</span>
            <ExternalLink size={14} />
          </a>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {reviewsData.map((review) => (
            <motion.div
              key={review.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-surface border border-accent-border p-8 rounded-2xl flex flex-col justify-between"
            >
              <div>
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={16} className={i < review.rating ? 'fill-lime-green text-lime-green' : 'text-white/20'} />
                  ))}
                </div>
                <p className="text-text-dim mb-6 italic">"{review.content}"</p>
              </div>
              <div className="pt-4 border-t border-white/5 flex items-center justify-between">
                <div>
                  <h4 className="font-bold">{review.customerName}</h4>
                  <p className="text-xs text-electric-blue font-mono uppercase tracking-widest">{review.role}</p>
                </div>
                <a
                  href="https://g.page/r/CQs_XxkTjtm3EBE/review"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-mono text-lime-green hover:underline flex items-center gap-1"
                >
                  <span>Review</span>
                  <ExternalLink size={12} />
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </section>
  );
}
