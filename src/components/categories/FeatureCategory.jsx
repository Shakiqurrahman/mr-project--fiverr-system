import { Reorder } from "framer-motion";
import { useEffect, useState } from "react";
import { IoMdClose } from "react-icons/io";
import { useSelector } from "react-redux";
import DownArrow from "../../assets/images/icons/Down Arrow.svg";
import Check from "../../assets/svg/Check";
import useSubFolders from "../../hooks/useGetCategory";
import { useFetchGetUploadQuery } from "../../Redux/api/uploadDesignApiSlice";
import Sidebar from "../Sidebar";
import CategoryCards from "./CategoryCards";
import useGetFolders from "../../hooks/useGetCategory";

function FeatureCategory() {
  const { user } = useSelector((state) => state.user);
  // const { data: uploadDesigns, error, isLoading } = useFetchGetUploadQuery();

  const [expand, setExpand] = useState(false);
  const [isDraggable, setIsDraggable] = useState(false);
  // const [categoryList, setCategoryList] = useState([]);
  const { categories, error, isLoading, handleReorder } = useGetFolders();
  console.log('folders---',categories);

  // useEffect(() => {
  //   const categoryData = (uploadDesigns || []).reduce((acc, current) => {
  //     const existingItem = acc.find((item) => item.title === current.folder);

  //     if (!existingItem) {
  //       acc.push({
  //         id: current.id,
  //         title: current.folder,
  //       });
  //     }
  //     return acc;
  //   }, []);

  //   setCategoryList(categoryData);
  // }, [uploadDesigns]);

  // useEffect(() => {
  //   if (categoryList.length > 0) {
  //     const data = categoryList.map((category) => getAllSubFolders(category.title));
  //     setSubFolders(data);
  //   }
  // }, [categoryList]);

  const [tempCategoryList, setTempCategoryList] = useState([]);

  useEffect(() => {
    // When isDraggable is turned off, save or discard changes
    if (!isDraggable) {
      // setCategoryList(tempCategoryList);
    }
  }, [isDraggable, tempCategoryList]);

  const handleSave = () => {
    setIsDraggable(false);
    // setTempCategoryList(categoryList);
  };

  const handleCancel = () => {
    setIsDraggable(false);
    // setCategoryList(tempCategoryList); // Discard changes by resetting to tempCategoryList
  };
  return (
    <div className="max-width">
      {user?.role === "ADMIN" && (
        <div className="mt-10 flex items-center justify-between">
          <button
            className="rounded-[30px] border-2 border-solid border-primary bg-[#EEF7FE] p-[6px_15px]"
            onClick={() => setIsDraggable(true)}
          >
            CUSTOMISE
          </button>
          {isDraggable && (
            <div className="flex gap-4">
              <button
                className="flex h-[35px] w-[35px] items-center justify-center rounded-full border-2 border-solid border-primary bg-[#EEF7FE]"
                onClick={handleSave}
              >
                <Check className={"h-4 w-4"} />
              </button>
              <button
                className="flex h-[35px] w-[35px] items-center justify-center rounded-full border-2 border-solid border-canceled bg-[#EEF7FE]"
                onClick={handleCancel}
              >
                <IoMdClose className="text-xl text-canceled" />
              </button>
            </div>
          )}
        </div>
      )}
      <div className="flex flex-wrap gap-3 sm:flex-nowrap">
        <div className="relative w-full sm:w-2/3 md:w-3/4 lg:w-4/5">
          <div>
            <Reorder.Group
              axis="y"
              values={categories}
              onReorder={handleReorder}
            >
              {categories.map((category, idx) => {
                if (!expand) {
                  if (idx <= 4) {
                    return (
                      <Reorder.Item
                        key={idx}
                        value={category}
                        drag={isDraggable ? true : false}
                        style={{ cursor: isDraggable ? "grab" : "default" }}
                      >
                        <CategoryCards
                          title={category.folder}
                          path={"/all-category"}
                        />
                      </Reorder.Item>
                    );
                  }
                } else {
                  return (
                    <Reorder.Item
                      key={idx}
                      value={category}
                      drag={isDraggable ? true : false}
                      style={{ cursor: isDraggable ? "grab" : "default" }}
                    >
                      <CategoryCards
                        title={category.folder}
                        path={"/all-category"}
                      />
                    </Reorder.Item>
                  );
                }
              })}
            </Reorder.Group>
          </div>
          {!expand && (
            <div className="absolute inset-x-0 bottom-0 z-10 flex justify-center bg-gradient-to-t from-white pb-8 pt-40">
              <button
                className="rounded-full bg-white"
                onClick={() => setExpand(true)}
              >
                <img src={DownArrow} alt="" className="h-[50px] w-[50px]" />
              </button>
            </div>
          )}
        </div>
        <Sidebar />
      </div>
    </div>
  );
}

export default FeatureCategory;
