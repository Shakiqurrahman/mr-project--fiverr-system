import { Link } from "react-router-dom";
import Divider from "../Divider";

function Copyright() {
  return (
    <div className="flex flex-wrap items-center justify-between gap-y-3 py-5 text-center md:gap-y-0 lg:flex-nowrap lg:text-start">
      <div className="flex w-full flex-col items-center justify-center gap-3 sm:flex-row lg:w-1/2 lg:justify-start">
        <Link
          to={"/termsandconditions"}
          className="duration-300 hover:text-primary"
        >
          Terms and Conditions
        </Link>
        <Divider className="hidden h-[20px] w-[1px] sm:block" />
        <Link to={"/privacypolicy"} className="duration-300 hover:text-primary">
          Privacy Policy
        </Link>
        <Divider className="hidden h-[20px] w-[1px] sm:block" />
        <Link to={"/sitemap"} className="duration-300 hover:text-primary">
          Sitemap
        </Link>
      </div>
      <p className="w-full lg:w-1/2 lg:text-end">
        &copy; 2025 Mahfujurrahm535 LTD. All Rights Reserved.
      </p>
    </div>
  );
}

export default Copyright;
