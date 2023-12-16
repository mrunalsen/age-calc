import Header from "../../core/components/navigation/Header";
import AgeCalculator from "./components/AgeCalculator";

const Home = () => {
    return (
        <>
            <div className="container flex flex-col place-content-center h-full bg-white rounded-2xl">
                <Header />
                <AgeCalculator />
            </div>
        </>
    );
};

export default Home;