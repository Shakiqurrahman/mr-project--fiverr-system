import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import DownArrow from "../../libs/DownArrow";
import DropDownMenu from "../../libs/DropDownMenu";

const Navbar = () => {
  const { user } = useSelector((state) => state.user);

  const adminRole = user?.role === "ADMIN";
  // const userRole = user?.role === "USER";

  return (
    <nav className="relative bg-primary">
      <ul className="max-width flex flex-wrap justify-center gap-x-6 gap-y-2 text-white">
        {adminRole && (
          <>
            <li className="py-4 duration-300 hover:text-gray-300">
              <Link to="/upload-design">Upload</Link>
            </li>
            <li className="py-4 duration-300 hover:text-gray-300">
              <Link to="/analytics">Analytics</Link>
            </li>
            <li className="py-4 duration-300 hover:text-gray-300">
              <Link to="/admin-dashboard">Dashboard</Link>
            </li>
          </>
        )}
        <li className="group py-4 duration-300 hover:text-gray-300">
          <Link to="/designs" className="flex items-center gap-1.5">
            Designs
            <DownArrow className="size-3 fill-white group-hover:fill-gray-300 sm:size-4 group-hover:rotate-180 duration-300" />
          </Link>
          <DropDownMenu
            className="invisible z-[-1] -translate-y-full duration-300 md:group-hover:visible md:group-hover:translate-y-0"
            isDesign={true}
          />
        </li>
        <li className="group py-4 duration-300 hover:text-gray-300">
          <Link to="/industries" className="flex items-center gap-1.5">
            Industries
            <DownArrow className="size-3 fill-white group-hover:fill-gray-300 sm:size-4 group-hover:rotate-180 duration-300" />
          </Link>
          <DropDownMenu
            className="invisible z-[-1] -translate-y-full duration-300 md:group-hover:visible md:group-hover:translate-y-0"
            isIndustry={true}
          />
        </li>
        <li className="py-4 duration-300 hover:text-gray-300">
          <Link to="/pricelist">Price List</Link>
        </li>
        <li className="py-4 duration-300 hover:text-gray-300">
          <Link to="/project">Project</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
