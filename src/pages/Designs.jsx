import thumbnail from "../assets/images/project-thumbnail.jpg";
import ProjectCard from "../components/categories/ProjectCard";

import Pagination from "@mui/material/Pagination";
import PaginationItem from "@mui/material/PaginationItem";
import Stack from "@mui/material/Stack";
import prevBtn from "../assets/images/icons/Left Arrow.svg";
import nextBtn from "../assets/images/icons/Right Arrow.svg";
import ButtonPrimary from "../components/ButtonPrimary";
import ButtonSecondary from "../components/ButtonSecondary";
import Divider from "../components/Divider";
import SortDropdown from "../components/SortDropdown";

function Designs() {
  const sortingOptions = [
    "Default Designs",
    "Newest Designs",
    "Oldest Designs",
  ];

  const handleSortChange = (option) => {
    // console.log("Selected sorting option:", option);
    // Implement sorting logic here
  };
  const data = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
  ];
  const industryBtns = [
    {
      name: "Solar",
      value: 25,
    },
    {
      name: "Pressure Washing",
      value: 73,
    },
    {
      name: "Real State",
      value: 21,
    },
    {
      name: "Lawn Care",
      value: 27,
    },
    {
      name: "Moving",
      value: 35,
    },
    {
      name: "Cleaning Services",
      value: 65,
    },
    {
      name: "Solar Panel Cleaning",
      value: 45,
    },
    {
      name: "Window Cleaning",
      value: 52,
    },
    {
      name: "Medical",
      value: 53,
    },
    {
      name: "Remodeling",
      value: 15,
    },
    {
      name: "Auto Detailing",
      value: 25,
    },
    {
      name: "Carpet Cleaning",
      value: 25,
    },
    {
      name: "Trash Bin Cleaning",
      value: 35,
    },
    {
      name: "Pest Control",
      value: 15,
    },
    {
      name: "Painting",
      value: 17,
    },
    {
      name: "Delivery Service",
      value: 13,
    },
  ];
  const designBtns = [
    {
      name: "Business Card",
      value: 37,
    },
    {
      name: "Door Hanger",
      value: 137,
    },
    {
      name: "Flyer",
      value: 94,
    },
    {
      name: "Postcard",
      value: 103,
    },
    {
      name: "Brochure",
      value: 27,
    },
    {
      name: "Roll up Banner",
      value: 35,
    },
    {
      name: "Social Media Post",
      value: 73,
    },
    {
      name: "Facebook Cover",
      value: 35,
    },
    {
      name: "Sidewalk Sign",
      value: 15,
    },
    {
      name: "Trade Show Banner",
      value: 18,
    },
    {
      name: "Podcast",
      value: 32,
    },
  ];
  return (
    <>
      <div className="max-width">
        <h1 className="text-center my-10 font-bold text-lg sm:text-2xl md:text-3xl">
          You select the industry and design of your need.{" "}
          <br className="hidden md:block" /> And see your selected items below.
        </h1>
        <div className="flex gap-3 flex-wrap">
          {designBtns.map((btn) => (
            <ButtonPrimary key={Math.random()} items={btn.value}>
              {btn.name}
            </ButtonPrimary>
          ))}
        </div>
        <Divider className={"!bg-primary h-px w-full my-10"} />
        <div className="flex gap-3 flex-wrap">
          {industryBtns.map((btn) => (
            <ButtonSecondary key={Math.random()} items={btn.value}>
              {btn.name}
            </ButtonSecondary>
          ))}
        </div>
        <div className="text-end my-10">
          <SortDropdown
            options={sortingOptions}
            onSortChange={handleSortChange}
          />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
          {data.map((i) => (
            <ProjectCard
              cart={true}
              key={i}
              thumbnail={thumbnail}
              title="Pressure and Soft Washing Door Hanger Design"
            />
          ))}
        </div>

        <div className="flex justify-center mt-10">
          <Stack spacing={2}>
            <Pagination
              count={10}
              renderItem={(item) => (
                <PaginationItem
                  slots={{ previous: prevBtnIcon, next: nextBtnIcon }}
                  {...item}
                />
              )}
            />
          </Stack>
        </div>
      </div>
    </>
  );
}

const prevBtnIcon = () => {
  return <img src={prevBtn} alt="" className="h-8 w-8 rounded-full" />;
};
const nextBtnIcon = () => {
  return <img src={nextBtn} alt="" className="h-8 w-8 rounded-full" />;
};

export default Designs;
