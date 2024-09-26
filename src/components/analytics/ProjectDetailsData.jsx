import HorizontalBarChart from "./Chart/HorizontalBarChart";

const ProjectDetailsData = () => {
  const activeProjectsData = {
    revision: 2300,
    ongoing: 2150,
    waiting: 1200,
    delivered: 3000,
  };
  const finishedProjectData = {
    completed: 2100,
    cancelled: 250,
  };

  return (
    <div>
      {/* Active Projects Bar chart  */}
      <HorizontalBarChart data={activeProjectsData} title={"Active Projects"}/>
      <HorizontalBarChart data={finishedProjectData} title={"Finished Projects"}/>
    </div>
  );
};

export default ProjectDetailsData;
