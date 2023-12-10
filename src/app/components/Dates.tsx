import { useEffect, useRef, useState } from "react";
import Results from "./modal/Results";
import { CSSTransition } from 'react-transition-group';

const Dates = () => {

    const [, setShowbutton] = useState(true);
    const noderef = useRef(null);

    const currentDate = new Date();
    const [topDateValue, setTopDateValue] = useState<Date | null>(null);
    const [bottomDateValue, setBottomDateValue] = useState<Date | null>(null);
    const [dateDifference, setDateDifference] = useState('');
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        const today = new Date();
        setBottomDateValue(today);
    }, []);

    const handleChange = (date: Date, inputType: string) => {
        if (inputType === 'top') {
            setTopDateValue(date);
        } else {
            setBottomDateValue(date);
        }
    };
    const calculate = () => {
        if (topDateValue && bottomDateValue) {
            const timeDifference = bottomDateValue.getTime() - topDateValue.getTime();
            const daysDifference = timeDifference / (1000 * 3600 * 24);
            const yearDifference = daysDifference / 365;
            setShowModal(true);

            if (daysDifference > 365) {
                const roundedYears = Math.round(yearDifference);
                setDateDifference(`${roundedYears} ${roundedYears === 1 ? 'Year' : 'Years'}`);
            } else {
                const roundedDays = Math.round(daysDifference);
                setDateDifference(`${roundedDays} ${roundedDays === 1 ? 'Day' : 'Days'}`);
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
                        value={topDateValue ? topDateValue.toISOString().split('T')[0] : ''}
                        onChange={(e) => handleChange(new Date(e.target.value), 'top')}
                        className="outline-none text-rose-500 cursor-pointer rounded-sm p-1"
                    />
                </div>
                <div className="flex justify-between">
                    <label htmlFor="datebottom">Today</label>
                    <input
                        type="date"
                        name="datebottom"
                        id="datebottom"
                        value={bottomDateValue ? bottomDateValue.toISOString().split('T')[0] : ''}
                        onChange={(e) => handleChange(new Date(e.target.value), 'bottom')}
                        className="outline-none text-rose-500 cursor-pointer rounded-sm p-1"
                    />
                </div>
            </div>
            <div className="flex justify-center mt-10">
                <button
                    onClick={calculate}
                    className="text-sm bg-rose-500 text-white rounded p-2"
                >Calculate</button>
            </div>

            <CSSTransition in={showModal}
                timeout={300}
                mountOnEnter
                unmountOnExit
                classNames="alert"
                onEnter={() => { setShowbutton(false); }}
                onExited={() => { setShowbutton(true); }}

            >
                <div
                    ref={noderef}
                    className="absolute top-0 bottom-0 left-0 right-0"
                >
                    <Results
                        setShowModal={setShowModal}
                        dateDifference={dateDifference}
                        topDateValue={topDateValue ? topDateValue.toISOString().split('T')[0] : ''}
                        topDate={topDateValue || new Date()}
                        currentDate={currentDate}
                    />
                </div>
            </CSSTransition>
            {/*          
            {showModal && (
                <Results
                    dateDifference={dateDifference}
                    topDateValue={topDateValue ? topDateValue.toISOString().split('T')[0] : ''}
                    topDate={topDateValue || new Date()}
                    currentDate={currentDate}
                />
            )} */}
        </>
    );
};

export default Dates;
