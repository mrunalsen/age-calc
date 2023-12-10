interface Props {
    dateDifference: string;
    topDateValue: string;
    currentDate: Date;
    topDate: Date;
    setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const Results: React.FC<Props> = ({ dateDifference, currentDate, topDate, setShowModal }) => {
    const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const selectedDay = topDate.getDay();
    const dayName = dayNames[selectedDay];

    const nextBirthday = new Date(currentDate.getFullYear(), topDate.getMonth(), topDate.getDate());
    if (nextBirthday < currentDate) {
        nextBirthday.setFullYear(nextBirthday.getFullYear() + 1);
    }
    const timeDifference = nextBirthday.getTime() - currentDate.getTime();
    const daysUntilBirthday = Math.ceil(timeDifference / (1000 * 3600 * 24));
    const monthsUntilBirthday = Math.floor(daysUntilBirthday / 30);
    const remainingDays = daysUntilBirthday % 30;

    const totalMonths = Math.floor(dateDifference.includes('Year') ? parseInt(dateDifference.replace(/\D/g, '')) * 12 : 0);
    const totalDays = dateDifference.includes('Year') ? parseInt(dateDifference.replace(/\D/g, '')) * 365 : parseInt(dateDifference.replace(/\D/g, ''));
    const totalWeeks = Math.floor(totalDays / 7);
    // Calculate total hours and minutes
    const totalHours = totalDays * 24;
    const totalMinutes = totalHours * 60;

    const dateDifferenceOnlyDigits = dateDifference.replace(/\D+/g, '');
    const dateDifferenceWithoutDigits = dateDifference.replace(/\d+/g, '');
    const label = dateDifference.includes('Year') ? 'Years' : 'Days';

    const birthdayMonth = topDate.getMonth();
    const birthdayDay = topDate.getDate();
    const currentMonth = currentDate.getMonth();
    const currentDay = currentDate.getDate();

    let monthsPassed = 0;
    let daysPassed = 0;

    if (currentMonth === birthdayMonth) {
        if (currentDay >= birthdayDay) {
            daysPassed = currentDay - birthdayDay;
        } else {
            // Find the days remaining in the month if birthday day hasn't occurred yet
            const daysInMonth = new Date(currentDate.getFullYear(), currentMonth + 1, 0).getDate();
            daysPassed = daysInMonth - (birthdayDay - currentDay);
            monthsPassed--;
        }
    } else if (currentMonth > birthdayMonth) {
        monthsPassed = currentMonth - birthdayMonth;
        if (currentDay >= birthdayDay) {
            daysPassed = currentDay - birthdayDay;
        } else {
            // Find the days remaining in the month if birthday day hasn't occurred yet
            const daysInMonth = new Date(currentDate.getFullYear(), currentMonth, 0).getDate();
            daysPassed = daysInMonth - (birthdayDay - currentDay);
            monthsPassed--;
        }
    } else {
        monthsPassed = 12 - (birthdayMonth - currentMonth);
        if (currentDay >= birthdayDay) {
            daysPassed = currentDay - birthdayDay;
        } else {
            // Find the days remaining in the month if birthday day hasn't occurred yet
            const daysInMonth = new Date(currentDate.getFullYear() - 1, currentMonth, 0).getDate();
            daysPassed = daysInMonth - (birthdayDay - currentDay);
            monthsPassed--;
        }
    }


    return (
        <div className="container flex flex-col place-content-center h-full bg-white">
            {/* Start : Result */}
            <div className="grid grid-cols-2 pb-4">
                {/* <div className="flex justify-between pb-4"> */}
                {/* Start : Age */}
                <div className="border-r border-rose-500 ps-8">
                    <h1 className="text-3xl pb-3">Age</h1>
                    <div className="flex items-center pb-2">
                        <span className="text-6xl text-rose-500 me-2">
                            {dateDifferenceOnlyDigits}
                        </span>
                        <span>{dateDifferenceWithoutDigits}</span>
                    </div>
                    <div className="flex text-xs">
                        <span>{monthsPassed} months</span>
                        <div className="w-[1px] bg-rose-500 mx-1"></div>
                        <span>{daysPassed} days</span>
                    </div>
                </div>
                {/* End : Age */}
                {/* Start : Next Bday */}
                <div className="flex flex-col  text-center justify-between">
                    <h4 className="text-rose-500 font-semibold">Next Birthday</h4>
                    {/* <span>{topDateValue}</span> */}
                    <div className="flex justify-center">
                        <span className="icon-cake bg-gradient-to-br from-rose-400 to-rose-500 text-white rounded-full p-4"></span>
                    </div>
                    <span className="text-xs font-semibold">{dayName}</span>
                    <div className="flex justify-center text-xs">
                        <span>{monthsUntilBirthday} months</span>
                        <div className="w-[1px] h-full bg-rose-500 mx-1"></div>
                        <span>{remainingDays} Days</span>
                    </div>
                </div>
                {/* End : Next Bday */}
            </div>
            {/* End : Result */}
            <hr />
            {/* Start : Summary */}
            <div className="text-center">
                <h4 className="text-rose-500 font-semibold py-4">Summary</h4>
                <div className="grid grid-cols-3 gap-4">
                    <div className="flex flex-col">
                        {dateDifference.includes('Year') ? (
                            <>
                                <span className="text-xs font-light">{label}</span>
                                <span>{dateDifferenceOnlyDigits}</span>
                            </>
                        ) : (
                            <>
                                <span className="text-xs font-light">Years</span>
                                <span>0</span>
                            </>
                        )}
                    </div>
                    <div className="flex flex-col">
                        <span className="text-xs font-light">Months</span>
                        <span>{totalMonths}</span>
                    </div>
                    <div className="flex flex-col">
                        <span className="text-xs font-light">Weeks</span>
                        <span>{totalWeeks}</span>
                    </div>
                    <div className="flex flex-col">
                        <span className="text-xs font-light">Days</span>
                        <span>{totalDays}</span>
                    </div>
                    <div className="flex flex-col">
                        <span className="text-xs font-light">Hours</span>
                        <span>{totalHours}</span>
                    </div>
                    <div className="flex flex-col">
                        <span className="text-xs font-light">Minutes</span>
                        <span>{totalMinutes}</span>
                    </div>
                </div>
            </div>
            <div className="flex justify-center mt-10">
                <button
                    onClick={() => { setShowModal(false); }}
                    className="text-sm bg-rose-500 text-white rounded p-2"
                >Calculate Again</button>
            </div>
            {/* End : Summary */}
        </div>
    );
};

export default Results;