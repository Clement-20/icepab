import { Menu, Terminal } from 'lucide-react';
import React from 'react';
import { Link, useLocation } from 'react-router-dom';

interface NavbarProps {
  onTerminalClick: () => void;
}

export default function Navbar({ onTerminalClick }: NavbarProps) {
  const location = useLocation();

  const navItems = [
    { name: 'Designs', path: '/designs' },
    { name: 'Stories', path: '/stories' },
    { name: 'Systems', path: '/systems' },
    { name: 'About', path: '/about' },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 h-20 px-6 md:px-12 flex items-center justify-between backdrop-blur-md border-b border-white/5 bg-charcoal/20">
      <div className="flex items-center gap-6">
        <Link to="/" className="flex items-center gap-3 group">
          <img 
            src="/logo.png" 
            alt="IcePab Logo" 
            className="w-10 h-10 object-contain brightness-110 group-hover:scale-110 transition-transform duration-500 hidden"
            referrerPolicy="no-referrer"
            onLoad={(e) => {
              (e.target as HTMLImageElement).classList.remove('hidden');
              (e.target as HTMLImageElement).nextElementSibling?.classList.add('hidden');
            }}
            onError={(e) => {
              (e.target as HTMLImageElement).style.display = 'none';
            }}
          />
          <div className="w-10 h-10 border border-electric-blue/30 bg-black/50 flex items-center justify-center font-black font-mono text-electric-blue text-xs tracking-tighter">
            IP
          </div>
          <div className="hidden sm:flex flex-col">
            <span className="font-mono text-[10px] text-white uppercase tracking-[0.2em] font-bold leading-none">
              IcePab
            </span>
            <span className="font-mono text-[8px] text-lime-green uppercase tracking-[0.2em] font-bold mt-1">
              Life OS // ACTIVE
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
        
        <div className="w-[1px] h-4 bg-white/10 mx-2" />
        
        <button 
          onClick={onTerminalClick}
          className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] font-bold text-electric-blue hover:text-white transition-colors group"
        >
          <Terminal size={14} className="group-hover:rotate-12 transition-transform" />
          Terminal
        </button>
      </div>

      <div className="flex md:hidden">
        <button className="p-2 text-white/50 hover:text-white transition-colors">
          <Menu size={20} />
        </button>
      </div>
    </nav>
  );
}
