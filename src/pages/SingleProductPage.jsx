import { useState } from "react";
import { BsThreeDots } from "react-icons/bs";
import { Link } from "react-router-dom";
import thumbnail from "../assets/images/project-thumbnail.jpg";
import ButtonSecondary from "../components/ButtonSecondary";
import Divider from "../components/Divider";
import RelatedDesigns from "../components/RelatedDesigns";

function SingleProductPage() {
  const btnArr = [
    "Solar flyer",
    "Door Hanger",
    "Flyer",
    "Postcard",
    "Brochure",
    "Billboard",
    "Yard Sign",
    "Print Design",
  ];
  const [addCartBtn, setAddCartBtn] = useState(false);
  const handleAddCartBtn = () => {
    setAddCartBtn(!addCartBtn);
  };
  return (
    <>
      <div className="max-width">
        <div className="mt-5 text-right">
          <button className="text-4xl">
            <BsThreeDots />
          </button>
        </div>
        <div className="flex gap-4 flex-wrap md:flex-nowrap">
          <div className="w-full md:w-2/3 lg:w-3/4">
            <img src={thumbnail} alt="" className="w-full" />
          </div>
          <div className="w-full md:w-1/3 lg:w-1/4 bg-lightskyblue py-5 px-4">
            <h1 className="font-bold text-lg sm:text-2xl">
              Pressure & Soft Washing Door Hanger Design
            </h1>
            <ul className="mt-10 mb-5 *:my-4 *:font-medium">
              <li>
                <b>Size:</b> 4.5x11 Inch, +0.25 Bleed
              </li>
              <li>
                <b>File Format:</b> Photoshop File
              </li>
              <li>
                <b>Category:</b> Door Hanger Design
              </li>
              <li>
                <b>Subcategory:</b> Double Sided
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
            Pressure & Soft Washing Door Hanger Design
          </h1>
          <p>
            This Door Hanger Design is specially created for Pressure & Soft
            Washing Services. You can definitely use this design for any other
            service/company if you want. If you give us all the information of
            your design, then we will edit this design according to your
            information. Or if you want to create a different design according
            to your information instead of this design, then we can create your
            design. Please start a project for your design. If you are feeling
            any difficulties while starting the project, or if you have any
            questions. Then feel FREE to contact us.
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
          {btnArr.map((btn) => (
            <ButtonSecondary key={Math.random()}>{btn}</ButtonSecondary>
          ))}
          {btnArr.map((btn) => (
            <ButtonSecondary key={Math.random()}>{btn}</ButtonSecondary>
          ))}
        </div>
      </div>
      <RelatedDesigns />
    </>
  );
}

export default SingleProductPage;
