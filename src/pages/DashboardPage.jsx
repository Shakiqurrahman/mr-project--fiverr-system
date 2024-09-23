import React from "react";
import DashboardProjects from "../components/dashboard/DashboardProjects";

const DashboardPage = () => {
  return (
    <section className="max-width my-10 flex flex-col md:flex-row gap-4 justify-between">
      <div className="w-full md:w-3/4">
        <DashboardProjects />
      </div>
    </section>
  );
};

export default DashboardPage;
