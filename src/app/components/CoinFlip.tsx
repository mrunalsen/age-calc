import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useOutletContext } from 'react-router';
import { cn } from '@/components/ui/utils';
import type { BubbleBackgroundOption } from '@/components/ui/bubble-backgrounds';

// Must track the #coin.heads/.tails keyframe duration in _animation.scss (3s).
const FLIP_ANIMATION_MS = 3000;
const FLIP_START_DELAY_MS = 100;

const CoinFlip = () => {
  const background = useOutletContext<BubbleBackgroundOption>();
  const [result, setResult] = useState<string>('');
  const [label, setLabel] = useState<string>('');
  const [isFlipping, setIsFlipping] = useState(false);

  const handleCoinClick = () => {
    if (isFlipping) return;

    const outcome = Math.random() <= 0.5 ? 'heads' : 'tails';
    setIsFlipping(true);
    setResult('');
    setLabel('');

    setTimeout(() => setResult(outcome), FLIP_START_DELAY_MS);
    setTimeout(() => {
      setLabel(outcome === 'heads' ? 'King' : 'Queen');
      setIsFlipping(false);
    }, FLIP_START_DELAY_MS + FLIP_ANIMATION_MS);
  };

  return (
    <motion.div
      className="container flex h-full flex-col items-center justify-center gap-8 text-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ delay: 0.15, duration: 0.5, ease: 'easeInOut' }}
    >
      <motion.div
        initial={{ y: 40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 40, opacity: 0 }}
        transition={{ duration: 0.5, ease: 'easeInOut' }}
        className="flex flex-col items-center gap-6"
      >
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Flip a Coin</h1>
          <p className="mt-1 text-sm text-secondary/60">Tap the coin to see where it lands.</p>
        </div>

        <div className="rounded-[2rem] border border-secondary/10 bg-secondary/5 p-10 shadow-xl">
          <div
            id="coin"
            onClick={handleCoinClick}
            className={cn(result, isFlipping && 'pointer-events-none')}
          >
            <div
              className="side-a flex items-center justify-center text-4xl text-white"
              style={{ background: `linear-gradient(135deg, ${background.from}, ${background.to})` }}
            >
              <span className="icon-king"></span>
            </div>
            <div
              className="side-b flex items-center justify-center text-4xl text-white"
              style={{ backgroundColor: background.to }}
            >
              <span className="icon-queen"></span>
            </div>
          </div>
        </div>

        <div className="flex h-6 items-center">
          <AnimatePresence mode="wait">
            {label && (
              <motion.span
                key={label}
                initial={{ opacity: 0, y: 10, scale: 0.8 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 0.8 }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                className="text-sm font-semibold uppercase tracking-widest text-white"
              >
                {label}
              </motion.span>
            )}
          </AnimatePresence>
        </div>

        <Link to="/" className="text-sm text-secondary/60 transition-colors hover:text-secondary">
          Back home
        </Link>
      </motion.div>
    </motion.div>
  );
};

export default CoinFlip;
