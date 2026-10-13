import React, { useState, useEffect } from 'react';

interface CountdownTimerProps {
  targetDate?: string;
  size?: 'sm' | 'md' | 'lg';
  showLabels?: boolean;
}

export const CountdownTimer: React.FC<CountdownTimerProps> = ({
  targetDate = '2026-11-20T09:00:00+05:30',
  size = 'md',
  showLabels = true
}) => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    isExpired: false
  });

  useEffect(() => {
    const calculateTime = () => {
      const difference = +new Date(targetDate) - +new Date();
      if (difference <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0, isExpired: true });
        return;
      }

      setTimeLeft({
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
        isExpired: false
      });
    };

    calculateTime();
    const interval = setInterval(calculateTime, 1000);
    return () => clearInterval(interval);
  }, [targetDate]);

  if (timeLeft.isExpired) {
    return (
      <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-cyan-950/40 border border-cyan-500/30 text-cyan-400 font-mono text-sm">
        <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
        EVENT IS CURRENTLY LIVE!
      </div>
    );
  }

  const pad = (n: number) => String(n).padStart(2, '0');

  const unitStyles = {
    sm: { box: "px-2.5 py-1.5 min-w-[50px]", num: "text-lg", label: "text-[10px]" },
    md: { box: "px-4 py-2.5 min-w-[70px]", num: "text-2xl md:text-3xl", label: "text-xs" },
    lg: { box: "px-5 py-4 min-w-[85px]", num: "text-3xl md:text-5xl", label: "text-xs md:text-sm" },
  }[size];

  const units = [
    { label: 'DAYS', value: pad(timeLeft.days) },
    { label: 'HOURS', value: pad(timeLeft.hours) },
    { label: 'MINUTES', value: pad(timeLeft.minutes) },
    { label: 'SECONDS', value: pad(timeLeft.seconds) },
  ];

  return (
    <div className="flex items-center gap-2 sm:gap-3">
      {units.map((unit, idx) => (
        <React.Fragment key={unit.label}>
          <div className="flex flex-col items-center">
            <div
              className={`flex items-center justify-center rounded-xl bg-slate-900/90 dark:bg-slate-950/80 border border-cyan-500/30 dark:border-cyan-400/20 shadow-[0_0_15px_-3px_rgba(6,182,212,0.2)] backdrop-blur-md ${unitStyles.box}`}
            >
              <span className={`font-mono font-bold tracking-tight bg-gradient-to-b from-white via-cyan-100 to-cyan-400 bg-clip-text text-transparent ${unitStyles.num}`}>
                {unit.value}
              </span>
            </div>
            {showLabels && (
              <span className={`mt-1.5 font-medium tracking-wider text-slate-400 dark:text-slate-400 uppercase font-mono ${unitStyles.label}`}>
                {unit.label}
              </span>
            )}
          </div>
          {idx < units.length - 1 && (
            <span className={`font-mono font-bold text-cyan-500/50 self-start ${size === 'lg' ? 'text-3xl mt-3' : size === 'md' ? 'text-xl mt-2' : 'text-sm mt-1'}`}>
              :
            </span>
          )}
        </React.Fragment>
      ))}
    </div>
  );
};
