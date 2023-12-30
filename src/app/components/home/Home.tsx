import { Link } from "react-router-dom";
const Home = () => {
    return (
        <>
            <div className="container grid place-content-center h-full rounded-2xl text-center">
                <Link className="bg-rose-500 p-4 rounded text-white" to={'/age-calculator'}>Age Calculator</Link>
                <Link className="bg-rose-500 p-4 rounded text-white" to={'/date-calculator'}>Date Calculator</Link>
                <Link className="bg-rose-500 p-4 rounded text-white" to={'/flip-a-coin'}>Flip a Coin</Link>
            </div>
        </>
    );
};

export default Home;