import { Reorder } from "framer-motion";
import { useEffect, useState } from "react";
import { IoMdClose } from "react-icons/io";
import Check from "../../assets/svg/Check";
import Sidebar from "../Sidebar";
import CategoryCards from "./CategoryCards";

function FeatureCategory() {
  const [isDraggable, setIsDraggable] = useState(false);
  const [categoryList, setCategoryList] = useState([
    { id: 1, title: "Door Hanger Designs", path: "/" },
    { id: 2, title: "Flyer Designs", path: "/" },
    { id: 3, title: "Postcard Designs", path: "/" },
    { id: 4, title: "Business Card Designs", path: "/" },
    { id: 5, title: "Brochure Designs", path: "/" },
  ]);
  const [tempCategoryList, setTempCategoryList] = useState([...categoryList]);

  useEffect(() => {
    // When isDraggable is turned off, save or discard changes
    if (!isDraggable) {
      setCategoryList(tempCategoryList);
    }
  }, [isDraggable]);

  const handleSave = () => {
    setIsDraggable(false);
    setTempCategoryList(categoryList);
  };

  const handleCancel = () => {
    setIsDraggable(false);
    setCategoryList(tempCategoryList); // Discard changes by resetting to tempCategoryList
  };
  return (
    <div className="max-width">
      <div className="flex items-center justify-between mt-10">
        <button
          className="p-[6px_15px] bg-[#EEF7FE] border-2 border-solid border-primary rounded-[30px]"
          onClick={() => setIsDraggable(true)}
        >
          CUSTOMISE
        </button>
        {isDraggable && (
          <div className="flex gap-4">
            <button
              className="h-[35px] w-[35px] rounded-full bg-[#EEF7FE] border-2 border-solid border-primary flex items-center justify-center"
              onClick={handleSave}
            >
              <Check className={"h-4 w-4"} />
            </button>
            <button
              className="h-[35px] w-[35px] rounded-full bg-[#EEF7FE] border-2 border-solid border-canceled flex items-center justify-center"
              onClick={handleCancel}
            >
              <IoMdClose className="text-canceled text-xl" />
            </button>
          </div>
        )}
      </div>
      <div className="flex gap-3 flex-wrap sm:flex-nowrap">
        <div className="w-full sm:w-2/3 md:w-3/4 lg:w-4/5">
          <div>
            <Reorder.Group
              axis="y"
              values={categoryList}
              onReorder={setCategoryList}
            >
              {categoryList.map((category) => (
                <Reorder.Item
                  key={category.id}
                  value={category}
                  drag={isDraggable ? true : false}
                  style={{ cursor: isDraggable ? "grab" : "default" }}
                >
                  <CategoryCards title={category.title} path={category.path} />
                </Reorder.Item>
              ))}
            </Reorder.Group>
          </div>
        </div>
        <Sidebar />
      </div>
    </div>
  );
}

export default FeatureCategory;
