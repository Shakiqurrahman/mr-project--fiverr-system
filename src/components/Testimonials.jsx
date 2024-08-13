import { IoStar } from "react-icons/io5";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

function Testimonials() {
    const settings = {
        dots: false,
        draggable: false,
        infinite: false,
        speed: 500,
        slidesToShow: 5,
        slidesToScroll: 1,
        arrows: false,
        autoplay: true,
        autoplaySpeed: 1000,
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
                <div className="">
                    <Slider {...settings}>
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
            </div>
        </div>
    )
}

export default Testimonials