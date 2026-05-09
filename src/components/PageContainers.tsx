import React from 'react';
import { motion } from 'motion/react';
import Hero from './Hero';
import SystemTransparency from './SystemTransparency';
import BentoGrid from './BentoGrid';
import KnowledgeFeed from './KnowledgeFeed';
import DesignGallery from './DesignGallery';
import EditorialStories from './EditorialStories';
import ProjectHub from './ProjectHub';
import MediaGallery from './MediaGallery';
import WikipediaGallery from './WikipediaGallery';
import UploadTerminal from './UploadTerminal';
import SEO from './SEO';
import { SITE_METADATA } from '../metadata';

const pageVariants: any = {
  initial: {
    opacity: 0,
    y: 10,
    scale: 0.99,
  },
  animate: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1], // Custom cubic-bezier for a "premium" feel
    },
  },
  exit: {
    opacity: 0,
    y: -10,
    scale: 1.01,
    transition: {
      duration: 0.4,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const PageWrapper = ({ children }: { children: React.ReactNode }) => (
  <motion.div
    variants={pageVariants}
    initial="initial"
    animate="animate"
    exit="exit"
    className="w-full"
  >
    {children}
  </motion.div>
);

export function Home() {
  return (
    <PageWrapper>
      <Hero />
      <ProjectHub />
      <MediaGallery />
      <SystemTransparency />
      <div id="nodes">
        <BentoGrid />
      </div>
    </PageWrapper>
  );
}

export function AdminPage() {
  return (
    <PageWrapper>
      <div className="pt-24 min-h-screen">
        <div className="px-6 max-w-4xl mx-auto pt-12 pb-8 text-center">
          <h1 className="text-5xl md:text-8xl font-black uppercase tracking-tighter leading-[0.8] mb-4">Core Substrate Admin</h1>
          <p className="text-text-dim text-lg">Secure interface for operational asset uploads and metadata synchronization.</p>
        </div>
        <UploadTerminal />
      </div>
    </PageWrapper>
  );
}

export function DesignsPage() {
  return (
    <PageWrapper>
      <div className="pt-24 min-h-screen">
        <div className="px-6 max-w-7xl mx-auto pt-12 pb-8">
          <h1 className="text-5xl md:text-8xl font-black uppercase tracking-tighter leading-[0.8] mb-4">Design Artifacts</h1>
          <p className="text-text-dim text-lg max-w-xl">Museum archive of visual explorations, documenting technical systems and high-fidelity artifacts.</p>
        </div>
        <WikipediaGallery />
      </div>
    </PageWrapper>
  );
}

export function StoriesPage() {
  return (
    <PageWrapper>
      <div className="pt-24 min-h-screen">
        <div className="px-6 max-w-4xl mx-auto pt-12 pb-8 text-center">
          <h1 className="text-5xl md:text-8xl font-black uppercase tracking-tighter leading-[0.8] mb-4">Editorial Feed</h1>
          <p className="text-text-dim text-lg">In-depth transmissions regarding digital ecosystems, human-centered design, and high-performance infrastructure.</p>
        </div>
        <EditorialStories />
      </div>
    </PageWrapper>
  );
}

export function AboutPage() {
  const aboutTitle = `About ${SITE_METADATA.fullName} (${SITE_METADATA.alternateNames[0]})`;
  const aboutDescription = `Professional profile of ${SITE_METADATA.fullName}, also known as ${SITE_METADATA.alternateNames[0]}. ${SITE_METADATA.description}`;

  return (
    <PageWrapper>
      <SEO title={aboutTitle} description={aboutDescription} />
      <div className="pt-24 min-h-screen">
        <div className="px-6 max-w-4xl mx-auto pt-12 pb-8">
          <span className="text-electric-blue font-mono text-xs uppercase tracking-[0.4em] mb-4 block">Identity // Bio</span>
          <h1 className="text-5xl md:text-8xl font-black uppercase tracking-tighter leading-[0.8] mb-8">
            {SITE_METADATA.fullName}
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mt-16">
            <div className="md:col-span-2 space-y-6">
              <p className="text-xl text-white leading-relaxed font-medium">
                Systems developer, UI/UX designer, and founder of <span className="text-lime-green">ICEPAB Systems</span>. 
                Commonly known through the professional alias <span className="text-electric-blue">{SITE_METADATA.alternateNames[0]}</span>.
              </p>
              <p className="text-text-dim text-lg leading-relaxed">
                Specializing in building high-performance digital infrastructure, scalable SaaS solutions, 
                and professional graphic systems. With deep expertise in {SITE_METADATA.knowsAbout.join(", ")}, 
                my work bridges the gap between technical complexity and user-centric clarity.
              </p>
              <div className="pt-8 grid grid-cols-2 gap-8">
                <div>
                  <h4 className="text-[10px] font-mono text-white/30 uppercase tracking-widest mb-4">Core Focus</h4>
                  <ul className="space-y-2">
                    {SITE_METADATA.knowsAbout.map(item => (
                      <li key={item} className="text-xs font-bold uppercase tracking-wider flex items-center gap-2">
                        <div className="w-1 h-1 bg-lime-green rounded-full" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="text-[10px] font-mono text-white/30 uppercase tracking-widest mb-4">Current OS</h4>
                  <p className="text-xs font-bold uppercase tracking-wider leading-relaxed">
                    Life_OS v3.0 // Active_Mesh<br />
                    Status: Nominal<br />
                    Location: Global_Distributed
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-md h-fit">
              <h3 className="text-sm font-bold uppercase tracking-[0.2em] mb-6 border-b border-white/10 pb-4">Classification</h3>
              <div className="space-y-4">
                <div className="flex flex-col gap-1">
                  <span className="text-[10px] text-white/30 uppercase tracking-widest">Primary Identity</span>
                  <span className="text-xs font-mono text-electric-blue">{SITE_METADATA.fullName}</span>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-[10px] text-white/30 uppercase tracking-widest">Global Alias</span>
                  <span className="text-xs font-mono text-lime-green">{SITE_METADATA.alternateNames[0]}</span>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-[10px] text-white/30 uppercase tracking-widest">Brand Mark</span>
                  <span className="text-xs font-mono text-white">{SITE_METADATA.alias}</span>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-[10px] text-white/30 uppercase tracking-widest">Protocol</span>
                  <span className="text-xs font-mono text-white/50">{SITE_METADATA.jobTitle}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
}

export function SystemsPage() {
  return (
    <PageWrapper>
      <div className="pt-24 min-h-screen">
        <div className="px-6 max-w-7xl mx-auto pt-12 pb-8">
          <h1 className="text-5xl md:text-8xl font-black uppercase tracking-tighter leading-[0.8] mb-4">System Console</h1>
          <p className="text-text-dim text-lg max-w-xl">Live monitoring of distributed node performance, network transparency, and protocol health.</p>
        </div>
        <ProjectHub />
        <SystemTransparency />
        <BentoGrid />
        <KnowledgeFeed />
      </div>
    </PageWrapper>
  );
}
