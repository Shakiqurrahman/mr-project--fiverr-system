import { useState } from "react";
import SitemapDesign from "../components/sitemap/SitemapDesign";
import SitemapFooter from "../components/sitemap/SitemapFooter";
import SitemapProject from "../components/sitemap/SitemapProject";
import SitemapTopBar from "../components/sitemap/SitemapTopBar";

const Sitemap = () => {
  const btns = ["Design", "Project", "Top Bar", "Footer"];

  const [selectedTabButton, setSelectedTabButton] = useState("Design");

  const RenderComponent = () => {
    switch (selectedTabButton) {
      case "Design":
        return <SitemapDesign />;
      case "Project":
        return <SitemapProject />;
      case "Top Bar":
        return <SitemapTopBar />;
      case "Footer":
        return <SitemapFooter />;
      default:
        return null;
    }
  };
  return (
    <div className="max-width my-10">
      <div className="relative mb-10 border-b border-black pb-2">
        <div className="flex gap-x-5 sm:gap-x-20">
          {btns.map((btn, i) => (
            <button
              key={i}
              className={`relative shrink-0 text-base font-semibold duration-300 after:absolute after:bottom-[-10px] after:left-0 after:h-[3px] after:w-full after:rounded-md after:bg-primary hover:border-primary hover:text-primary sm:text-lg ${btn === selectedTabButton ? "text-primary after:bg-primary" : "after:bg-transparent"}`}
              onClick={() => setSelectedTabButton(btn)}
            >
              {btn}
            </button>
          ))}
        </div>
      </div>
      <RenderComponent />
    </div>
  );
};

export default Sitemap;
