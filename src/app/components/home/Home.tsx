import { useRef, useState } from 'react';
import AgeForm from '../ageform/AgeForm';
import { differenceInDays, differenceInMonths, differenceInWeeks, differenceInYears, getDate, getMonth } from 'date-fns';
import AgeResult from '../ageform/AgeResult';
import { CSSTransition } from 'react-transition-group';

const Home = () => {
    const [showModal, setShowModal] = useState(false);
    const [, setShowbutton] = useState(true);
    const noderef = useRef(null);

    const [age, setAge] = useState<{
        years: number;
        months: number;
        days: number;
        monthDiff: number;
        weekDiff: number;
        daysDiff: number;
    } | null>(null);

    const calculateAge = (enteredDate: Date, birthdate: Date) => {
        const currentDate = new Date();
        const thisMonth = getMonth(currentDate);
        const monthsLeft = getMonth(enteredDate);
        const birthdateObj = new Date(birthdate);


        const ageYears = Math.abs(differenceInYears(enteredDate, birthdateObj));
        const ageMonths = Math.abs(differenceInMonths(enteredDate, birthdateObj));
        const ageWeeks = Math.abs(differenceInWeeks(enteredDate, birthdateObj));
        const ageDays = Math.abs(differenceInDays(enteredDate, birthdateObj));

        const monthDiff = Math.abs(monthsLeft - thisMonth);

        const today = getDate(currentDate);
        console.log('today :', today);

        const daysLeft = getDate(enteredDate);
        console.log('days left :', daysLeft);

        const daysDiff = Math.abs(daysLeft - today);
        console.log(daysLeft, '-', today);

        setAge({
            years: ageYears,
            months: ageMonths,
            days: ageDays,
            monthDiff: monthDiff,
            weekDiff: ageWeeks,
            daysDiff: daysDiff
        });
        setShowModal(true);
    };

    return (
        <>
            <div className="container flex flex-col place-content-center h-full bg-white rounded-2xl">
                <header className='flex justify-center'>
                    <h1>Age</h1>
                </header>
                <AgeForm calculateAge={calculateAge} />
                {/* {showModal}
                {age && <AgeResult age={age} />} */}
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
                        className=" top-0 bottom-0 left-0 right-0"
                    >
                        {age && <AgeResult age={age} setShowModal={setShowModal} />}
                    </div>
                </CSSTransition>
            </div>
        </>
    );
};

export default Home;