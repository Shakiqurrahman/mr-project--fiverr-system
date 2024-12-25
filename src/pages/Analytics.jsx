import { useEffect } from "react";
import AffiliateData from "../components/analytics/AffiliateData";
import CategoriesData from "../components/analytics/CategoriesData";
import ProjectDetailsData from "../components/analytics/ProjectDetailsData";
import ReturnBuyers from "../components/analytics/ReturnBuyers";
import TopKeywords from "../components/analytics/TopKeywords";
import VisitorsData from "../components/analytics/VisitorsData";
import WorldDomination from "../components/analytics/WorldDomination";
import { useLocalStorageObject } from "../hooks/useLocalStorageObject";

const Analytics = () => {
  const btns = [
    "Project Details",
    "World Domination",
    // "Top Keywords",
    "Repeat Buyers",
    "Categories",
    "Affiliate",
    "Visitors",
  ];
  const [{ selectedAnalyticsTab }, updateItem] = useLocalStorageObject(
    "utils",
    {
      selectedAnalyticsTab: "Project Details",
    },
  );

  useEffect(() => {
    updateItem("selectedAnalyticsTab", "Project Details");
  }, []);
  const RenderComponent = () => {
    switch (selectedAnalyticsTab) {
      case "Project Details":
        return <ProjectDetailsData />;
      case "World Domination":
        return <WorldDomination />;
      case "Top Keywords":
        return <TopKeywords />;
      case "Repeat Buyers":
        return <ReturnBuyers />;
      case "Categories":
        return <CategoriesData />;
      case "Affiliate":
        return <AffiliateData />;
      case "Visitors":
        return <VisitorsData />;
      default:
        return null;
    }
  };
  return (
    <div className="max-width mt-10">
      <div className="relative mb-10 border-b border-black pb-2">
        <div className="hidden justify-between gap-3 lg:flex">
          {btns.map((btn, i) => (
            <button
              key={i}
              className={`relative shrink-0 text-lg font-semibold duration-300 after:absolute after:bottom-[-10px] after:left-0 after:h-[3px] after:w-full after:rounded-md after:bg-primary hover:border-primary hover:text-primary ${btn === selectedAnalyticsTab ? "text-primary after:bg-primary" : "after:bg-transparent"}`}
              onClick={() => updateItem("selectedAnalyticsTab", btn)}
            >
              {btn}
            </button>
          ))}
        </div>
      </div>
      <select
        value={selectedAnalyticsTab}
        onChange={(e) => updateItem("selectedAnalyticsTab", e.target.value)}
        className="mb-10 block w-full border border-gray-300 bg-white p-3 font-medium outline-none lg:hidden"
      >
        {btns.map((btn, i) => (
          <option key={i} value={btn}>
            {btn}
          </option>
        ))}
      </select>
      <RenderComponent />
    </div>
  );
};

export default Analytics;
