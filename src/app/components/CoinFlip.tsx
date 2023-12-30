import { useState } from 'react';

const CoinFlip = () => {
    const [result, setResult] = useState<string>('');

    const handleCoinClick = () => {
        const flipResult = Math.random();
        setResult('');

        setTimeout(() => {
            if (flipResult <= 0.5) {
                setResult('heads');
                console.log('it is head');
            } else {
                setResult('tails');
                console.log('it is tails');
            }
        }, 100);
    };

    return (
        <div className='flex justify-center items-center h-full'>
            <div id="coin" onClick={handleCoinClick} className={result}>
                <div className="side-a bg-rose-500 flex justify-center items-center text-white text-5xl"><span className='icon-king'></span></div>
                <div className="side-b flex justify-center items-center text-white text-5xl"><span className='icon-queen'></span></div>
            </div>
        </div>
    );
};

export default CoinFlip;
