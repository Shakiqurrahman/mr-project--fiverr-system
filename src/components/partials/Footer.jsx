import { BsTwitterX } from "react-icons/bs";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaPinterestP,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import ScrollToTop from "react-scroll-to-top";
import Logo from "../../assets/images/MR Logo White.png";
import Cards from "../../assets/images/card.png";
import UpArrow from "../../assets/images/icons/Upper Arrow.svg";
import Divider from "../Divider";
import Copyright from "./Copyright";

function Footer() {
  return (
    <>
      <ScrollToTop
        smooth
        top={700}
        className="!right-[20px] !h-[40px] !w-[40px] !rounded-full sm:!right-[40px]"
        component={<img src={UpArrow} />}
      />
      <div className="mt-10 bg-black text-white sm:mt-20">
        <div className="max-width">
          <div className="flex flex-wrap pt-10 sm:flex-nowrap">
            <div className="w-full pr-0 sm:w-1/3 sm:pr-16">
              <img
                src={Logo}
                alt=""
                className="mx-auto mb-5 h-[120px] object-contain sm:mb-0 sm:h-[250px]"
              />
            </div>
            <div className="w-full sm:w-2/3">
              <div className="flex justify-between">
                <ul>
                  <li className="mb-2">
                    <Link to={"/"} className="duration-300 hover:text-primary">
                      Home
                    </Link>
                  </li>
                  <li>
                    <Link
                      to={"/about"}
                      className="duration-300 hover:text-primary"
                    >
                      About
                    </Link>
                  </li>
                </ul>
                <ul>
                  <li className="mb-2">
                    <Link
                      to={"/designs"}
                      className="duration-300 hover:text-primary"
                    >
                      Designs
                    </Link>
                  </li>
                  <li>
                    <Link
                      to={"/industries"}
                      className="duration-300 hover:text-primary"
                    >
                      Industries
                    </Link>
                  </li>
                </ul>
                <ul>
                  <li className="mb-2">
                    <Link
                      to={"/pricelist"}
                      className="duration-300 hover:text-primary"
                    >
                      Price List
                    </Link>
                  </li>
                  <li>
                    <Link
                      to={"/project"}
                      className="duration-300 hover:text-primary"
                    >
                      Project
                    </Link>
                  </li>
                </ul>
                <ul>
                  <li className="mb-2">
                    <Link
                      to={"/contact"}
                      className="duration-300 hover:text-primary"
                    >
                      Contact
                    </Link>
                  </li>
                  <li>
                    <Link
                      to={"/affiliate"}
                      className="duration-300 hover:text-primary"
                    >
                      Affiliate
                    </Link>
                  </li>
                </ul>
              </div>
              <Divider className="mx-auto my-5 h-[1px] w-[100px] sm:mx-0" />
              <div className="my-5 flex flex-wrap justify-between gap-y-3 md:flex-nowrap md:gap-y-0">
                <p className="w-full text-center sm:text-left md:w-auto">
                  Email:-{" "}
                  <Link
                    className="duration-300 hover:text-primary"
                    to={"mailto:mahfujurrahm535@gmail.com"}
                  >
                    mahfujurrahm535@gmail.com
                  </Link>
                </p>
                <div className="flex w-full items-center justify-center gap-x-3 sm:justify-start md:w-auto">
                  <Link
                    to="https://facebook.com/mahfuj535"
                    className="flex h-[30px] w-[30px] items-center justify-center rounded-full border-[1.5px] border-solid border-white text-base duration-300 hover:border-primary hover:text-primary"
                    target="_blank"
                  >
                    <FaFacebookF />
                  </Link>
                  <Link
                    to="https://www.instagram.com/mahfujurrahm535"
                    className="flex h-[30px] w-[30px] items-center justify-center rounded-full border-[1.5px] border-solid border-white text-base duration-300 hover:border-primary hover:text-primary"
                    target="_blank"
                  >
                    <FaInstagram />
                  </Link>
                  <Link
                    to="https://x.com/mahfujurrahm535"
                    className="flex h-[30px] w-[30px] items-center justify-center rounded-full border-[1.5px] border-solid border-white text-base duration-300 hover:border-primary hover:text-primary"
                    target="_blank"
                  >
                    <BsTwitterX />
                  </Link>
                  <Link
                    to="https://www.pinterest.com/mahfujurrahm535"
                    className="flex h-[30px] w-[30px] items-center justify-center rounded-full border-[1.5px] border-solid border-white text-base duration-300 hover:border-primary hover:text-primary"
                    target="_blank"
                  >
                    <FaPinterestP />
                  </Link>
                  <Link
                    to="https://www.linkedin.com/in/mahfujurrahm535"
                    className="flex h-[30px] w-[30px] items-center justify-center rounded-full border-[1.5px] border-solid border-white text-base duration-300 hover:border-primary hover:text-primary"
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
          <Divider className="mt-4 h-[1px] w-full" />
          <Copyright />
        </div>
      </div>
    </>
  );
}

export default Footer;
