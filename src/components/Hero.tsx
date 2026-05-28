import { motion, AnimatePresence } from 'motion/react';
import React, { useState, useEffect } from 'react';

export default function Hero() {
  const [bootSequence, setBootSequence] = useState(0);
  const [agentName, setAgentName] = useState('GUEST');
  const letters = "ICEPAB SYSTEMS".split("");

  useEffect(() => {
    const name = sessionStorage.getItem('icepab_agent_name');
    if (name) {
      setAgentName(name.toUpperCase());
    }

    const sequence = [
      { delay: 400, action: () => setBootSequence(1) },
      { delay: 800, action: () => setBootSequence(2) },
      { delay: 1200, action: () => setBootSequence(3) },
    ];

    sequence.forEach(step => {
      setTimeout(step.action, step.delay);
    });
  }, []);

  const container = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.4 * i },
    }),
  };

  const child: any = {
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
      },
    },
    hidden: {
      opacity: 0,
      x: -20,
      y: 10,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
      },
    },
  };

  return (
    <section className="relative min-h-[80vh] flex flex-col items-center justify-center px-6 overflow-hidden" aria-label="Welcome to ICEPAB Systems">
      <h1 className="sr-only">Banmeke IfeOluwa Elijah (ICEPAB) - Elite Systems Developer, SaaS Architect, and UI/UX Designer in Nigeria</h1>
      <AnimatePresence>
        {bootSequence < 3 && (
          <motion.div 
            exit={{ opacity: 0, scale: 1.1 }}
            className="absolute inset-0 z-50 bg-charcoal flex flex-col items-center justify-center font-mono text-electric-blue"
          >
            <div className="space-y-2 text-xs md:text-sm">
              <p className={bootSequence >= 0 ? 'opacity-100' : 'opacity-0'}>[ SYSTEM ] Initializing IcePab kernel...</p>
              <p className={bootSequence >= 1 ? 'opacity-100' : 'opacity-0'}>[ AUTH ] Root access granted.</p>
              <p className={bootSequence >= 2 ? 'opacity-100' : 'opacity-0'}>[ NODES ] Balancing distributed mesh...</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Background Grid Pattern */}
      <div className="absolute inset-0 z-0 opacity-10 pointer-events-none" 
           style={{ backgroundImage: 'radial-gradient(var(--color-electric-blue) 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
      
      {/* Cityscape Background Overlay */}
      <div 
        className="absolute inset-0 z-0 opacity-20 bg-cover bg-center pointer-events-none"                
        style={{ backgroundImage: 'url(https://storage.googleapis.com/genai-content-images/user/17495033/generated/image.png)' }}
      />
      
      <motion.div
        variants={container}
        initial="hidden"
        animate="visible"
        className="flex flex-wrap justify-center overflow-hidden"
      >
        <div className="flex">
          {"ICEPAB".split("").map((letter, index) => (
            <motion.span
              variants={child}
              key={`icepab-${index}`}
              className="text-6xl md:text-8xl lg:text-[110px] font-black tracking-tighter"
            >
              {letter}
            </motion.span>
          ))}
        </div>
        <div className="flex md:ml-6">
          {"SYSTEMS".split("").map((letter, index) => (
            <motion.span
              variants={child}
              key={`systems-${index}`}
              className="text-6xl md:text-8xl lg:text-[110px] font-black tracking-tighter bg-gradient-to-r from-electric-blue to-lime-green bg-clip-text text-transparent italic"
            >
              {letter}
            </motion.span>
          ))}
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2, duration: 1 }}
        className="mt-6 text-center max-w-xl flex flex-col items-center gap-4"
      >
        {/* Glowing Custom Hologram Greet Header */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-lime-green/20 bg-lime-green/5 font-mono text-[9px] text-lime-green uppercase tracking-[0.2em] shadow-[0_4px_24px_rgba(128,255,0,0.04),inset_0_1px_0_rgba(255,255,255,0.05)] animate-pulse">
          <span className="w-1.5 h-1.5 rounded-full bg-lime-green animate-ping" />
          SYSTEMS_ONLINE // WELCOME, AGENT {agentName}
        </div>

        <h2 className="text-text-dim text-lg md:text-xl font-medium leading-relaxed">
          Portfolio of Clement IfeOluwa | Architecting high-performance digital SaaS environments and UI/UX systems. Minimal latency, maximum reliability under the ICEPAB framework.
        </h2>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 3 }}
        className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center"
      >
        <div className="w-[1px] h-24 bg-gradient-to-b from-electric-blue to-transparent" />
        <span className="text-[10px] uppercase tracking-[0.4em] mt-4 opacity-50 font-mono">Initiate Scan</span>
      </motion.div>
    </section>
  );
}
