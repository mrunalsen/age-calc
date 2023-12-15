import { useEffect, useState } from "react";

interface AgeFormProps {
    calculateAge: (enteredDate: Date, birthday: Date) => void;
}

const AgeForm: React.FC<AgeFormProps> = ({ calculateAge }) => {
    const [enterday, setEnterday] = useState('');
    const [birthday, setBirthday] = useState('');

    useEffect(() => {
        const formattedDate = new Date().toISOString().substring(0, 10);
        setBirthday(formattedDate);

    }, []);

    const handleEnterdayChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEnterday(e.target.value);

    };
    const handleBirthdayChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setBirthday(e.target.value);
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const birthdate = new Date(birthday);
        const enteredDate = new Date(enterday);
        calculateAge(enteredDate, birthdate);
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="date"
                name="enterDay"
                id="enterDay"
                value={enterday}
                onChange={handleEnterdayChange}
            />
            <input
                type="date"
                name="today"
                id="today"
                value={birthday}
                onChange={handleBirthdayChange}
            />
            <button type="submit" disabled={!enterday}>calculate</button>
        </form>
    );
};


export default AgeForm;