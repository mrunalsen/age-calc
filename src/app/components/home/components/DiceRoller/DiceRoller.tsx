import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useOutletContext } from 'react-router';
import { Dice1, Dice2, Dice3, Dice4, Dice5, Dice6, Minus, Plus } from 'lucide-react';
import { AnimatedNumber_003 } from '@/components/ui/animated-number-003';
import { hexToRgba } from '@/components/ui/utils';
import type { BubbleBackgroundOption } from '@/components/ui/bubble-backgrounds';

const DICE_ICONS = [Dice1, Dice2, Dice3, Dice4, Dice5, Dice6];
const MIN_DICE = 1;
const MAX_DICE = 6;
const TICK_MS = 70;
const TOTAL_TICKS = 6;
const SETTLE_MS = TICK_MS * TOTAL_TICKS;

const rollValue = () => Math.floor(Math.random() * 6) + 1;

interface RollingDieProps {
  value: number;
  rollKey: number;
  background: BubbleBackgroundOption;
}

// Ticks through a few random faces before landing on the real roll, mirroring
// the same "settle after a few flickers" feel as AnimatedNumber_003.
const RollingDie = ({ value, rollKey, background }: RollingDieProps) => {
  const [display, setDisplay] = useState(value);

  useEffect(() => {
    let ticks = 0;
    const interval = setInterval(() => {
      ticks += 1;
      if (ticks >= TOTAL_TICKS) {
        clearInterval(interval);
        setDisplay(value);
      } else {
        setDisplay(rollValue());
      }
    }, TICK_MS);
    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rollKey]);

  const Icon = DICE_ICONS[display - 1];

  return (
    <motion.div
      key={display}
      initial={{ scale: 0.85, rotate: -6 }}
      animate={{ scale: 1, rotate: 0 }}
      transition={{ type: 'spring', stiffness: 400, damping: 22 }}
      className="grid h-16 w-16 place-items-center rounded-2xl text-white shadow-lg sm:h-20 sm:w-20"
      style={{ background: `linear-gradient(135deg, ${background.from}, ${background.to})` }}
    >
      <Icon size={32} />
    </motion.div>
  );
};

const DiceRoller = () => {
  const background = useOutletContext<BubbleBackgroundOption>();
  const [diceCount, setDiceCount] = useState(2);
  const [values, setValues] = useState<number[]>(() => Array.from({ length: 2 }, rollValue));
  const [rollKey, setRollKey] = useState(0);
  const [isRolling, setIsRolling] = useState(false);

  const adjustCount = (delta: number) => {
    setDiceCount((prev) => {
      const next = Math.min(MAX_DICE, Math.max(MIN_DICE, prev + delta));
      setValues((vals) =>
        next > vals.length
          ? [...vals, ...Array.from({ length: next - vals.length }, rollValue)]
          : vals.slice(0, next)
      );
      return next;
    });
  };

  const roll = () => {
    if (isRolling) return;
    setValues(Array.from({ length: diceCount }, rollValue));
    setRollKey((k) => k + 1);
    setIsRolling(true);
    setTimeout(() => setIsRolling(false), SETTLE_MS);
  };

  const total = values.reduce((sum, v) => sum + v, 0);

  return (
    <motion.div
      className="container relative flex h-full flex-col place-content-center gap-8 text-center"
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
      >
        <h1 className="text-2xl font-bold tracking-tight">Dice Roller</h1>
        <p className="mt-1 text-sm text-secondary/60">Roll one, roll a handful.</p>
      </motion.div>

      <motion.div
        initial={{ y: 40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 40, opacity: 0 }}
        transition={{ duration: 0.5, ease: 'easeInOut', delay: 0.05 }}
        className="mx-auto flex w-full max-w-sm flex-col items-center gap-6"
      >
        <div className="flex items-center gap-3 rounded-full bg-secondary/10 p-1.5">
          <button
            type="button"
            onClick={() => adjustCount(-1)}
            disabled={diceCount <= MIN_DICE}
            aria-label="Remove a die"
            className="grid h-8 w-8 place-items-center rounded-full text-secondary/70 transition-colors hover:bg-secondary/10 disabled:cursor-not-allowed disabled:opacity-30"
          >
            <Minus size={16} />
          </button>
          <span className="w-16 text-sm font-semibold text-secondary">
            {diceCount} {diceCount === 1 ? 'die' : 'dice'}
          </span>
          <button
            type="button"
            onClick={() => adjustCount(1)}
            disabled={diceCount >= MAX_DICE}
            aria-label="Add a die"
            className="grid h-8 w-8 place-items-center rounded-full text-secondary/70 transition-colors hover:bg-secondary/10 disabled:cursor-not-allowed disabled:opacity-30"
          >
            <Plus size={16} />
          </button>
        </div>

        <div className="flex flex-wrap justify-center gap-3 rounded-[2rem] border border-secondary/10 bg-secondary/5 p-6 shadow-xl">
          {values.map((value, i) => (
            <RollingDie key={i} value={value} rollKey={rollKey} background={background} />
          ))}
        </div>

        {values.length > 1 && (
          <div className="flex items-center gap-2 text-sm text-secondary/60">
            <span>Total</span>
            <AnimatedNumber_003
              key={rollKey}
              value={total}
              delay={SETTLE_MS + 50}
              className="text-lg font-bold"
              style={{ color: background.to }}
            />
          </div>
        )}

        <motion.button
          type="button"
          onClick={roll}
          disabled={isRolling}
          whileHover={!isRolling ? { scale: 1.03 } : undefined}
          whileTap={!isRolling ? { scale: 0.97 } : undefined}
          style={{
            background: `linear-gradient(135deg, ${background.from}, ${background.to})`,
            boxShadow: `0 10px 25px -5px ${hexToRgba(background.to, 0.35)}`,
          }}
          className="w-full rounded-xl p-3 text-sm font-semibold text-white transition-opacity disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isRolling ? 'Rolling…' : 'Roll'}
        </motion.button>

        <Link to="/" className="text-sm text-secondary/60 transition-colors hover:text-secondary">
          Back home
        </Link>
      </motion.div>
    </motion.div>
  );
};

export default DiceRoller;
