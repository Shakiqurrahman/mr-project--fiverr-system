import { GiShoppingCart } from "react-icons/gi";
import { Link, useNavigate } from "react-router-dom";

function ProjectCard({
  thumbnail,
  thumbnailName,
  title,
  clientLogo,
  clientName,
  timeStamp,
  cart,
}) {
  const navigate = useNavigate();
  return (
    <div className="px-[5px]">
      <div
        onClick={() => navigate("/all-designs")}
        className="relative cursor-pointer border bg-white"
      >
        {cart && (
          <button className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-md bg-white">
            <GiShoppingCart />
          </button>
        )}
        <img
          src={thumbnail}
          alt=""
          className="block h-[250px] w-full object-cover"
        />
        <h1 className="p-3">{title}</h1>
      </div>
      {clientLogo && (
        <div className="mt-3 flex items-center justify-between">
          <div className="flex items-center gap-1">
            <img src={clientLogo} alt="" className="h-[25px] w-[25px]" />
            <Link className="text-sm font-semibold">{clientName}</Link>
          </div>
          <span className="text-xs">{timeStamp}</span>
        </div>
      )}
    </div>
  );
}

export default ProjectCard;
