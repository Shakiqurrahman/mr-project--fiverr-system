import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import LeftArrowIcon from "../../assets/images/icons/Left Arrow.svg";
import RightArrowIcon from "../../assets/images/icons/Right Arrow.svg";
import CategoryLayout from "./CategoryLayout";
import ProjectCard from "./ProjectCard";
function CategoryCards({ title, path, subCategory = [], titleSlug }) {
  const settings = {
    dots: false,
    infinite: subCategory?.length > 3 ? true : false,
    speed: 500,
    slidesToShow: 3,
    className: "category-cards",
    slidesToScroll: 1,
    arrows: subCategory?.length > 3 ? true : false,
    autoplay: subCategory?.length > 3 ? true : false,
    autoplaySpeed: 1500,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: subCategory?.length > 3 ? true : false,
          autoplay: subCategory?.length > 3 ? true : false,
        },
      },
      {
        breakpoint: 768,
        settings: {
          arrows: false,
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: subCategory?.length > 2 ? true : false,
          autoplay: subCategory?.length > 2 ? true : false,
        },
      },
      {
        breakpoint: 576,
        settings: {
          arrows: false,
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: subCategory?.length > 2 ? true : false,
          autoplay: subCategory?.length > 2 ? true : false,
        },
      },
    ],
  };

  return (
    <CategoryLayout title={title} path={path}>
      <div>
        <Slider {...settings}>
          {subCategory.length > 0 &&
            subCategory.map((category) => {
              const thumbnail = category.images.find(
                (img) => img?.thumbnail === true,
              );
              return (
                <ProjectCard
                  key={Math.random()}
                  thumbnail={thumbnail?.url}
                  watermark={thumbnail?.watermark}
                  thumbnailName={category?.title}
                  title={category?.subFolder}
                  folder={true}
                  slug={`/designs/${titleSlug}/${category?.subFolderSlug}`}
                />
              );
            })}
        </Slider>
      </div>
    </CategoryLayout>
  );
}

// Custom arrows design components
function NextArrow({ onClick }) {
  return (
    <div
      onClick={onClick}
      className="slick-arrow absolute -right-[15px] top-[40%] z-10 flex h-[35px] w-[35px] cursor-pointer items-center justify-center rounded-full border before:content-none"
    >
      <img src={RightArrowIcon} alt="" />
    </div>
  );
}

function PrevArrow({ onClick }) {
  return (
    <div
      onClick={onClick}
      className="slick-arrow absolute -left-[15px] top-[40%] z-10 flex h-[35px] w-[35px] cursor-pointer items-center justify-center rounded-full border before:content-none"
    >
      <img src={LeftArrowIcon} alt="" />
    </div>
  );
}

export default CategoryCards;
