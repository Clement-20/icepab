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
            {/* Real Image Render Container */}
            <div className="relative w-full aspect-[4/5] bg-charcoal/40 flex flex-col justify-between p-6 overflow-hidden md:aspect-[3/4]">
              {/* Image Element */}
              <img 
                src={image.url} 
                alt={image.alt} 
                className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:opacity-40 group-hover:scale-105 transition-all duration-700 ease-in-out"
                referrerPolicy="no-referrer"
              />
              {/* Dark overlay to ensure text is fully legible */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/50 z-0" />

              <div className="flex justify-end relative z-10">
                <span className="text-[9px] font-mono border border-white/10 px-2 py-1 rounded bg-black/60 text-white/80">
                  REF_{image.id}
                </span>
              </div>
              
              <div className="mt-auto relative z-10 transition-all duration-500 ease-in-out group-hover:translate-y-[-10px]">
                <span className="text-[10px] uppercase font-bold tracking-widest text-lime-green block mb-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  {image.category}
                </span>
                <h3 className="text-lg font-black uppercase text-white leading-tight tracking-tighter">
                  {image.alt}
                </h3>
              </div>
            </div>
            
            {/* Glassmorphism Caption */}
            <div className="absolute inset-x-0 bottom-0 p-6 opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 delay-100">
              <div className="backdrop-blur-2xl bg-black/50 border border-white/10 p-4 rounded-lg shadow-[0_8px_32px_rgba(0,0,0,0.5),inset_0_1px_1px_rgba(255,255,255,0.15)]">
                <span className="text-[10px] font-mono text-electric-blue uppercase tracking-widest block mb-2">
                  {image.category} // Artifact: 0{i + 1}
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
