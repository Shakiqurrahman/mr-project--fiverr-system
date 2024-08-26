import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { useEffect } from "react";
import { fetchGetUpload } from "../Redux/features/uploadDesign/uploadDesignApi";
import { useDispatch, useSelector } from "react-redux";

function HomeActivityCards() {
    // const dispatch = useDispatch();
    // useEffect(() => {
    //     dispatch(fetchGetUpload());
    // },[dispatch])
    // const { loading, uploadDesign } = useSelector(state => state.uploadDesign);
    // console.log('fetching upload design',uploadDesign);
    
    const settings = {
        dots: false,
        infinite: false,
        speed: 500,
        slidesToShow: 5,
        slidesToScroll: 1,
        arrows: false,
        draggable: false,
        autoplay: true,
        autoplaySpeed: 3000,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 4,
                    slidesToScroll: 1,
                    draggable: true,
                }
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                    draggable: true,
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    draggable: true,
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    draggable: true,
                    autoplaySpeed: 2000,
                    infinite: true,
                }
            }
        ]
    };
    return (
        <div className="max-width mt-10">
            <div className="homeactivitycard">
                <Slider {...settings}>
                    <div className="px-[5px] h-full">
                        <div className="h-full px-3 py-5 bg-primary text-white text-center rounded-xl">
                            <span className="font-semibold text-3xl">8+</span>
                            <h1 className="my-2 font-medium">Years of Experience</h1>
                            <h3 className="text-slate-300 font-normal">Graphic Design</h3>
                        </div>
                    </div>
                    <div className="px-[5px] h-full">
                        <div className="h-full px-3 py-5 bg-[#E85426] text-white text-center rounded-xl">
                            <span className="">Customer</span>
                            <h1 className="my-2 text-2xl">Satisfaction</h1>
                            <h3 className="text-slate-300 font-normal">is Our Top Priority</h3>
                        </div>
                    </div>
                    <div className="px-[5px] h-full">
                        <div className="h-full px-3 py-5 bg-primary text-white text-center rounded-xl">
                            <span className="font-semibold text-3xl">100%</span>
                            <h1 className="my-2 text-[20px]">Satisfaction</h1>
                            <h3 className="text-slate-300 font-normal">Guaranteed</h3>
                        </div>
                    </div>
                    <div className="px-[5px] h-full">
                        <div className="h-full px-3 py-5 bg-[#E85426] text-white text-center rounded-xl">
                            <span className="text-2xl 2xl:text-3xl">Emergency</span>
                            <h1 className="my-2 text-slate-300">Services</h1>
                            <h3 className="font-normal">Available</h3>
                        </div>
                    </div>
                    <div className="px-[5px] h-full">
                        <div className="h-full px-3 py-5 bg-primary text-white text-center rounded-xl">
                            <span className="text-3xl">Easy</span>
                            <h1 className="my-2 font-medium text-lg">Communication</h1>
                            <h3 className="text-slate-300 font-normal">Quality Results</h3>
                        </div>
                    </div>
                </Slider>
            </div>
        </div>
    )
}

export default HomeActivityCards