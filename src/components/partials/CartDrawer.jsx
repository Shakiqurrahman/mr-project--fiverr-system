import React from "react";
import { RiCloseLargeFill } from "react-icons/ri";
import { RxCross2 } from "react-icons/rx";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { removeFromCart, setCart } from "../../Redux/features/cartSlice";
import Check from "../../assets/svg/Check";
import useSyncCart from "../../hooks/useSyncCart";

const CartDrawer = ({ close }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { items: cart } = useSelector((state) => state.cart);
  useSyncCart();

  // Handle checkbox toggle
  const handleCheckboxChange = (id) => {
    const updatedCart = cart.map((item) => {
      if (item.designId === id) {
        return { ...item, checked: !item.checked };
      }
      return item;
    });
    dispatch(setCart(updatedCart));
  };

  // Handle checkout
  const handleCheckout = () => {
    const selectedItems = cart?.filter((item) => item?.checked);
    navigate("/project", { state: { items: selectedItems } });
    close();
  };
  const hasSelectedItems = cart?.some((item) => item?.checked);

  return (
    <div className="ml-auto h-full w-full max-w-[450px] p-4 pt-0">
      <div className="sticky top-0 bg-slate-100 pt-8">
        <div className="flex justify-between border-b border-black/20 pb-4">
          <h1 className="text-xl font-bold text-primary">
            Your Cart &#40;{cart.length} Item{cart.length > 1 && "s"}&#41;
          </h1>
          <RiCloseLargeFill
            onClick={close}
            className="cursor-pointer text-2xl"
          />
        </div>
      </div>
      <div className="mt-6 flex flex-col gap-2">
        {cart.length > 0 ? (
          cart.map((item, index) => (
            <div
              key={index}
              className="flex items-start gap-2 border-b border-black/20 pb-4"
            >
              <div>
                <input
                  type="checkbox"
                  name={`cartItem-${item.designId}`}
                  id={`cartItem-${item.designId}`}
                  className="is-checked peer"
                  checked={item.checked || false}
                  onChange={() => handleCheckboxChange(item.designId)}
                  hidden
                />
                <label
                  htmlFor={`cartItem-${item.designId}`}
                  className={`flex h-[20px] w-[20px] cursor-pointer items-center justify-center border border-solid bg-white p-1 ${
                    item.checked ? "border-primary" : "border-gray-300"
                  } *:opacity-0 peer-[.is-checked]:peer-checked:*:opacity-100`}
                >
                  <Check className="h-[14px] sm:h-[18px]" />
                </label>
              </div>
              <img
                src={
                  item?.images?.find((image) => image?.thumbnail === true)?.url
                }
                alt="Design Image"
                className="h-[80px] w-[120px] select-none object-cover"
              />
              <div className="flex-grow">
                <h1 className="font-bold">{item.title}</h1>
                <p className="text-sm">
                  <span className="font-semibold text-slate-500">
                    Category :
                  </span>{" "}
                  {item.category}
                </p>
                <p className="text-sm">
                  <span className="font-semibold text-slate-500">
                    Subcategory :
                  </span>{" "}
                  {item.subCategory}
                </p>
              </div>
              <button
                type="button"
                onClick={() => dispatch(removeFromCart(item.designId))}
                className="grid min-h-6 min-w-6 place-content-center rounded-full border border-slate-500"
              >
                <RxCross2 className="text-slate-500" />
              </button>
            </div>
          ))
        ) : (
          <p className="text-center font-semibold text-slate-500">
            No items in cart
          </p>
        )}
        <div className="sticky bottom-0 left-0 w-full bg-slate-100 pb-8">
          {cart.length > 0 && (
            <p className="pt-4 text-center font-bold text-slate-500">
              {cart.filter((item) => item.checked).length} Item
              {cart.filter((item) => item.checked).length > 1 && "s"} ready for
              checkout.
            </p>
          )}
          <div className="mt-4 flex items-center justify-center gap-6">
            <Link
              onClick={close}
              to="/cart"
              className="rounded-full bg-revision px-10 py-2 font-semibold text-white"
            >
              View Cart
            </Link>
            <button
              onClick={handleCheckout}
              disabled={!hasSelectedItems}
              className={`rounded-full ${hasSelectedItems ? "bg-primary" : "cursor-not-allowed bg-primary/70"} px-10 py-2 font-semibold text-white`}
            >
              Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartDrawer;
