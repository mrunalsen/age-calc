import { motion } from 'framer-motion';
import { useOutletContext } from 'react-router';
import { Cake, CalendarRange, Coins } from 'lucide-react';
import { RotatingCardStack, type StackCard } from '@/components/ui/card-stack';
import type { BubbleBackgroundOption } from '@/components/ui/bubble-backgrounds';

const TOOLS: StackCard[] = [
  {
    id: 'flip-a-coin',
    title: 'Flip a Coin',
    description: 'Let chance make the call for you.',
    icon: Coins,
    href: '/flip-a-coin',
  },
  {
    id: 'age-calculator',
    title: 'Age Calculator',
    description: 'Find out exactly how old you are, down to the day.',
    icon: Cake,
    href: '/age-calculator',
  },
  {
    id: 'date-calculator',
    title: 'Date Calculator',
    description: 'Measure the distance between any two dates.',
    icon: CalendarRange,
    href: '/date-calculator',
  },
];

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
