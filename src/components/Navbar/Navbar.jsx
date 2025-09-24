import { Link } from "react-router-dom";
import logo from "../../assets/logo.webp";
const Navbar = () => {
  return (
    <nav className="bg-white  border-gray-300 relative z-50">
      <div className="container mx-auto px-4 py-2 flex items-center justify-between">
        {/* Logo */}
        <div className="text-xl font-bold">
          <Link to="/" className="text-gray-800 ">
            <img loading="lazy" src={logo} width={150} className="" alt="" />
          </Link>
        </div>

        {/* Desktop Menu */}
        <div className=" md:flex justify-center items-center space-x-4">
          <Link
            to="/signup"
            className="px-4 py-2 text-sm font-bold bg-indigo-600 text-white rounded hover:bg-indigo-800 "
          >
            Sign Up{" "}
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
