import React from "react";
import { RxCross2 } from "react-icons/rx";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { removeFromCart, setCart } from "../Redux/features/cartSlice";
import Check from "../assets/svg/Check";
import useSyncCart from "../hooks/useSyncCart";

function Cart() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { items: cart } = useSelector((state) => state.cart);
  useSyncCart();

  // Handle checkbox toggle
  function handleCheckboxChange(id) {
    const updatedCart = cart.map((item) => {
      if (item.designId === id) {
        return { ...item, checked: !item.checked };
      }
      return item;
    });
    dispatch(setCart(updatedCart));
  }

  // Handle checkout
  const handleCheckout = () => {
    const selectedItems = cart.filter((item) => item.checked);
    navigate("/project", { state: { items: selectedItems } });
  };
  const hasSelectedItems = cart.some((item) => item.checked);

  return (
    <div className="mx-auto max-w-[800px] bg-slate-100 p-4 sm:mt-0 md:mt-10">
      <div className="flex justify-between border-b border-black/20 pb-4">
        <h1 className="text-xl font-bold text-primary">
          Your Cart &#40;{cart.length} Item{cart.length > 1 && "s"}&#41;
        </h1>
        {/* <RiCloseLargeFill onClick={close} className="cursor-pointer text-2xl" /> */}
      </div>
      <div className="mt-6 flex flex-col gap-5">
        {cart.length > 0 ? (
          cart.map((item, index) => (
            <div
              key={index}
              className="flex items-start gap-2 border-b border-black/20 pb-4"
            >
              <div className="shrink-0">
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
              <Link
                to={`/design/${item?.designId}`}
                className="flex grow gap-3"
              >
                <img
                  src={
                    item?.images?.find((image) => image?.thumbnail === true)
                      ?.url
                  }
                  alt="Design Image"
                  className="w-[120px] object-cover"
                />
                <div className="flex-grow">
                  <h1 className="font-bold hover:underline">{item.title}</h1>
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
              </Link>
              <button
                type="button"
                onClick={() => dispatch(removeFromCart(item.designId))}
                className="grid min-h-6 min-w-6 shrink-0 place-content-center rounded-full border border-slate-500"
              >
                <RxCross2 className="text-slate-500" />
              </button>
            </div>
          ))
        ) : (
          <p className="text-center">No items in cart</p>
        )}
        {cart.length > 0 && (
          <p className="text-center font-bold text-slate-500">
            {cart.filter((item) => item.checked).length} Item
            {cart.filter((item) => item.checked).length > 1 && "s"} ready for
            checkout.
          </p>
        )}
        <div className="flex items-center justify-center gap-6">
          <button
            type="button"
            disabled={!hasSelectedItems}
            onClick={handleCheckout}
            className={`rounded-full ${hasSelectedItems ? "bg-primary" : "cursor-not-allowed bg-primary/70"} px-10 py-2 font-semibold text-white`}
          >
            Checkout
          </button>
        </div>
      </div>
    </div>
  );
}

export default Cart;
