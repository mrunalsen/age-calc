import React, { useState } from 'react';
import { useOutletContext } from 'react-router';
import { differenceInYears, differenceInMonths, differenceInDays, differenceInWeeks } from 'date-fns';
import { motion, AnimatePresence } from 'framer-motion';
import DateInputs from './DateInputs';
import BirthDayModal from './BirthDayModal';
import type { BubbleBackgroundOption } from '@/components/ui/bubble-backgrounds';

export interface AgeBreakdown {
  years: number;
  months: number;
  days: number;
  totalmonths: number;
  totalweeks: number;
  totaldays: number;
}

const AgeCalculator: React.FC = () => {
  const background = useOutletContext<BubbleBackgroundOption>();
  const [showModal, setShowModal] = useState(false);
  const [birthDate, setBirthDate] = useState<Date | null>(null);
  const [age, setAge] = useState<AgeBreakdown | null>(null);

  const calculateAge = (birthDate: Date | null, comparisonDate: Date | null) => {
    if (birthDate && comparisonDate) {
      const years = differenceInYears(comparisonDate, birthDate);
      const months = differenceInMonths(comparisonDate, new Date(birthDate.getFullYear() + years, birthDate.getMonth(), birthDate.getDate()));
      const days = differenceInDays(comparisonDate, new Date(birthDate.getFullYear() + years, birthDate.getMonth() + months, birthDate.getDate()));

      const totalMonths = differenceInMonths(comparisonDate, birthDate);
      const totalWeeks = differenceInWeeks(comparisonDate, birthDate);
      const totaldays = differenceInDays(comparisonDate, birthDate);

      setBirthDate(birthDate);
      setAge({
        years: years,
        months: months,
        days: days,
        totalmonths: totalMonths,
        totalweeks: totalWeeks,
        totaldays: totaldays,
      });
      setShowModal(true);
    }
  };

  return (
    <motion.div
      className="container relative flex h-full flex-col place-content-center rounded-2xl"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        initial={{ y: 60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 60, opacity: 0 }}
        transition={{ duration: 0.5, ease: 'easeInOut' }}
      >
        <DateInputs onDatesSelected={calculateAge} background={background} />
      </motion.div>

      <AnimatePresence>
        {showModal && age && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 flex items-center justify-center overflow-y-auto bg-primary p-6"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: 'spring', stiffness: 300, damping: 28 }}
              className="w-full max-w-lg"
            >
              <BirthDayModal age={age} setShowModal={setShowModal} birthDate={birthDate} background={background} />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default AgeCalculator;
