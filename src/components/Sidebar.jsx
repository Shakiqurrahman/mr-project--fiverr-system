import { Link } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import adobeStock from "../assets/images/Stock Logos/01 Adobe Stock Logo.svg";
import shutterStock from "../assets/images/Stock Logos/01 Shutterstock_logo.svg";
import iStock from "../assets/images/Stock Logos/03 iStock logo.png";
import RF_logo from "../assets/images/Stock Logos/04 123RF_Logo.png";
import Getty from "../assets/images/Stock Logos/05 Getty_Images_Logo.png";
import Dreamstime from "../assets/images/Stock Logos/06 Dreamstime_Logo.png";
import Vectezzy from "../assets/images/Stock Logos/07 Vectezzy logo.png";
import alamy from "../assets/images/Stock Logos/alamy logo.png";
import depositPhotos from "../assets/images/Stock Logos/depositphotos.png";
import SidebarProfileStatus from "./SidebarProfileStatus";

function Sidebar() {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 1500,
  };
  return (
    <div className="flex-grow mt-10 w-full sm:w-1/3 md:w-1/4 lg:w-1/5">
      <SidebarProfileStatus />
      <div className="border border-solid border-primary rounded-lg overflow-hidden mt-5">
        <p className="bg-primary text-white p-2 text-center">
          We have added links to some stock image sites below. You can choose
          images from any of sites linked below for your design.
        </p>
        <div className="p-2 hidden sm:block">
          <div className="overflow-hidden rounded-lg border border-solid border-gray-500 mt-3">
            <div className="p-2">
              <img
                className="h-[100px] w-full object-contain"
                src={adobeStock}
                alt=""
              />
            </div>
            <Link className="bg-gray-500 text-white p-1 text-center w-full block">
              Click Here
            </Link>
          </div>
          <div className="overflow-hidden rounded-lg border border-solid border-gray-500 mt-3">
            <div className="p-2">
              <img
                className="h-[100px] w-full object-contain"
                src={shutterStock}
                alt=""
              />
            </div>
            <Link className="bg-gray-500 text-white p-1 text-center w-full block">
              Click Here
            </Link>
          </div>
          <div className="overflow-hidden rounded-lg border border-solid border-gray-500 mt-3">
            <div className="p-2">
              <img
                className="h-[100px] w-full object-contain"
                src={iStock}
                alt=""
              />
            </div>
            <Link className="bg-gray-500 text-white p-1 text-center w-full block">
              Click Here
            </Link>
          </div>
          <div className="overflow-hidden rounded-lg border border-solid border-gray-500 mt-3">
            <div className="p-2">
              <img
                className="h-[100px] w-full object-contain"
                src={RF_logo}
                alt=""
              />
            </div>
            <Link className="bg-gray-500 text-white p-1 text-center w-full block">
              Click Here
            </Link>
          </div>
          <div className="overflow-hidden rounded-lg border border-solid border-gray-500 mt-3">
            <div className="p-2">
              <img
                className="h-[100px] w-full object-contain"
                src={Getty}
                alt=""
              />
            </div>
            <Link className="bg-gray-500 text-white p-1 text-center w-full block">
              Click Here
            </Link>
          </div>
          <div className="overflow-hidden rounded-lg border border-solid border-gray-500 mt-3">
            <div className="p-2">
              <img
                className="h-[100px] w-full object-contain"
                src={depositPhotos}
                alt=""
              />
            </div>
            <Link className="bg-gray-500 text-white p-1 text-center w-full block">
              Click Here
            </Link>
          </div>
          <div className="overflow-hidden rounded-lg border border-solid border-gray-500 mt-3">
            <div className="p-2">
              <img
                className="h-[100px] w-full object-contain"
                src={Vectezzy}
                alt=""
              />
            </div>
            <Link className="bg-gray-500 text-white p-1 text-center w-full block">
              Click Here
            </Link>
          </div>
          <div className="overflow-hidden rounded-lg border border-solid border-gray-500 mt-3">
            <div className="p-2">
              <img
                className="h-[100px] w-full object-contain"
                src={Dreamstime}
                alt=""
              />
            </div>
            <Link className="bg-gray-500 text-white p-1 text-center w-full block">
              Click Here
            </Link>
          </div>
          <div className="overflow-hidden rounded-lg border border-solid border-gray-500 mt-3">
            <div className="p-2">
              <img
                className="h-[100px] w-full object-contain"
                src={alamy}
                alt=""
              />
            </div>
            <Link className="bg-gray-500 text-white p-1 text-center w-full block">
              Click Here
            </Link>
          </div>
        </div>

        {/* Show on Mobile Screen */}
        <div className="p-2 block sm:hidden">
          <Slider {...settings}>
            <div className="px-2">
              <div className="overflow-hidden rounded-lg border border-solid border-gray-500 mt-3">
                <div className="p-2">
                  <img
                    className="h-[100px] w-full object-contain"
                    src={adobeStock}
                    alt=""
                  />
                </div>
                <Link className="bg-gray-500 text-white p-1 text-center w-full block">
                  Click Here
                </Link>
              </div>
            </div>
            <div className="px-2">
              <div className="overflow-hidden rounded-lg border border-solid border-gray-500 mt-3">
                <div className="p-2">
                  <img
                    className="h-[100px] w-full object-contain"
                    src={shutterStock}
                    alt=""
                  />
                </div>
                <Link className="bg-gray-500 text-white p-1 text-center w-full block">
                  Click Here
                </Link>
              </div>
            </div>
            <div className="px-2">
              <div className="overflow-hidden rounded-lg border border-solid border-gray-500 mt-3">
                <div className="p-2">
                  <img
                    className="h-[100px] w-full object-contain"
                    src={iStock}
                    alt=""
                  />
                </div>
                <Link className="bg-gray-500 text-white p-1 text-center w-full block">
                  Click Here
                </Link>
              </div>
            </div>
            <div className="px-2">
              <div className="overflow-hidden rounded-lg border border-solid border-gray-500 mt-3">
                <div className="p-2">
                  <img
                    className="h-[100px] w-full object-contain"
                    src={RF_logo}
                    alt=""
                  />
                </div>
                <Link className="bg-gray-500 text-white p-1 text-center w-full block">
                  Click Here
                </Link>
              </div>
            </div>
            <div className="px-2">
              <div className="overflow-hidden rounded-lg border border-solid border-gray-500 mt-3">
                <div className="p-2">
                  <img
                    className="h-[100px] w-full object-contain"
                    src={Getty}
                    alt=""
                  />
                </div>
                <Link className="bg-gray-500 text-white p-1 text-center w-full block">
                  Click Here
                </Link>
              </div>
            </div>
            <div className="px-2">
              <div className="overflow-hidden rounded-lg border border-solid border-gray-500 mt-3">
                <div className="p-2">
                  <img
                    className="h-[100px] w-full object-contain"
                    src={depositPhotos}
                    alt=""
                  />
                </div>
                <Link className="bg-gray-500 text-white p-1 text-center w-full block">
                  Click Here
                </Link>
              </div>
            </div>
            <div className="px-2">
              <div className="overflow-hidden rounded-lg border border-solid border-gray-500 mt-3">
                <div className="p-2">
                  <img
                    className="h-[100px] w-full object-contain"
                    src={Vectezzy}
                    alt=""
                  />
                </div>
                <Link className="bg-gray-500 text-white p-1 text-center w-full block">
                  Click Here
                </Link>
              </div>
            </div>
            <div className="px-2">
              <div className="overflow-hidden rounded-lg border border-solid border-gray-500 mt-3">
                <div className="p-2">
                  <img
                    className="h-[100px] w-full object-contain"
                    src={Dreamstime}
                    alt=""
                  />
                </div>
                <Link className="bg-gray-500 text-white p-1 text-center w-full block">
                  Click Here
                </Link>
              </div>
            </div>
            <div className="px-2">
              <div className="overflow-hidden rounded-lg border border-solid border-gray-500 mt-3">
                <div className="p-2">
                  <img
                    className="h-[100px] w-full object-contain"
                    src={alamy}
                    alt=""
                  />
                </div>
                <Link className="bg-gray-500 text-white p-1 text-center w-full block">
                  Click Here
                </Link>
              </div>
            </div>
          </Slider>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
