import React from 'react';
import { motion } from 'motion/react';
import { galleryData } from '../data/gallery';
import { SITE_METADATA } from '../metadata';

export default function MediaGallery() {
  // SEO/AEO optimization: JSON-LD for ImageObject
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "itemListElement": galleryData.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "item": {
        "@type": "ImageObject",
        "contentUrl": item.url,
        "name": item.alt,
        "description": item.caption,
        "author": {
          "@type": "Organization",
          "name": SITE_METADATA.author
        },
        "brand": {
          "@type": "Brand",
          "name": "IcePab Systems"
        }
      }
    }))
  };

  return (
    <section className="py-32 px-6 max-w-7xl mx-auto">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
        <div>
          <span className="text-electric-blue font-mono text-xs uppercase tracking-[0.4em] mb-4 block">Archive 01 // Public Visuals</span>
          <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter leading-[0.8]">Systems Gallery</h2>
        </div>
        <p className="text-text-dim text-sm font-mono uppercase tracking-widest max-w-xs text-right leading-relaxed">
          Proprietary visual captures from IcePab distributed nodes and hardware substrate.
        </p>
      </div>

      <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
        {galleryData.map((image, i) => (
          <motion.div
            key={image.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="relative group break-inside-avoid overflow-hidden rounded-xl border border-white/5 bg-white/5"
          >
            {/* Smart Procedural Rendering */}
            <div className="relative w-full aspect-[4/5] bg-charcoal/40 flex flex-col justify-between p-6 overflow-hidden md:aspect-[3/4]">
              {/* Algorithmic Backdrop */}
              <div 
                className="absolute inset-0 opacity-[0.03] group-hover:opacity-10 transition-opacity duration-1000"
                style={{
                  backgroundImage: `linear-gradient(45deg, #00e5ff 25%, transparent 25%, transparent 75%, #00e5ff 75%, #00e5ff), linear-gradient(45deg, #00e5ff 25%, transparent 25%, transparent 75%, #00e5ff 75%, #00e5ff)`,
                  backgroundSize: '20px 20px',
                  backgroundPosition: '0 0, 10px 10px'
                }}
              />
              
              <div className="absolute inset-0 flex items-center justify-center opacity-10 group-hover:opacity-30 transition-opacity duration-1000 mix-blend-screen pointer-events-none">
                <div 
                  className="w-[120%] h-px bg-electric-blue absolute"
                  style={{ transform: `rotate(${i * 25}deg)` }}
                />
                <div 
                  className="w-[120%] h-px bg-lime-green absolute"
                  style={{ transform: `rotate(${-(i * 15 + 45)}deg)` }}
                />
              </div>

              <div className="flex justify-end relative z-10">
                <span className="text-[9px] font-mono border border-white/10 px-2 py-1 rounded bg-black/40 text-text-dim">
                  NODE_{image.id}
                </span>
              </div>
              
              <div className="mt-auto relative z-10 transition-all duration-700 ease-in-out group-hover:translate-y-[-10px]">
                <span className="text-[10px] uppercase font-bold tracking-widest text-lime-green block mb-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  {image.category}
                </span>
                <h3 className="text-lg font-black uppercase text-white/80 group-hover:text-white leading-tight tracking-tighter">
                  {image.alt}
                </h3>
              </div>

              <img src={image.url} alt={image.alt} className="sr-only" />
            </div>
            
            {/* Glassmorphism Caption */}
            <div className="absolute inset-x-0 bottom-0 p-6 opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 delay-100">
              <div className="backdrop-blur-xl bg-charcoal/60 border border-white/10 p-4 rounded-lg shadow-2xl">
                <span className="text-[10px] font-mono text-electric-blue uppercase tracking-widest block mb-2">
                  {image.category} // Sub-Layer: 0{i + 1}
                </span>
                <p className="text-xs text-white leading-relaxed font-medium">
                  {image.caption}
                </p>
                <div className="mt-4 flex items-center justify-between text-[8px] font-mono text-white/30 tracking-[0.2em] uppercase">
                  <span>IcePab Systems</span>
                  <span>Dimensions: {image.width}x{image.height}</span>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
