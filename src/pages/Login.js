import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Icon } from '@iconify/react';
import authService from '../services/authService';

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await authService.login({ email, password });
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Invalid email or password. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/20 rounded-full blur-[120px] animate-pulse" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-tertiary/10 rounded-full blur-[120px] animate-pulse delay-700" />

      <div className="w-full max-w-md z-10">
        <div className="bg-white/[0.03] backdrop-blur-xl border border-white/10 rounded-[2rem] p-8 md:p-10 shadow-2xl shadow-black/50">
          {/* Logo & Header */}
          <div className="text-center mb-10">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-primary rounded-2xl mb-6 shadow-xl shadow-primary/30 rotate-3 hover:rotate-0 transition-transform duration-500">
              <Icon icon="lucide:home" className="text-white text-3xl" />
            </div>
            <h1 className="text-3xl font-heading font-black text-white tracking-tight mb-2">Admin Portal</h1>
            <p className="text-slate-400 text-sm font-medium">Welcome back, please login to manage your platform.</p>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-destructive/10 border border-destructive/20 rounded-2xl flex items-center gap-3 animate-shake">
              <Icon icon="lucide:alert-circle" className="text-destructive text-xl shrink-0" />
              <p className="text-destructive text-xs font-bold leading-relaxed">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-1">Email Address</label>
              <div className="relative group">
                <Icon icon="lucide:mail" className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-primary transition-colors" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 bg-white/[0.05] border border-white/5 rounded-2xl text-white placeholder:text-slate-600 focus:bg-white/[0.08] focus:border-primary/50 focus:ring-4 focus:ring-primary/10 transition-all outline-none"
                  placeholder="admin@roarhomes.com"
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between ml-1">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Password</label>
                <button type="button" className="text-[10px] font-black text-primary uppercase tracking-[0.1em] hover:opacity-80 transition-opacity">Forgot?</button>
              </div>
              <div className="relative group">
                <Icon icon="lucide:lock" className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-primary transition-colors" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-12 pr-12 py-4 bg-white/[0.05] border border-white/5 rounded-2xl text-white placeholder:text-slate-600 focus:bg-white/[0.08] focus:border-primary/50 focus:ring-4 focus:ring-primary/10 transition-all outline-none"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white transition-colors"
                >
                  <Icon icon={showPassword ? 'lucide:eye-off' : 'lucide:eye'} className="text-xl" />
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-primary text-white py-4 rounded-2xl font-black text-xs uppercase tracking-[0.2em] shadow-xl shadow-primary/20 hover:bg-primary/90 active:scale-[0.98] transition-all disabled:opacity-50 flex items-center justify-center gap-3"
            >
              {loading ? (
                <Icon icon="lucide:loader-2" className="animate-spin text-xl" />
              ) : (
                <>
                  <span>Sign In to Dashboard</span>
                  <Icon icon="lucide:arrow-right" className="text-xl" />
                </>
              )}
            </button>
          </form>

          <div className="mt-10 pt-8 border-t border-white/5 text-center">
            <p className="text-slate-500 text-[10px] font-medium uppercase tracking-widest">
              Secured by <span className="text-white font-black">Roar Protection</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
