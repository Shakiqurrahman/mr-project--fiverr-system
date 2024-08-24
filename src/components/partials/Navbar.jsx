import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Navbar = () => {
  const { user } = useSelector((state) => state.user);

  const adminRole = user?.role === "ADMIN";
  // const userRole = user?.role === "USER";

  return (
    <nav className="bg-primary py-4">
      <ul className="max-width flex flex-wrap justify-center gap-x-6 gap-y-2 text-white">
        {adminRole && (
          <>
            <li className="duration-300 hover:text-gray-300">
              <Link to="/upload-design">Upload</Link>
            </li>
            <li className="duration-300 hover:text-gray-300">
              <Link to="/analytics">Analytics</Link>
            </li>
            <li className="duration-300 hover:text-gray-300">
              <Link to="/admin-dashboard">Dashboard</Link>
            </li>
          </>
        )}
        <li className="duration-300 hover:text-gray-300">
          <Link to="/designs">Designs</Link>
        </li>
        <li className="duration-300 hover:text-gray-300">
          <Link to="/industries">Industries</Link>
        </li>
        <li className="duration-300 hover:text-gray-300">
          <Link to="/pricelist">Price List</Link>
        </li>
        <li className="duration-300 hover:text-gray-300">
          <Link to="/dashboard">Project</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
