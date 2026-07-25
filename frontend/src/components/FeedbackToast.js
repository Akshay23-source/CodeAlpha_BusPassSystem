import { Toaster } from 'react-hot-toast';

export function FeedbackToast() {
  return (
    <Toaster
      position="top-right"
      toastOptions={{
        className: 'rounded-2xl border border-slate-800 bg-slate-900 text-slate-100',
        duration: 3200,
      }}
    />
  );
}
