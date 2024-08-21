import React, { useState } from 'react';
import { RxCross2 } from "react-icons/rx";
import Check from "../assets/svg/Check";

function Cart() {
  // Initialize cart state with useState
  const [cart, setCart] = useState([
    {
      id: 1,
      title: 'Pressure and soft washing door hanger design.',
      category: 'Door Hanger Design',
      subcategory: 'Single Slide',
      image: 'https://placehold.co/600x400',
      checked: true
    },
    {
      id: 2,
      title: 'Pressure and soft washing door hanger design.',
      category: 'Door Hanger Design',
      subcategory: 'Single Slide',
      image: 'https://placehold.co/600x400',
      checked: true
    }
  ]);

  // Remove item from cart
  function removeItem(index) {
    const updatedCart = cart.filter((item, i) => i !== index);
    setCart(updatedCart); 
  }

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
    <div className='max-w-[800px] mx-auto p-4 bg-slate-100 sm:mt-0 md:mt-10'>
      <h1 className='font-bold text-xl'>Your Cart &#40; {cart.length} Item{cart.length > 1 && 's'} &#41;</h1>
      <div className='flex flex-col gap-5 mt-5'>
        {cart.map((item, index) => (
          <div key={index} className='flex gap-2 items-start'>
            <div className="">
              <input
                type="checkbox"
                name={`cartItem-${item.id}`}
                id={`cartItem-${item.id}`}
                className="is-checked peer"
                checked={item.checked}
                onChange={() => handleCheckboxChange(index)}
                hidden
              />
              <label
                htmlFor={`cartItem-${item.id}`}
                className={`h-[20px] w-[20px] p-1 bg-white flex items-center justify-center cursor-pointer border border-solid ${
                  item.checked ? 'border-primary' : 'border-gray-300'
                } *:opacity-0 peer-[.is-checked]:peer-checked:*:opacity-100`}
              >
                <Check className="h-[14px] sm:h-[18px]" />
              </label>
            </div>
            <img src={item.image} alt="Design Image" className='h-[80px] w-[120px] object-cover'/>
            <div className='flex-grow'>
              <h1 className='font-bold'>{item.title}</h1>
              <p className='text-sm'><span className='font-bold text-slate-500'>Category :</span> {item.category}</p>
              <p className='text-sm'><span className='font-bold text-slate-500'>Subcategory :</span> {item.subcategory}</p>
            </div>
            <button
              type='button'
              onClick={() => removeItem(index)}
              className='min-h-6 min-w-6 grid place-content-center border border-slate-500 rounded-full'
            >
              <RxCross2 className='text-slate-500' />
            </button>
          </div>
        ))}
        <div className='flex justify-between items-center'>
          <p className='font-bold text-slate-500'>{cart.filter(item => item.checked).length} Item{cart.filter(item => item.checked).length > 1 && 's'} ready for checkout.</p>
          <button 
            onClick={handleCheckout} 
            className="bg-primary text-white py-2 px-10 rounded-full"
          >
            Checkout
          </button>
        </div>
      </div>
    </div>
  )
}

export default Cart;
