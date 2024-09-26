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
  const newProjectData = {
    direct: 100,
    custom: 250,
    offer : 100,
  };
  const avgSellingData = {
    direct2: 100,
    custom2: 250,
  };

  return (
    <div>
      {/* Active Projects Bar chart  */}
      <HorizontalBarChart data={activeProjectsData} title={"Active Projects"}/>
      <HorizontalBarChart data={finishedProjectData} title={"Finished Projects"}/>
      <HorizontalBarChart data={newProjectData} title={"New Projects"}/>
      <HorizontalBarChart data={avgSellingData} title={"Avg Selling Price"}/>
    </div>
  );
};

export default ProjectDetailsData;
