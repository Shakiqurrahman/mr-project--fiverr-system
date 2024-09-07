import React, { useState } from 'react';
import { RxCross2 } from "react-icons/rx";
import Check from "../assets/svg/Check";
import { RiCloseLargeFill } from 'react-icons/ri';
import { useDispatch, useSelector } from 'react-redux';
import { removeFromCart } from '../Redux/features/cartSlice';

function Cart() {
  const dispatch = useDispatch();

  const {items : cart} = useSelector((state) => state.cart);

  // Handle checkbox toggle
  function handleCheckboxChange(index) {
    const updatedCart = cart.map((item, i) => {
      if (i === index) {
        return { ...item, checked: !item.checked };
      }
      return item;
    });
    setCart(updatedCart);
  }

  // Handle checkout
  function handleCheckout() {
    const selectedItems = cart.filter(item => item.checked);
    console.log("Items ready for checkout:", selectedItems);
  }

  return (
    <div className="max-w-[800px] mx-auto p-4 bg-slate-100 sm:mt-0 md:mt-10">
    <div className="flex justify-between border-b border-black/20 pb-4">
      <h1 className="text-xl font-bold text-primary">
        Your Cart &#40; {cart.length} Item{cart.length > 1 && "s"} &#41;
      </h1>
      {/* <RiCloseLargeFill onClick={close} className="cursor-pointer text-2xl" /> */}
    </div>
    <div className="mt-6 flex flex-col gap-5">
      {cart.length > 0 ? cart.map((item, index) => (
        <div key={index} className="flex items-start gap-2 border-b border-black/20 pb-4">
          <div className="">
            <input
              type="checkbox"
              name={`cartItem-${item.designId}`}
              id={`cartItem-${item.designId}`}
              className="is-checked peer"
              checked={item.checked}
              onChange={() => handleCheckboxChange(index)}
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
            src={item.image}
            alt="Design Image"
            className="h-[80px] w-[120px] object-cover"
          />
          <div className="flex-grow">
            <h1 className="font-bold">{item.title}</h1>
            <p className="text-sm">
              <span className="font-semibold text-slate-500">Category :</span>{" "}
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
      )) : <p className='text-center'>No items in cart</p>}
      {cart.length > 0 && <p className="font-bold text-slate-500 text-center">
        {cart.filter((item) => item.checked).length} Item
        {cart.filter((item) => item.checked).length > 1 && "s"} Selected
      </p>}
      <div className="flex items-center justify-center gap-6">
        <button
          onClick={handleCheckout}
          className="rounded-full bg-primary font-semibold px-10 py-2 text-white"
        >
          Checkout
        </button>
      </div>
    </div>
  </div>
  )
}

export default Cart;
