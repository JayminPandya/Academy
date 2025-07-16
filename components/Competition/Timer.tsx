'use client'

import { useEffect, useState } from 'react';

export default function MinimalBoxTimer() {
  const calculateTimeLeft = () => {
    const targetDate = new Date('July 20, 2025 00:00:00').getTime();
    const now = new Date().getTime();
    const difference = targetDate - now;

    return {
      days: Math.max(0, Math.floor(difference / (1000 * 60 * 60 * 24))),
      hours: Math.max(0, Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))),
      minutes: Math.max(0, Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60))),
      seconds: Math.max(0, Math.floor((difference % (1000 * 60)) / 1000)),
    };
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const isExpired = Object.values(timeLeft).every(val => val === 0);

  const TimeBox = ({ value, label }: { value: number, label: string }) => (
    <div className="flex flex-col items-center mx-1">
      <div className="w-16 h-16 sm:w-20 sm:h-20 flex items-center justify-center bg-white border border-gray-200 rounded-lg shadow-sm">
        <span className="text-2xl sm:text-3xl font-mono font-bold text-gray-800">
          {value.toString().padStart(2, '0')}
        </span>
      </div>
      <span className="text-xs font-mono text-gray-500 mt-1.5">{label}</span>
    </div>
  );

  const Separator = () => (
    <div className="flex items-center justify-center h-16 sm:h-20">
      <span className="text-2xl font-mono font-bold text-gray-400">:</span>
    </div>
  );

  return (
    <div className="flex justify-center p-4">
      {isExpired ? (
        <div className="font-mono font-bold text-2xl text-gray-800">
          COUNTDOWN COMPLETE
        </div>
      ) : (
        <div className="flex items-center">
          <TimeBox value={timeLeft.days} label="DAYS" />
          <Separator />
          <TimeBox value={timeLeft.hours} label="HOURS" />
          <Separator />
          <TimeBox value={timeLeft.minutes} label="MIN" />
          <Separator />
          <TimeBox value={timeLeft.seconds} label="SEC" />
        </div>
      )}
    </div>
  );
}