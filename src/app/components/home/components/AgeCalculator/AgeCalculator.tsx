import React, { useRef, useState } from 'react';
import { differenceInYears, differenceInMonths, differenceInDays, differenceInWeeks } from 'date-fns';
import DateInputs from './DateInputs';
import BirthDayModal from './BirthDayModal';
import { CSSTransition } from 'react-transition-group';
import { motion } from 'framer-motion';

const AgeCalculator: React.FC = () => {
    const [showModal, setShowModal] = useState(false);
    const [, setShowbutton] = useState(true);
    const noderef = useRef(null);
    const [birthDate, setBirthDate] = useState<Date | null>(null);

    const [age, setAge] = useState<{
        years: number;
        months: number;
        days: number;
        totalmonths: number;
        totalweeks: number;
        totaldays: number;
    } | null>(null);

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
        <motion.div className='container flex flex-col place-content-center h-full rounded-2xl'
            initial={{
                opacity: 0
            }}
            animate={{
                opacity: 1
            }}
            exit={{
                opacity: 0
            }}
        >
            <motion.div
                initial={{ y: '200px' }}
                animate={{ y: '0px' }}
                exit={{ y: '200px' }}
                transition={{ duration: .5, ease: 'easeInOut' }}
            >
                <DateInputs onDatesSelected={calculateAge} />
            </motion.div>
            <CSSTransition
                in={showModal}
                timeout={300}
                mountOnEnter
                unmountOnExit
                classNames="alert"
                onEnter={() => { setShowbutton(false); }}
                onExited={() => { setShowbutton(true); }}
            >
                <div
                    ref={noderef}
                    className="absolute top-0 bottom-0 left-0 right-0"
                >
                    {age && <BirthDayModal
                        age={age}
                        setShowModal={setShowModal}
                        birthDate={birthDate}
                    />}
                </div>
            </CSSTransition>
        </motion.div>
    );
};

export default AgeCalculator;
