import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import LeftArrowIcon from "../assets/images/icons/Left Arrow.svg";
import RightArrowIcon from "../assets/images/icons/Right Arrow.svg";
import logo from "../assets/images/MR Logo White.png";
import thumbnail from "../assets/images/project-thumbnail.jpg";
import CategoryLayout from "./categories/CategoryLayout";
import ProjectCard from "./categories/ProjectCard";

function CompletedProject() {
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
      clientLogo: logo,
      title: "Pressure and Soft Washing Door Hanger Design",
      clientName: "clientname",
      timeStamp: "5 days ago",
    },
    {
      thumbnail,
      clientLogo: logo,
      title:
        "Pressure and Soft Washing Door Hanger Design Pressure and Soft Washing Door Hanger Design",
      clientName: "clientname",
      timeStamp: "5 days ago",
    },
    {
      thumbnail,
      clientLogo: logo,
      title: "Pressure and Soft Washing Door Hanger Design",
      clientName: "clientname",
      timeStamp: "5 days ago",
    },
    {
      thumbnail,
      clientLogo: logo,
      title: "Pressure and Soft Washing Door Hanger Design",
      clientName: "clientname",
      timeStamp: "5 days ago",
    },
    {
      thumbnail,
      clientLogo: logo,
      title: "Pressure and Soft Washing Door Hanger Design",
      clientName: "clientname",
      timeStamp: "5 days ago",
    },
  ];
  return (
    <div className="max-width">
      <CategoryLayout
        title={"Completed Projects"}
        path={"/all-completed-projects"}
      >
        <div>
          <Slider {...settings}>
            {categories.map((category) => (
              <ProjectCard
                key={Math.random()}
                thumbnail={category.thumbnail}
                clientLogo={category.clientLogo}
                title={category.title}
                clientName={category.clientName}
                timeStamp={category.timeStamp}
              />
            ))}
          </Slider>
        </div>
      </CategoryLayout>
    </div>
  );
}

// Custom arrows design components
function NextArrow({ onClick }) {
  return (
    <div
      onClick={onClick}
      className="slick-arrow absolute -right-[15px] top-[30%] z-10 flex h-[35px] w-[35px] cursor-pointer items-center justify-center rounded-full border before:content-none"
    >
      <img src={RightArrowIcon} alt="" />
    </div>
  );
}

function PrevArrow({ onClick }) {
  return (
    <div
      onClick={onClick}
      className="slick-arrow absolute -left-[15px] top-[30%] z-10 flex h-[35px] w-[35px] cursor-pointer items-center justify-center rounded-full border before:content-none"
    >
      <img src={LeftArrowIcon} alt="" />
    </div>
  );
}

export default CompletedProject;
