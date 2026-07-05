import React, { useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowLeft, Cpu, ShieldCheck, Database, Layout, Clock, ExternalLink, Activity } from 'lucide-react';
import SEO from './SEO';
import { Helmet } from 'react-helmet-async';
import { SITE_METADATA } from '../metadata';

interface DesignDetail {
  id: string;
  name: string;
  tagline: string;
  description: string;
  longDescription: string;
  category: string;
  status: string;
  color: string;
  techStack: string[];
  features: string[];
  latency: string;
  concurrency: string;
  securityLevel: string;
  externalUrl?: string;
}

const designDetails: Record<string, DesignDetail> = {
  'oau-cbt': {
    id: 'oau-cbt',
    name: 'ExamGuard (OAU CBT)',
    tagline: 'Secure Custom Testing Engine',
    description: 'High-concurrency, secure computer-based testing environment engineered for scale, evaluation integrity, and latency-optimized performance in institutional exams.',
    longDescription: 'ExamGuard is a high-security CBT delivery platform engineered specifically for intensive academic workloads. During high-concurrency exams at Obafemi Awolowo University (OAU), the system locks down candidate environments, restricts keyboard shortcut bypasses, and isolates running browser processes. Featuring instant local backups, the system ensures evaluation integrity and maintains a sub-20ms database queries throughput even under extreme parallel burst workloads.',
    category: 'Utility & Infrastructure',
    status: 'Live Deployment',
    color: '#00E5FF',
    techStack: ['React 18', 'TypeScript', 'Node.js', 'Express', 'PostgreSQL', 'Redis Cluster'],
    features: ['Anti-Cheat Sandbox Environment', 'Sub-millisecond Grading Engine', 'Fault-Tolerant Session Syncing', 'Encrypted local response caches'],
    latency: '< 15ms database response',
    concurrency: '5,000+ simultaneous candidates',
    securityLevel: 'Military Grade (AES-256-GCM)',
    externalUrl: 'https://oau.cbt.icepab.name.ng'
  },
  'flex-store': {
    id: 'flex-store',
    name: 'Flex Store',
    tagline: 'Modern Web Storefront & Delivery Engine',
    description: 'High-speed, lightweight e-commerce storefront architectures optimized for fast load times and instant digital asset downloads.',
    longDescription: 'Flex Store is a lightning-fast digital asset e-commerce engine designed to eliminate friction in digital distribution. Utilizing advanced edge caching, secure transient download keys, and automated Stripe webhooks, it facilitates seamless global digital checkouts with instant post-purchase download delivery. Built with absolute visual clarity and a responsive, touch-optimized fluid grid system.',
    category: 'E-commerce & Web Systems',
    status: 'Live Operation',
    color: '#FFD700',
    techStack: ['Vite', 'React 18', 'Tailwind CSS', 'Stripe API', 'Firebase Firestore', 'Google Cloud Functions'],
    features: ['Dynamic Checkout Flow', 'Secure Expiring Download Links', 'Real-time Sales Analytics Panel', 'Automated tax and invoice dispatch'],
    latency: '98/100 Google Lighthouse Speed',
    concurrency: '10,000+ daily sessions',
    securityLevel: 'PCI-DSS Compliant Gateway Integration',
    externalUrl: '#'
  },
  'ice-net': {
    id: 'ice-net',
    name: 'Ice-Net Workflow',
    tagline: 'Distributed Operations & Process Schedulers',
    description: 'Engineered backend integrations, cron schedulers, and admin dashboards designed to streamline daily operational workflows for growing digital enterprises.',
    longDescription: 'Ice-Net is a centralized distributed workflow and cron scheduler platform designed for complex operational automation. By connecting third-party web APIs, hosting high-performance operational webhooks, and orchestrating parallel processing worker pipelines, it enables growing organizations to coordinate background processes with robust logging, automatic error retries, and live heartbeat monitoring.',
    category: 'Infrastructure & Operations',
    status: 'Active Internal Beta',
    color: '#00FF41',
    techStack: ['TypeScript', 'Node.js', 'Express', 'Docker', 'Redis Queue', 'SQLite3'],
    features: ['Multi-threaded Cron Schedulers', 'Dynamic Webhook Router', 'Live Terminal Monitoring Log', 'Auto-recovery Failure Strategies'],
    latency: '< 5ms execution overhead',
    concurrency: '100,000+ processed tasks/day',
    securityLevel: 'Secure RSA Key Webhook Handshakes',
    externalUrl: '#'
  },
  'sync-lab': {
    id: 'sync-lab',
    name: 'Sync Lab Systems',
    tagline: 'Visual Architecture & Creative UI/UX Prototypes',
    description: 'Bespoke corporate visual identity systems, vector asset prints, and interactive high-fidelity user interface prototypes built with a pixel-perfect ethos.',
    longDescription: 'Sync Lab is the visualization and human-interface center of ICEPAB. It hosts structured component design systems, consistent mathematical spacing rules, geometric logo prints, and high-fidelity prototypes. Utilizing advanced vector calculations, micro-interactions, and high-contrast styling principles, we craft user interfaces that feel organic and perform flawlessly across all viewport scales.',
    category: 'Creative Design & Prototyping',
    status: 'Ongoing Innovations',
    color: '#FF00E5',
    techStack: ['Figma API', 'HTML5 Vector Art', 'Tailwind CSS', 'Framer Motion', 'Adobe CC Suite'],
    features: ['High-contrast Accessability Themes', 'Fluid Mathematical Spacing Specs', 'Responsive Breakpoint Testing', 'SVG/Vector Custom Animations'],
    latency: 'Hardware Accelerated 60FPS UI',
    concurrency: 'Multi-device responsive consistency',
    securityLevel: 'Public Exhibition Architecture',
    externalUrl: '#'
  }
};

