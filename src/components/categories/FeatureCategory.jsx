import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { ImSpinner9 } from "react-icons/im";
import { IoMdClose } from "react-icons/io";
import { useSelector } from "react-redux";
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

  const isAuthorized = ["ADMIN", "SUPER_ADMIN"].includes(user?.role);

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
      {isAuthorized && (
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
          {isLoading ? (
            <div className="pt-40">
              <ImSpinner9 className="mx-auto animate-spin text-4xl text-primary" />
            </div>
          ) : (
            <>
              <div>
                {tempProducts.map((category, idx) => {
                  if (!expand) {
                    if (idx <= 3) {
                      return (
                        <div
                          key={idx}
                          draggable={isCustomizing}
                          onDragStart={() => handleDragStart(idx)}
                          onDragEnter={() => handleDragEnter(idx)}
                          onDragEnd={handleDragEnd}
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
              </div>

              {categories?.length > 4 &&
                (!expand ? (
                  <div className="absolute inset-x-0 bottom-0 z-10 flex justify-center bg-gradient-to-t from-white pb-8 pt-40">
                    <button
                      className="rounded-full border bg-white"
                      onClick={() => setExpand(!expand)}
                    >
                      <img
                        src={DownArrow}
                        alt=""
                        className="h-[50px] w-[50px]"
                      />
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
            </>
          )}
        </div>
        <Sidebar />
      </div>
    </div>
  );
}

export default FeatureCategory;
