import thumbnail from "../assets/images/project-thumbnail.jpg";
import PageHeader from "../components/PageHeader";
import ProjectCard from "../components/categories/ProjectCard";

import Pagination from "@mui/material/Pagination";
import PaginationItem from "@mui/material/PaginationItem";
import Stack from "@mui/material/Stack";
import prevBtn from "../assets/images/icons/Left Arrow.svg";
import nextBtn from "../assets/images/icons/Right Arrow.svg";

function Industries() {
  const data = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
  ];
  return (
    <>
      <PageHeader>Design Industry</PageHeader>
      <div className="max-width">
        <div className="flex justify-between items-center my-10">
          <h1 className="text-base sm:text-lg font-semibold">
            Click on the design you need to see more designs.
          </h1>
          <button className="border border-solid border-primary py-1 px-4 rounded-[30px] font-semibold text-sm duration-300 hover:bg-primary hover:text-white">
            Customise
          </button>
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

export default Industries;
