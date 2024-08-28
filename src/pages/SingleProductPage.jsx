import { useState } from "react";
import { BsThreeDots } from "react-icons/bs";
import { Link, useLocation } from "react-router-dom";
import thumbnail from "../assets/images/project-thumbnail.jpg";
import ButtonSecondary from "../components/ButtonSecondary";
import Divider from "../components/Divider";
import RelatedDesigns from "../components/RelatedDesigns";
import { useSelector } from "react-redux";

function SingleProductPage() {
  const location = useLocation();
  const { user } = useSelector((state) => state.user);
  const {title,designs} = location.state;
  const thumbnail = designs.images.find(d => d.thumbnail);
  console.log(title,designs);
  
  const [addCartBtn, setAddCartBtn] = useState(false);
  const handleAddCartBtn = () => {
    setAddCartBtn(!addCartBtn);
  };
  return (
    <>
      <div className="max-width">
        {user?.role === 'ADMIN' &&<div className="mt-5 text-right">
          <button className="text-4xl">
            <BsThreeDots />
          </button>
        </div>}
        <div className="mt-5 sm:mt-10 flex gap-4 flex-wrap md:flex-nowrap">
          <div className="w-full md:w-2/3 lg:w-3/4">
            <img src={thumbnail?.url} alt="" className="w-full" />
          </div>
          <div className="w-full md:w-1/3 lg:w-1/4 bg-lightskyblue py-5 px-4">
            <h1 className="font-bold text-lg sm:text-2xl">
              {designs?.title}
            </h1>
            <ul className="mt-10 mb-5 *:my-4 *:font-medium">
              <li>
                <b>Size:</b> {designs?.size}
              </li>
              <li>
                <b>File Format:</b> {designs?.fileFormat}
              </li>
              <li>
                <b>Category:</b> {designs?.category}
              </li>
              <li>
                <b>Subcategory:</b> {designs?.subCategory}
              </li>
            </ul>
            {addCartBtn ? (
              <button
                className="bg-red-800 text-white w-full p-2 sm:p-3 rounded-[30px] font-medium"
                onClick={handleAddCartBtn}
              >
                REMOVE FROM CART
              </button>
            ) : (
              <button
                className="bg-[#f1592a] text-white w-full p-2 sm:p-3 rounded-[30px] font-medium"
                onClick={handleAddCartBtn}
              >
                ADD TO CART
              </button>
            )}
            <button className="bg-primary text-white w-full p-2 sm:p-3 rounded-[30px] font-medium mt-5">
              START PROJECT
            </button>
          </div>
        </div>
        <div className="mt-10">
          <h1 className="font-bold text-lg sm:text-2xl mb-5">
          {designs?.title}
          </h1>
          <p>
            {designs?.description}
          </p>
        </div>
        <div className="my-10 font-bold text-base sm:text-xl">
          If you just want to get the template/source file of this design, then
          you can{" "}
          <Link to={"/contact"} className="underline">
            contact us by clicking here.
          </Link>{" "}
          And show us this design.
        </div>
        <Divider className={"bg-[#000!important] h-px w-full"} />
        <div className="flex flex-wrap gap-3 mt-10">
          {designs?.tags?.map((btn) => (
            <ButtonSecondary key={Math.random()}>{btn}</ButtonSecondary>
          ))}
        </div>
      </div>
      <RelatedDesigns />
    </>
  );
}

export default SingleProductPage;
