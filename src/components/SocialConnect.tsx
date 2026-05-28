import React from 'react';
import { motion } from 'motion/react';
import { Github, Linkedin, ArrowUpRight } from 'lucide-react';
import { SITE_METADATA } from '../metadata';

const XIcon = ({ size = 24 }: { size?: number }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="currentColor"
  >
    <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932 6.064-6.932zm-1.292 19.49h2.039L6.486 3.24H4.298l13.311 17.403z"/>
  </svg>
);

const socialLinks = [
  { 
    name: 'X', 
    icon: XIcon, 
    url: SITE_METADATA.social.x.url, 
    handle: SITE_METADATA.social.x.handle 
  },
  { 
    name: 'LinkedIn', 
    icon: Linkedin, 
    url: SITE_METADATA.social.linkedin.url, 
    handle: SITE_METADATA.social.linkedin.handle 
  },
  { 
    name: 'GitHub', 
    icon: Github, 
    url: SITE_METADATA.social.github.url, 
    handle: SITE_METADATA.social.github.handle 
  },
];

export default function SocialConnect() {
  return (
    <section className="py-32 px-6 flex flex-col items-center">
      <div className="relative p-1 md:p-12 w-full max-w-5xl overflow-hidden rounded-[2.5rem] border border-white/10 bg-white/[0.04] backdrop-blur-3xl shadow-[0_24px_64px_rgba(0,0,0,0.8),inset_0_1px_1px_rgba(255,255,255,0.15)]">
        {/* Glow Effects */}
        <div className="absolute -top-40 -left-40 w-80 h-80 bg-electric-blue/10 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute -bottom-40 -right-40 w-80 h-80 bg-electric-blue/10 rounded-full blur-[100px] pointer-events-none" />

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div>
            <span className="text-electric-blue font-mono text-xs uppercase tracking-[0.4em] mb-4 block">Uplink Status: Open</span>
            <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter leading-[0.8] mb-8">Establish Connection</h2>
            <p className="text-text-dim text-lg leading-relaxed max-w-md">
              Synchronize with the IcePab digital presence across the mesh. Join our distributed community of designers and engineers.
            </p>
          </div>

          <div className="flex flex-col gap-4">
            {socialLinks.map((link, i) => (
              <motion.a
                key={link.name}
                href={link.url}
                target="_blank"
                rel="noreferrer"
                whileHover={{ x: 10 }}
                className="group flex items-center justify-between p-6 bg-white/[0.04] backdrop-blur-xl border border-white/10 hover:border-electric-blue/50 hover:bg-electric-blue/5 rounded-2xl shadow-[0_4px_24px_rgba(0,0,0,0.3),inset_0_1px_1px_rgba(255,255,255,0.08)] transition-all duration-300"
              >
                <div className="flex items-center gap-6">
                  <div className="p-4 bg-white/5 rounded-xl group-hover:bg-electric-blue group-hover:text-charcoal transition-colors">
                    <link.icon size={24} />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold uppercase">{link.name}</h4>
                    <span className="text-xs font-mono text-text-dim">{link.handle}</span>
                  </div>
                </div>
                <ArrowUpRight className="text-text-dim group-hover:text-electric-blue transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
              </motion.a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
