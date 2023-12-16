// src/components/DateInputs.tsx

import React, { useState } from 'react';

interface DateInputsProps {
    onDatesSelected: (birthdate: Date | null, comparisonDate: Date | null) => void;
}

const DateInputs: React.FC<DateInputsProps> = ({ onDatesSelected }) => {
    const [birthDate, setBirthDate] = useState<Date | null>(null);
    const [comparisonDate, setComparisonDate] = useState<Date | null>(null);

    const handleSubmit = (e: any) => {
        e.preventDefault();
        onDatesSelected(birthDate, comparisonDate);
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="flex justify-between py-2">
                <label htmlFor='enterDate'>Enter Date :</label>
                <input
                    type="date"
                    id='enterDate'
                    onChange={(e) => setBirthDate(new Date(e.target.value))}
                    className="outline-none text-rose-500 cursor-pointer rounded-sm p-1"
                />
            </div>
            <div className="flex justify-between py-2">
                <label htmlFor='currentDate'>Today :</label>
                <input
                    type="date"
                    id='currentDate'
                    onChange={(e) => setComparisonDate(new Date(e.target.value))}
                    className="outline-none text-rose-500 cursor-pointer rounded-sm p-1"
                />
            </div>
            <div className="flex justify-center mt-10">
                <button
                    onClick={handleSubmit}
                    className="text-sm bg-rose-500 text-white rounded p-2"
                >calculate</button>
            </div>
        </form>
    );
};

export default DateInputs;