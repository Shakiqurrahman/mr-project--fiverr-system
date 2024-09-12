import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";

function HomeActivityCards() {
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
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          draggable: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          draggable: true,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          draggable: true,
          autoplaySpeed: 2000,
          infinite: true,
        },
      },
    ],
  };
  return (
    <div className="max-width mt-10">
      <div className="homeactivitycard">
        <Slider {...settings}>
          <div className="h-full px-[5px]">
            <div className="h-full rounded-xl bg-primary px-3 py-5 text-center text-white">
              <span className="text-3xl font-semibold">8+</span>
              <h1 className="my-2 font-medium">Years of Experience</h1>
              <h3 className="font-normal text-slate-300">Graphic Design</h3>
            </div>
          </div>
          <div className="h-full px-[5px]">
            <div className="h-full rounded-xl bg-[#E85426] px-3 py-5 text-center text-white">
              <span className="">Customer</span>
              <h1 className="my-2 text-2xl">Satisfaction</h1>
              <h3 className="font-normal text-slate-300">
                is Our Top Priority
              </h3>
            </div>
          </div>
          <div className="h-full px-[5px]">
            <div className="h-full rounded-xl bg-primary px-3 py-5 text-center text-white">
              <span className="text-3xl font-semibold">100%</span>
              <h1 className="my-2 text-[20px]">Satisfaction</h1>
              <h3 className="font-normal text-slate-300">Guaranteed</h3>
            </div>
          </div>
          <div className="h-full px-[5px]">
            <div className="h-full rounded-xl bg-[#E85426] px-3 py-5 text-center text-white">
              <span className="text-2xl 2xl:text-3xl">Emergency</span>
              <h1 className="my-2 text-slate-300">Services</h1>
              <h3 className="font-normal">Available</h3>
            </div>
          </div>
          <div className="h-full px-[5px]">
            <div className="h-full rounded-xl bg-primary px-3 py-5 text-center text-white">
              <span className="text-3xl">Easy</span>
              <h1 className="my-2 text-lg font-medium">Communication</h1>
              <h3 className="font-normal text-slate-300">Quality Results</h3>
            </div>
          </div>
        </Slider>
      </div>
    </div>
  );
}

export default HomeActivityCards;
