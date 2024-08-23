import React, { useState } from "react";
import designImg from "../../assets/images/project-thumbnail.jpg";
import { getStatusText } from "./StatusText";

const ActiveProjects = () => {
  const [activeProjects] = useState([
    {
        id: 1,
        title: "Flyer Design",
        img: designImg,
        price: 30,
        time: "11h - 45m late",
        status: "Revision",
      },
      {
        id: 2,
        title: "Door Hanger Design",
        img: designImg,
        price: 40,
        time: "11h - 45m",
        status: "Ongoing",
      },
      {
        id: 3,
        title: "Postcard Design",
        img: designImg,
        price: 40,
        time: "00 - 00",
        status: "Waiting",
      },
      {
        id: 4,
        title: "Business Card Design",
        img: designImg,
        price: 25,
        time: "00 - 00",
        status: "Delivered",
      },
  ]);

  return (
    <div className="mt-8 grid gap-4 min-[850px]:grid-cols-2">
      {activeProjects.length > 0 ? (
        activeProjects.map((project) => {
          return (
            <div
              className="rounded-lg border border-gray-300 p-2 shadow-sm lg:p-4"
              key={project.id}
            >
              <div className="flex items-center gap-3">
                <img
                  className="w-28 lg:w-36"
                  src={project.img}
                  alt={project.title}
                />
                <div>
                  <h3 className="mb-1 text-sm sm:text-base">{project.title}</h3>
                  <p className="text-lg font-semibold sm:text-xl">
                    ${project.price}
                  </p>
                </div>
              </div>
              <div className="mt-2 flex justify-between">
                <p>{project.time}</p>
                <p className="font-semibold">{getStatusText(project.status)}</p>
              </div>
            </div>
          );
        })
      ) : (
        <h2 className="text-center text-nowrap text-lg min-[850px]:translate-x-1/2">
          No active projects at the moment!
        </h2>
      )}
    </div>
  );
};

export default ActiveProjects;
