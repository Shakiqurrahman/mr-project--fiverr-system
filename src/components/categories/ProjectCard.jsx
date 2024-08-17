import { GiShoppingCart } from "react-icons/gi";
import { Link } from "react-router-dom";

function ProjectCard({
  thumbnail,
  title,
  clientLogo,
  clientName,
  timeStamp,
  cart,
}) {
  return (
    <div className="px-[5px]">
      <div className="border relative bg-white">
        {cart && (
          <button className="absolute top-4 right-4 h-8 w-8 flex justify-center items-center rounded-md bg-white">
            <GiShoppingCart />
          </button>
        )}
        <img
          src={thumbnail}
          alt=""
          className="block w-full object-contain object-[100%_100%]"
        />
        <h1 className="p-3">{title}</h1>
      </div>
      {clientLogo && (
        <div className="flex items-center justify-between mt-3">
          <div className="flex items-center gap-1">
            <img src={clientLogo} alt="" className="h-[25px] w-[25px]" />
            <Link className="font-semibold text-sm">{clientName}</Link>
          </div>
          <span className="text-xs">{timeStamp}</span>
        </div>
      )}
    </div>
  );
}

export default ProjectCard;
