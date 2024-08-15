import Sidebar from "../Sidebar";
import CategoryCards from "./CategoryCards";

function FeatureCategory() {
  return (
    <div className="max-width">
      <div className="mt-10">
        <button className="p-[6px_15px] bg-[#EEF7FE] border-2 border-solid border-primary rounded-[30px]">
          CUSTOMISE
        </button>
      </div>
      <div className="flex gap-3 flex-wrap sm:flex-nowrap">
        <div className="w-full sm:w-2/3 md:w-3/4 lg:w-4/5">
          <div>
            <CategoryCards title={"Door Hanger Designs"} path={"/"} />
            <CategoryCards title={"Flyer Designs"} path={"/"} />
            <CategoryCards title={"Postcard Designs"} path={"/"} />
            <CategoryCards title={"Business Card Designs"} path={"/"} />
            <CategoryCards title={"Brochure Designs"} path={"/"} />
          </div>
        </div>
        <Sidebar />
      </div>
    </div>
  );
}

export default FeatureCategory;
