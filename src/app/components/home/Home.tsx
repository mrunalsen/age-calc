import { useState } from 'react';
// import Dates from '../Dates';
import AgeForm from '../ageform/AgeForm';
import { differenceInDays, differenceInMonths, differenceInYears } from 'date-fns';
import AgeResult from '../ageform/AgeResult';

const Home = () => {
    const [age, setAge] = useState<{
        years: number;
        months: number;
        days: number;
    } | null>(null);

    const calculateAge = (birthdate: Date) => {
        const today = new Date();
        const birthdateObj = new Date(birthdate);

        const ageYears = differenceInYears(today, birthdateObj);
        const ageMonths = differenceInMonths(today, birthdateObj);
        const ageDays = differenceInDays(today, birthdateObj);
        setAge({
            years: ageYears,
            months: ageMonths,
            days: ageDays
        });
    };

    return (
        <>
            <div className="container flex flex-col place-content-center h-full bg-white rounded-2xl">
                <header className='flex justify-center'>
                    <h1>Age</h1>
                </header>
                {/* <Dates /> */}
                <AgeForm calculateAge={calculateAge} />
                {age && <AgeResult age={age} />}
            </div>
        </>
    );
};

export default Home;