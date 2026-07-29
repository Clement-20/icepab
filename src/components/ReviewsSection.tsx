import React from 'react';
import { motion } from 'motion/react';
import { Star } from 'lucide-react';
import { reviewsData } from '../data/reviews';

export default function ReviewsSection() {
  return (
    <section className="py-24 px-6 max-w-7xl mx-auto">
      <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter leading-[0.8] mb-16">Customer Reviews</h2>
      
      {reviewsData.length === 0 ? (
        <div className="text-center p-12 border border-dashed border-white/20 rounded-2xl">
          <p className="text-text-dim">No reviews yet. Add your customer reviews in <code className="font-mono text-electric-blue">src/data/reviews.ts</code>.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {reviewsData.map((review) => (
            <motion.div
              key={review.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-surface border border-accent-border p-8 rounded-2xl"
            >
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={16} className={i < review.rating ? 'fill-lime-green text-lime-green' : 'text-white/20'} />
                ))}
              </div>
              <p className="text-text-dim mb-6 italic">"{review.content}"</p>
              <div>
                <h4 className="font-bold">{review.customerName}</h4>
                <p className="text-xs text-electric-blue font-mono uppercase tracking-widest">{review.role}</p>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </section>
  );
}
