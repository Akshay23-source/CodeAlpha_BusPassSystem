import { motion } from 'framer-motion';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';

export function AuthForm({ authMode, form, onFieldChange, onSubmit, loading, switchMode }) {
  return (
    <motion.div initial={{ opacity: 0, x: 8 }} animate={{ opacity: 1, x: 0 }} className="rounded-[28px] border border-slate-800/70 bg-slate-900/70 p-5">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <p className="text-sm text-blue-300">Access portal</p>
          <h3 className="text-xl font-semibold text-slate-100">{authMode === 'signup' ? 'Create account' : 'Welcome back'}</h3>
        </div>
        <div className="rounded-full border border-slate-800 bg-slate-950/60 p-1">
          <button className={`rounded-full px-3 py-1.5 text-sm ${authMode === 'signup' ? 'bg-blue-600 text-white' : 'text-slate-400'}`} onClick={() => switchMode('signup')}>Sign up</button>
          <button className={`rounded-full px-3 py-1.5 text-sm ${authMode === 'login' ? 'bg-blue-600 text-white' : 'text-slate-400'}`} onClick={() => switchMode('login')}>Login</button>
        </div>
      </div>

      <form onSubmit={onSubmit} className="space-y-3">
        {authMode === 'signup' && (
          <Input placeholder="Full name" value={form.name} onChange={(event) => onFieldChange('name', event.target.value)} required />
        )}
        <Input type="email" placeholder="Email address" value={form.email} onChange={(event) => onFieldChange('email', event.target.value)} required />
        <Input type="password" placeholder="Password" value={form.password} onChange={(event) => onFieldChange('password', event.target.value)} required />
        <label className="flex items-center gap-2 text-sm text-slate-400">
          <input type="checkbox" checked={form.rememberMe} onChange={(event) => onFieldChange('rememberMe', event.target.checked)} />
          Remember me for faster access
        </label>
        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? 'Please wait…' : authMode === 'signup' ? 'Create account' : 'Login'}
        </Button>
      </form>
    </motion.div>
  );
}
