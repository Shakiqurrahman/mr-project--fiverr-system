import { FaFolderOpen } from "react-icons/fa6";
import { GiShoppingCart } from "react-icons/gi";
import { MdClose } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { addToCart, removeFromCart } from "../../Redux/features/cartSlice";

function ProjectCard({
  thumbnail,
  thumbnailName,
  title,
  design,
  clientLogo,
  clientName,
  timeStamp,
  cart,
  folder,
  slug,
}) {
  const dispatch = useDispatch();
  const { items: cartItems } = useSelector((state) => state.cart);
  return (
    <div className="relative h-full px-[5px]">
      {cart &&
        (cartItems.some((item) => item?.designId === design?.designId) ? (
          <button
            type="button"
            onClick={() => dispatch(removeFromCart(design?.designId))}
            className="absolute right-4 top-2.5 z-10 flex size-8 items-center justify-center rounded-md border bg-white text-xl"
          >
            <MdClose />
          </button>
        ) : (
          <button
            type="button"
            onClick={() => dispatch(addToCart(design))}
            className="absolute right-4 top-2.5 z-10 flex size-8 items-center justify-center rounded-md border bg-white text-xl"
          >
            <GiShoppingCart />
          </button>
        ))}
      {folder && (
        <Link
          to={slug}
          className="absolute right-4 top-2.5 z-10 flex size-6 items-center justify-center rounded-md border bg-white text-sm sm:size-8 sm:text-xl"
        >
          <FaFolderOpen className="text-black/50" />
        </Link>
      )}
      <Link to={slug} className="block cursor-pointer border bg-white">
        <div className="relative">
          <img src={thumbnail} alt="" className="block w-full object-cover" />
          {/* <h1 className="absolute left-0 top-0 flex h-full w-full items-center justify-center bg-[rgba(0,0,0,0.5)] p-5 text-center text-sm font-semibold text-white opacity-0 duration-300 hover:opacity-100">
            {thumbnailName}
          </h1> */}
        </div>
        <h1 className="px-3 py-2" title={title}>
          <span className="line-clamp-2">{title}</span>
        </h1>
      </Link>
      {clientLogo && (
        <div className="mt-3 flex items-center justify-between px-3">
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
