import { motion } from 'framer-motion';
import { useOutletContext } from 'react-router';
import { RotatingCardStack } from '@/components/ui/card-stack';
import type { BubbleBackgroundOption } from '@/components/ui/bubble-backgrounds';
import { TOOLS } from './tools';

const Home = () => {
  const background = useOutletContext<BubbleBackgroundOption>();

  return (
    <motion.div
      className="container grid h-full place-content-center gap-8 text-center"
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
        <h1 className="text-3xl font-bold tracking-tight">Pocket Tools</h1>
        <p className="mt-2 text-sm text-secondary/60">
          Pick a card, or click one to bring it forward.
        </p>
      </motion.div>

      <motion.div
        className="flex justify-center"
        initial={{ y: 40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 40, opacity: 0 }}
        transition={{ duration: 0.5, ease: 'easeInOut', delay: 0.05 }}
      >
        <RotatingCardStack cards={TOOLS} background={background} />
      </motion.div>
    </motion.div>
  );
};

export default Home;
