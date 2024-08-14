import { IoSearch, IoStar } from "react-icons/io5";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import Divider from "./Divider";
import RightArrowIcon from "../assets/images/icons/Right Arrow.svg";
import LeftArrowIcon from "../assets/images/icons/Left Arrow.svg";
import Camera from "../assets/images/camera.jpg";
import Logo from "../assets/images/MR Logo White.png";
import { FaQuoteLeft, FaQuoteRight } from "react-icons/fa";
import { Link } from "react-router-dom";
import { RiArrowRightDoubleFill } from "react-icons/ri";
import { useState } from "react";

function Testimonials() {
    const [sortBtn, setSortBtn] = useState("Most relevant");

    const handleSortBtn = (e) => {
        setSortBtn(e.target.value)
    }

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
                }
            },
            {
                breakpoint: 600,
                settings: {
                    draggable: true,
                    infinite: true,
                    slidesToShow: 2,
                    slidesToScroll: 1,
                }
            },
            {
                breakpoint: 480,
                settings: {
                    draggable: true,
                    infinite: true,
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
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
                    arrows: false
                }
            }
        ]
    };
    return (
        <div className="max-width">
            <div className="p-5 pt-0 bg-[#E7F4FC] mt-20">
                <div className="text-center">
                    <h1 className="bg-[#FFEFEF] inline-block text-lg sm:text-3xl font-bold py-3 px-10 sm:px-20 rounded-[50px] -translate-y-1/2 relative">TESTIMONIALS</h1>
                </div>
                <div className="flex justify-between items-center mb-10 flex-col sm:flex-row">
                    <h3 className="font-semibold text-lg sm:text-2xl">31 Reviews</h3>
                    <div className="flex items-center gap-3">
                        <h3 className="font-medium text-lg sm:text-2xl">Average 4.9</h3>
                        <div className="flex items-center gap-2 text-primary text-lg sm:text-2xl">
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
                            <div className="bg-white p-5 rounded-2xl text-center">
                                <h1 className="text-lg sm:text-2xl font-semibold">1 Star</h1>
                                <div className="flex gap-3 text-[#C8E3F6] text-lg sm:text-3xl justify-center my-2 sm:my-5">
                                    <IoStar className="text-primary" />
                                    <IoStar />
                                    <IoStar />
                                    <IoStar />
                                    <IoStar />
                                </div>
                                <span className="text-lg sm:text-2xl font-semibold">(00)</span>
                            </div>
                        </div>
                        <div className="px-2 lg:pr-4">
                            <div className="bg-white p-5 rounded-2xl text-center">
                                <h1 className="text-lg sm:text-2xl font-semibold">2 Star</h1>
                                <div className="flex gap-3 text-[#C8E3F6] text-lg sm:text-3xl justify-center my-2 sm:my-5">
                                    <IoStar className="text-primary" />
                                    <IoStar className="text-primary" />
                                    <IoStar />
                                    <IoStar />
                                    <IoStar />
                                </div>
                                <span className="text-lg sm:text-2xl font-semibold">(01)</span>
                            </div>
                        </div>
                        <div className="px-2 lg:pr-4">
                            <div className="bg-white p-5 rounded-2xl text-center">
                                <h1 className="text-lg sm:text-2xl font-semibold">3 Star</h1>
                                <div className="flex gap-3 text-[#C8E3F6] text-lg sm:text-3xl justify-center my-2 sm:my-5">
                                    <IoStar className="text-primary" />
                                    <IoStar className="text-primary" />
                                    <IoStar className="text-primary" />
                                    <IoStar />
                                    <IoStar />
                                </div>
                                <span className="text-lg sm:text-2xl font-semibold">(04)</span>
                            </div>
                        </div>
                        <div className="px-2 lg:pr-4">
                            <div className="bg-white p-5 rounded-2xl text-center">
                                <h1 className="text-lg sm:text-2xl font-semibold">4 Star</h1>
                                <div className="flex gap-3 text-[#C8E3F6] text-lg sm:text-3xl justify-center my-2 sm:my-5">
                                    <IoStar className="text-primary" />
                                    <IoStar className="text-primary" />
                                    <IoStar className="text-primary" />
                                    <IoStar className="text-primary" />
                                    <IoStar />
                                </div>
                                <span className="text-lg sm:text-2xl font-semibold">(02)</span>
                            </div>
                        </div>
                        <div className="px-2 lg:pr-0">
                            <div className="bg-white p-5 rounded-2xl text-center">
                                <h1 className="text-lg sm:text-2xl font-semibold">5 Star</h1>
                                <div className="flex gap-3 text-[#C8E3F6] text-lg sm:text-3xl justify-center my-2 sm:my-5">
                                    <IoStar className="text-primary" />
                                    <IoStar className="text-primary" />
                                    <IoStar className="text-primary" />
                                    <IoStar className="text-primary" />
                                    <IoStar className="text-primary" />
                                </div>
                                <span className="text-lg sm:text-2xl font-semibold">(24)</span>
                            </div>
                        </div>
                    </Slider>
                </div>
                <div className="flex items-center justify-start lg:justify-between mt-10 flex-wrap gap-y-4">
                    <h1 className="text-sm sm:text-2xl font-semibold order-1 lg:order-none">Sort By</h1>

                    <button value="Most relevant" onClick={handleSortBtn} type="button" className={`sortingBtn text-xs sm:text-lg font-medium p-1 sm:py-2 sm:px-3 mx-4 lg:mx-0 border border-transparent rounded order-2 lg:order-none ${sortBtn === "Most relevant" ? "active" : ""}`}>Most relevant</button>

                    <button value="Most recent" onClick={handleSortBtn} type="button" className={`sortingBtn text-xs sm:text-lg font-medium p-1 sm:py-2 sm:px-3 border border-transparent rounded order-3 lg:order-none ${sortBtn === "Most recent" ? "active" : ""}`}>Most recent</button>

                    <h1 className="text-base sm:text-lg font-medium w-full sm:w-1/2 lg:w-auto">Delivery images (23)</h1>

                    <form className="flex items-stretch bg-white rounded overflow-hidden w-full sm:w-1/2 lg:w-auto">
                        <input type="search" className="py-2 px-3 outline-none flex-grow" />
                        <button type="submit" className="bg-primary text-white text-base sm:text-2xl px-3 sm:p-2 rounded"><IoSearch /></button>
                    </form>
                </div>
                <Divider className="h-px w-full bg-[#000!important] my-5 sm:my-10" />
                <div>
                    <Slider {...testimonialSetting}>
                        <div className="px-0 md:px-10">
                            <div className="flex items-center sm:items-start gap-4 flex-col-reverse sm:flex-row">
                                <p className="text-base md:text-lg lg:text-[24px] leading-[40px] text-center sm:text-start">
                                    <span><FaQuoteLeft className="inline mr-1 text-xs mb-3 text-red-500" /></span>
                                    Top class service, Very nice, and responds very fast. He had two days to finish but finished in one day. I 100% coming back to him in future. He is the real deal. HE IS AMAZING!!!
                                    <span><FaQuoteRight className="inline ml-1 text-xs mb-3 text-red-500" /></span>
                                </p>
                                <img src={Camera} alt="" className="h-[150px] w-[150px] rounded-xl object-[100%_100%]" />
                            </div>
                            <div className="flex items-center justify-between mt-10 flex-col lg:flex-row">
                                <div className="flex items-center gap-2 sm:gap-4 flex-col lg:flex-row">
                                    <img src={Logo} alt="" className="h-[30px] w-[30px] sm:h-[50px] sm:w-[50px] rounded-full" />
                                    <h1 className="text-base sm:text-2xl font-semibold">clientusername</h1>
                                    <div className="flex gap-3 text-[#C8E3F6] text-lg sm:text-3xl justify-center ml-0 lg:ml-3">
                                        <IoStar className="text-primary" />
                                        <IoStar className="text-primary" />
                                        <IoStar className="text-primary" />
                                        <IoStar className="text-primary" />
                                        <IoStar className="text-primary" />
                                    </div>
                                    <p className="text-base sm:text-lg ml-0 lg:ml-3">United States</p>
                                </div>
                                <p className="mt-2 lg:mt-0 text-xs sm:text-base">5 days ago</p>
                            </div>
                        </div>
                        <div className="px-0 md:px-10">
                            <div className="flex items-center sm:items-start gap-4 flex-col-reverse sm:flex-row">
                                <p className="text-base md:text-lg lg:text-[24px] leading-[40px] text-center sm:text-start">
                                    <span><FaQuoteLeft className="inline mr-1 text-xs mb-3 text-red-500" /></span>
                                    Top class service, Very nice, and responds very fast. He had two days to finish but finished in one day. I 100% coming back to him in future. He is the real deal. HE IS AMAZING!!!
                                    <span><FaQuoteRight className="inline ml-1 text-xs mb-3 text-red-500" /></span>
                                </p>
                                <img src={Camera} alt="" className="h-[150px] w-[150px] rounded-xl object-[100%_100%]" />
                            </div>
                            <div className="flex items-center justify-between mt-10 flex-col lg:flex-row">
                                <div className="flex items-center gap-2 sm:gap-4 flex-col lg:flex-row">
                                    <img src={Logo} alt="" className="h-[30px] w-[30px] sm:h-[50px] sm:w-[50px] rounded-full" />
                                    <h1 className="text-base sm:text-2xl font-semibold">clientusername</h1>
                                    <div className="flex gap-3 text-[#C8E3F6] text-lg sm:text-3xl justify-center ml-0 lg:ml-3">
                                        <IoStar className="text-primary" />
                                        <IoStar className="text-primary" />
                                        <IoStar className="text-primary" />
                                        <IoStar className="text-primary" />
                                        <IoStar className="text-primary" />
                                    </div>
                                    <p className="text-base sm:text-lg ml-0 lg:ml-3">United States</p>
                                </div>
                                <p className="mt-2 lg:mt-0 text-xs sm:text-base">5 days ago</p>
                            </div>
                        </div>
                        <div className="px-0 md:px-10">
                            <div className="flex items-center sm:items-start gap-4 flex-col-reverse sm:flex-row">
                                <p className="text-base md:text-lg lg:text-[24px] leading-[40px] text-center sm:text-start">
                                    <span><FaQuoteLeft className="inline mr-1 text-xs mb-3 text-red-500" /></span>
                                    Top class service, Very nice, and responds very fast. He had two days to finish but finished in one day. I 100% coming back to him in future. He is the real deal. HE IS AMAZING!!!
                                    <span><FaQuoteRight className="inline ml-1 text-xs mb-3 text-red-500" /></span>
                                </p>
                                <img src={Camera} alt="" className="h-[150px] w-[150px] rounded-xl object-[100%_100%]" />
                            </div>
                            <div className="flex items-center justify-between mt-10 flex-col lg:flex-row">
                                <div className="flex items-center gap-2 sm:gap-4 flex-col lg:flex-row">
                                    <img src={Logo} alt="" className="h-[30px] w-[30px] sm:h-[50px] sm:w-[50px] rounded-full" />
                                    <h1 className="text-base sm:text-2xl font-semibold">clientusername</h1>
                                    <div className="flex gap-3 text-[#C8E3F6] text-lg sm:text-3xl justify-center ml-0 lg:ml-3">
                                        <IoStar className="text-primary" />
                                        <IoStar className="text-primary" />
                                        <IoStar className="text-primary" />
                                        <IoStar className="text-primary" />
                                        <IoStar className="text-primary" />
                                    </div>
                                    <p className="text-base sm:text-lg ml-0 lg:ml-3">United States</p>
                                </div>
                                <p className="mt-2 lg:mt-0 text-xs sm:text-base">5 days ago</p>
                            </div>
                        </div>
                    </Slider>
                </div>
                <div className="mt-10 text-center lg:text-end">
                    <Link className="bg-primary text-white px-4 py-1 rounded-2xl">See all <RiArrowRightDoubleFill className="inline" /></Link>
                </div>
            </div>
        </div>
    )
}


// Custom arrows design components
function NextArrow({ onClick }) {
    return (
        <div onClick={onClick} className="slick-arrow before:content-none h-[35px] w-[35px] border cursor-pointer flex items-center justify-center rounded-full absolute top-1/2 -translate-y-1/2 -right-[35px]">
            <img src={RightArrowIcon} alt="" />
        </div>
    );
}

function PrevArrow({ onClick }) {
    return (
        <div onClick={onClick} className="slick-arrow before:content-none h-[35px] w-[35px] border cursor-pointer flex items-center justify-center rounded-full absolute top-1/2 -translate-y-1/2 -left-[35px]">
            <img src={LeftArrowIcon} alt="" />
        </div>
    );
}




export default Testimonials