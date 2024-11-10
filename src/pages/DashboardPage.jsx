import React from "react";
import AllTimeStats from "../components/dashboard/AllTimeStats";
import AllUsers from "../components/dashboard/AllUsers";
import CurrentMonthStats from "../components/dashboard/CurrentMonthStats";
import DashboardProjects from "../components/dashboard/DashboardProjects";
import SearchBox from "../components/dashboard/SearchBox";
import TotalVisitors from "../components/dashboard/TotalVisitors";

const DashboardPage = () => {
  return (
    <section className="max-width justify-betwee my-10 flex flex-col gap-4 md:flex-row">
      <div className="w-full md:w-[calc(100%_-_330px)]">
        {/* -----Dashboard Projects-----  */}
        <DashboardProjects />
      </div>
      <div className="w-full md:w-[330px]">
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
