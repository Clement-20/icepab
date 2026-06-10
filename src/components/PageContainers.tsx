import React from 'react';
import { motion } from 'motion/react';
import { ShieldCheck, Cpu, Code2, Database } from 'lucide-react';
import { Link } from 'react-router-dom';
import Hero from './Hero';
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
      
      {/* Real Biography & Corporate Philosophy Teaser */}
      <section className="py-24 px-6 max-w-4xl mx-auto border-t border-white/5 text-center">
        <span className="text-electric-blue font-mono text-xs uppercase tracking-[0.4em] mb-4 block">Concept / Ethos</span>
        <h2 className="text-4xl font-black uppercase tracking-tighter leading-none mb-6">Bridging Tech & Business Operations</h2>
        <p className="text-text-dim text-lg leading-relaxed max-w-2xl mx-auto font-light">
          Under the name <span className="text-white">ICEPAB</span>—representing IfeOluwa Clement Precious Abayomi Banmeke—I build software solutions rooted in business admin workflows. From the secure CBT architecture of <span className="text-electric-blue">ExamGuard</span> to bespoke graphic systems, every project focuses on performance, efficiency, and clarity.
        </p>
      </section>
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
          <p className="text-text-dim text-lg max-w-xl">Museum archive of visual explorations, documenting corporate identity and high-fidelity interface design.</p>
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
          <p className="text-text-dim text-lg">In-depth transmissions regarding digital ecosystems, human-centered UI/UX design, and business automation platforms.</p>
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
                and professional graphic systems. My studies in {SITE_METADATA.knowsAbout[0]} at Obafemi Awolowo University (OAU) shape my approach, bridging the gap between rigorous tech stack engineering and efficient business operations.
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
                  <h4 className="text-[10px] font-mono text-white/30 uppercase tracking-widest mb-4">Location & Scope</h4>
                  <p className="text-xs font-bold uppercase tracking-wider leading-relaxed">
                    Based in Nigeria<br />
                    Serving Global Clients<br />
                    Status: Active Operations
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-white/[0.04] border border-white/10 rounded-3xl p-8 backdrop-blur-2xl h-fit shadow-[0_12px_40px_rgba(0,0,0,0.5),inset_0_1px_1px_rgba(255,255,255,0.08)]">
              <h3 className="text-sm font-bold uppercase tracking-[0.2em] mb-6 border-b border-white/10 pb-4">Professional Profile</h3>
              <div className="space-y-4">
                <div className="flex flex-col gap-1">
                  <span className="text-[10px] text-white/30 uppercase tracking-widest">Primary Name</span>
                  <span className="text-xs font-mono text-electric-blue">{SITE_METADATA.fullName}</span>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-[10px] text-white/30 uppercase tracking-widest">Alias</span>
                  <span className="text-xs font-mono text-lime-green">{SITE_METADATA.alternateNames[0]}</span>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-[10px] text-white/30 uppercase tracking-widest">Acronym Origin</span>
                  <span className="text-xs font-mono text-white">{SITE_METADATA.alias}</span>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-[10px] text-white/30 uppercase tracking-widest">Focus Areas</span>
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
          <span className="text-electric-blue font-mono text-xs uppercase tracking-[0.4em] mb-4 block">Engine / Systems</span>
          <h1 className="text-5xl md:text-8xl font-black uppercase tracking-tighter leading-[0.8] mb-4">Enterprise Systems</h1>
          <p className="text-text-dim text-lg max-w-xl">Engineering details behind institutional scale, automated workflows, and evaluation security.</p>
        </div>
        
        <ProjectHub />

        {/* Real Systems Architecture & Methodologies */}
        <div className="px-6 max-w-7xl mx-auto py-24 border-t border-white/5">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
            <div className="space-y-4">
              <span className="text-lime-green font-mono text-xs uppercase tracking-[0.2em]">01 // Security First</span>
              <h3 className="text-3xl font-bold uppercase tracking-tight">Isolated Sandboxes</h3>
              <p className="text-text-dim text-sm leading-relaxed font-light">
                For applications like ExamGuard (OAU CBT), security operates at the browser and hardware interaction layers. We engineer custom sandboxes that prevent copy-paste streams, lock keyboard modifiers, and isolate candidate tabs to enforce maximum academic evaluation integrity.
              </p>
            </div>
            <div className="space-y-4">
              <span className="text-electric-blue font-mono text-xs uppercase tracking-[0.2em]">02 // Scaling</span>
              <h3 className="text-3xl font-bold uppercase tracking-tight">Concurrency Performance</h3>
              <p className="text-text-dim text-sm leading-relaxed font-light">
                Scaling means planning for extreme burst workloads. When thousands of college candidates hit exam nodes concurrently, our database structures scale gracefully, utilizing memory-backed layers and connection pool throttling to maintain sub-20ms queries.
              </p>
            </div>
            <div className="space-y-4">
              <span className="text-pink-500 font-mono text-xs uppercase tracking-[0.2em]">03 // Business Operations</span>
              <h3 className="text-3xl font-bold uppercase tracking-tight">Process Automation</h3>
              <p className="text-text-dim text-sm leading-relaxed font-light">
                Bridging rigorous software development with Business Administration frameworks. Devising custom web automation portals, automated storefronts, and system routers that dramatically reduce administrative friction and manual labor.
              </p>
            </div>
          </div>
        </div>

        {/* Technical stack segment */}
        <div className="px-6 max-w-7xl mx-auto pb-32">
          <div className="bg-white/[0.04] border border-white/10 rounded-[2.5rem] p-8 md:p-12 backdrop-blur-2xl shadow-[0_16px_48px_rgba(0,0,0,0.6),inset_0_1px_1px_rgba(255,255,255,0.08)]">
            <h3 className="text-sm font-mono text-white/50 uppercase tracking-[0.3em] mb-10">Consolidated Stack Capabilities</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div className="space-y-3">
                <Code2 className="text-electric-blue w-6 h-6" />
                <h4 className="font-bold text-white uppercase tracking-wider text-sm">Languages</h4>
                <p className="text-xs text-text-dim font-mono leading-relaxed uppercase">TypeScript / JavaScript / Node.js / HTML5 / CSS3</p>
              </div>
              <div className="space-y-3">
                <Cpu className="text-lime-green w-6 h-6" />
                <h4 className="font-bold text-white uppercase tracking-wider text-sm">Frameworks</h4>
                <p className="text-xs text-text-dim font-mono leading-relaxed uppercase">React / Vite / Tailwind CSS / Express / Next.js</p>
              </div>
              <div className="space-y-3">
                <Database className="text-electric-blue w-6 h-6" />
                <h4 className="font-bold text-white uppercase tracking-wider text-sm">Databases</h4>
                <p className="text-xs text-text-dim font-mono leading-relaxed uppercase">PostgreSQL / SQLite / Firebase Firestore / MongoDB</p>
              </div>
              <div className="space-y-3">
                <ShieldCheck className="text-pink-500 w-6 h-6" />
                <h4 className="font-bold text-white uppercase tracking-wider text-sm">Operations</h4>
                <p className="text-xs text-text-dim font-mono leading-relaxed uppercase">CI/CD Pipelines / Secure Sandboxing / Workflow Automation</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
}

export function NotFoundPage() {
  return (
    <PageWrapper>
      <div className="pt-24 min-h-screen flex flex-col items-center justify-center text-center px-6">
        <span className="text-red-500 font-mono text-xs uppercase tracking-[0.4em] mb-4 block">Error // 404</span>
        <h1 className="text-5xl md:text-8xl font-black uppercase tracking-tighter leading-[0.8] mb-6 text-white text-center">
          Node Not Found
        </h1>
        <p className="text-text-dim text-lg max-w-md mx-auto mb-10 leading-relaxed font-light uppercase tracking-wider text-xs">
          The requested system node coordinate does not exist on the ICEPAB digital workspace matrix.
        </p>
        <Link 
          to="/" 
          className="px-6 py-3 bg-white/5 border border-white/10 hover:border-lime-green/50 text-white font-mono text-[10px] uppercase tracking-widest rounded-xl transition-all duration-300"
        >
          Return to Root Node
        </Link>
      </div>
    </PageWrapper>
  );
}
