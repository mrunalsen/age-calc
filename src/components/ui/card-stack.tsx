import { useRef, useState } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { useNavigate } from 'react-router';
import { ArrowUpRight, type LucideIcon } from 'lucide-react';
import type { BubbleBackgroundOption } from './bubble-backgrounds';
import { cn } from './utils';

export interface StackCard {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
  href: string;
}

interface RotatingCardStackProps {
  cards: StackCard[];
  background: BubbleBackgroundOption;
  className?: string;
}

// A different gradient angle per stack position so the cards read as a
// matched set (same two theme colors) without looking identical.
const GRADIENT_ANGLES = [135, 45, 200];

export const RotatingCardStack = ({ cards, background, className }: RotatingCardStackProps) => {
  const [order, setOrder] = useState(() => cards.map((c) => c.id));
  const refs = useRef<Record<string, HTMLDivElement | null>>({});
  const navigate = useNavigate();

  useGSAP(
    () => {
      order.forEach((id, position) => {
        const el = refs.current[id];
        if (!el) return;
        const sign = position % 2 === 0 ? 1 : -1;
        gsap.to(el, {
          x: position * 16,
          y: position * 10,
          rotate: position * 6 * sign,
          scale: 1 - position * 0.06,
          zIndex: cards.length - position,
          duration: 0.55,
          ease: 'power3.out',
        });
      });
    },
    { dependencies: [order] }
  );

  const handleCardClick = (id: string) => {
    if (order[0] === id) {
      const card = cards.find((c) => c.id === id);
      if (card) navigate(card.href);
      return;
    }
    setOrder((prev) => {
      const idx = prev.indexOf(id);
      return [...prev.slice(idx), ...prev.slice(0, idx)];
    });
  };

  return (
    <div className={cn('relative h-60 w-52 xs:h-64 xs:w-56 sm:h-80 sm:w-72', className)}>
      {cards.map((card, index) => {
        const Icon = card.icon;
        const isFront = order[0] === card.id;
        const angle = GRADIENT_ANGLES[index % GRADIENT_ANGLES.length];
        return (
          <div
            key={card.id}
            ref={(el) => {
              refs.current[card.id] = el;
            }}
            onClick={() => handleCardClick(card.id)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') handleCardClick(card.id);
            }}
            aria-label={isFront ? `Open ${card.title}` : `Bring ${card.title} to front`}
            style={{ background: `linear-gradient(${angle}deg, ${background.from}, ${background.to})` }}
            className={cn(
              'absolute inset-0 flex cursor-pointer flex-col items-center justify-center gap-5 rounded-3xl border border-white/10 p-6 text-center shadow-xl backdrop-blur-xl',
              isFront ? 'shadow-2xl' : 'shadow-md'
            )}
          >
            {isFront && <ArrowUpRight className="absolute right-4 top-4 text-white/70" size={20} />}
            <span className="grid h-20 w-20 place-items-center rounded-3xl bg-white/15 text-white sm:h-24 sm:w-24">
              <Icon size={40} />
            </span>
            <div>
              <h3 className="text-lg font-semibold text-white">{card.title}</h3>
              <p className="mt-1 text-sm text-white/70">{card.description}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};
