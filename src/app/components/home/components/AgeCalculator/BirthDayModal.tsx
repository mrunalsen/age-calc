import { addYears, differenceInDays, differenceInMonths, getDay } from 'date-fns';
import React from 'react';
import { Cake } from 'lucide-react';
import { AnimatedNumber_003 } from '@/components/ui/animated-number-003';
import type { BubbleBackgroundOption } from '@/components/ui/bubble-backgrounds';
import type { AgeBreakdown } from './AgeCalculator';

interface BirthDayModalProps {
  age: AgeBreakdown;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  birthDate: Date | null;
  background: BubbleBackgroundOption;
}

// AnimatedNumber_003 rolls for 5 ticks * 45ms (~225ms) before settling. Stagger
// each reveal past that so only one number is animating at a time - running
// them all at once was the source of the jank.
const AGE_DELAY = 150;
const CYCLE_MS = 260;
const SUMMARY_START_DELAY = AGE_DELAY + CYCLE_MS;
const SUMMARY_STAGGER = CYCLE_MS;

const BirthDayModal: React.FC<BirthDayModalProps> = ({ setShowModal, age, birthDate, background }) => {
  const totalhours = age.totaldays * 24;
  const totalminutes = totalhours * 60;
  const totalseconds = totalminutes * 60;

  const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

  let nextBirthdayDayOfWeek = null;
  let monthsUntilBirthday = null;
  let remainingDays = null;

  if (birthDate) {
    const nextBirthday = addYears(birthDate, age.years + 1);
    const today = new Date();

    const totalMonthsUntilBirthday = differenceInMonths(nextBirthday, today);
    monthsUntilBirthday = totalMonthsUntilBirthday % 12;
    remainingDays = differenceInDays(nextBirthday, today);

    nextBirthdayDayOfWeek = daysOfWeek[getDay(nextBirthday)];
  }

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
      <div className="grid grid-cols-2 gap-3 pb-4 sm:gap-4">
        <div className="border-r border-secondary/10 pr-3 sm:pr-4">
          <h1 className="pb-2 text-sm font-medium uppercase tracking-widest text-secondary/50">Age</h1>
          <div className="flex items-center pb-2">
            <AnimatedNumber_003
              value={age.years}
              delay={AGE_DELAY}
              className="text-5xl font-bold"
              style={{ color: background.to }}
            />
          </div>
          <div className="flex gap-2 text-xs text-secondary/60">
            <span>{age.months} months</span>
            <div className="w-px bg-secondary/20" />
            <span>{age.days} days</span>
          </div>
        </div>

        {nextBirthdayDayOfWeek && (
          <div className="flex flex-col items-center justify-between text-center">
            <h4 className="text-xs font-medium uppercase tracking-widest" style={{ color: background.to }}>
              Next Birthday
            </h4>
            <div className="flex justify-center">
              <span
                className="grid h-12 w-12 place-items-center rounded-full text-white"
                style={{ background: `linear-gradient(135deg, ${background.from}, ${background.to})` }}
              >
                <Cake size={20} />
              </span>
            </div>
            <span className="text-xs font-semibold">{nextBirthdayDayOfWeek}</span>
            <div className="flex gap-1 text-xs text-secondary/60">
              <span>{monthsUntilBirthday} months</span>
              <span>· {remainingDays} days</span>
            </div>
          </div>
        )}
      </div>

      <hr className="border-secondary/10" />

      <div className="text-center">
        <h4 className="py-4 text-xs font-medium uppercase tracking-widest" style={{ color: background.to }}>
          Summary
        </h4>
        <div className="grid grid-cols-2 gap-x-3 gap-y-4 sm:grid-cols-3 sm:gap-4">
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

export default BirthDayModal;
