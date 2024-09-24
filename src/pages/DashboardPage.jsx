import React from "react";
import AllTimeStats from "../components/dashboard/AllTimeStats";
import CurrentMonthStats from "../components/dashboard/CurrentMonthStats";
import DashboardProjects from "../components/dashboard/DashboardProjects";

const DashboardPage = () => {
  return (
    <section className="max-width justify-betwee my-10 flex flex-col gap-4 lg:flex-row">
      <div className="w-full lg:w-4/6">
        {/* -----Dashboard Projects-----  */}
        <DashboardProjects />
      </div>
      <div className="w-full lg:w-2/6">
        {/* -----Present Month statistics-----  */}
        <CurrentMonthStats />

        {/* -----All Times statistics-----  */}
        <AllTimeStats />
      </div>
    </section>
  );
};

export default DashboardPage;
