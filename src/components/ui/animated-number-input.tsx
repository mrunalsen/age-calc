import { forwardRef, useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from './utils';
import type { BubbleBackgroundOption } from './bubble-backgrounds';

interface DigitBoxProps {
  value: string;
  ariaLabel: string;
  onChange: (value: string) => void;
  onNavigate: (direction: 'prev' | 'next') => void;
}

const DigitBox = forwardRef<HTMLInputElement, DigitBoxProps>(
  ({ value, ariaLabel, onChange, onNavigate }, ref) => {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const raw = e.target.value.replace(/[^0-9]/g, '');
      let digit = raw;

      if (raw.length > 1 && value) {
        // Some mobile browsers don't reliably select-on-focus, so tapping a
        // filled box and typing appends instead of replacing (e.g. "6" -> "68"
        // or "86" depending on where the cursor landed). Strip the previous
        // digit back out so whichever character was actually just typed wins,
        // regardless of which side it landed on.
        const idx = raw.indexOf(value);
        digit = idx === -1 ? raw : raw.slice(0, idx) + raw.slice(idx + value.length);
      }
      digit = digit.slice(-1);

      onChange(digit);
      if (digit) onNavigate('next');
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Backspace' && !value) onNavigate('prev');
      else if (e.key === 'ArrowLeft') onNavigate('prev');
      else if (e.key === 'ArrowRight') onNavigate('next');
    };

    return (
      <div className="relative h-11 w-7 shrink-0 rounded-lg border border-secondary/20 bg-secondary/5 transition-colors focus-within:border-[var(--accent-color)] focus-within:bg-white/5 sm:h-14 sm:w-9">
        <input
          ref={ref}
          value={value}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          onFocus={(e) => e.target.select()}
          onClick={(e) => e.currentTarget.select()}
          inputMode="numeric"
          aria-label={ariaLabel}
          className="absolute inset-0 h-full w-full bg-transparent text-center text-transparent caret-[var(--accent-color)] outline-none"
        />
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center overflow-hidden">
          <AnimatePresence mode="popLayout" initial={false}>
            {value ? (
              <motion.span
                key={value}
                initial={{ y: '60%', opacity: 0, scale: 0.6 }}
                animate={{ y: '0%', opacity: 1, scale: 1 }}
                exit={{ y: '-60%', opacity: 0, scale: 0.6 }}
                transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                className="text-lg font-semibold text-secondary"
              >
                {value}
              </motion.span>
            ) : (
              <span key="placeholder" className="text-lg text-secondary/25">·</span>
            )}
          </AnimatePresence>
        </div>
      </div>
    );
  }
);
DigitBox.displayName = 'DigitBox';

const GROUPS = [
  { key: 'day', length: 2, label: 'Day' },
  { key: 'month', length: 2, label: 'Month' },
  { key: 'year', length: 4, label: 'Year' },
] as const;

const TOTAL_DIGITS = GROUPS.reduce((sum, g) => sum + g.length, 0);

function dateToDigits(date: Date | null): string[] {
  if (!date) return Array(TOTAL_DIGITS).fill('');
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = String(date.getFullYear()).padStart(4, '0');
  return [...day, ...month, ...year];
}

function digitsToDate(digits: string[]): Date | null {
  const day = digits.slice(0, 2).join('');
  const month = digits.slice(2, 4).join('');
  const year = digits.slice(4, 8).join('');
  if (day.length < 2 || month.length < 2 || year.length < 4) return null;

  const d = Number(day);
  const m = Number(month);
  const y = Number(year);
  const date = new Date(y, m - 1, d);
  const isValid = date.getFullYear() === y && date.getMonth() === m - 1 && date.getDate() === d;
  return isValid ? date : null;
}

interface DateFieldInputProps {
  value: Date | null;
  onChange: (date: Date | null) => void;
  background: BubbleBackgroundOption;
  className?: string;
}

export const DateFieldInput = ({ value, onChange, background, className }: DateFieldInputProps) => {
  const [digits, setDigits] = useState<string[]>(() => dateToDigits(value));
  const refs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    setDigits((prev) => {
      const current = digitsToDate(prev);
      const sameTime = (current?.getTime() ?? null) === (value?.getTime() ?? null);
      return sameTime ? prev : dateToDigits(value);
    });
  }, [value]);

  const setDigitAt = (index: number, char: string) => {
    const next = [...digits];
    next[index] = char;
    setDigits(next);
    onChange(digitsToDate(next));
  };

  const focusAt = (index: number) => {
    refs.current[index]?.focus();
    refs.current[index]?.select();
  };

  const navigate = (index: number, direction: 'prev' | 'next') => {
    const target = direction === 'next' ? index + 1 : index - 1;
    if (target >= 0 && target < TOTAL_DIGITS) focusAt(target);
  };

  let cursor = 0;

  return (
    <div
      style={{ '--accent-color': background.to } as React.CSSProperties}
      className={cn('flex items-center justify-center gap-1 sm:gap-2', className)}
    >
      {GROUPS.map((group, groupIndex) => {
        const startIndex = cursor;
        cursor += group.length;
        return (
          <div key={group.key} className="flex items-center gap-1 sm:gap-2">
            <div className="flex flex-col items-center gap-1.5">
              <div className="flex gap-1">
                {Array.from({ length: group.length }).map((_, i) => {
                  const index = startIndex + i;
                  return (
                    <DigitBox
                      key={index}
                      ref={(el) => { refs.current[index] = el; }}
                      value={digits[index] ?? ''}
                      ariaLabel={`${group.label} digit ${i + 1}`}
                      onChange={(char) => setDigitAt(index, char)}
                      onNavigate={(dir) => navigate(index, dir)}
                    />
                  );
                })}
              </div>
              <span className="text-[10px] uppercase tracking-widest text-secondary/50">
                {group.label}
              </span>
            </div>
            {groupIndex < GROUPS.length - 1 && (
              <span className="mb-5 text-base text-secondary/30 sm:text-lg">/</span>
            )}
          </div>
        );
      })}
    </div>
  );
};
