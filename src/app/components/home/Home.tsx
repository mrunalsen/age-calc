import AgeCalculator from "./components/AgeCalculator";

const Home = () => {
    return (
        <>
            <div className="container flex flex-col place-content-center h-full bg-white rounded-2xl">
                <header className='flex justify-center'>
                    <h1>Age</h1>
                </header>
                <AgeCalculator />
            </div>
        </>
    );
};

export default Home;