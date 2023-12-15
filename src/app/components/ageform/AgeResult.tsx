interface AgeResultProps {
    age: {
        years: number,
        months: number,
        days: number,
        monthDiff: number;
        weekDiff: number;
        daysDiff: number;
    };
    setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const AgeResult: React.FC<AgeResultProps> = ({ age, setShowModal }) => {
    const totalHours = age.days * 24;
    const totalMinutes = totalHours * 60;
    const totalSeconds = totalMinutes * 60;
    return (
        <>
            <p>you're</p>
            <p>{age.years} years</p>
            <p>{age.monthDiff} months</p>
            <p>{age.daysDiff} days</p>
            <p> Total months {age.months}</p>
            <p>Total Weeks : {age.weekDiff}</p>
            <p>Total Days : {age.days}</p>
            <p>Total Hours : {totalHours}</p>
            <p>Total Minutes : {totalMinutes}</p>
            <p>Total Seconds : {totalSeconds}</p>
            <button onClick={() => { setShowModal(false); }}>close</button>
        </>
    );
};

export default AgeResult;