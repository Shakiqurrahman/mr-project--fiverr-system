import React, { useState } from "react";
import { FaComputer } from "react-icons/fa6";
import { getStatusText } from "../customer-profile/StatusText";

const DashboardProjects = () => {
  const projectType = [
    {
      id: 1,
      name: "Active Projects",
      quantity: 12,
      totalPrice: 290,
    },
    {
      id: 2,
      name: "Revision",
      quantity: 7,
      totalPrice: 290,
    },
    {
      id: 3,
      name: "Ongoing",
      quantity: 3,
      totalPrice: 290,
    },
    {
      id: 4,
      name: "Waiting",
      quantity: 5,
      totalPrice: 290,
    },
    {
      id: 5,
      name: "Delivered",
      quantity: 3,
      totalPrice: 290,
    },
    {
      id: 6,
      name: "Completed",
      quantity: 1,
      totalPrice: 290,
    },
    {
      id: 7,
      name: "Canceled",
      quantity: 2,
      totalPrice: 290,
    },
  ];

  const [selectedProjectType, setSelectedProjectType] = useState(
    projectType[0]?.name || "",
  );

  const [activeProjectList, setActiveProjectList] = useState([
    {
      id: 1,
      status: "Ongoing",
      price: 30,
      deadline: "June 15, 2024",
      image: {
        url: "https://img-cdn.pixlr.com/image-generator/history/65bb506dcb310754719cf81f/ede935de-1138-4f66-8ed7-44bd16efc709/medium.webp",
        name: "Door Hanger Design",
      },
      client: {
        id: 1,
        isOnline: true,
        name: "John Doe",
        avatar:
          "https://plus.unsplash.com/premium_photo-1664474619075-644dd191935f?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8aW1hZ2V8ZW58MHx8MHx8fDA%3D",
      },
    },
    {
      id: 2,
      status: "Revision",
      price: 30,
      deadline: "June 15, 2024",
      image: {
        url: "https://img-cdn.pixlr.com/image-generator/history/65bb506dcb310754719cf81f/ede935de-1138-4f66-8ed7-44bd16efc709/medium.webp",
        name: "Flyer Design",
      },
      client: {
        id: 2,
        isOnline: false,
        name: "Shake Xpress",
        avatar:
          "https://plus.unsplash.com/premium_photo-1664474619075-644dd191935f?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8aW1hZ2V8ZW58MHx8MHx8fDA%3D",
      },
    },
  ]);

  const handleProjectTypeChange = (e) => {
    setSelectedProjectType(e.target.value);
  };

  const filteredSelectedProject = projectType.find(
    (type) => type.name === selectedProjectType,
  );
  return (
    <>
      <div className="mb-6 flex items-center justify-between gap-2 border p-4">
        <h1 className="text-xl font-bold text-primary">
          {filteredSelectedProject?.name} - {filteredSelectedProject?.quantity}{" "}
          ($
          {filteredSelectedProject?.totalPrice})
        </h1>
        <select
          className="border p-1 px-2 font-semibold outline-none"
          name="projectType"
          id="projectType"
          onChange={handleProjectTypeChange}
        >
          {projectType.map((type, idx) => (
            <option key={idx} value={type?.name}>
              {type?.name} ({type?.quantity})
            </option>
          ))}
        </select>
      </div>
      <div>
        {activeProjectList.map((project, idx) => (
          <div
            key={idx}
            className="mb-6 flex items-center justify-between gap-4 border bg-lightskyblue p-4"
          >
            <div className="flex items-center">
              <img
                src={project?.image?.url}
                alt={project?.image?.name}
                className="h-[74px] w-[100px] border object-cover"
              />
              <div className="ml-4 flex items-center gap-2">
                <div className="relative">
                  <img
                    src={project?.client?.avatar}
                    alt={project?.client?.name}
                    className="size-10 rounded-full border object-cover"
                  />
                  <span
                    className={`absolute bottom-0 right-1 size-2 rounded-full border border-white ${project?.client?.isOnline ? "bg-primary" : "bg-gray-400"}`}
                  ></span>
                </div>
                <h2 className="text-sm font-semibold">{project.client.name}</h2>
              </div>
            </div>
            <div className="flex items-center gap-10">
              <div className="text-center text-sm">
                <p className="font-medium text-gray-500">Price</p>
                <p className="font-bold">${project.price}</p>
              </div>
              <div className="text-center text-sm">
                <p className="font-medium text-gray-500">Time</p>
                <p className="font-bold">{project.deadline}</p>
              </div>
              <div className="text-center text-sm">
                <p className="font-medium text-gray-500">Status</p>
                <p className="font-bold">{getStatusText(project?.status)}</p>
              </div>
            </div>
            <div className="flex items-center gap-8">
              <button className="text-sm font-semibold text-primary">
                View
              </button>
              <FaComputer className="cursor-pointer text-xl text-black duration-300 hover:text-primary" />
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default DashboardProjects;