export default function SingleDesignPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const detail = id ? designDetails[id] : null;

  useEffect(() => {
    if (!detail) {
      // Fallback redirect if invalid ID
      const timer = setTimeout(() => {
        navigate('/designs');
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [detail, navigate]);

  if (!detail) {
    return (
      <div className="pt-32 min-h-screen flex flex-col items-center justify-center text-center px-6">
        <span className="text-lime-green font-mono text-xs uppercase tracking-[0.4em] mb-4 block animate-pulse">Initializing System Node...</span>
        <h1 className="text-4xl font-black uppercase tracking-tighter leading-none mb-6">Coordinate Redirecting</h1>
        <p className="text-text-dim text-sm max-w-sm">The selected design route is being re-routed to the primary designs index.</p>
      </div>
    );
  }

  const projectSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": detail.name,
    "description": detail.description,
    "applicationCategory": detail.category,
    "operatingSystem": "Web, iOS, Android, Cloud",
    "author": {
      "@type": "Person",
      "name": SITE_METADATA.fullName,
      "alternateName": SITE_METADATA.alternateNames
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.5 }}
      className="w-full pt-24 min-h-screen"
    >
      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify(projectSchema)}
        </script>
      </Helmet>
      
      <SEO 
        title={`${detail.name} | Design Artifact`} 
        description={detail.description} 
      />

      <div className="max-w-6xl mx-auto px-6 pt-12 pb-32">
        <Link 
          to="/designs" 
          className="inline-flex items-center gap-2 text-xs font-mono text-electric-blue uppercase tracking-widest mb-12 hover:text-white transition-colors"
        >
          <ArrowLeft size={14} /> Back to Design Gallery
        </Link>

        {/* Top Header section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mb-20">
          <div className="lg:col-span-8">
            <div className="flex items-center gap-3 mb-6">
              <span className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-[9px] font-mono text-white/50 uppercase tracking-widest">
                {detail.category}
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-lime-green" />
              <span className="text-[9px] font-mono uppercase tracking-widest text-lime-green font-bold">
                {detail.status}
              </span>
            </div>
            
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-black uppercase tracking-tighter leading-none text-white mb-6">
              {detail.name}
            </h1>
            
            <p className="text-xl md:text-2xl text-text-dim font-light leading-relaxed max-w-3xl">
              {detail.tagline} — {detail.description}
            </p>
          </div>

          <div className="lg:col-span-4 bg-white/[0.02] border border-white/5 rounded-3xl p-8 backdrop-blur-3xl shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)] w-full">
            <h3 className="text-[10px] font-mono text-white/30 uppercase tracking-[0.3em] mb-6 pb-4 border-b border-white/5">System Specification</h3>
            
            <div className="space-y-4">
              <div className="flex justify-between items-center py-2 border-b border-white/[0.03]">
                <span className="text-xs text-white/40 font-mono uppercase">Node ID</span>
                <span className="text-xs text-white font-mono font-bold uppercase tracking-wider">{detail.id}</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-white/[0.03]">
                <span className="text-xs text-white/40 font-mono uppercase">Response Latency</span>
                <span className="text-xs text-lime-green font-mono font-bold">{detail.latency}</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-white/[0.03]">
                <span className="text-xs text-white/40 font-mono uppercase">Scale Profile</span>
                <span className="text-xs text-white font-mono font-bold">{detail.concurrency}</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-white/[0.03]">
                <span className="text-xs text-white/40 font-mono uppercase">Encryption Standard</span>
                <span className="text-xs text-electric-blue font-mono font-bold text-right">{detail.securityLevel}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Detailed Breakdown */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 border-t border-white/5 pt-16">
          <div className="lg:col-span-7 space-y-8">
            <h3 className="text-sm font-mono text-white/50 uppercase tracking-[0.3em]">Architectural Overview</h3>
            <p className="text-text-dim text-lg leading-relaxed font-light">
              {detail.longDescription}
            </p>

            <div className="pt-6">
              <h3 className="text-sm font-mono text-white/50 uppercase tracking-[0.3em] mb-6">Key Engineering Features</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {detail.features.map((feature, idx) => (
                  <div key={idx} className="p-5 bg-white/[0.02] border border-white/5 rounded-2xl flex items-start gap-3">
                    <div className="p-1.5 bg-lime-green/10 text-lime-green rounded-lg mt-0.5">
                      <Activity size={12} />
                    </div>
                    <span className="text-xs text-white uppercase font-bold tracking-wider leading-normal">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 space-y-12">
            <div>
              <h3 className="text-sm font-mono text-white/50 uppercase tracking-[0.3em] mb-6">Consolidated Stack</h3>
              <div className="flex flex-wrap gap-2">
                {detail.techStack.map((tech) => (
                  <span 
                    key={tech} 
                    className="px-4 py-2 bg-white/[0.04] border border-white/10 rounded-xl text-xs font-mono text-white font-bold uppercase tracking-wider"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            <div className="p-8 bg-gradient-to-br from-white/[0.03] to-transparent border border-white/5 rounded-3xl">
              <h4 className="text-xs font-mono text-white/30 uppercase tracking-widest mb-4">Launch Command</h4>
              <p className="text-text-dim text-sm leading-relaxed mb-6">
                Directly run or interact with the operational testing systems or e-commerce instances managed under this coordinate route.
              </p>
              {detail.externalUrl && detail.externalUrl !== '#' ? (
                <a 
                  href={detail.externalUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-white hover:bg-lime-green text-charcoal text-xs font-black uppercase tracking-widest rounded-xl transition-colors w-full justify-center"
                >
                  Connect to Node <ExternalLink size={14} />
                </a>
              ) : (
                <button 
                  disabled
                  className="px-6 py-3 bg-white/5 border border-white/10 text-white/30 text-xs font-mono uppercase tracking-widest rounded-xl w-full cursor-not-allowed"
                >
                  SYSTEM_INTEGRATED_BETA
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
