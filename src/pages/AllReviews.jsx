import { Fragment, useState } from "react";
import { FaQuoteLeft, FaQuoteRight } from "react-icons/fa";
import { IoSearch, IoStar } from "react-icons/io5";
import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import Camera from "../assets/images/camera.jpg";
import Logo from "../assets/images/MR Logo White.png";
import Divider from "../components/Divider";

const AllReviews = () => {
  const [sortBtn, setSortBtn] = useState("Most relevant");

  const reviews = [
    {
      id: 1,
      reviewText:
        "Top class service, Very nice, and responds very fast. He had two days to finish but finished in one day. I 100% coming back to him in future. He is the real deal. HE IS AMAZING!!!",
      thumbnail: Camera,
      user: {
        userName: "gurserveksingh",
        image: Logo,
        country: "United States",
      },
    },
    {
      id: 2,
      reviewText:
        "Top class service, Very nice, and responds very fast. He had two days to finish but finished in one day. I 100% coming back to him in future. He is the real deal. HE IS AMAZING!!!",
      thumbnail: Camera,
      user: {
        userName: "gurserveksingh",
        image: Logo,
        country: "United States",
      },
    },
    {
      id: 3,
      reviewText:
        "Top class service, Very nice, and responds very fast. He had two days to finish but finished in one day. I 100% coming back to him in future. He is the real deal. HE IS AMAZING!!!",
      user: {
        userName: "gurserveksingh",
        image: Logo,
        country: "United States",
      },
    },
    {
      id: 4,
      reviewText:
        "Top class service, Very nice, and responds very fast. He had two days to finish but finished in one day. I 100% coming back to him in future. He is the real deal. HE IS AMAZING!!!",
      thumbnail: Camera,
      user: {
        userName: "gurserveksingh",
        image: Logo,
        country: "United States",
      },
    },
  ];

  const reviewSetting = {
    dots: false,
    draggable: false,
    infinite: false,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 2000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          draggable: true,
          infinite: true,
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 600,
        settings: {
          draggable: true,
          infinite: true,
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          draggable: true,
          infinite: true,
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  const handleSortBtn = (e) => {
    setSortBtn(e.target.value);
  };
  return (
    <div className="max-width">
      <div className="relative mt-20 rounded-lg bg-[#E7F4FC] p-5 pt-0">
        <div className="text-center">
          <h1 className="relative inline-block -translate-y-1/2 rounded-[50px] bg-[#FFEFEF] px-10 py-3 text-lg font-bold sm:px-20 sm:text-2xl">
            TESTIMONIALS
          </h1>
        </div>
        <div className="mb-10 flex flex-col items-center justify-between sm:flex-row">
          <h3 className="text-lg font-semibold sm:text-2xl">31 Reviews</h3>
          <div className="flex items-center gap-3">
            <h3 className="text-lg font-medium sm:text-2xl">Average 4.9</h3>
            <div className="flex items-center gap-2 text-lg text-primary sm:text-2xl">
              <IoStar />
              <IoStar />
              <IoStar />
              <IoStar />
              <IoStar />
            </div>
          </div>
        </div>
        <div>
          <Slider {...reviewSetting}>
            <div className="px-2 lg:pr-4">
              <div className="rounded-2xl bg-white p-5 text-center">
                <h1 className="text-lg font-semibold sm:text-2xl">1 Star</h1>
                <div className="my-2 flex justify-center gap-3 text-lg text-[#C8E3F6] sm:my-5 sm:text-3xl">
                  <IoStar className="text-primary" />
                  <IoStar />
                  <IoStar />
                  <IoStar />
                  <IoStar />
                </div>
                <span className="text-lg font-semibold sm:text-2xl">(00)</span>
              </div>
            </div>
            <div className="px-2 lg:pr-4">
              <div className="rounded-2xl bg-white p-5 text-center">
                <h1 className="text-lg font-semibold sm:text-2xl">2 Star</h1>
                <div className="my-2 flex justify-center gap-3 text-lg text-[#C8E3F6] sm:my-5 sm:text-3xl">
                  <IoStar className="text-primary" />
                  <IoStar className="text-primary" />
                  <IoStar />
                  <IoStar />
                  <IoStar />
                </div>
                <span className="text-lg font-semibold sm:text-2xl">(01)</span>
              </div>
            </div>
            <div className="px-2 lg:pr-4">
              <div className="rounded-2xl bg-white p-5 text-center">
                <h1 className="text-lg font-semibold sm:text-2xl">3 Star</h1>
                <div className="my-2 flex justify-center gap-3 text-lg text-[#C8E3F6] sm:my-5 sm:text-3xl">
                  <IoStar className="text-primary" />
                  <IoStar className="text-primary" />
                  <IoStar className="text-primary" />
                  <IoStar />
                  <IoStar />
                </div>
                <span className="text-lg font-semibold sm:text-2xl">(04)</span>
              </div>
            </div>
            <div className="px-2 lg:pr-4">
              <div className="rounded-2xl bg-white p-5 text-center">
                <h1 className="text-lg font-semibold sm:text-2xl">4 Star</h1>
                <div className="my-2 flex justify-center gap-3 text-lg text-[#C8E3F6] sm:my-5 sm:text-3xl">
                  <IoStar className="text-primary" />
                  <IoStar className="text-primary" />
                  <IoStar className="text-primary" />
                  <IoStar className="text-primary" />
                  <IoStar />
                </div>
                <span className="text-lg font-semibold sm:text-2xl">(02)</span>
              </div>
            </div>
            <div className="px-2 lg:pr-0">
              <div className="rounded-2xl bg-white p-5 text-center">
                <h1 className="text-lg font-semibold sm:text-2xl">5 Star</h1>
                <div className="my-2 flex justify-center gap-3 text-lg text-[#C8E3F6] sm:my-5 sm:text-3xl">
                  <IoStar className="text-primary" />
                  <IoStar className="text-primary" />
                  <IoStar className="text-primary" />
                  <IoStar className="text-primary" />
                  <IoStar className="text-primary" />
                </div>
                <span className="text-lg font-semibold sm:text-2xl">(24)</span>
              </div>
            </div>
          </Slider>
        </div>
        <div className="mt-10 flex flex-wrap-reverse items-center gap-y-5 md:flex-nowrap md:gap-0">
          <div className="flex w-full flex-wrap items-center justify-start gap-x-3 gap-y-4 md:w-3/4">
            <h1 className="text-sm font-semibold sm:text-base lg:order-none lg:text-2xl">
              Sort By
            </h1>

            <button
              value="Most relevant"
              onClick={handleSortBtn}
              type="button"
              className={`sortingBtn rounded border border-transparent p-1 text-xs font-medium sm:px-3 sm:py-2 lg:order-none lg:mx-0 lg:text-base ${sortBtn === "Most relevant" ? "active" : ""}`}
            >
              Most relevant
            </button>

            <button
              value="Most recent"
              onClick={handleSortBtn}
              type="button"
              className={`sortingBtn rounded border border-transparent p-1 text-xs font-medium sm:px-3 sm:py-2 lg:order-none lg:text-base ${sortBtn === "Most recent" ? "active" : ""}`}
            >
              Most recent
            </button>
            <button
              value="Delivery images"
              onClick={handleSortBtn}
              type="button"
              className={`sortingBtn rounded border border-transparent p-1 text-xs font-medium sm:px-3 sm:py-2 lg:order-none lg:text-base ${sortBtn === "Delivery images" ? "active" : ""}`}
            >
              Delivery images (23)
            </button>
          </div>
          <form className="flex w-full items-stretch rounded bg-white md:w-1/4">
            <input
              type="search"
              className="block w-full rounded px-3 py-2 outline-none"
            />
            <button
              type="submit"
              className="block shrink-0 rounded bg-primary px-3 py-2 text-base text-white sm:p-2 sm:text-2xl"
            >
              <IoSearch />
            </button>
          </form>
        </div>
        {reviews.map((review) => (
          <Fragment key={review.id}>
            <Divider className="my-5 h-px w-full !bg-black/30 sm:my-10" />
            <div className="mb-5">
              <div className="">
                <div className="flex flex-col-reverse items-center gap-4 sm:flex-row sm:items-start">
                  <p className="text-center text-base leading-[40px] sm:text-start md:text-lg">
                    <span>
                      <FaQuoteLeft className="mb-3 mr-1 inline text-xs text-red-500" />
                    </span>
                    {review.reviewText}
                    <span>
                      <FaQuoteRight className="mb-3 ml-1 inline text-xs text-red-500" />
                    </span>
                  </p>
                  {review.thumbnail && (
                    <img
                      src={review.thumbnail}
                      alt=""
                      className="h-[150px] w-[150px] rounded-xl object-[100%_100%]"
                    />
                  )}
                </div>
                <div className="mt-10 flex flex-col items-center justify-between lg:flex-row">
                  <div className="flex flex-col items-center gap-2 sm:gap-4 lg:flex-row">
                    <img
                      src={review.user.image}
                      alt=""
                      className="h-[30px] w-[30px] rounded-full sm:h-[40px] sm:w-[40px]"
                    />
                    <h1 className="text-base font-semibold md:text-xl">
                      {review.user.userName}
                    </h1>
                    <div className="ml-0 flex justify-center gap-2 text-lg text-[#C8E3F6] md:text-2xl lg:ml-3">
                      <IoStar className="text-primary" />
                      <IoStar className="text-primary" />
                      <IoStar className="text-primary" />
                      <IoStar className="text-primary" />
                      <IoStar className="text-primary" />
                    </div>
                    <p className="ml-0 text-base md:text-lg lg:ml-3">
                      {review.user.country}
                    </p>
                  </div>
                  <p className="mt-2 text-xs md:text-base lg:mt-0">
                    5 days ago
                  </p>
                </div>
              </div>
            </div>
          </Fragment>
        ))}
      </div>
    </div>
  );
};

export default AllReviews;
