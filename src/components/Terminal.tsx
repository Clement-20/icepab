import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Terminal as TerminalIcon, ChevronRight } from 'lucide-react';

interface TerminalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function Terminal({ isOpen, onClose }: TerminalProps) {
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<string[]>([
    'ICEPAB SYSTEMS // LIFE OS v2.0.12',
    '----------------------------------',
    '[ INFO ] INITIALIZING SECURE UPLINK...',
    '[ OK ] ENCRYPTION: AES-256-GCM',
    '[ OK ] PROTOCOL: WEB_MESH_v4',
    '[ OK ] AUTH: RO0T_GR@NTED',
    '',
    'CONNECTION ESTABLISHED. TYPE "help" FOR COMMANDS.',
    ''
  ]);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [history]);

  const handleCommand = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const cmd = input.toLowerCase().trim();
    const newHistory = [...history, `> ${input}`];

    switch (cmd) {
      case 'help':
        newHistory.push('Available commands:', '- nodes: List active system nodes', '- status: Check global system health', '- clear: Clear terminal history', '- exit: Close terminal', '- info: System information');
        break;
      case 'nodes':
        newHistory.push('Fetching node registry...', '001-ALPHA [ACTIVE] - OAU CBT Elite', '002-BETA  [ACTIVE] - Flex Store', '003-GAMMA [ACTIVE] - System Core');
        break;
      case 'status':
        newHistory.push('SCANNING SYSTEMS...', 'CPU Load: 42%', 'Memory Usage: 12.4GB / 32GB', 'Network Latency: 14ms', 'Security Protocol: AES-256-GCM');
        break;
      case 'clear':
        setHistory([]);
        setInput('');
        return;
      case 'exit':
        onClose();
        setInput('');
        return;
      case 'info':
        newHistory.push('IcePab Systems Core', 'Framework: Next.js 15.0.0-canary', 'Styling: Tailwind CSS v4.0.0-alpha', 'Environment: Production_Node_01');
        break;
      default:
        newHistory.push(`Command not found: ${cmd}. Type "help" for assistance.`);
    }

    setHistory(newHistory);
    setInput('');
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-12 pointer-events-none">
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="w-full max-w-4xl h-[600px] bg-charcoal border border-electric-blue/30 shadow-[0_0_50px_rgba(0,229,255,0.1)] flex flex-col pointer-events-auto overflow-hidden"
          >
            {/* Terminal Header */}
            <div className="flex items-center justify-between px-4 py-2 border-b border-electric-blue/20 bg-electric-blue/5">
              <div className="flex items-center gap-2">
                <TerminalIcon size={14} className="text-electric-blue" />
                <span className="text-[10px] font-mono tracking-widest text-electric-blue uppercase">SYSTEM_TERMINAL // ICEPAB_V2</span>
              </div>
              <button 
                onClick={onClose}
                className="p-1 hover:bg-electric-blue/10 rounded transition-colors"
              >
                <X size={14} className="text-text-dim hover:text-white" />
              </button>
            </div>

            {/* Terminal Content */}
            <div 
              ref={scrollRef}
              className="flex-grow p-6 overflow-y-auto font-mono text-sm space-y-2 no-scrollbar"
            >
              {history.map((line, i) => (
                <div key={i} className={line.startsWith('>') ? 'text-electric-blue' : 'text-gray-300'}>
                  {line}
                </div>
              ))}
              
              <form onSubmit={handleCommand} className="flex items-center gap-2 pt-2">
                <ChevronRight size={14} className="text-electric-blue animate-pulse" />
                <input
                  autoFocus
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  className="bg-transparent border-none outline-none flex-grow text-white placeholder-white/20"
                  placeholder="enter command..."
                />
              </form>
            </div>

            {/* Terminal Footer */}
            <div className="px-4 py-2 border-t border-electric-blue/10 bg-black/20 flex justify-between items-center text-[8px] font-mono text-text-dim uppercase tracking-widest">
              <span>User: ICEPAB_ROOT</span>
              <span>Port: 3000 // SSL_ACTIVE</span>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
