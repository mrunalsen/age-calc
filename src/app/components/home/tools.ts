import { Cake, CalendarRange, Coins, Dices, ImageUp } from 'lucide-react';
import type { StackCard } from '@/components/ui/card-stack';

export const TOOLS: StackCard[] = [
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
  {
    id: 'dice-roller',
    title: 'Dice Roller',
    description: 'Roll one, roll a handful.',
    icon: Dices,
    href: '/dice-roller',
  },
  {
    id: 'tilt-fold',
    title: 'Tilt Fold',
    description: 'Tilt your photo with a directional light fold.',
    icon: ImageUp,
    href: '/tilt-fold',
  },
];
