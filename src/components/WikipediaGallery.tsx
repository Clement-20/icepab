import React from 'react';
import { motion } from 'motion/react';
import { Download, Info, Maximize2 } from 'lucide-react';
import { galleryData } from '../data/gallery';
import { SITE_METADATA } from '../metadata';

export default function WikipediaGallery() {
  // AEO/SEO: JSON-LD for image indexing
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ImageGallery",
    "name": `Design Portfolio of ${SITE_METADATA.author}`,
    "description": "A Wikipedia-style museum archive of professional design artifacts and systems architecture.",
    "author": {
      "@type": "Person",
      "name": SITE_METADATA.fullName,
      "alternateName": SITE_METADATA.alternateNames
    },
    "image": galleryData.map(img => ({
      "@type": "ImageObject",
      "contentUrl": img.url,
      "name": `${img.alt} | Designed by ${SITE_METADATA.fullName}`,
      "caption": img.caption
    }))
  };

  const handleDownload = (url: string, filename: string) => {
    // In a real browser environment, we'd fetch and trigger a download
    // For this context, we'll open the image in a new tab if high-res direct download isn't feasible via simple <a>
    window.open(url, '_blank');
  };

  return (
    <div className="px-6 max-w-7xl mx-auto pb-32">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="columns-1 sm:columns-2 lg:columns-3 gap-8 space-y-8">
        {galleryData.map((artifact, i) => (
          <motion.figure
            key={artifact.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: i * 0.05, ease: [0.22, 1, 0.36, 1] }}
            className="group relative break-inside-avoid rounded-sm border border-white/5 bg-black/20 overflow-hidden cursor-crosshair"
          >
            {/* Image Section */}
            <div className="relative overflow-hidden">
              <img
                src={artifact.url}
                alt={`${artifact.alt} - Artifact by ${SITE_METADATA.fullName} (ICEPAB)`}
                loading="lazy"
                referrerPolicy="no-referrer"
                className="w-full h-auto grayscale group-hover:grayscale-0 transition-all duration-1000 ease-in-out group-hover:scale-[1.02]"
              />
              
              {/* Asset Overlay Actions */}
              <div className="absolute top-4 right-4 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-x-4 group-hover:translate-x-0">
                <button
                  onClick={() => handleDownload(artifact.url, artifact.id)}
                  className="p-3 bg-black/60 backdrop-blur-md border border-white/10 text-white hover:bg-electric-blue hover:text-black transition-all rounded-full"
                  title="Download High-Res"
                >
                  <Download size={16} />
                </button>
                <div className="p-3 bg-black/60 backdrop-blur-md border border-white/10 text-white rounded-full">
                  <Maximize2 size={16} />
                </div>
              </div>
            </div>

            {/* Wikipedia-Style Figcaption (Visible on Hover) */}
            <motion.figcaption 
              className="absolute inset-x-0 bottom-0 p-8 z-20 pointer-events-none"
              initial={{ opacity: 0, y: 20 }}
              whileHover={{ opacity: 1, y: 0 }}
            >
              <div className="p-6 backdrop-blur-2xl bg-black/80 border border-white/10 rounded-lg shadow-2xl translate-y-8 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-700 pointer-events-auto">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <span className="text-[10px] font-mono text-electric-blue uppercase tracking-[0.3em] block mb-1">
                      Cat: {artifact.category}
                    </span>
                    <h3 className="text-sm font-bold text-white uppercase tracking-widest">{artifact.alt}</h3>
                  </div>
                  <Info size={14} className="text-white/20" />
                </div>
                
                <p className="text-xs text-text-dim leading-relaxed mb-6 font-medium italic">
                  "{artifact.caption}"
                </p>

                <div className="pt-4 border-t border-white/5 flex items-center justify-between">
                  <span className="text-[9px] font-mono text-white/30 uppercase tracking-[0.2em]">
                    Auth: {SITE_METADATA.alias}
                  </span>
                  <span className="text-[9px] font-mono text-white/30 uppercase tracking-[0.2em]">
                    ID: 0x{artifact.id.padStart(4, '0')}
                  </span>
                </div>
              </div>
            </motion.figcaption>

            {/* Subtle Gradient Shadow */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
          </motion.figure>
        ))}
      </div>
    </div>
  );
}
