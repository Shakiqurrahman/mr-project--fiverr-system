import axios from "axios";
import { useEffect, useState } from "react";
import FlipMove from "react-flip-move";
import toast from "react-hot-toast";
import { IoMdClose } from "react-icons/io";
import { useSelector } from "react-redux";
import FeatureCategorySkeleton from "../../CustomSkeleton/FeatureCategorySkeleton";
import DownArrow from "../../assets/images/icons/Down Arrow.svg";
import UpArrow from "../../assets/images/icons/Upper Arrow.svg";
import Check from "../../assets/svg/Check";
import useGetCategory from "../../hooks/useGetCategory";
import { configApi } from "../../libs/configApi";
import Sidebar from "../Sidebar";
import CategoryCards from "./CategoryCards";

function FeatureCategory() {
  const { user } = useSelector((state) => state.user);
  const [expand, setExpand] = useState(false);
  const { categories, error, isLoading } = useGetCategory();

  const [products, setProducts] = useState([]);
  const [draggedIndex, setDraggedIndex] = useState(null);
  const [isCustomizing, setIsCustomizing] = useState(false);
  const [tempProducts, setTempProducts] = useState([]);

  useEffect(() => {
    if (categories) {
      setProducts(categories);
    }
  }, [categories]);
  useEffect(() => {
    if (products) {
      setTempProducts([...products]);
    }
  }, [categories, products]);

  const handleDragStart = (index) => {
    setDraggedIndex(index);
  };

  const handleDragEnter = (index) => {
    if (index !== draggedIndex) {
      const updatedProducts = [...tempProducts];
      const draggedProduct = updatedProducts[draggedIndex];
      updatedProducts.splice(draggedIndex, 1);
      updatedProducts.splice(index, 0, draggedProduct);
      setTempProducts(updatedProducts);
      setDraggedIndex(index);
    }
  };

  const handleDragEnd = () => {
    setDraggedIndex(null);
  };

  const handleCustomize = () => {
    setIsCustomizing(true);
  };

  const handleSave = async () => {
    setProducts(tempProducts); // Save the reordered products
    setIsCustomizing(false);
    const newArr = tempProducts.map((folder) => ({ id: folder.id }));
    console.log("New Array", newArr);
    try {
      const response = await axios.post(
        `${configApi.api}/upload/feature-folder`,
        { newOrder: newArr },
      );
      if (response.status === 200) {
        toast.success("Updated Successfully!");
      }
    } catch (error) {
      toast.error("Update Failed!");
    }
  };

  const handleCancel = () => {
    setTempProducts([...products]); // Reset to original order
    setIsCustomizing(false);
  };
  return (
    <div className="max-width">
      {user?.role === "ADMIN" && (
        <div className="mt-10 flex items-center justify-between">
          <button
            className="rounded-[30px] border-2 border-solid border-primary bg-[#EEF7FE] p-[6px_15px]"
            onClick={handleCustomize}
          >
            CUSTOMISE
          </button>
          {isCustomizing && (
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
      <div className="flex flex-wrap items-start gap-3 sm:flex-nowrap">
        <div className="relative w-full sm:w-2/3 md:w-3/4 lg:w-4/5">
          {isLoading && products.length > 0 ? (
            <>
              <FeatureCategorySkeleton />
              <FeatureCategorySkeleton />
              <FeatureCategorySkeleton />
            </>
          ) : (
            <FlipMove>
              {tempProducts.map((category, idx) => {
                if (!expand) {
                  if (idx <= 4) {
                    return (
                      <div
                        key={idx}
                        draggable={isCustomizing}
                        onDragStart={() => handleDragStart(idx)}
                        onDragEnter={() => handleDragEnter(idx)}
                        onDragEnd={handleDragEnd}
                        className={`${
                          draggedIndex === idx
                            ? "bg-gray-200"
                            : "hover:bg-gray-50"
                        }`}
                      >
                        <CategoryCards
                          title={category.folder}
                          path={`categories/${category.slug}`}
                          titleSlug={category.slug}
                          subCategory={category.subFolders}
                        />
                      </div>
                    );
                  }
                } else {
                  return (
                    <div
                      key={idx}
                      draggable={isCustomizing} // Only draggable when customizing is enabled
                      onDragStart={() => handleDragStart(idx)}
                      onDragEnter={() => handleDragEnter(idx)}
                      onDragEnd={handleDragEnd}
                      className={`cursor-move rounded-md border bg-white p-4 shadow-md ${
                        draggedIndex === idx
                          ? "bg-gray-200"
                          : "hover:bg-gray-50"
                      }`}
                    >
                      <CategoryCards
                        title={category.folder}
                        path={`categories/${category.slug}`}
                        titleSlug={category.slug}
                        subCategory={category.subFolders}
                      />
                    </div>
                  );
                }
              })}
            </FlipMove>
          )}

          {categories?.length > 5 &&
            (!expand ? (
              <div className="absolute inset-x-0 bottom-0 z-10 flex justify-center bg-gradient-to-t from-white pb-8 pt-40">
                <button
                  className="rounded-full border bg-white"
                  onClick={() => setExpand(!expand)}
                >
                  <img src={DownArrow} alt="" className="h-[50px] w-[50px]" />
                </button>
              </div>
            ) : (
              <div className="relative z-10 flex justify-center bg-gradient-to-t from-white pb-8 pt-5">
                <button
                  className="rounded-full border bg-white"
                  onClick={() => setExpand(!expand)}
                >
                  <img src={UpArrow} alt="" className="h-[50px] w-[50px]" />
                </button>
              </div>
            ))}
        </div>
        <Sidebar />
      </div>
    </div>
  );
}

export default FeatureCategory;
