import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import LeftArrowIcon from "../assets/images/icons/Left Arrow.svg";
import RightArrowIcon from "../assets/images/icons/Right Arrow.svg";
import thumbnail from "../assets/images/project-thumbnail.jpg";
import ProjectCard from "./categories//ProjectCard";

function RelatedDesigns({ bgColor, color, img }) {
  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    arrows: true,
    autoplay: true,
    autoplaySpeed: 2000,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 768,
        settings: {
          arrows: false,
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 576,
        settings: {
          arrows: false,
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  const categories = [
    {
      thumbnail,
      title: "Pressure and Soft Washing Door Hanger Design",
    },
    {
      thumbnail,
      title: "Pressure and Soft Washing Door Hanger Design",
    },
    {
      thumbnail,
      title: "Pressure and Soft Washing Door Hanger Design",
    },
    {
      thumbnail,
      title: "Pressure and Soft Washing Door Hanger Design",
    },
    {
      thumbnail,
      title: "Pressure and Soft Washing Door Hanger Design",
    },
  ];
  return (
    <div
      className={`${
        bgColor ? bgColor : "bg-lightskyblue"
      } -mb-10 sm:-mb-20 relative`}
    >
      <div className="max-width py-10 mt-10">
        <h1
          className={`${
            color ? color : "text-primary"
          } text-2xl font-bold text-center`}
        >
          Related Designs
        </h1>
        <div className="mt-8">
          <Slider {...settings}>
            {categories.map((category) => (
              <ProjectCard
                key={Math.random()}
                thumbnail={img ? img : category.thumbnail}
                title={category.title}
              />
            ))}
          </Slider>
        </div>
      </div>
    </div>
  );
}

// Custom arrows design components
function NextArrow({ onClick }) {
  return (
    <div
      onClick={onClick}
      className="slick-arrow before:content-none h-[35px] w-[35px] border cursor-pointer flex items-center justify-center rounded-full absolute top-[35%] -right-[15px] z-10"
    >
      <img src={RightArrowIcon} alt="" />
    </div>
  );
}

function PrevArrow({ onClick }) {
  return (
    <div
      onClick={onClick}
      className="slick-arrow before:content-none h-[35px] w-[35px] border cursor-pointer flex items-center justify-center rounded-full absolute top-[35%] -left-[15px] z-10"
    >
      <img src={LeftArrowIcon} alt="" />
    </div>
  );
}

export default RelatedDesigns;
