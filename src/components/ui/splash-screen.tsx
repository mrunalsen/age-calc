import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';

export const SplashScreen = () => {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8, ease: 'easeIn' }}
      className="fixed inset-0 z-50 grid place-items-center bg-primary"
    >
      <motion.div
        initial={{ scale: 0.3, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'spring', duration: 0.9, bounce: 0.6 }}
        className="flex flex-col items-center gap-4"
      >
        <motion.span
          initial={{ scale: 0, rotate: -25 }}
          animate={{ scale: 1, rotate: 0, transition: { type: 'spring', duration: 1, bounce: 0.65, delay: 0.05 } }}
          exit={{ y: 220, opacity: 0, transition: { type: 'spring', bounce: 0.5, duration: 0.7 } }}
          className="grid h-16 w-16 place-items-center rounded-2xl bg-gradient-to-br from-rose-400 to-rose-600 text-white shadow-lg shadow-rose-500/30"
        >
          <Sparkles size={28} />
        </motion.span>
        <motion.span
          exit={{ y: 220, opacity: 0, transition: { type: 'spring', bounce: 0.5, duration: 0.7, delay: 0.05 } }}
          className="text-lg font-semibold tracking-tight text-secondary"
        >
          Pocket Tools
        </motion.span>
      </motion.div>
    </motion.div>
  );
};
