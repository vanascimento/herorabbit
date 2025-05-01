import { useEffect, useState, useRef } from 'react';
import { cn } from '@/lib/utils';

interface CircularCountdownProps {
  duration: number; // Duration in seconds
  size?: number; // Size in pixels
  strokeWidth?: number; // Width of the circle stroke
  onComplete?: () => void; // Callback when countdown reaches zero
  className?: string; // Additional classes
}

export function CircularCountdown({
  duration,
  size = 40,
  strokeWidth = 4,
  onComplete,
  className,
}: CircularCountdownProps) {
  const [timeLeft, setTimeLeft] = useState(duration);
  const timerRef = useRef<NodeJS.Timeout>();
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const progress = (timeLeft / duration) * circumference;

  useEffect(() => {
    // Reset timer when duration changes
    setTimeLeft(duration);

    // Limpa o timer anterior se existir
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }

    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 0) {
          if (timerRef.current) {
            clearInterval(timerRef.current);
          }
          onComplete?.();
          return duration;
        }
        return prev - 1;
      });
    }, 1000);

    // Cleanup function
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [duration, onComplete]);

  return (
    <div className={cn('ext-relative ext-inline-flex ext-items-center ext-justify-center', className)}>
      <svg width={size} height={size} className="ext-transform -ext-rotate-90">
        {/* Background circle */}
        <circle
          className="ext-text-gray-200 dark:ext-text-gray-700"
          strokeWidth={strokeWidth}
          stroke="currentColor"
          fill="transparent"
          r={radius}
          cx={size / 2}
          cy={size / 2}
        />
        {/* Progress circle */}
        <circle
          className="ext-text-primary ext-transition-all ext-duration-1000 ext-ease-linear"
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={circumference - progress}
          strokeLinecap="round"
          stroke="currentColor"
          fill="transparent"
          r={radius}
          cx={size / 2}
          cy={size / 2}
        />
      </svg>
      <span className="ext-absolute ext-text-sm ext-font-medium">{timeLeft}</span>
    </div>
  );
}
