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
  const [isClicked, setIsClicked] = useState(false);

  const { data: uploadDesigns, error, isLoading } = useFetchGetUploadQuery();
  const design = uploadDesigns?.find((d) => d.designId === slug);
  const thumbnail = design?.images?.find((d) => d.thumbnail);

  const [addCartBtn, setAddCartBtn] = useState(false);
  const handleAddCartBtn = () => {
    setAddCartBtn(!addCartBtn);
  };

  if (!design && !isLoading) {
    navigate("/not-found", { replace: true });
    return null;
  }

  // handling edit and delete button state
  const handleIsClicked = () => setIsClicked(!isClicked);

  return (
    <>
      <div className="max-width">
        {user?.role === "ADMIN" && (
          <div className="relative mt-5 text-right">
            <button className="text-4xl" onClick={handleIsClicked}>
              <BsThreeDots />
            </button>
            {isClicked && (
              <div className="absolute right-0 top-full z-10 flex w-full max-w-[120px] flex-col rounded-lg border border-solid bg-white py-2 text-center">
                <Link
                  className="w-full px-3 py-2 hover:bg-slate-100"
                  to={"/edit-design"}
                  state={design}
                >
                  Edit
                </Link>
                <button className="w-full px-3 py-2 hover:bg-slate-100">
                  Delete
                </button>
              </div>
            )}
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
        <div
          className="my-10 overflow-clip"
          dangerouslySetInnerHTML={{ __html: design?.description }}
        ></div>
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
