import React from "react";
import { useFetchActiveProjectsQuery } from "../../Redux/api/orderApiSlice";
import { getStatusText } from "./StatusText";

const ActiveProjects = () => {
  // const [activeProjects] = useState([
  //   {
  //       id: 1,
  //       title: "Flyer Design",
  //       img: designImg,
  //       price: 30,
  //       time: "11h - 45m late",
  //       status: "Revision",
  //     },
  //     {
  //       id: 2,
  //       title: "Door Hanger Design",
  //       img: designImg,
  //       price: 40,
  //       time: "11h - 45m",
  //       status: "Ongoing",
  //     },
  //     {
  //       id: 3,
  //       title: "Postcard Design",
  //       img: designImg,
  //       price: 40,
  //       time: "00 - 00",
  //       status: "Waiting",
  //     },
  //     {
  //       id: 4,
  //       title: "Business Card Design",
  //       img: designImg,
  //       price: 25,
  //       time: "00 - 00",
  //       status: "Delivered",
  //     },
  // ]);
  const {
    data: activeProjects,
    isLoading,
    error,
  } = useFetchActiveProjectsQuery();
  console.log("data", activeProjects);

  return (
    <div className="mt-8 grid gap-4 min-[850px]:grid-cols-2">
      {activeProjects?.length > 0 ? (
        activeProjects?.map((project) => {
          return (
            <div
              className="rounded-lg border border-gray-300 p-2 shadow-sm lg:p-4"
              key={project?.id}
            >
              <div className="flex items-center gap-3">
                <img
                  className="w-28 lg:w-36"
                  src={project?.img}
                  alt={project?.projectName}
                />
                <div>
                  <h3 className="mb-1 text-sm sm:text-base">
                    {project?.projectName}
                  </h3>
                  <p className="text-lg font-semibold sm:text-xl">
                    ${project?.price}
                  </p>
                </div>
              </div>
              <div className="mt-2 flex justify-between">
                <p>{project?.time}</p>
                <p className="font-semibold">
                  {getStatusText(project?.status)}
                </p>
              </div>
            </div>
          );
        })
      ) : (
        <h2 className="text-nowrap text-center text-lg min-[850px]:translate-x-1/2">
          You haven't started any projects yet!
        </h2>
      )}
    </div>
  );
};

export default ActiveProjects;
