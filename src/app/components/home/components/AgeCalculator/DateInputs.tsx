import React, { useState } from 'react';
import { Link } from 'react-router-dom';

interface DateInputsProps {
    onDatesSelected: (birthdate: Date | null, comparisonDate: Date | null) => void;
}

const DateInputs: React.FC<DateInputsProps> = ({ onDatesSelected }) => {
    const [birthDate, setBirthDate] = useState<Date | null>(null);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const currentDate = new Date();
        onDatesSelected(birthDate, currentDate);
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
            <div className="flex flex-col justify-center mt-10">
                <button
                    onClick={handleSubmit}
                    className="text-sm bg-rose-500 text-white rounded p-2 mb-4"
                >calculate</button>
                <Link to={'/'} className=' text-center'>Home</Link>
            </div>
        </form>
    );
};

export default DateInputs;