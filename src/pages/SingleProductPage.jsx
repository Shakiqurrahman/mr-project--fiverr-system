import { useEffect, useMemo, useState } from "react";
import { BsThreeDots } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import Slider from "react-slick";
import Swal from "sweetalert2";
import LeftArrowIcon from "../assets/images/icons/Left Arrow.svg";
import RightArrowIcon from "../assets/images/icons/Right Arrow.svg";
import Divider from "../components/Divider";
import RelatedDesigns from "../components/RelatedDesigns";
import {
  useLazyTopKeywordsClickQuery,
  useLazyTopKeywordsImpressionQuery,
} from "../Redux/api/analyticsApiSlice";
import {
  useDeleteDesignByIdMutation,
  useFetchGetUploadQuery,
  useLazyGetDesignsBySearchQuery,
} from "../Redux/api/uploadDesignApiSlice";
import { addToCart, removeFromCart } from "../Redux/features/cartSlice";
import { setPreviewImage } from "../Redux/features/previewImageSlice";
import { setSearchedText, setSearchResult } from "../Redux/features/utilSlice";

function SingleProductPage() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.user);
  const { items: cartItems } = useSelector((state) => state.cart);
  const [deleteDesign] = useDeleteDesignByIdMutation();

  const [isClicked, setIsClicked] = useState(false);
  const [images, setImages] = useState([]);
  const [showAll, setShowAll] = useState(false);

  const settings = {
    dots: false,
    infinite: images?.length > 1 ? true : false,
    speed: 800,
    slidesToShow: 1,
    // className: "category-cards",
    slidesToScroll: 1,
    arrows: images?.length > 1 ? true : false,
    autoplay: true,
    autoplaySpeed: 3000,
    responsive: [
      {
        breakpoint: 576,
        settings: {
          arrows: false,
        },
      },
    ],
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
  };

  const {
    data: uploadDesigns,
    error,
    isLoading,
    refetch,
  } = useFetchGetUploadQuery();

  const [getDesignsBySearch, { data: searchedData }] =
    useLazyGetDesignsBySearchQuery();

  const [topKeywordClick] = useLazyTopKeywordsClickQuery();
  const [updateTopKeywordsImpression, { data: tagsImpressions }] =
    useLazyTopKeywordsImpressionQuery();

  const design = useMemo(
    () => uploadDesigns?.find((d) => d.designId === slug),
    [uploadDesigns, slug],
  );

  const handleTagClick = (tag) => {
    dispatch(setSearchedText(tag));
    if (tag) {
      topKeywordClick({ keyword: tag }).unwrap();
      getDesignsBySearch(tag);
    }
  };

  const relatedDesigns = useMemo(
    () =>
      uploadDesigns?.filter((obj) =>
        design?.relatedDesigns?.includes(obj.designId),
      ),
    [uploadDesigns, design?.relatedDesigns],
  );

  useEffect(() => {
    if (design) {
      const images = design.images;
      const sortedImages = [...images].sort(
        (a, b) => b.thumbnail - a.thumbnail,
      );
      setImages(sortedImages);
    }
  }, [design]);

  useEffect(() => {
    if (searchedData) {
      dispatch(setSearchResult(searchedData));
      navigate("/designs");
    }
  }, [searchedData, dispatch]);

  useEffect(() => {
    if (uploadDesigns) {
      refetch();
    }
  }, [uploadDesigns, refetch]);

  useEffect(() => {
    if (design && design?.tags?.length > 0) {
      const keywords = design?.tags?.join(",");
      updateTopKeywordsImpression({ keywords: keywords });
    }
  }, [design]);

  if (!design && !isLoading) {
    navigate("/not-found", { replace: true });
    return null;
  }

  // handling edit and delete button state
  const handleIsClicked = () => setIsClicked(!isClicked);

  // Function to handle the toggle between showing all tags and showing just the first 10
  const handleToggle = () => {
    setShowAll(!showAll);
  };

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#1b8cdc",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    });
    if (result.isConfirmed) {
      try {
        await deleteDesign(id).unwrap();
        navigate("/");
        Swal.fire("Deleted!", "Your design has been deleted.", "success");
      } catch (error) {
        Swal.fire("Not Deleted!", "Your design has not been deleted.", "error");
      }
    }
  };

  const handleStartProject = (e) => {
    e.preventDefault();
    const data = [design];
    navigate("/project", { state: { items: data } });
  };

  const handlePreviewImage = (e, url) => {
    e.preventDefault();
    dispatch(setPreviewImage(url));
  };

  // Determine which tags to show
  const tagsToShow = showAll ? design?.tags : design?.tags?.slice(0, 10);
  return (
    <>
      <div className="max-width">
        {user?.role !== "USER" && (
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
                <button
                  type="button"
                  onClick={() => handleDelete(design?.id)}
                  className="w-full px-3 py-2 hover:bg-slate-100"
                >
                  Delete
                </button>
              </div>
            )}
          </div>
        )}
        <div className="mt-5 flex flex-wrap items-start gap-4 sm:mt-10 md:flex-nowrap">
          <div className="w-full md:w-2/3 lg:w-3/4">
            {images?.length === 1 ? (
              <img
                src={images[0].watermark}
                alt=""
                className="w-full cursor-pointer object-cover"
                onClick={(e) => handlePreviewImage(e, images[0]?.watermark)}
              />
            ) : (
              <Slider {...settings}>
                {images?.map((image, i) => (
                  <img
                    key={i}
                    src={image?.watermark}
                    alt=""
                    className="w-full cursor-pointer object-cover"
                    onClick={(e) => handlePreviewImage(e, image?.watermark)}
                  />
                ))}
              </Slider>
            )}
          </div>
          <div className="w-full bg-lightskyblue px-4 py-6 md:w-1/3 lg:w-1/4">
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
            {user?.block_for_chat ? (
              <p className="text-lg font-medium text-revision">
                Your are not able to start this project!
              </p>
            ) : (
              <>
                {cartItems.some(
                  (item) => item?.designId === design?.designId,
                ) ? (
                  <button
                    className="w-full rounded-[30px] bg-red-800 p-2 font-medium text-white sm:p-3"
                    onClick={() => dispatch(removeFromCart(design.designId))}
                  >
                    REMOVE FROM CART
                  </button>
                ) : (
                  <button
                    className="w-full rounded-[30px] bg-[#f1592a] p-2 font-medium text-white sm:p-3"
                    onClick={() => dispatch(addToCart(design))}
                  >
                    ADD TO CART
                  </button>
                )}
                <button
                  type="button"
                  className="mt-5 w-full rounded-[30px] bg-primary p-2 font-medium text-white sm:p-3"
                  onClick={handleStartProject}
                >
                  PROJECT START
                </button>
              </>
            )}
          </div>
        </div>
        <div
          className="product-description my-10 overflow-clip break-words"
          dangerouslySetInnerHTML={{ __html: design?.description }}
        ></div>
        <Divider className={"h-px w-full bg-[#000!important]"} />
        <div className="mt-10 flex flex-wrap gap-3">
          {tagsToShow?.map((tag, index) => (
            <button
              key={index}
              onClick={() => handleTagClick(tag)}
              className="rounded-[30px] bg-[#ffefef] px-2 py-1 text-sm font-medium duration-300 hover:bg-secondary hover:text-white sm:px-4 sm:py-2 sm:text-base"
            >
              {tag}
            </button>
          ))}
          {design?.tags?.length > 10 && (
            <button
              className="rounded-[30px] bg-[#ffefef] px-2 py-1 text-sm font-medium duration-300 hover:bg-secondary hover:text-white sm:px-4 sm:py-2 sm:text-base"
              onClick={handleToggle}
            >
              {showAll ? "Show Less" : "See All"}
            </button>
          )}
        </div>
      </div>
      <RelatedDesigns items={relatedDesigns} />
    </>
  );
}

// Custom arrows design components
function NextArrow({ onClick }) {
  return (
    <div
      onClick={onClick}
      className="slick-arrow absolute -right-[15px] top-[50%] z-10 flex h-[35px] w-[35px] -translate-y-1/2 cursor-pointer items-center justify-center rounded-full border before:content-none"
    >
      <img src={RightArrowIcon} alt="" />
    </div>
  );
}

function PrevArrow({ onClick }) {
  return (
    <div
      onClick={onClick}
      className="slick-arrow absolute -left-[15px] top-[50%] z-10 flex h-[35px] w-[35px] -translate-y-1/2 cursor-pointer items-center justify-center rounded-full border before:content-none"
    >
      <img src={LeftArrowIcon} alt="" />
    </div>
  );
}

export default SingleProductPage;
