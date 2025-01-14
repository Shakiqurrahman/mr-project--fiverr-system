import { Pagination, PaginationItem, Stack } from "@mui/material";
import { useEffect, useState } from "react";
import { useGetAllProjectsQuery } from "../Redux/api/dashboardApiSlice";
import prevBtn from "../assets/images/icons/Left Arrow.svg";
import nextBtn from "../assets/images/icons/Right Arrow.svg";
import ProjectCard from "../components/categories/ProjectCard";
import { timeAgoTracker } from "../libs/timeAgoTracker";

function AllCompletedProjects() {
  const { data } = useGetAllProjectsQuery({ status: "Completed" });

  const [currentPage, setCurrentPage] = useState(1);
  const [completedProjects, setCompletedProjects] = useState([]);

  useEffect(() => {
    if (data?.length > 0) {
      const filteredData = data?.filter((order) =>
        order?.review?.find(
          (r) => r?.isThumbnail && r?.senderType === "CLIENT",
        ),
      );
      const sortedData = filteredData?.sort((a, b) => {
        return (
          new Date(b?.completedDate).getTime() -
          new Date(a?.completedDate).getTime()
        );
      });
      setCompletedProjects(sortedData);
    }
  }, [data]);

  // Pagination related work
  const limit = 20;
  const totalPages = Math.ceil(completedProjects?.length / limit) || 0;
  const startIndex = (currentPage - 1) * limit;
  const currentPageData = completedProjects?.slice(
    startIndex,
    startIndex + limit,
  );
  return (
    <>
      <div className="max-width">
        <h1 className="my-10 text-center text-xl font-semibold md:text-3xl">
          Completed Projects
        </h1>
        {completedProjects?.length > 0 && (
          <div className="grid grid-cols-2 gap-x-3 gap-y-8 md:grid-cols-3 lg:grid-cols-4">
            {currentPageData?.map((project, index) => (
              <ProjectCard
                key={index}
                thumbnail={project?.projectThumbnail?.replaceAll(
                  "-watermark-resized",
                  "",
                )}
                watermark={project?.projectThumbnail}
                clientLogo={project?.user?.image}
                title={project?.completedProjectName}
                clientName={project?.user?.userName}
                timeStamp={
                  timeAgoTracker(project?.completedDate) || "5 days ago"
                }
              />
            ))}
          </div>
        )}
        {completedProjects?.length > 20 && (
          <div className="mt-10 flex justify-center">
            <Stack spacing={2}>
              <Pagination
                count={totalPages}
                page={currentPage}
                onChange={(_, page) => {
                  setCurrentPage(page);
                  window.scrollTo(0, 0);
                }}
                renderItem={(item) => (
                  <PaginationItem
                    slots={{ previous: prevBtnIcon, next: nextBtnIcon }}
                    {...item}
                  />
                )}
              />
            </Stack>
          </div>
        )}

        {/* <div className="mt-10 flex justify-center">
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
        </div> */}
      </div>
    </>
  );
}

const prevBtnIcon = () => {
  return (
    <img
      src={prevBtn}
      alt=""
      className="h-8 w-8 rounded-full border border-solid shadow-md"
    />
  );
};
const nextBtnIcon = () => {
  return (
    <img
      src={nextBtn}
      alt=""
      className="h-8 w-8 rounded-full border border-solid shadow-md"
    />
  );
};

export default AllCompletedProjects;
