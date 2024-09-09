import { GiShoppingCart } from "react-icons/gi";
import { MdCheck } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { addToCart } from "../../Redux/features/cartSlice";

function ProjectCard({
  thumbnail,
  thumbnailName,
  title,
  design,
  clientLogo,
  clientName,
  timeStamp,
  cart,
  slug,
}) {
  const dispatch = useDispatch();
  const { items: cartItems } = useSelector((state) => state.cart);
  return (
    <div className="relative h-full px-[5px]">
      {cart && (
        <button
          type="button"
          onClick={() => dispatch(addToCart(design))}
          className="absolute right-4 top-2.5 z-10 flex h-8 w-8 items-center justify-center rounded-md border bg-white text-xl"
        >
          {cartItems.some((item) => item?.designId === design?.designId) ? (
            <MdCheck className="text-primary" />
          ) : (
            <GiShoppingCart />
          )}
        </button>
      )}
      <Link to={slug} className="block cursor-pointer border bg-white">
        <div className="relative">
          <img
            src={thumbnail}
            alt=""
            className="block h-[250px] w-full object-cover"
          />
          <h1 className="absolute left-0 top-0 flex h-full w-full items-center justify-center bg-[rgba(0,0,0,0.5)] p-5 text-center text-sm font-semibold text-white opacity-0 duration-300 hover:opacity-100">
            {thumbnailName}
          </h1>
        </div>
        <h1 className="px-3 py-2">
          <span className="line-clamp-2">{title}</span>
        </h1>
      </Link>
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
