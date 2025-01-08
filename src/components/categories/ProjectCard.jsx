import { useEffect, useRef, useState } from "react";
import { FaFolderOpen } from "react-icons/fa6";
import { GiShoppingCart } from "react-icons/gi";
import { MdClose } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { addToCart, removeFromCart } from "../../Redux/features/cartSlice";
import { setPreviewImage } from "../../Redux/features/previewImageSlice";

function ProjectCard({
  thumbnail,
  thumbnailName,
  watermark,
  title,
  design,
  clientLogo,
  clientName,
  timeStamp,
  cart,
  folder,
  slug,
}) {
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const { items: cartItems } = useSelector((state) => state.cart);

  const [clientRefHeight, setClientRefHeight] = useState(0);

  const clientRef = useRef(null);

  useEffect(() => {
    if (clientRef?.current) {
      setClientRefHeight(clientRef?.current?.clientHeight);
    }
  }, []);

  const handlePreviewImage = (e) => {
    e.preventDefault();
    dispatch(setPreviewImage(watermark));
  };
  return (
    <>
      <div className="relative h-full px-[5px]">
        {!user?.block_for_chat &&
          cart &&
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
        <Link
          to={slug}
          className="block cursor-pointer border bg-white"
          style={{ height: `calc(100% - ${clientRefHeight}px)` }}
        >
          {clientName ? (
            <div
              className="relative"
              onClick={handlePreviewImage}
              title={thumbnailName ? thumbnailName : ""}
            >
              <img
                src={thumbnail}
                alt=""
                className="pointer-events-none block w-full object-cover"
              />
            </div>
          ) : (
            <div
              className="relative"
              title={thumbnailName ? thumbnailName : ""}
            >
              <img
                src={thumbnail}
                alt=""
                className="pointer-events-none block w-full object-cover"
              />
            </div>
          )}
          <h1 className="px-3 py-2 text-sm sm:text-base" title={title}>
            <span className="line-clamp-2">{title}</span>
          </h1>
        </Link>
        {clientName && (
          <div
            className="mt-3 flex items-center justify-between px-3"
            ref={clientRef}
          >
            <div className="flex items-center gap-1">
              {clientLogo ? (
                <img
                  src={clientLogo}
                  alt=""
                  className="size-[25px] rounded-full object-cover"
                />
              ) : (
                <div className="flex size-[25px] items-center justify-center rounded-full bg-[#ffefef]/80 object-cover text-lg font-bold text-[#3b3b3b]/50">
                  {clientName?.charAt(0)?.toUpperCase()}
                </div>
              )}
              <Link className="text-sm font-semibold">{clientName}</Link>
            </div>
            <span className="text-xs">{timeStamp}</span>
          </div>
        )}
      </div>
    </>
  );
}

export default ProjectCard;
