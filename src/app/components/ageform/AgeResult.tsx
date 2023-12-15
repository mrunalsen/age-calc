interface AgeResultProps {
    age: {
        years: number,
        months: number,
        days: number,
    };
}

const AgeResult: React.FC<AgeResultProps> = ({ age }) => {
    return (
        <div>you are {age.years} and {age.months} months and {age.days} days old</div>
    );
};

export default AgeResult;