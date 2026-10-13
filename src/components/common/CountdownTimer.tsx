import React, { useState, useEffect } from 'react';

interface CountdownTimerProps {
  targetDate?: string;
  size?: 'sm' | 'md' | 'lg';
  showLabels?: boolean;
}

export const CountdownTimer: React.FC<CountdownTimerProps> = ({
  targetDate = '2026-10-11T09:00:00+05:30',
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
      <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-cyan-950/60 border border-cyan-400 text-cyan-300 font-mono text-sm shadow-[0_0_20px_rgba(6,182,212,0.4)]">
        <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-ping" />
        <span className="font-bold tracking-wider">SYMPOSIUM IS LIVE NOW!</span>
      </div>
    );
  }

  const pad = (n: number) => String(n).padStart(2, '0');

  const unitStyles = {
    sm: { box: "px-2.5 py-1.5 min-w-[52px]", num: "text-lg", label: "text-[9px]" },
    md: { box: "px-4 py-3 min-w-[76px]", num: "text-2xl sm:text-3xl", label: "text-[11px]" },
    lg: { box: "px-5 py-4 min-w-[90px] sm:min-w-[100px]", num: "text-3xl sm:text-5xl", label: "text-xs" },
  }[size];

  const units = [
    { label: 'DAYS', value: pad(timeLeft.days) },
    { label: 'HOURS', value: pad(timeLeft.hours) },
    { label: 'MINUTES', value: pad(timeLeft.minutes) },
    { label: 'SECONDS', value: pad(timeLeft.seconds) },
  ];

  return (
    <div className="flex items-center gap-2 sm:gap-4">
      {units.map((unit, idx) => (
        <React.Fragment key={unit.label}>
          <div className="flex flex-col items-center">
            {/* Glowing Quantum Card Box */}
            <div
              className={`quantum-digit-box rounded-xl flex items-center justify-center relative overflow-hidden group transition-all duration-300 hover:border-cyan-400 ${unitStyles.box}`}
            >
              {/* Subtle scanning glow background */}
              <div className="absolute inset-0 bg-gradient-to-b from-cyan-500/10 via-transparent to-purple-500/10 opacity-70 pointer-events-none" />

              <span className={`font-mono font-extrabold tracking-tight bg-gradient-to-b from-white via-cyan-100 to-cyan-400 bg-clip-text text-transparent relative z-10 text-glow-cyan ${unitStyles.num}`}>
                {unit.value}
              </span>
            </div>
            {showLabels && (
              <span className={`mt-2 font-mono font-semibold tracking-widest text-cyan-400/80 uppercase text-center ${unitStyles.label}`}>
                {unit.label}
              </span>
            )}
          </div>
          {idx < units.length - 1 && (
            <div className={`flex flex-col justify-center gap-1.5 opacity-60 self-center ${size === 'lg' ? 'mb-6' : size === 'md' ? 'mb-5' : 'mb-3'}`}>
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse shadow-[0_0_8px_rgba(6,182,212,0.8)]" />
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse shadow-[0_0_8px_rgba(6,182,212,0.8)]" />
            </div>
          )}
        </React.Fragment>
      ))}
    </div>
  );
};
