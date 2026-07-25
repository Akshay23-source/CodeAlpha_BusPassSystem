import React, { useState, useEffect } from 'react';
import { Clock } from 'lucide-react';

export function QRCountdown({ onExpire }) {
  const [seconds, setSeconds] = useState(30);

  useEffect(() => {
    setSeconds(30);
  }, [onExpire]);

  useEffect(() => {
    if (seconds <= 0) {
      onExpire();
      return;
    }

    const timer = setInterval(() => {
      setSeconds(prev => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [seconds, onExpire]);

  const formatTime = () => {
    const s = seconds < 10 ? `0${seconds}` : seconds;
    return `00:${s}`;
  };

  return (
    <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-600/10 border border-blue-500/20 text-blue-400 text-[10px] font-black tracking-widest uppercase">
      <Clock className="w-3.5 h-3.5" />
      <span>Expires in: {formatTime()}</span>
    </div>
  );
}
