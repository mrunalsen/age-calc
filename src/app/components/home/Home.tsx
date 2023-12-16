import AgeCalculator from "./components/AgeCalculator";

const Home = () => {
    return (
        <>
            <div className="bg-primary text-secondary container flex flex-col place-content-center h-full transition-all duration-300 rounded-2xl">
                <AgeCalculator />
            </div>
        </>
    );
};

export default Home;