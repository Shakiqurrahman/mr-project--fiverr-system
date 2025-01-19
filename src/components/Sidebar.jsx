import { Link } from "react-router-dom";
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
  //Sidebar Stock Images Data
  const stockImages = [
    {
      url: adobeStock,
      link: "",
    },
    {
      url: shutterStock,
      link: "",
    },
    {
      url: iStock,
      link: "",
    },
    {
      url: RF_logo,
      link: "",
    },
    {
      url: Getty,
      link: "",
    },
    {
      url: depositPhotos,
      link: "https://depositphotos.com/?ref=40165016&utm_source=linkCopy&utm_medium=referral",
    },
    {
      url: Dreamstime,
      link: "https://www.dreamstime.com/#res22427301",
    },
    {
      url: Vectezzy,
      link: "https://vecteezycom.sjv.io/09GxmN",
    },

    {
      url: alamy,
      link: "",
    },
  ];
  return (
    <div className="mt-10 w-full flex-grow sm:w-1/3 md:w-1/4 lg:w-1/5">
      <SidebarProfileStatus />
      <div className="mt-5 overflow-hidden rounded-lg border border-solid border-primary">
        <p className="bg-primary p-2 text-center text-white">
          We have added links to some stock image sites below. You can choose
          images from any of sites linked below for your design.
        </p>
        <div className="grid grid-cols-2 gap-x-3 p-2 sm:grid-cols-1">
          {stockImages
            ?.filter((s) => s?.link)
            ?.map((stock, i) => (
              <Link
                to={stock.link}
                key={i}
                className="mt-3 overflow-hidden rounded-lg border border-solid border-gray-500"
              >
                <div className="p-2">
                  <img
                    className="h-[100px] w-full object-contain"
                    src={stock.url}
                    alt=""
                  />
                </div>
                <div className="block w-full bg-gray-500 p-1 text-center text-white">
                  Click Here
                </div>
              </Link>
            ))}
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
