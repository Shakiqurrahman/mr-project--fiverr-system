import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaPinterestP,
  FaTwitter,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import Logo from "../../assets/images/MR Logo White.png";
import Cards from "../../assets/images/card.png";
import Divider from "../Divider";
import Copyright from "./Copyright";

function Footer() {
  return (
    <div className="bg-black text-white mt-10 sm:mt-20">
      <div className="max-width">
        <div className="flex pt-10 flex-wrap sm:flex-nowrap">
          <div className="w-full sm:w-1/3 pr-0 sm:pr-16">
            <img
              src={Logo}
              alt=""
              className="h-[120px] sm:h-[250px] object-contain mx-auto mb-5 sm:mb-0"
            />
          </div>
          <div className="w-full sm:w-2/3">
            <div className="flex justify-between">
              <ul>
                <li className="mb-2">
                  <Link to={"/"} className="hover:text-primary duration-300">
                    Home
                  </Link>
                </li>
                <li>
                  <Link
                    to={"/about"}
                    className="hover:text-primary duration-300"
                  >
                    About
                  </Link>
                </li>
              </ul>
              <ul>
                <li className="mb-2">
                  <Link
                    to={"/designs"}
                    className="hover:text-primary duration-300"
                  >
                    Designs
                  </Link>
                </li>
                <li>
                  <Link
                    to={"/industries"}
                    className="hover:text-primary duration-300"
                  >
                    Industries
                  </Link>
                </li>
              </ul>
              <ul>
                <li className="mb-2">
                  <Link
                    to={"/pricelist"}
                    className="hover:text-primary duration-300"
                  >
                    Price List
                  </Link>
                </li>
                <li>
                  <Link
                    to={"/project"}
                    className="hover:text-primary duration-300"
                  >
                    Project
                  </Link>
                </li>
              </ul>
              <ul>
                <li className="mb-2">
                  <Link
                    to={"/contact"}
                    className="hover:text-primary duration-300"
                  >
                    Contact
                  </Link>
                </li>
                <li>
                  <Link
                    to={"/affiliate"}
                    className="hover:text-primary duration-300"
                  >
                    Affiliate
                  </Link>
                </li>
              </ul>
            </div>
            <Divider className="h-[1px] w-[100px] my-5" />
            <div className="flex justify-between my-5 flex-wrap md:flex-nowrap gap-y-3 md:gap-y-0">
              <p className="w-full md:w-auto">
                Email:-{" "}
                <Link
                  className="hover:text-primary duration-300"
                  to={"mailto:mahfujurrahm535@gmail.com"}
                >
                  mahfujurrahm535@gmail.com
                </Link>
              </p>
              <div className="flex items-center gap-x-3 w-full md:w-auto">
                <Link
                  to="https://facebook.com/mahfuj535"
                  className="hover:text-primary duration-300 h-[30px] w-[30px] flex items-center justify-center text-base rounded-full border border-solid border-white hover:border-primary"
                  target="_blank"
                >
                  <FaFacebookF />
                </Link>
                <Link
                  to="https://www.instagram.com/mahfujurrahm535"
                  className="hover:text-primary duration-300 h-[30px] w-[30px] flex items-center justify-center text-base rounded-full border border-solid border-white hover:border-primary"
                  target="_blank"
                >
                  <FaInstagram />
                </Link>
                <Link
                  to="https://twitter.com/mahfujurrahm535"
                  className="hover:text-primary duration-300 h-[30px] w-[30px] flex items-center justify-center text-base rounded-full border border-solid border-white hover:border-primary"
                  target="_blank"
                >
                  <FaTwitter />
                </Link>
                <Link
                  to="https://www.pinterest.com/mahfujurrahm535"
                  className="hover:text-primary duration-300 h-[30px] w-[30px] flex items-center justify-center text-base rounded-full border border-solid border-white hover:border-primary"
                  target="_blank"
                >
                  <FaPinterestP />
                </Link>
                <Link
                  to="https://www.linkedin.com/in/mahfujurrahm535"
                  className="hover:text-primary duration-300 h-[30px] w-[30px] flex items-center justify-center text-base rounded-full border border-solid border-white hover:border-primary"
                  target="_blank"
                >
                  <FaLinkedinIn />
                </Link>
              </div>
            </div>
            <div className="flex items-center">
              <p>We Accept:- </p>
              <div className="flex items-center">
                <img src={Cards} className="h-[40px]" alt="" />
              </div>
            </div>
          </div>
        </div>
        <Divider className="h-[1px] w-full mt-4" />
        <Copyright />
      </div>
    </div>
  );
}

export default Footer;
