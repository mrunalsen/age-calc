import React, { useState } from 'react';
import { Link } from 'react-router';
import { motion } from 'framer-motion';
import { DateEntryField } from '@/components/ui/date-field';
import { hexToRgba } from '@/components/ui/utils';
import type { BubbleBackgroundOption } from '@/components/ui/bubble-backgrounds';

interface DateInputsProps {
  onDatesSelected: (birthdate: Date | null, comparisonDate: Date | null) => void;
  background: BubbleBackgroundOption;
}

const DateInputs: React.FC<DateInputsProps> = ({ onDatesSelected, background }) => {
  const [birthDate, setBirthDate] = useState<Date | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onDatesSelected(birthDate, new Date());
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col items-center gap-8">
      <DateEntryField label="Date of birth" value={birthDate} onChange={setBirthDate} background={background} />

      <div className="flex w-full max-w-xs flex-col gap-3">
        <motion.button
          type="submit"
          disabled={!birthDate}
          whileHover={birthDate ? { scale: 1.03 } : undefined}
          whileTap={birthDate ? { scale: 0.97 } : undefined}
          style={{
            background: `linear-gradient(135deg, ${background.from}, ${background.to})`,
            boxShadow: `0 10px 25px -5px ${hexToRgba(background.to, 0.35)}`,
          }}
          className="rounded-xl p-3 text-sm font-semibold text-white transition-opacity disabled:cursor-not-allowed disabled:opacity-40"
        >
          Calculate age
        </motion.button>
        <Link to="/" className="text-center text-sm text-secondary/60 transition-colors hover:text-secondary">
          Back home
        </Link>
      </div>
    </form>
  );
};

export default DateInputs;
