export function Input({ className = '', ...props }) {
  return (
    <input
      className={`w-full rounded-2xl border border-slate-700/80 bg-slate-900/70 px-4 py-3 text-sm text-slate-100 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 ${className}`}
      {...props}
    />
  );
}
