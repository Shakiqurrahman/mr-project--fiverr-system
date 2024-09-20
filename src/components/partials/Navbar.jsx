import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import DownArrow from "../../libs/DownArrow";
import DropDownMenu from "./DropDownMenu";

const Navbar = () => {
  const { user } = useSelector((state) => state.user);

  const adminRole = user?.role === "ADMIN";
  // const userRole = user?.role === "USER";

  return (
    <nav className="relative bg-primary">
      <ul className="max-width flex flex-wrap justify-center gap-x-6 gap-y-2 py-4 text-[13px] text-white sm:text-base md:py-0">
        {adminRole && (
          <>
            <li className="duration-300 hover:text-gray-300 md:py-4">
              <Link to="/upload-design">Upload</Link>
            </li>
            <li className="duration-300 hover:text-gray-300 md:py-4">
              <Link to="/analytics">Analytics</Link>
            </li>
            <li className="duration-300 hover:text-gray-300 md:py-4">
              <Link to="/admin-dashboard">Dashboard</Link>
            </li>
            <li className="duration-300 hover:text-gray-300 md:py-4">
              <Link to="/multi-project">Multi-Project</Link>
            </li>
          </>
        )}
        <li className="group duration-300 hover:text-gray-300 md:py-4">
          <Link to="/designs" className="flex items-center gap-1.5">
            Designs
            <DownArrow className="hidden fill-white duration-300 group-hover:fill-gray-300 sm:block sm:size-4 md:group-hover:rotate-180" />
          </Link>
          <DropDownMenu
            className="invisible z-[-1] -translate-y-full duration-300 sm:group-hover:visible sm:group-hover:translate-y-0"
            isDesign={true}
          />
        </li>
        <li className="group duration-300 hover:text-gray-300 md:py-4">
          <Link to="/industries" className="flex items-center gap-1.5">
            Industries
            <DownArrow className="hidden fill-white duration-300 group-hover:fill-gray-300 sm:block sm:size-4 md:group-hover:rotate-180" />
          </Link>
          <DropDownMenu
            className="invisible z-[-1] -translate-y-full duration-300 sm:group-hover:visible sm:group-hover:translate-y-0"
            isIndustry={true}
          />
        </li>
        <li className="duration-300 hover:text-gray-300 md:py-4">
          <Link to="/pricelist">Price List</Link>
        </li>
        <li className="duration-300 hover:text-gray-300 md:py-4">
          <Link to="/project">Project</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
