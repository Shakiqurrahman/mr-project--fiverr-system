import { Pagination, PaginationItem, Stack } from "@mui/material";
import prevBtn from "../assets/images/icons/Left Arrow.svg";
import nextBtn from "../assets/images/icons/Right Arrow.svg";
import logo from "../assets/images/MR Logo White.png";
import thumbnail from "../assets/images/project-thumbnail.jpg";
import ProjectCard from "../components/categories/ProjectCard";

function AllCompletedProjects() {
  const data = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
  ];
  return (
    <>
      <div className="max-width">
        <h1 className="text-center text-xl md:text-3xl my-10 font-semibold">
          Completed Projects
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
          {data.map(() => (
            <ProjectCard
              key={Math.random()}
              thumbnail={thumbnail}
              clientLogo={logo}
              title={"Pressure and Soft Washing Door Hanger Design"}
              clientName={"clientname"}
              timeStamp={"5 days ago"}
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

export default AllCompletedProjects;
