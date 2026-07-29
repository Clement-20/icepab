import { Menu, X } from 'lucide-react';
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { SITE_METADATA } from '../metadata';

export default function Navbar() {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [logoLoaded, setLogoLoaded] = React.useState(false);
  const [logoError, setLogoError] = React.useState(false);
  const [activeAgent, setActiveAgent] = React.useState('GUEST');

  React.useEffect(() => {
    const checkName = () => {
      const stored = sessionStorage.getItem('icepab_agent_name');
      if (stored) {
        setActiveAgent(stored.toUpperCase());
      }
    };
    checkName();
    const interval = setInterval(checkName, 1000);
    return () => clearInterval(interval);
  }, []);

  // Close menu when route changes
  React.useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  const navItems = [
    { name: 'Portfolio', path: '/portfolio' },
    { name: 'Reviews', path: '/reviews' },
    { name: 'Designs', path: '/designs' },
    { name: 'Stories', path: '/stories' },
    { name: 'Systems', path: '/systems' },
    { name: 'About', path: '/about' },
  ];

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 h-20 px-6 md:px-12 flex items-center justify-between backdrop-blur-2xl border-b border-white/10 bg-black/45 shadow-[0_8px_32px_0_rgba(0,0,0,0.37),inset_0_1px_0_rgba(255,255,255,0.05)]">
        <div className="flex items-center gap-6">
          <Link to="/" className="flex items-center gap-3 group">
            <div className="relative w-10 h-10 flex items-center justify-center">
              {/* Spinning interactive technological orbits around the logo */}
              <div className="absolute inset-[-4px] border border-electric-blue/30 rounded-lg group-hover:rotate-45 transition-transform duration-700 animate-[spin_12s_linear_infinite] pointer-events-none" />
              <div className="absolute inset-[-4px] border border-dashed border-lime-green/30 rounded-lg group-hover:-rotate-90 transition-transform duration-700 pointer-events-none" />
              
              {/* Soft background glow */}
              <div className="absolute inset-0 rounded-lg bg-electric-blue/10 blur-sm opacity-50 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

              <img 
                src="/logo.png" 
                alt="IcePab Logo" 
                className="relative z-10 w-full h-full object-contain brightness-110 group-hover:scale-110 transition-transform duration-500 rounded-lg"
                onError={(e) => {
                  const img = e.currentTarget;
                  img.style.display = 'none';
                  const fallback = img.nextElementSibling as HTMLElement;
                  if (fallback) {
                    fallback.classList.remove('hidden');
                    fallback.classList.add('flex');
                  }
                }}
              />
              {/* Fallback elegant vectors logo */}
              <div className="hidden absolute inset-0 z-10 border border-electric-blue/30 bg-black/60 backdrop-blur-md items-center justify-center font-black font-mono text-electric-blue text-xs tracking-tighter rounded-lg shadow-[inset_0_1px_0_rgba(255,255,255,0.1)]">
                IP
              </div>
            </div>
            <div className="hidden sm:flex flex-col">
              <span className="font-mono text-[10px] text-white uppercase tracking-[0.2em] font-bold leading-none">
                IcePab
              </span>
              <span className="font-mono text-[8px] text-lime-green uppercase tracking-[0.2em] font-bold mt-1">
                DEV & DESIGN
              </span>
            </div>
          </Link>
        </div>

        <div className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              className={`text-xs uppercase tracking-[0.2em] font-bold transition-all duration-300 ${
                location.pathname === item.path 
                  ? 'text-electric-blue translate-y-[-2px]' 
                  : 'text-text-dim hover:text-white'
              }`}
            >
              {item.name}
            </Link>
          ))}

          {/* Dynamic Holographic Visitor Monitor Badge */}
          <div className="flex items-center gap-2 px-3.5 py-1.5 bg-white/[0.04] backdrop-blur-md border border-white/15 rounded-full font-mono text-[9px] text-white/50 tracking-wider shadow-[0_2px_12px_rgba(0,0,0,0.2)]">
            <div className="w-1.5 h-1.5 rounded-full bg-lime-green animate-pulse" />
            <span className="uppercase text-[8px] tracking-[0.1em] font-bold">MONITOR:</span>
            <span className="text-lime-green font-black uppercase text-[9px] tracking-widest">{activeAgent}</span>
          </div>
          
          <a
            href={SITE_METADATA?.social?.whatsapp?.url ?? '#'}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 bg-lime-green text-black text-[10px] font-black uppercase tracking-[0.2em] rounded-full hover:scale-105 transition-transform"
          >
            Book Now
          </a>
        </div>

        <div className="flex md:hidden">
          <button 
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 text-white/50 hover:text-white transition-colors focus:outline-none"
            aria-label="Toggle Navigation Menu"
          >
            {isOpen ? <X size={22} className="text-lime-green" /> : <Menu size={22} />}
          </button>
        </div>
      </nav>

      {/* Interactive Mobile Dropdown Drop-down */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="fixed top-20 left-0 right-0 z-40 bg-black/95 backdrop-blur-3xl border-b border-white/10 md:hidden overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.8)]"
          >
            <div className="px-6 py-8 flex flex-col gap-6">
              <div className="flex flex-col gap-4">
                {navItems.map((item, idx) => (
                  <motion.div
                    key={item.name}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.05 }}
                  >
                    <Link
                      to={item.path}
                      onClick={() => setIsOpen(false)}
                      className={`block py-3 text-sm uppercase tracking-[0.25em] font-black transition-colors ${
                        location.pathname === item.path
                          ? 'text-electric-blue pl-2 border-l-2 border-electric-blue'
                          : 'text-text-dim hover:text-white pl-2 border-l-2 border-transparent'
                      }`}
                    >
                      {item.name}
                    </Link>
                  </motion.div>
                ))}
              </div>

              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.25 }}
                className="pt-6 border-t border-white/5 flex flex-col gap-4"
              >
                {/* Book Now Mobile Button */}
                <a
                  href={SITE_METADATA?.social?.whatsapp?.url ?? '#'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-4 bg-lime-green text-black text-sm font-black uppercase tracking-[0.25em] text-center rounded-full hover:bg-white transition-colors"
                >
                  Book Now
                </a>

                {/* Mobile Monitor Badge */}
                <div className="inline-flex self-start items-center gap-2 px-3.5 py-2 bg-white/[0.03] border border-white/10 rounded-full font-mono text-[9px] text-white/40 tracking-wider">
                  <div className="w-1.5 h-1.5 rounded-full bg-lime-green animate-pulse" />
                  <span className="uppercase text-[8px] tracking-[0.1em] font-bold">AGENT_NODE_MONITOR:</span>
                  <span className="text-lime-green font-black uppercase tracking-widest">{activeAgent}</span>
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
