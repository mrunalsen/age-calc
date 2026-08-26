import type { BubbleBackgroundOption } from './bubble-backgrounds';

const CIRCLES = [
  { left: '25%', size: 80, delay: 0, duration: 25 },
  { left: '10%', size: 20, delay: 2, duration: 12 },
  { left: '70%', size: 20, delay: 4, duration: 25 },
  { left: '40%', size: 60, delay: 0, duration: 18 },
  { left: '65%', size: 20, delay: 0, duration: 25 },
  { left: '75%', size: 110, delay: 3, duration: 25 },
  { left: '35%', size: 150, delay: 7, duration: 25 },
  { left: '50%', size: 25, delay: 15, duration: 45 },
  { left: '20%', size: 15, delay: 2, duration: 35 },
  { left: '85%', size: 150, delay: 0, duration: 11 },
];

interface AnimatedBubblesBackgroundProps {
  option: BubbleBackgroundOption;
}

export const AnimatedBubblesBackground = ({ option }: AnimatedBubblesBackgroundProps) => {
  return (
    <div
      className="fixed inset-0 -z-10 overflow-hidden transition-[background] duration-700"
      style={{ background: `linear-gradient(135deg, ${option.from} 0%, ${option.to} 100%)` }}
    >
      <ul className="pointer-events-none absolute inset-0 m-0 list-none p-0">
        {CIRCLES.map((circle, i) => (
          <li
            key={i}
            className="bubble absolute bottom-[-150px] block bg-white/20"
            style={{
              left: circle.left,
              width: circle.size,
              height: circle.size,
              animationDelay: `${circle.delay}s`,
              animationDuration: `${circle.duration}s`,
            }}
          />
        ))}
      </ul>
    </div>
  );
};
