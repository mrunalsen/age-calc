import React from 'react';
import { AnimatedNumber_003 } from '@/components/ui/animated-number-003';
import type { BubbleBackgroundOption } from '@/components/ui/bubble-backgrounds';
import type { AgeBreakdown } from '../AgeCalculator/AgeCalculator';

interface DateModalProps {
  age: AgeBreakdown;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  background: BubbleBackgroundOption;
}

// AnimatedNumber_003 rolls for 5 ticks * 45ms (~225ms) before settling. Stagger
// each reveal past that so only one number is animating at a time - running
// them all at once was the source of the jank.
const CYCLE_MS = 260;
const SUMMARY_START_DELAY = 150;
const SUMMARY_STAGGER = CYCLE_MS;

const DateModal: React.FC<DateModalProps> = ({ setShowModal, age, background }) => {
  const totalhours = age.totaldays * 24;
  const totalminutes = totalhours * 60;
  const totalseconds = totalminutes * 60;

  const summary: { label: string; value: number }[] = [
    { label: 'Years', value: age.years },
    { label: 'Months', value: age.totalmonths },
    { label: 'Weeks', value: age.totalweeks },
    { label: 'Days', value: age.totaldays },
    { label: 'Hours', value: totalhours },
    { label: 'Minutes', value: totalminutes },
    { label: 'Seconds', value: totalseconds },
  ];

  return (
    <div className="relative mx-auto w-full max-w-md">
      <div className="text-center">
        <h4 className="py-2 text-xs font-medium uppercase tracking-widest" style={{ color: background.to }}>
          Difference between selected dates
        </h4>
        <div className="mt-6 grid grid-cols-2 gap-x-3 gap-y-4 sm:grid-cols-3 sm:gap-4">
          {summary.map((item, index) => (
            <div key={item.label} className="flex flex-col">
              <span className="text-[10px] font-light uppercase tracking-wide text-secondary/40">{item.label}</span>
              <AnimatedNumber_003
                value={item.value}
                delay={SUMMARY_START_DELAY + index * SUMMARY_STAGGER}
                className="text-sm font-medium"
              />
            </div>
          ))}
        </div>
      </div>

      <div className="mt-8 flex justify-center">
        <button
          onClick={() => setShowModal(false)}
          className="rounded-lg bg-secondary/10 px-4 py-2 text-sm font-medium text-secondary transition-colors hover:bg-secondary/20"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default DateModal;
