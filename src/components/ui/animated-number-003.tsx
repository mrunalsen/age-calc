import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from './utils';

interface AnimatedNumber003Props {
  value: number;
  delay?: number;
  locale?: string;
  className?: string;
  style?: React.CSSProperties;
}

const randomLikeValue = (value: number) => {
  const digitCount = String(Math.abs(Math.round(value))).length;
  const max = Math.pow(10, digitCount) - 1;
  return Math.floor(Math.random() * max);
};

// skiper-ui AnimatedNumber_003: rolls through a few random values before
// settling on the real one, instead of animating straight to the target.
export const AnimatedNumber_003 = ({ value, delay = 0, locale = 'en-US', className, style }: AnimatedNumber003Props) => {
  const [display, setDisplay] = useState(0);
  const [settled, setSettled] = useState(false);

  useEffect(() => {
    setSettled(false);
    let cancelled = false;
    let interval: ReturnType<typeof setInterval>;

    const startTimeout = setTimeout(() => {
      let ticks = 0;
      const totalTicks = 5;
      interval = setInterval(() => {
        if (cancelled) return;
        ticks += 1;
        if (ticks >= totalTicks) {
          clearInterval(interval);
          setDisplay(value);
          setSettled(true);
        } else {
          setDisplay(randomLikeValue(value));
        }
      }, 45);
    }, delay);

    return () => {
      cancelled = true;
      clearTimeout(startTimeout);
      clearInterval(interval);
    };
  }, [value, delay]);

  const formatted = display.toLocaleString(locale);
  const chars = formatted.split('').reverse();

  return (
    <span style={style} className={cn('inline-flex items-baseline tabular-nums', className)}>
      <span className="inline-flex flex-row-reverse">
        {chars.map((char, i) => (
          <span key={i} className="relative inline-block overflow-hidden">
            <span className="invisible">{char}</span>
            <AnimatePresence mode="popLayout">
              <motion.span
                key={`${i}-${char}`}
                initial={{ y: '100%', opacity: 0 }}
                animate={{ y: '0%', opacity: 1 }}
                exit={{ y: '-100%', opacity: 0 }}
                transition={settled ? { type: 'spring', stiffness: 300, damping: 26 } : { duration: 0.05 }}
                className="absolute inset-0 inline-block"
              >
                {char}
              </motion.span>
            </AnimatePresence>
          </span>
        ))}
      </span>
    </span>
  );
};
