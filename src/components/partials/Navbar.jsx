import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import DownArrow from "../../libs/DownArrow";
import DropDownMenu from "./DropDownMenu";

const Navbar = () => {
  const { user } = useSelector((state) => state.user);

  const isAdmin = ["ADMIN", "SUPER_ADMIN"].includes(user?.role);
  const isAuthorized = ["SUB_ADMIN", "ADMIN", "SUPER_ADMIN"].includes(
    user?.role,
  );
  // const userRole = user?.role === "USER";

  return (
    <nav className="relative bg-primary">
      <ul className="max-width flex flex-wrap justify-center gap-x-6 gap-y-2 py-4 text-[15px] text-white sm:text-base lg:py-0">
        {isAuthorized && (
          <>
            <li className="duration-300 hover:text-gray-300 lg:py-4">
              <NavLink to="/upload-design">Upload</NavLink>
            </li>
            {isAdmin && (
              <li className="duration-300 hover:text-gray-300 lg:py-4">
                <NavLink to="/analytics">Analytics</NavLink>
              </li>
            )}
            <li className="duration-300 hover:text-gray-300 lg:py-4">
              <NavLink to="/admin-dashboard">Dashboard</NavLink>
            </li>
            {isAdmin && (
              <li className="duration-300 hover:text-gray-300 lg:py-4">
                <NavLink to="/multi-project">M-D Project</NavLink>
              </li>
            )}
          </>
        )}
        <li className="group duration-300 hover:text-gray-300 lg:py-4">
          <NavLink to="/designs" className="flex items-center gap-1.5">
            Designs
            <DownArrow className="hidden fill-white duration-300 group-hover:fill-gray-300 sm:block sm:size-4 md:group-hover:rotate-180" />
          </NavLink>
          <DropDownMenu
            className="invisible z-[-1] -translate-y-full duration-300 sm:group-hover:visible sm:group-hover:translate-y-0"
            isDesign={true}
          />
        </li>
        <li className="group duration-300 hover:text-gray-300 lg:py-4">
          <NavLink to="/industries" className="flex items-center gap-1.5">
            Industries
            <DownArrow className="hidden fill-white duration-300 group-hover:fill-gray-300 sm:block sm:size-4 md:group-hover:rotate-180" />
          </NavLink>
          <DropDownMenu
            className="invisible z-[-1] -translate-y-full duration-300 sm:group-hover:visible sm:group-hover:translate-y-0"
            isIndustry={true}
          />
        </li>
        <li className="duration-300 hover:text-gray-300 lg:py-4">
          <NavLink to="/pricelist">Price List</NavLink>
        </li>
        <li className="duration-300 hover:text-gray-300 lg:py-4">
          <NavLink to="/project">Project</NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
