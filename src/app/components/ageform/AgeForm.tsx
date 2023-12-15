import { useState } from "react";

interface AgeFormProps {
    calculateAge: (birthday: Date) => void;
}

const AgeForm: React.FC<AgeFormProps> = ({ calculateAge }) => {
    const [birthday, setBirthday] = useState('');

    const handlechange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setBirthday(e.target.value);
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const birthdate = new Date(birthday);
        calculateAge(birthdate);
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="date"
                name="today"
                id="today"
                value={birthday}
                onChange={handlechange}
            />
            <button type="submit">calcullate</button>
        </form>
    );
};


export default AgeForm;