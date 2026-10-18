import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ExternalLink, RefreshCw, Globe, Shield, Monitor } from 'lucide-react';

interface LivePreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  project: {
    name: string;
    url: string;
    description: string;
    image?: string;
    category?: string;
    price?: string;
  } | null;
}

export default function LivePreviewModal({ isOpen, onClose, project }: LivePreviewModalProps) {
  const [viewMode, setViewMode] = useState<'iframe' | 'screenshot'>('iframe');
  const [isLoading, setIsLoading] = useState(true);

  if (!isOpen || !project) return null;

  const hasValidUrl = project.url && project.url.startsWith('http');
  const screenshotUrl = hasValidUrl 
    ? `https://api.microlink.io?url=${encodeURIComponent(project.url)}&screenshot=true&meta=true&embed=screenshot.url` 
    : project.image || '';

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xl">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-5xl bg-[#0a0a0c] border border-white/20 rounded-3xl overflow-hidden shadow-[0_25px_80px_rgba(0,0,0,0.9)] flex flex-col max-h-[90vh]"
        >
          {/* Modal Header */}
          <div className="flex items-center justify-between px-6 py-4 bg-white/[0.04] border-b border-white/10">
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 rounded-full bg-electric-blue animate-pulse" />
              <div>
                <h3 className="font-bold text-sm uppercase tracking-wider text-white">{project.name} // Live Preview</h3>
                <p className="text-[10px] font-mono text-text-dim">{project.url || 'Internal System Node'}</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              {hasValidUrl && (
                <div className="flex bg-black/60 border border-white/10 rounded-xl p-1 text-xs font-mono">
                  <button
                    onClick={() => setViewMode('iframe')}
                    className={`px-3 py-1 rounded-lg transition-colors ${viewMode === 'iframe' ? 'bg-electric-blue text-black font-bold' : 'text-text-dim hover:text-white'}`}
                  >
                    Live App
                  </button>
                  <button
                    onClick={() => setViewMode('screenshot')}
                    className={`px-3 py-1 rounded-lg transition-colors ${viewMode === 'screenshot' ? 'bg-electric-blue text-black font-bold' : 'text-text-dim hover:text-white'}`}
                  >
                    Screenshot Card
                  </button>
                </div>
              )}

              {hasValidUrl && (
                <a
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-lime-green text-black font-mono font-bold text-[10px] uppercase rounded-xl hover:bg-white transition-colors"
                >
                  Open External <ExternalLink size={12} />
                </a>
              )}

              <button
                onClick={onClose}
                className="p-2 text-white/50 hover:text-white bg-white/5 hover:bg-white/10 rounded-xl transition-colors"
              >
                <X size={18} />
              </button>
            </div>
          </div>

          {/* Modal Body */}
          <div className="relative flex-1 bg-black/40 min-h-[500px] overflow-hidden flex flex-col items-center justify-center">
            {hasValidUrl ? (
              viewMode === 'iframe' ? (
                <div className="w-full h-full flex flex-col relative">
                  {isLoading && (
                    <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#0a0a0c] z-10 font-mono text-xs text-text-dim space-y-3">
                      <div className="w-6 h-6 border-2 border-electric-blue border-t-transparent rounded-full animate-spin" />
                      <span>Loading live preview for {project.name}...</span>
                    </div>
                  )}
                  <iframe
                    src={project.url}
                    title={project.name}
                    className="w-full h-[600px] border-0 bg-white"
                    onLoad={() => setIsLoading(false)}
                    sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
                  />
                  <div className="p-3 bg-white/[0.02] border-t border-white/5 flex items-center justify-between text-[10px] font-mono text-text-dim">
                    <span>Target URL: {project.url}</span>
                    <span className="text-lime-green flex items-center gap-1">
                      <Shield size={10} /> Secure Sandbox Frame
                    </span>
                  </div>
                </div>
              ) : (
                <div className="p-8 w-full h-full flex flex-col items-center justify-center">
                  <div className="max-w-3xl w-full bg-surface border border-white/10 rounded-2xl overflow-hidden shadow-2xl">
                    <div className="aspect-video bg-black/50 relative overflow-hidden flex items-center justify-center">
                      <img
                        src={screenshotUrl}
                        alt={`${project.name} preview`}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          // Fallback if microlink screenshot fails
                          (e.target as HTMLImageElement).src = project.image || 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=800&auto=format&fit=crop';
                        }}
                      />
                    </div>
                    <div className="p-6">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-[10px] font-mono text-electric-blue uppercase tracking-widest">{project.category || 'Web Application'}</span>
                        {project.price && <span className="text-sm font-black text-lime-green font-mono">{project.price}</span>}
                      </div>
                      <h4 className="text-2xl font-bold uppercase tracking-tight text-white">{project.name}</h4>
                      <p className="text-text-dim text-sm mt-2">{project.description}</p>
                    </div>
                  </div>
                </div>
              )
            ) : (
              <div className="p-12 text-center max-w-md">
                <div className="w-16 h-16 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center mx-auto mb-4 text-electric-blue">
                  <Globe size={32} />
                </div>
                <h4 className="text-lg font-bold uppercase text-white mb-2">{project.name}</h4>
                <p className="text-text-dim text-xs mb-6">{project.description}</p>
                <div className="p-4 bg-white/[0.03] border border-white/10 rounded-xl text-xs font-mono text-lime-green">
                  Internal Architectural Prototype // No public external URL configured.
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
