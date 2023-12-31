import { Link } from "react-router-dom";
import { motion } from 'framer-motion';
const Home = () => {
    return (
        <>
            <motion.div className="container grid gap-3 place-content-center h-full rounded-2xl text-center"
                initial={{
                    opacity: 0
                }}
                animate={{
                    opacity: 1
                }}
                exit={{
                    opacity: 0
                }}
                transition={{ delay: .25, duration: .5, ease: 'easeInOut' }}

            >
                <motion.div
                    initial={{ y: '200px' }}
                    animate={{ y: '0px' }}
                    exit={{ y: '200px' }}
                    transition={{ duration: .5, ease: 'easeInOut' }}
                >
                    <Link className="bg-rose-500 flex items-center justify-start p-4 rounded text-white active:scale-50 transition-all duration-300" to={'/age-calculator'}><span className="icon-cake-main me-3"></span> Age Calculator</Link>
                    <Link className="bg-rose-500 flex items-center justify-start p-4 rounded text-white active:scale-50 transition-all duration-300" to={'/date-calculator'}><span className="icon-calendar me-3"></span> Date Calculator</Link>
                    <Link className="bg-rose-500 flex items-center justify-start p-4 rounded text-white active:scale-50 transition-all duration-300" to={'/flip-a-coin'}><span className="icon-coin me-3"></span> Flip a Coin</Link>
                </motion.div>
            </motion.div>
        </>
    );
};

export default Home;