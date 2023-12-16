import Header from "../../core/components/navigation/Header";
import AgeCalculator from "./components/AgeCalculator";

const Home = () => {
    return (
        <>
            <Header />
            <div className="container flex flex-col place-content-center h-full bg-white rounded-2xl">
                <AgeCalculator />
            </div>
        </>
    );
};

export default Home;