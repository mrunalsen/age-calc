import { DateFieldInput } from './animated-number-input';
import { cn } from './utils';
import type { BubbleBackgroundOption } from './bubble-backgrounds';

interface DateEntryFieldProps {
  label: string;
  value: Date | null;
  onChange: (date: Date | null) => void;
  background: BubbleBackgroundOption;
  className?: string;
}

export const DateEntryField = ({ label, value, onChange, background, className }: DateEntryFieldProps) => {
  return (
    <div className={cn('flex flex-col items-center gap-2', className)}>
      <span className="text-xs font-medium uppercase tracking-widest text-secondary/50">{label}</span>
      <DateFieldInput value={value} onChange={onChange} background={background} />
    </div>
  );
};
