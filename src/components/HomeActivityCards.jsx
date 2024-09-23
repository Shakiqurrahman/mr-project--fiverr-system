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
      <div className="homeactivitycard grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
        {/* <Slider {...settings}> */}
        <div className="h-full">
          <div className="h-full rounded-xl bg-primary px-3 py-5 text-center text-white">
            <span className="text-2xl font-semibold sm:text-3xl">8+</span>
            <h1 className="my-2 text-sm font-medium sm:text-base">
              Years of Experience
            </h1>
            <h3 className="text-sm font-normal sm:text-base">Graphic Design</h3>
          </div>
        </div>
        <div className="h-full">
          <div className="h-full rounded-xl bg-[#E85426] px-3 py-5 text-center text-white">
            <span className="text-sm sm:text-base">Customer</span>
            <h1 className="my-2 text-lg sm:text-2xl">Satisfaction</h1>
            <h3 className="text-sm font-normal sm:text-base">
              is Our Top Priority
            </h3>
          </div>
        </div>
        <div className="h-full">
          <div className="h-full rounded-xl bg-primary px-3 py-5 text-center text-white">
            <span className="text-2xl font-semibold sm:text-3xl">100%</span>
            <h1 className="my-2 text-base sm:text-[20px]">Satisfaction</h1>
            <h3 className="text-sm font-normal sm:text-base">Guaranteed</h3>
          </div>
        </div>
        <div className="h-full">
          <div className="h-full rounded-xl bg-[#E85426] px-3 py-5 text-center text-white">
            <span className="text-lg sm:text-3xl">Emergency</span>
            <h1 className="my-2">Services</h1>
            <h3 className="text-sm font-normal sm:text-base">Available</h3>
          </div>
        </div>
        <div className="h-full">
          <div className="h-full rounded-xl bg-primary px-3 py-5 text-center text-white">
            <span className="text-xl sm:text-3xl">Easy</span>
            <h1 className="my-2 text-base font-medium sm:text-lg">
              Communication
            </h1>
            <h3 className="text-sm font-normal sm:text-base">
              Quality Results
            </h3>
          </div>
        </div>
        {/* </Slider> */}
      </div>
    </div>
  );
}

export default HomeActivityCards;
