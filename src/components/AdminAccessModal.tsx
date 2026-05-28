import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Lock, ShieldAlert, MailCheck, CheckCircle2, ChevronRight, ExternalLink, KeyRound } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface AdminAccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export default function AdminAccessModal({ isOpen, onClose, onSuccess }: AdminAccessModalProps) {
  const [code, setCode] = useState('');
  const [otp, setOtp] = useState('');
  const [error, setError] = useState(false);
  const [otpError, setOtpError] = useState(false);
  const [view, setView] = useState<'login' | 'forgot' | 'emailSent' | 'verifyOtp'>('login');
  const [isSending, setIsSending] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleAccess = (e: React.FormEvent) => {
    e.preventDefault();
    if (code === '010720') {
      setError(false);
      onSuccess();
      navigate('/admin');
      onClose();
      setCode('');
    } else {
      setError(true);
      setTimeout(() => setError(false), 2000);
      setCode('');
    }
  };

  const handleForgotCode = () => {
    setView('forgot');
  };

  const handleSendRecovery = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSending(true);
    try {
      const res = await fetch('/api/recovery/request', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }
      });
      const data = await res.json();
      if (data.success) {
        setIsSending(false);
        setPreviewUrl(data.previewUrl);
        setView('emailSent');
      } else {
        throw new Error(data.error || 'Failed to dispatch recovery payload');
      }
    } catch (err) {
      setIsSending(false);
      alert('Security Dispatch Failed: ' + (err instanceof Error ? err.message : 'Network error'));
    }
  };

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsVerifying(true);
    try {
      const res = await fetch('/api/recovery/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ otp })
      });
      const data = await res.json();
      if (data.success) {
        setIsVerifying(false);
        setOtp('');
        onSuccess();
        navigate('/admin');
        onClose();
        // Reset view for next open
        setView('login');
      } else {
        throw new Error(data.error || 'Verification pin invalid');
      }
    } catch (err: any) {
      setIsVerifying(false);
      setOtpError(true);
      setTimeout(() => setOtpError(false), 2000);
    }
  };

  const handleClose = () => {
    onClose();
    // Delay resetting state slightly to prevent flash during fade-out
    setTimeout(() => {
      setView('login');
      setCode('');
      setOtp('');
      setPreviewUrl(null);
    }, 200);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <React.Fragment>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[100]"
            onClick={handleClose}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] max-w-md bg-black/60 backdrop-blur-3xl border border-electric-blue/30 rounded-2xl shadow-[0_24px_64px_rgba(0,0,0,0.8),inset_0_1px_1px_rgba(255,255,255,0.15),0_0_30px_rgba(0,229,255,0.1)] z-[101] overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-white/5">
              <div className="flex items-center gap-3 text-electric-blue">
                <Lock size={16} />
                <span className="font-mono text-[10px] uppercase tracking-[0.3em] font-bold">
                  {view === 'emailSent' ? 'Recovery Initiated' : view === 'verifyOtp' ? 'OTP Verification' : 'System Override'}
                </span>
              </div>
              <button 
                onClick={handleClose}
                className="text-white/30 hover:text-white transition-colors"
              >
                <X size={16} />
              </button>
            </div>

            <div className="p-8">
              <AnimatePresence mode="wait">
                {view === 'login' && (
                  <motion.form 
                    key="login"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    onSubmit={handleAccess} 
                    className="space-y-6"
                  >
                    <div>
                      <label className="text-[10px] font-mono text-white/50 uppercase tracking-[0.2em] mb-4 block text-center">
                        Authenticate Root Access
                      </label>
                      <input
                        type="password"
                        value={code}
                        onChange={(e) => setCode(e.target.value)}
                        placeholder="••••••"
                        autoFocus
                        className={`w-full bg-black/50 border rounded-xl p-4 text-center text-2xl tracking-[0.5em] font-mono text-white focus:outline-none transition-all ${error ? 'border-red-500/50 shadow-[0_0_20px_rgba(239,68,68,0.2)] text-red-500' : 'border-white/10 focus:border-electric-blue/50'}`}
                      />
                      {error && (
                        <p className="text-[10px] text-red-400 font-mono uppercase tracking-widest text-center mt-3 flex items-center justify-center gap-2">
                          <ShieldAlert size={12} /> Access Denied
                        </p>
                      )}
                    </div>

                    <button
                      type="submit"
                      disabled={!code}
                      className="w-full py-4 bg-white/5 hover:bg-electric-blue/10 border border-white/10 hover:border-electric-blue/50 rounded-xl font-bold uppercase tracking-[0.3em] text-[10px] text-white transition-all disabled:opacity-30 disabled:cursor-not-allowed group flex justify-center items-center gap-2"
                    >
                      Authenticate <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
                    </button>

                    <button
                      type="button"
                      onClick={handleForgotCode}
                      className="w-full text-center text-[10px] font-mono text-white/30 hover:text-white/70 uppercase tracking-widest transition-colors mt-4 animate-pulse"
                    >
                      Recover Access Code
                    </button>
                  </motion.form>
                )}

                {view === 'forgot' && (
                  <motion.form 
                    key="forgot"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    onSubmit={handleSendRecovery}
                    className="space-y-6 text-center"
                  >
                    <div className="w-16 h-16 bg-electric-blue/10 border border-electric-blue/30 rounded-full mx-auto flex items-center justify-center text-electric-blue mb-6">
                      <ShieldAlert size={24} />
                    </div>
                    <h3 className="text-white font-bold tracking-widest uppercase text-sm">Security Protocol Activated</h3>
                    <p className="text-[10px] text-text-dim font-mono leading-relaxed uppercase tracking-wider px-4">
                      Initiating secure recovery sequence. An encrypted verification payload will be dispatched to the system owner's registered transmission channel (banmekeifeoluwa@gmail.com).
                    </p>

                    <div className="pt-4 flex flex-col gap-3">
                      <button
                        type="submit"
                        disabled={isSending}
                        className="w-full py-4 bg-electric-blue/10 hover:bg-electric-blue/20 border border-electric-blue/50 rounded-xl font-bold uppercase tracking-[0.3em] text-[10px] text-electric-blue transition-all relative overflow-hidden"
                      >
                        {isSending ? (
                          <span className="flex items-center justify-center gap-2">
                            <div className="w-3 h-3 border-2 border-electric-blue/30 border-t-electric-blue rounded-full animate-spin" />
                            Dispatching...
                          </span>
                        ) : (
                          "Send Verification Dispatch"
                        )}
                      </button>
                      <button
                        type="button"
                        onClick={() => setView('login')}
                        disabled={isSending}
                        className="w-full py-4 bg-white/5 hover:bg-white/10 border border-white/5 rounded-xl font-bold uppercase tracking-[0.3em] text-[10px] text-white/50 hover:text-white transition-all disabled:opacity-30"
                      >
                        Cancel Sequence
                      </button>
                    </div>
                  </motion.form>
                )}

                {view === 'emailSent' && (
                  <motion.div 
                    key="emailSent"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="text-center py-4 space-y-6"
                  >
                    <div className="w-20 h-20 bg-lime-green/10 border border-lime-green/30 rounded-full mx-auto flex items-center justify-center text-lime-green shadow-[0_0_30px_rgba(50,205,50,0.2)]">
                      <MailCheck size={32} />
                    </div>
                    <div>
                      <h3 className="text-white font-bold tracking-[0.2em] uppercase text-sm mb-3">Recovery Dispatched</h3>
                      <p className="text-[10px] text-text-dim font-mono leading-relaxed uppercase tracking-wider max-w-[280px] mx-auto">
                        Verification payload has been securely routed to the root owner's address. Please check your email inbox.
                      </p>
                    </div>

                    {previewUrl && (
                      <div className="p-4 bg-black/40 border border-white/5 rounded-xl text-center space-y-3">
                        <span className="text-[9px] font-mono text-electric-blue/70 uppercase tracking-[0.25em] block">
                          Local Sandbox Mailbox Link
                        </span>
                        <a
                          href={previewUrl}
                          target="_blank"
                          referrerPolicy="no-referrer"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 px-4 py-2 bg-electric-blue/10 hover:bg-electric-blue/20 border border-electric-blue/30 hover:border-electric-blue/60 text-electric-blue font-mono font-bold text-[10px] rounded-lg tracking-wider transition-all"
                        >
                          Open Sandbox Inbox <ExternalLink size={12} />
                        </a>
                      </div>
                    )}

                    <button
                      onClick={() => setView('verifyOtp')}
                      className="w-full py-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl font-bold uppercase tracking-[0.3em] text-[10px] text-white transition-all flex justify-center items-center gap-2"
                    >
                      Enter Security Pin <ChevronRight size={14} />
                    </button>
                  </motion.div>
                )}

                {view === 'verifyOtp' && (
                  <motion.form 
                    key="verifyOtp"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    onSubmit={handleVerifyOtp}
                    className="space-y-6"
                  >
                    <div>
                      <label className="text-[10px] font-mono text-white/50 uppercase tracking-[0.2em] mb-4 block text-center">
                        Enter 6-Digit security OTP
                      </label>
                      <input
                        type="text"
                        maxLength={6}
                        value={otp}
                        onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
                        placeholder="000000"
                        autoFocus
                        className={`w-full bg-black/50 border rounded-xl p-4 text-center text-2xl tracking-[0.5em] font-mono text-white focus:outline-none transition-all ${otpError ? 'border-red-500/50 shadow-[0_0_20px_rgba(239,68,68,0.2)] text-red-500' : 'border-white/10 focus:border-electric-blue/50'}`}
                      />
                      {otpError && (
                        <p className="text-[10px] text-red-400 font-mono uppercase tracking-widest text-center mt-3 flex items-center justify-center gap-2">
                          <ShieldAlert size={12} /> Invalid OTP Token
                        </p>
                      )}
                    </div>

                    <div className="flex flex-col gap-3">
                      <button
                        type="submit"
                        disabled={otp.length !== 6 || isVerifying}
                        className="w-full py-4 bg-electric-blue/10 hover:bg-electric-blue/20 border border-electric-blue/50 rounded-xl font-bold uppercase tracking-[0.3em] text-[10px] text-electric-blue transition-all disabled:opacity-30 disabled:cursor-not-allowed flex justify-center items-center gap-2"
                      >
                        {isVerifying ? (
                          <span className="flex items-center justify-center gap-2">
                            <div className="w-3 h-3 border-2 border-electric-blue/30 border-t-electric-blue rounded-full animate-spin" />
                            Verifying...
                          </span>
                        ) : (
                          <React.Fragment>
                            Confirm & Override <CheckCircle2 size={14} />
                          </React.Fragment>
                        )}
                      </button>
                      <button
                        type="button"
                        onClick={() => setView('login')}
                        className="w-full py-4 bg-white/5 hover:bg-white/10 border border-white/5 rounded-xl font-bold uppercase tracking-[0.3em] text-[10px] text-white/50 hover:text-white transition-all"
                      >
                        Back to Login
                      </button>
                    </div>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </React.Fragment>
      )}
    </AnimatePresence>
  );
}
