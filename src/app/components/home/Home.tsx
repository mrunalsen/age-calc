import { Link } from "react-router-dom";
const Home = () => {
    return (
        <>
            <div className="container flex flex-col place-content-center h-full rounded-2xl text-center">
                <div className="flex flex-col">
                    {/* <div>
                        <Link className="bg-rose-500 my-1 rounded" to={'/'}>Home</Link>
                    </div> */}
                    <div>
                        <Link className="bg-rose-500 my-1 rounded" to={'/age-calculator'}>Age Calculator</Link>
                    </div>
                    <div>
                        <Link className="bg-rose-500 my-1 rounded" to={'/date-calculator'}>Date Calculator</Link>
                    </div>
                    <div>
                        <Link className="bg-rose-500 my-1 rounded" to={'/flip-a-coin'}>Flip a Coin</Link>
                    </div>
                </div>
                {/* <AgeCalculator /> */}
            </div>
        </>
    );
};

export default Home;