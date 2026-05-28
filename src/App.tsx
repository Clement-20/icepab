import React, { useState } from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'motion/react';
import { Linkedin, Github } from 'lucide-react';
import Navbar from './components/Navbar';
import SEO from './components/SEO';
import InteractiveBackground from './components/InteractiveBackground';
import { Home, AdminPage, AboutPage, DesignsPage, StoriesPage, SystemsPage } from './components/PageContainers';
import SingleStoryPage from './components/SingleStoryPage';
import AdminAccessModal from './components/AdminAccessModal';
import CyberDeck from './components/CyberDeck';
import CyberLockGate from './components/CyberLockGate';
import { SITE_METADATA } from './metadata';

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

export default function App() {
  const [isAdminModalOpen, setIsAdminModalOpen] = useState(false);
  const [isXrActive, setIsXrActive] = useState(false);
  const [spatialDepth, setSpatialDepth] = useState(12);
  const [notification, setNotification] = useState<string | null>(null);
  const [isGateUnlocked, setIsGateUnlocked] = useState(() => {
    return sessionStorage.getItem('icepab_gate_unlocked') === 'true';
  });
  const location = useLocation();

  const handleUnlockSuccess = () => {
    sessionStorage.setItem('icepab_gate_unlocked', 'true');
    setIsGateUnlocked(true);
    setNotification("WELCOME TO ICEPAB SYSTEMS");
    setTimeout(() => setNotification(null), 5000);
  };

  const handleAdminSuccess = () => {
    setNotification("ADMIN OVERRIDE ACCEPTED");
    setTimeout(() => setNotification(null), 3000);
  };

  React.useEffect(() => {
    const alerts = [
      "AI State: Gemini 2.0 active.",
      "AR Spatial coordinates updated.",
      "Hacker console initialized.",
      "CBT node integrity verified 100%.",
      "Network latency: stabilized @ 12ms."
    ];

    const interval = setInterval(() => {
      const randomAlert = alerts[Math.floor(Math.random() * alerts.length)];
      setNotification(randomAlert);
      setTimeout(() => setNotification(null), 3000);
    }, 20000); // More frequent cyberpunk alerts

    return () => clearInterval(interval);
  }, []);

  const spatialMatrixStyle = isXrActive ? {
    transform: `perspective(1000px) rotateX(${(spatialDepth / 4).toFixed(1)}deg) rotateY(${- (spatialDepth / 4).toFixed(1)}deg) scale(0.96)`,
    transition: 'transform 0.6s cubic-bezier(0.22, 1, 0.36, 1)',
    boxShadow: '0 0 50px rgba(0, 229, 255, 0.08)',
  } : {
    transition: 'transform 0.6s cubic-bezier(0.22, 1, 0.36, 1)',
  };

  return (
    <main className="selection:bg-electric-blue/30 selection:text-white min-h-screen bg-charcoal relative">
      <SEO />
      
      {/* Cyber Lock Gate screen overlay if locked */}
      <AnimatePresence>
        {!isGateUnlocked && (
          <CyberLockGate onUnlock={handleUnlockSuccess} />
        )}
      </AnimatePresence>
      
      {/* Interactive Cyberpunk Background */}
      <InteractiveBackground isXrActive={isXrActive} />

      {/* CyberDeck Hardware control panel */}
      <CyberDeck 
        isXrActive={isXrActive} 
        onXrToggle={() => setIsXrActive(!isXrActive)} 
        spatialDepth={spatialDepth} 
        onSpatialDepthChange={setSpatialDepth} 
      />

      {/* Admin Access Modal */}
      <AdminAccessModal 
        isOpen={isAdminModalOpen} 
        onClose={() => setIsAdminModalOpen(false)} 
        onSuccess={handleAdminSuccess}
      />

      {/* Real-time System Notifications */}
      <div className="fixed bottom-12 right-12 z-[90] pointer-events-none">
        <AnimatePresence>
          {notification && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className={`bg-charcoal/80 border-l-2 py-4 px-6 backdrop-blur-md shadow-[0_0_30px_rgba(0,0,0,0.5)] flex items-center gap-4 transition-colors duration-500 ${isXrActive ? 'border-lime-green' : 'border-electric-blue'}`}
            >
              <div className={`w-1.5 h-1.5 rounded-full animate-ping ${isXrActive ? 'bg-lime-green' : 'bg-electric-blue'}`} />
              <span className="font-mono text-[10px] text-white uppercase tracking-widest">{notification}</span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      
      <div className="relative z-10" style={spatialMatrixStyle}>
        <Navbar />
        
        <AnimatePresence mode="wait">
          {/* @ts-ignore - key is required for AnimatePresence but not in RoutesProps */}
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<Home />} />
            <Route path="/admin" element={<AdminPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/designs" element={<DesignsPage />} />
            <Route path="/stories" element={<StoriesPage />} />
            <Route path="/stories/:id" element={<SingleStoryPage />} />
            <Route path="/systems" element={<SystemsPage />} />
          </Routes>
        </AnimatePresence>
        
        <footer className="relative py-24 px-6 border-t border-accent-border bg-black/40 backdrop-blur-md">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-12">
            <div>
              <div className="flex items-center gap-4 mb-6">
                <img 
                  src="/logo.png" 
                  alt="IcePab Logo" 
                  className="w-12 h-12 object-contain brightness-110 hidden"
                  referrerPolicy="no-referrer"
                  onLoad={(e) => {
                    (e.target as HTMLImageElement).classList.remove('hidden');
                    (e.target as HTMLImageElement).nextElementSibling?.classList.add('hidden');
                  }}
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = 'none';
                  }}
                />
                <div className="w-12 h-12 border border-lime-green/30 bg-black/50 flex items-center justify-center font-black font-mono text-lime-green text-sm tracking-tighter">
                  IP
                </div>
                <div>
                  <span className="font-bold tracking-[0.3em] text-sm uppercase block leading-none">IcePab Life OS</span>
                  <span className="text-[8px] font-mono text-lime-green uppercase tracking-widest mt-1 block">VIRTUALIZED INFRASTRUCTURE</span>
                </div>
              </div>
              <p className="text-text-dim text-xs font-mono max-w-sm leading-relaxed uppercase tracking-wider">
                Digital resource optimization for distributed networks. 
                Built for the high-concurrency era.
              </p>
            </div>
            
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-16">
              <div className="flex flex-col gap-4">
                <span className="text-[10px] uppercase tracking-[0.4em] font-bold text-white/30">Connect</span>
                <div className="flex gap-4">
                  <a href={SITE_METADATA.social.x.url} target="_blank" rel="noreferrer" title={`X: ${SITE_METADATA.social.x.handle}`} className="text-text-dim hover:text-electric-blue transition-colors">
                    <XIcon size={18} />
                  </a>
                  <a href={SITE_METADATA.social.linkedin.url} target="_blank" rel="noreferrer" title={`LinkedIn: ${SITE_METADATA.social.linkedin.handle}`} className="text-text-dim hover:text-electric-blue transition-colors">
                    <Linkedin size={18} />
                  </a>
                  <a href={SITE_METADATA.social.github.url} target="_blank" rel="noreferrer" title={`GitHub: ${SITE_METADATA.social.github.handle}`} className="text-text-dim hover:text-electric-blue transition-colors">
                    <Github size={18} />
                  </a>
                </div>
              </div>
              <div className="flex flex-col gap-4">
                <span className="text-[10px] uppercase tracking-[0.4em] font-bold text-white/30">Protocol</span>
                <Link to="/systems" className="text-xs text-text-dim hover:text-electric-blue transition-colors">V3_DOCS</Link>
                <Link to="/stories" className="text-xs text-text-dim hover:text-electric-blue transition-colors">TRANSMISSIONS</Link>
              </div>
              <div className="flex flex-col gap-4">
                <span className="text-[10px] uppercase tracking-[0.4em] font-bold text-white/30">OS</span>
                <Link to="/designs" className="text-xs text-text-dim hover:text-electric-blue transition-colors">INTERFACE_LOGS</Link>
                <button 
                  onClick={() => setIsAdminModalOpen(true)} 
                  className="text-left w-fit opacity-0 hover:opacity-100 transition-opacity duration-300 text-xs text-electric-blue font-mono uppercase tracking-widest text-[8px]"
                >
                  ADMIN_ACCESS
                </button>
                <Link to="/" className="text-xs text-text-dim hover:text-electric-blue transition-colors">ROOT_NODE</Link>
              </div>
            </div>
          </div>
          
          <div className="max-w-7xl mx-auto mt-24 flex flex-col md:flex-row justify-between pt-8 border-t border-accent-border opacity-30">
            <span className="text-[10px] font-mono tracking-widest uppercase">© 2026 ICEPAB_LIFE_OS // ALL_RIGHTS_RESERVED</span>
            
            {/* Hidden System Identity for AI/SEO Indexing */}
            <div className="sr-only" aria-hidden="true">
              <span id="system-identity">System Identity Archive: {SITE_METADATA.allNames.join(", ")}</span>
              <p>ICEPAB acronym origin: {SITE_METADATA.acronymMeaning}</p>
            </div>

            <span className="text-[10px] font-mono tracking-widest uppercase mt-4 md:mt-0">ENCRYPTION: AES-256-GCM // STATUS: NOMINAL</span>
          </div>
        </footer>
      </div>
    </main>
  );
}
