import React from "react";
import AllTimeStats from "../components/dashboard/AllTimeStats";
import CurrentMonthStats from "../components/dashboard/CurrentMonthStats";
import DashboardProjects from "../components/dashboard/DashboardProjects";
import SearchBox from "../components/dashboard/SearchBox";
import TotalVisitors from "../components/dashboard/TotalVisitors";
import AllUsers from "../components/dashboard/AllUsers";

const DashboardPage = () => {
  return (
    <section className="max-width justify-betwee my-10 flex flex-col gap-4 md:flex-row">
      <div className="w-full md:w-4/6">
        {/* -----Dashboard Projects-----  */}
        <DashboardProjects />
      </div>
      <div className="w-full md:w-2/6">
        {/* -----Present Month statistics-----  */}
        <CurrentMonthStats />

        {/* -----All Times statistics-----  */}
        <AllTimeStats />

        {/* -----Search Project-----  */}
        <SearchBox />

        {/* -----Total Visitors-----  */}
        <TotalVisitors />

        {/* -----All Users-----  */}
        <AllUsers />
      </div>
    </section>
  );
};

export default DashboardPage;
