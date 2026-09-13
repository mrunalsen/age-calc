import { useEffect, useRef, useState } from 'react';
import { flushSync } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Palette } from 'lucide-react';
import { BUBBLE_BACKGROUNDS, type BubbleBackgroundOption } from './bubble-backgrounds';
import { registerViewTransition } from './view-transition-registry';
import { cn } from './utils';

interface ViewTransitionDocument extends Document {
  startViewTransition?: (callback: () => void) => {
    ready: Promise<void>;
    finished: Promise<void>;
    skipTransition: () => void;
  };
}

interface BackgroundPickerProps {
  value: BubbleBackgroundOption;
  onChange: (option: BubbleBackgroundOption) => void;
  className?: string;
}

export const BackgroundPicker = ({ value, onChange, className }: BackgroundPickerProps) => {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const handleClick = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [open]);

  const applyBackground = async (option: BubbleBackgroundOption, originEl: HTMLElement) => {
    const doc = document as ViewTransitionDocument;

    if (!doc.startViewTransition || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      onChange(option);
      setOpen(false);
      return;
    }

    const { top, left, width, height } = originEl.getBoundingClientRect();
    const x = left + width / 2;
    const y = top + height / 2;
    const radius = Math.hypot(
      Math.max(x, window.innerWidth - x),
      Math.max(y, window.innerHeight - y)
    );

    const transition = doc.startViewTransition(() => {
      flushSync(() => onChange(option));
    });
    registerViewTransition(transition);
    setOpen(false);

    try {
      await transition.ready;
      document.documentElement.animate(
        {
          clipPath: [
            `circle(0px at ${x}px ${y}px)`,
            `circle(${radius}px at ${x}px ${y}px)`,
          ],
        },
        {
          duration: 550,
          easing: 'ease-in-out',
          pseudoElement: '::view-transition-new(root)',
        }
      );
    } catch {
      // transition not supported at runtime; background already switched
    }
  };

  return (
    <div ref={containerRef} className={cn('relative', className)}>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-label="Change background"
        className={cn(
          'grid h-10 w-10 place-items-center rounded-full bg-secondary/10 text-secondary transition-colors hover:bg-secondary/20',
          open && 'bg-secondary/20'
        )}
      >
        <Palette size={18} />
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.95 }}
            transition={{ type: 'spring', stiffness: 400, damping: 30 }}
            className="absolute right-0 top-full z-30 mt-2 grid w-48 grid-cols-3 gap-1 rounded-2xl border border-white/10 bg-primary/90 p-3 shadow-2xl shadow-black/30 backdrop-blur-xl"
          >
            {BUBBLE_BACKGROUNDS.map((option) => (
              <button
                key={option.id}
                type="button"
                onClick={(e) => applyBackground(option, e.currentTarget)}
                aria-label={`Switch to ${option.label} background`}
                className={cn(
                  'flex flex-col items-center gap-1.5 rounded-xl p-2 transition-colors hover:bg-secondary/10',
                  value.id === option.id && 'ring-2 ring-secondary/60'
                )}
              >
                <span
                  className="h-7 w-7 rounded-full border border-white/20"
                  style={{ background: `linear-gradient(135deg, ${option.from}, ${option.to})` }}
                />
                <span className="text-[9px] font-medium text-secondary/70">{option.label}</span>
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
