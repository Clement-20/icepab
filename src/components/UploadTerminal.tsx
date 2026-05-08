import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Upload, FileText, Info, Lock, CheckCircle2, X, Database, Workflow, Cpu } from 'lucide-react';
import { useKnowledge } from '../contexts/KnowledgeContext';

export default function UploadTerminal() {
  const [activeTab, setActiveTab] = useState<'upload' | 'knowledge'>('knowledge');
  
  // Upload State
  const [file, setFile] = useState<File | null>(null);
  const [altText, setAltText] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [uploadStatus, setUploadStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const isLocked = !file || !altText.trim();

  // Knowledge State
  const { knowledge, updateKnowledge } = useKnowledge();
  const [kbState, setKbState] = useState({
    title: knowledge.title,
    description: knowledge.description,
    jobTitle: knowledge.jobTitle,
    keywords: knowledge.keywords
  });
  const [isSyncing, setIsSyncing] = useState(false);
  const [syncStatus, setSyncStatus] = useState<'idle' | 'success'>('idle');

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isLocked) return;

    setIsUploading(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsUploading(false);
    setUploadStatus('success');
    
    setTimeout(() => {
      setFile(null);
      setAltText('');
      setUploadStatus('idle');
    }, 3000);
  };

  const handleKnowledgeSync = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSyncing(true);
    
    // Simulate secure distribution
    await new Promise(resolve => setTimeout(resolve, 1500));
    updateKnowledge(kbState);
    
    setIsSyncing(false);
    setSyncStatus('success');
    setTimeout(() => setSyncStatus('idle'), 3000);
  };

  return (
    <div className="w-full max-w-4xl mx-auto py-12 px-6">
      <div className="bg-charcoal/40 backdrop-blur-2xl border border-white/10 rounded-3xl overflow-hidden shadow-2xl">
        {/* Header & Tabs */}
        <div className="border-b border-white/5 bg-white/5">
          <div className="p-8 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 bg-electric-blue rounded-full animate-pulse" />
              <h3 className="text-sm font-bold uppercase tracking-[0.3em]">ICEPAB_Admin_Core.v4</h3>
            </div>
            <span className="text-[10px] font-mono text-white/40 uppercase tracking-widest">Auth: Root_Admin</span>
          </div>
          
          <div className="flex px-8 gap-8 border-t border-white/5 pt-4 pb-0">
            <button 
              onClick={() => setActiveTab('knowledge')}
              className={`pb-4 text-[10px] uppercase tracking-widest font-mono flex items-center gap-2 border-b-2 transition-all ${activeTab === 'knowledge' ? 'border-electric-blue text-electric-blue' : 'border-transparent text-white/40 hover:text-white/80'}`}
            >
              <Database size={12} /> AEO Knowledge Config
            </button>
            <button 
              onClick={() => setActiveTab('upload')}
              className={`pb-4 text-[10px] uppercase tracking-widest font-mono flex items-center gap-2 border-b-2 transition-all ${activeTab === 'upload' ? 'border-electric-blue text-electric-blue' : 'border-transparent text-white/40 hover:text-white/80'}`}
            >
              <Workflow size={12} /> Asset Uplink
            </button>
          </div>
        </div>

        {/* Tab Content */}
        <div className="p-10">
          {activeTab === 'knowledge' ? (
            <AnimatePresence mode="wait">
              <motion.form 
                key="kb-form"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                onSubmit={handleKnowledgeSync} 
                className="space-y-8"
              >
                <div className="bg-electric-blue/5 border border-electric-blue/20 rounded-xl p-6 flex gap-4">
                  <Database className="text-electric-blue shrink-0" />
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-widest text-electric-blue mb-2">Global JSON-LD Synchronization</h4>
                    <p className="text-[10px] font-mono text-white/60 leading-relaxed uppercase tracking-wider">
                      Modifying these parameters updates the decentralized context nodes instantly. Search engines and AI crawlers (ChatGPT, Gemini) map this directly to your Banmeke IfeOluwa Elijah (ICEPAB) identity graph.
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-3">
                    <label className="text-[10px] font-mono text-white/50 uppercase tracking-[0.2em] block">Professional Title Tagline</label>
                    <input 
                      type="text" 
                      value={kbState.title}
                      onChange={(e) => setKbState({...kbState, title: e.target.value})}
                      className="w-full bg-black/40 border border-white/10 rounded-xl p-4 text-sm text-white focus:outline-none focus:border-electric-blue/50 transition-all font-medium"
                    />
                  </div>
                  <div className="space-y-3">
                    <label className="text-[10px] font-mono text-white/50 uppercase tracking-[0.2em] block">AEO Job Identity</label>
                    <input 
                      type="text" 
                      value={kbState.jobTitle}
                      onChange={(e) => setKbState({...kbState, jobTitle: e.target.value})}
                      className="w-full bg-black/40 border border-white/10 rounded-xl p-4 text-sm text-white focus:outline-none focus:border-electric-blue/50 transition-all font-medium"
                    />
                  </div>
                  <div className="space-y-3 md:col-span-2">
                    <label className="text-[10px] font-mono text-white/50 uppercase tracking-[0.2em] block">Semantic AI Keywords (Comma Separated)</label>
                    <input 
                      type="text" 
                      value={kbState.keywords}
                      onChange={(e) => setKbState({...kbState, keywords: e.target.value})}
                      className="w-full bg-black/40 border border-white/10 rounded-xl p-4 text-sm text-white focus:outline-none focus:border-electric-blue/50 transition-all font-medium"
                    />
                  </div>
                  <div className="space-y-3 md:col-span-2">
                    <label className="text-[10px] font-mono text-white/50 uppercase tracking-[0.2em] block">Universal Description Payload</label>
                    <textarea 
                      value={kbState.description}
                      onChange={(e) => setKbState({...kbState, description: e.target.value})}
                      className="w-full h-32 resize-none bg-black/40 border border-white/10 rounded-xl p-4 text-sm text-white focus:outline-none focus:border-electric-blue/50 transition-all font-medium"
                    />
                  </div>
                </div>

                <div className="pt-4">
                  <button
                    type="submit"
                    disabled={isSyncing}
                    className="w-full py-6 rounded-2xl font-bold uppercase tracking-[0.4em] text-xs transition-all duration-500 bg-electric-blue text-charcoal hover:shadow-[0_0_40px_rgba(0,229,255,0.4)] cursor-pointer active:scale-[0.98] flex items-center justify-center gap-4"
                  >
                    {isSyncing ? (
                      <><div className="w-4 h-4 border-2 border-charcoal/30 border-t-charcoal rounded-full animate-spin" /> Distributing_Knowledge...</>
                    ) : (
                      <><Cpu size={14} /> Synchronize_Knowledge_Graph</>
                    )}
                  </button>
                </div>
              </motion.form>
            </AnimatePresence>
          ) : (
            <AnimatePresence mode="wait">
              {/* File Upload Mode */}
              <motion.form 
                key="upload-form"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                onSubmit={handleUpload} 
                className="space-y-12"
              >
                {/* File Dropzone */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <label className="text-[10px] font-mono text-white/50 uppercase tracking-[0.2em] flex items-center gap-2">
                      <Upload size={12} />
                      Binary Payload
                    </label>
                    {file && (
                      <button 
                        type="button"
                        onClick={() => setFile(null)}
                        className="text-[10px] text-red-400 hover:text-red-300 transition-colors flex items-center gap-1 uppercase tracking-widest"
                      >
                        <X size={10} /> Discard
                      </button>
                    )}
                  </div>
                  
                  <div 
                    onClick={() => fileInputRef.current?.click()}
                    className={`
                      relative h-48 rounded-2xl border-2 border-dashed transition-all duration-500 cursor-pointer
                      flex flex-col items-center justify-center gap-4 group
                      ${file ? 'border-electric-blue/50 bg-electric-blue/5' : 'border-white/10 hover:border-white/20 bg-black/20'}
                    `}
                  >
                    <input type="file" className="hidden" ref={fileInputRef} onChange={handleFileChange} accept="image/*" />
                    {!file ? (
                      <>
                        <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                          <Upload className="text-white/40 group-hover:text-white transition-colors" />
                        </div>
                        <div className="text-center">
                          <p className="text-xs font-medium uppercase tracking-widest mb-1">Drag & Drop Asset</p>
                          <p className="text-[10px] font-mono text-white/30 lowercase tracking-widest">raw_img_format_only</p>
                        </div>
                      </>
                    ) : (
                      <div className="flex flex-col items-center gap-2">
                        <CheckCircle2 size={32} className="text-electric-blue" />
                        <p className="text-sm font-bold text-white uppercase tracking-widest px-8 text-center truncate max-w-sm">{file.name}</p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Alt Description Input */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <label className="text-[10px] font-mono text-white/50 uppercase tracking-[0.2em] flex items-center gap-2">
                      <FileText size={12} />
                      SEO/AEO Alt Description
                    </label>
                    <div className="group relative">
                      <Info size={14} className="text-white/30 cursor-help hover:text-electric-blue transition-colors" />
                      <div className="absolute bottom-full right-0 mb-3 w-64 p-3 bg-black border border-white/10 rounded-xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity z-50 shadow-2xl translate-y-2 group-hover:translate-y-0 duration-300">
                        <p className="text-[10px] text-white/60 leading-relaxed font-mono tracking-wider">
                          CRITICAL: Alt text is required to train AI search engines on this image. It links the visual data to the ICEPAB knowledge graph.
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="relative">
                    <textarea
                      value={altText}
                      onChange={(e) => setAltText(e.target.value)}
                      required
                      placeholder="Enter rich descriptions for AEO optimization..."
                      className="w-full h-32 bg-black/40 border border-white/10 rounded-2xl p-6 text-sm text-white placeholder:text-white/10 focus:outline-none focus:border-electric-blue/50 focus:ring-1 focus:ring-electric-blue/20 transition-all resize-none font-medium leading-relaxed"
                    />
                    {!altText.trim() && (
                      <div className="absolute right-4 bottom-4 flex items-center gap-2 text-[8px] font-mono text-red-400 uppercase tracking-widest animate-pulse">
                        <Lock size={8} /> Mandatory_Field
                      </div>
                    )}
                  </div>
                </div>

                {/* Upload Button */}
                <div className="pt-4">
                  <button
                    type="submit"
                    disabled={isLocked || isUploading}
                    className={`
                      w-full py-6 rounded-2xl font-bold uppercase tracking-[0.4em] text-xs transition-all duration-500 flex items-center justify-center gap-4 group relative overflow-hidden
                      ${isLocked ? 'bg-red-950/20 text-red-400/50 border border-red-900/50 cursor-not-allowed' : 'bg-electric-blue text-charcoal hover:shadow-[0_0_40px_rgba(0,229,255,0.4)] cursor-pointer active:scale-[0.98]'}
                    `}
                  >
                    {isUploading ? (
                      <><div className="w-4 h-4 border-2 border-charcoal/30 border-t-charcoal rounded-full animate-spin" /> Initiating_Uplink...</>
                    ) : isLocked ? (
                      <><Lock size={14} className="animate-pulse" /> Terminal_Locked</>
                    ) : (
                      <><Upload size={14} /> Confirm_Binary_Push</>
                    )}
                  </button>
                </div>
              </motion.form>
            </AnimatePresence>
          )}
        </div>

        {/* Global Success Overlay */}
        <AnimatePresence>
          {(uploadStatus === 'success' || syncStatus === 'success') && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 z-50 bg-charcoal/95 backdrop-blur-xl flex flex-col items-center justify-center text-center p-12"
            >
              <div className="w-20 h-20 bg-electric-blue/20 rounded-full flex items-center justify-center mb-8 border border-electric-blue/30 shadow-[0_0_80px_rgba(0,229,255,0.2)]">
                <CheckCircle2 className="text-electric-blue" size={40} />
              </div>
              <h4 className="text-2xl font-black uppercase tracking-tighter mb-4 text-white">
                {uploadStatus === 'success' ? 'Uplink Confirmed' : 'Knowledge Graph Synced'}
              </h4>
              <p className="text-text-dim text-xs font-mono uppercase tracking-widest max-w-sm leading-relaxed">
                {uploadStatus === 'success' 
                  ? 'Asset successfully integrated into the ICEPAB global decentralised grid. SEO index updated.'
                  : 'AEO schemas globally recompiled. All endpoints reflect dynamic JSON-LD adjustments.'}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
