import React from 'react';

interface DateModalProps {
    age: {
        years: number;
        months: number;
        days: number;
        totalmonths: number;
        totalweeks: number;
        totaldays: number;
    };
    setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
    birthDate: Date | null;
}

const DateModal: React.FC<DateModalProps> = ({ setShowModal, age }) => {
    const formattedtotaldays = age.totaldays.toLocaleString('en-IN');

    const totalhours = age.totaldays * 24;
    const formattedtotalhours = totalhours.toLocaleString('en-IN');

    const totalminutes = totalhours * 60;
    const formattedtotalminutes = totalminutes.toLocaleString('en-IN');

    const totalseconds = totalminutes * 60;
    const formattedtotalseconds = totalseconds.toLocaleString('en-IN');



    return (
        <>
            <div className="bg-primary text-secondary flex flex-col place-content-center h-full">
                {/* Start : Summary */}
                <div className='text-center'>
                    <h4 className="text-rose-500 font-semibold py-4">Difference between selected dates</h4>
                    <div className="grid grid-cols-3 gap-4">
                        <div className="flex flex-col">
                            <span className="text-xs font-light">Years</span>
                            <span>{age.years}</span>
                        </div>
                        <div className="flex flex-col">
                            <span className="text-xs font-light">Months</span>
                            <span>{age.totalmonths}</span>
                        </div>
                        <div className="flex flex-col">
                            <span className="text-xs font-light">Weeks</span>
                            <span>{age.totalweeks}</span>
                        </div>
                        <div className="flex flex-col">
                            <span className="text-xs font-light">Days</span>
                            <span>{formattedtotaldays}</span>
                        </div>
                        <div className="flex flex-col">
                            <span className="text-xs font-light">Hours</span>
                            <span>{formattedtotalhours}</span>
                        </div>
                        <div className="flex flex-col">
                            <span className="text-xs font-light">Minutes</span>
                            <span>{formattedtotalminutes}</span>
                        </div>
                        <div className="flex flex-col col-start-2">
                            <span className="text-xs font-light">Seconds</span>
                            <span>{formattedtotalseconds}</span>
                        </div>
                    </div>
                </div>
                <div className="flex justify-center mt-10">
                    <button
                        onClick={() => { setShowModal(false); }}
                        className="text-sm bg-rose-500 text-white rounded p-2"
                    >close</button>
                    {/* End : Summary */}
                </div>
            </div>

        </>
    );
};

export default DateModal;