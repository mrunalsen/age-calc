import { useEffect, useState } from "react";
import Result from "../modal/Result";
const DateInput = () => {
    const currentDate = new Date();
    const [topDateValue, setTopDateValue] = useState('');
    const [bottomDateValue, setBottomDateValue] = useState('');
    const [dateDifference, setDateDifference] = useState('');
    const [showModal, setShowModal] = useState(false);

    const topDate = new Date(topDateValue);
    const bottomDate = new Date(bottomDateValue);

    useEffect(() => {
        setBottomDateValue(currentDate.toISOString().slice(0, 10));
    }, []);

    const handleChange = (e: any, inputType: any) => {
        const dateValue = e.target.value;
        if (inputType === 'top') {
            setTopDateValue(dateValue);
        } else {
            setBottomDateValue(dateValue);
        }
    };

    const calculate = () => {

        if (!isNaN(topDate.getTime()) && !isNaN(bottomDate.getTime())) {
            setShowModal(true);
            const timeDifference = bottomDate.getTime() - topDate.getTime();
            const daysDifference = timeDifference / (1000 * 3600 * 24);
            const yearDifference = Math.round(daysDifference / 365);
            const yearText = yearDifference === 1 ? `${yearDifference} year` : `${yearDifference} years`;
            const dateText = daysDifference === 1 ? `${daysDifference} day` : `${daysDifference} days`;
            if (daysDifference > 365) {
                setDateDifference(yearText.toLocaleString());
            } else {
                setDateDifference(dateText);
            }
        } else {
            setDateDifference(`Invalid Dates`);
        }
    };

    return (
        <>
            <div>
                <div className="flex justify-between">
                    <label htmlFor="datetop">Enter Date</label>
                    <input
                        type="date"
                        name="datetop"
                        id="datetop"
                        value={topDateValue}
                        onChange={(e) => handleChange(e, 'top')}
                        className="outline-none text-rose-500 cursor-pointer rounded-sm p-1"
                    />
                </div>
                <div className="flex justify-between">
                    <label htmlFor="datebottom">Today</label>
                    <input type="date"
                        name="datebottom"
                        id="datebottom"
                        value={bottomDateValue}
                        onChange={(e) => handleChange(e, 'bottom')}
                        className="outline-none text-rose-500 cursor-pointer rounded-sm p-1"
                    />
                </div>
            </div>
            <button onClick={calculate}>Calculate</button>
            {showModal && (
                <Result
                    dateDifference={dateDifference}
                    topDateValue={topDateValue}
                    currentDate={currentDate}
                    topDate={topDate}
                />
            )}
        </>
    );
};

export default DateInput;