import { useState } from "react";
import { FaQuoteLeft, FaQuoteRight } from "react-icons/fa";
import { IoSearch, IoStar } from "react-icons/io5";
import { RiArrowRightDoubleFill } from "react-icons/ri";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import Logo from "../assets/images/MR Logo White.png";
import Camera from "../assets/images/camera.jpg";
import LeftArrowIcon from "../assets/images/icons/Left Arrow.svg";
import RightArrowIcon from "../assets/images/icons/Right Arrow.svg";
import Divider from "./Divider";

function Testimonials() {
  const [sortBtn, setSortBtn] = useState("Most relevant");

  const handleSortBtn = (e) => {
    setSortBtn(e.target.value);
  };

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
  const testimonialSetting = {
    dots: false,
    draggable: true,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    autoplay: true,
    autoplaySpeed: 3000,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          arrows: false,
        },
      },
    ],
  };
  return (
    <div className="max-width">
      <div className="relative mt-20 bg-[#E7F4FC] p-5 pt-0">
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
                <span className="text-lg sm:text-2xl">(00)</span>
              </div>
            </div>
            <div className="px-2 lg:pr-4">
              <div className="rounded-2xl bg-white p-5 text-center">
                <h1 className="text-lg font-semibold sm:text-2xl">2 Stars</h1>
                <div className="my-2 flex justify-center gap-3 text-lg text-[#C8E3F6] sm:my-5 sm:text-3xl">
                  <IoStar className="text-primary" />
                  <IoStar className="text-primary" />
                  <IoStar />
                  <IoStar />
                  <IoStar />
                </div>
                <span className="text-lg sm:text-2xl">(01)</span>
              </div>
            </div>
            <div className="px-2 lg:pr-4">
              <div className="rounded-2xl bg-white p-5 text-center">
                <h1 className="text-lg font-semibold sm:text-2xl">3 Stars</h1>
                <div className="my-2 flex justify-center gap-3 text-lg text-[#C8E3F6] sm:my-5 sm:text-3xl">
                  <IoStar className="text-primary" />
                  <IoStar className="text-primary" />
                  <IoStar className="text-primary" />
                  <IoStar />
                  <IoStar />
                </div>
                <span className="text-lg sm:text-2xl">(04)</span>
              </div>
            </div>
            <div className="px-2 lg:pr-4">
              <div className="rounded-2xl bg-white p-5 text-center">
                <h1 className="text-lg font-semibold sm:text-2xl">4 Stars</h1>
                <div className="my-2 flex justify-center gap-3 text-lg text-[#C8E3F6] sm:my-5 sm:text-3xl">
                  <IoStar className="text-primary" />
                  <IoStar className="text-primary" />
                  <IoStar className="text-primary" />
                  <IoStar className="text-primary" />
                  <IoStar />
                </div>
                <span className="text-lg sm:text-2xl">(02)</span>
              </div>
            </div>
            <div className="px-2 lg:pr-0">
              <div className="rounded-2xl bg-white p-5 text-center">
                <h1 className="text-lg font-semibold sm:text-2xl">5 Stars</h1>
                <div className="my-2 flex justify-center gap-3 text-lg text-[#C8E3F6] sm:my-5 sm:text-3xl">
                  <IoStar className="text-primary" />
                  <IoStar className="text-primary" />
                  <IoStar className="text-primary" />
                  <IoStar className="text-primary" />
                  <IoStar className="text-primary" />
                </div>
                <span className="text-lg sm:text-2xl">(24)</span>
              </div>
            </div>
          </Slider>
        </div>
        <div className="mt-10 flex flex-wrap-reverse items-center gap-y-5 md:flex-nowrap md:gap-0">
          <div className="flex w-full flex-wrap items-center justify-start gap-x-3 gap-y-4 md:w-3/4">
            <h1 className="text-sm font-semibold sm:text-base lg:order-none lg:text-xl">
              Sort By
            </h1>

            <button
              value="Most relevant"
              onClick={handleSortBtn}
              type="button"
              className={`sortingBtn rounded border border-transparent p-1 text-xs font-medium sm:px-3 sm:py-2 lg:order-none lg:mx-0 lg:text-lg ${sortBtn === "Most relevant" ? "active" : ""}`}
            >
              Most relevant
            </button>

            <button
              value="Most recent"
              onClick={handleSortBtn}
              type="button"
              className={`sortingBtn rounded border border-transparent p-1 text-xs font-medium sm:px-3 sm:py-2 lg:order-none lg:text-lg ${sortBtn === "Most recent" ? "active" : ""}`}
            >
              Most recent
            </button>
            <button
              value="Delivery images"
              onClick={handleSortBtn}
              type="button"
              className={`sortingBtn rounded border border-transparent p-1 text-xs font-medium sm:px-3 sm:py-2 lg:order-none lg:text-lg ${sortBtn === "Delivery images" ? "active" : ""}`}
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
        <Divider className="my-5 h-px w-full !bg-black/30 sm:my-10" />
        <div className="mb-5">
          <Slider {...testimonialSetting}>
            <div className="px-0 md:px-10">
              <div className="flex flex-col-reverse items-center gap-4 sm:flex-row sm:items-start">
                <p className="text-center text-base leading-[40px] sm:text-start md:text-lg">
                  <span>
                    <FaQuoteLeft className="mb-3 mr-1 inline text-xs text-red-500" />
                  </span>
                  Top class service, Very nice, and responds very fast. He had
                  two days to finish but finished in one day. I 100% coming back
                  to him in future. He is the real deal. HE IS AMAZING!!!
                  <span>
                    <FaQuoteRight className="mb-3 ml-1 inline text-xs text-red-500" />
                  </span>
                </p>
                {Camera && (
                  <img
                    src={Camera}
                    alt=""
                    className="w-[150px] rounded-xl object-cover"
                  />
                )}
              </div>
              <div className="mt-10 flex flex-col items-center justify-between lg:flex-row">
                <div className="flex flex-col items-center gap-2 sm:gap-4 lg:flex-row">
                  <img
                    src={Logo}
                    alt=""
                    className="h-[30px] w-[30px] rounded-full sm:h-[40px] sm:w-[40px]"
                  />
                  <h1 className="text-base font-semibold md:text-xl">
                    clientusername
                  </h1>
                  <div className="ml-0 flex justify-center gap-2 text-lg text-[#C8E3F6] md:text-2xl lg:ml-3">
                    <IoStar className="text-primary" />
                    <IoStar className="text-primary" />
                    <IoStar className="text-primary" />
                    <IoStar className="text-primary" />
                    <IoStar className="text-primary" />
                  </div>
                  <p className="ml-0 text-base md:text-lg lg:ml-3">
                    United States
                  </p>
                </div>
                <p className="mt-2 text-xs md:text-base lg:mt-0">5 days ago</p>
              </div>
            </div>
          </Slider>
        </div>
        <Link
          to={"/all-reviews"}
          className="absolute bottom-0 right-1/2 translate-x-1/2 translate-y-1/2 rounded-2xl bg-primary px-4 py-1 text-white sm:right-5 sm:translate-x-0"
        >
          See all <RiArrowRightDoubleFill className="inline" />
        </Link>
      </div>
    </div>
  );
}

// Custom arrows design components
function NextArrow({ onClick }) {
  return (
    <div
      onClick={onClick}
      className="slick-arrow absolute -right-[35px] top-1/2 flex h-[35px] w-[35px] -translate-y-1/2 cursor-pointer items-center justify-center rounded-full border before:content-none"
    >
      <img src={RightArrowIcon} alt="" />
    </div>
  );
}

function PrevArrow({ onClick }) {
  return (
    <div
      onClick={onClick}
      className="slick-arrow absolute -left-[35px] top-1/2 flex h-[35px] w-[35px] -translate-y-1/2 cursor-pointer items-center justify-center rounded-full border before:content-none"
    >
      <img src={LeftArrowIcon} alt="" />
    </div>
  );
}

export default Testimonials;
