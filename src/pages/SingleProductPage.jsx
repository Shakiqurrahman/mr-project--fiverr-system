import { useState } from "react";
import { BsThreeDots } from "react-icons/bs";
import { useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import ButtonSecondary from "../components/ButtonSecondary";
import Divider from "../components/Divider";
import RelatedDesigns from "../components/RelatedDesigns";
import { useFetchGetUploadQuery } from "../Redux/api/uploadDesignApiSlice";

function SingleProductPage() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.user);

  const { data: uploadDesigns, error, isLoading } = useFetchGetUploadQuery();
  const design = uploadDesigns?.find((d) => d.designId === slug);
  const thumbnail = design?.images?.find((d) => d.thumbnail);

  const [addCartBtn, setAddCartBtn] = useState(false);
  const handleAddCartBtn = () => {
    setAddCartBtn(!addCartBtn);
  };

  if(!design  && !isLoading ) {
    navigate("/not-found", { replace: true });
    return null;
  }
  return (
    <>
      <div className="max-width">
        {user?.role === "ADMIN" && (
          <div className="mt-5 text-right">
            <button className="text-4xl">
              <BsThreeDots />
            </button>
          </div>
        )}
        <div className="mt-5 flex flex-wrap gap-4 sm:mt-10 md:flex-nowrap">
          <div className="w-full md:w-2/3 lg:w-3/4">
            <img src={thumbnail?.url} alt="" className="w-full" />
          </div>
          <div className="w-full bg-lightskyblue px-4 py-5 md:w-1/3 lg:w-1/4">
            <h1 className="text-lg font-bold sm:text-2xl">{design?.title}</h1>
            <ul className="mb-5 mt-10 *:my-4 *:font-medium">
              <li>
                <b>Size:</b> {design?.size}
              </li>
              <li>
                <b>File Format:</b> {design?.fileFormat}
              </li>
              <li>
                <b>Category:</b> {design?.category}
              </li>
              <li>
                <b>Subcategory:</b> {design?.subCategory}
              </li>
            </ul>
            {addCartBtn ? (
              <button
                className="w-full rounded-[30px] bg-red-800 p-2 font-medium text-white sm:p-3"
                onClick={handleAddCartBtn}
              >
                REMOVE FROM CART
              </button>
            ) : (
              <button
                className="w-full rounded-[30px] bg-[#f1592a] p-2 font-medium text-white sm:p-3"
                onClick={handleAddCartBtn}
              >
                ADD TO CART
              </button>
            )}
            <button className="mt-5 w-full rounded-[30px] bg-primary p-2 font-medium text-white sm:p-3">
              START PROJECT
            </button>
          </div>
        </div>
        <div className="mt-10">
          <h1 className="mb-5 text-lg font-bold sm:text-2xl">
            {design?.title}
          </h1>
          <p>{design?.description}</p>
        </div>
        <div className="my-10 text-base font-bold sm:text-xl">
          If you just want to get the template/source file of this design, then
          you can{" "}
          <Link to={"/contact"} className="underline">
            contact us by clicking here.
          </Link>{" "}
          And show us this design.
        </div>
        <Divider className={"h-px w-full bg-[#000!important]"} />
        <div className="mt-10 flex flex-wrap gap-3">
          {design?.tags?.map((btn) => (
            <ButtonSecondary key={Math.random()}>{btn}</ButtonSecondary>
          ))}
        </div>
      </div>
      <RelatedDesigns />
    </>
  );
}

export default SingleProductPage;
