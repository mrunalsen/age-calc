import { Link } from "react-router-dom";

const Header = () => {

    return (
        <div className="bg-rose-500 flex justify-center">
            <Link to={'/'}>
                <h2 className="text-white py-2">Pocket Tools</h2>
            </Link>

        </div>
    );
};

export default Header;