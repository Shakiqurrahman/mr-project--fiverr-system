import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useLocation, useNavigate } from "react-router-dom";
import { useUpdateAllSubFoldersByFolderSlugMutation } from "../Redux/api/uploadDesignApiSlice";

const DragAndDropSubFolders = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  const [updateSubFoldersOrdering] =
    useUpdateAllSubFoldersByFolderSlugMutation();

  const [subFolders, setSubFolders] = useState([]);
  const [draggedIndex, setDraggedIndex] = useState(null);
  const [isCustomizing, setIsCustomizing] = useState(true);

  //   const [tempProducts, setTempProducts] = useState([]);

  useEffect(() => {
    if (state?.subFolders) {
      const sortSubFolders = state?.subFolders?.sort(
        (a, b) => a.order - b.order,
      );
      setSubFolders(sortSubFolders);
    }
  }, [state?.subFolders]);

  const handleDragStart = (index) => {
    setDraggedIndex(index);
  };

  const handleDragEnter = (index) => {
    if (index !== draggedIndex) {
      const updatedProducts = [...subFolders];
      const draggedProduct = updatedProducts[draggedIndex];
      updatedProducts.splice(draggedIndex, 1);
      updatedProducts.splice(index, 0, draggedProduct);
      setSubFolders(updatedProducts);
      setDraggedIndex(index);
    }
  };

  const handleDragEnd = () => {
    setDraggedIndex(null);
  };

  const handleSave = async () => {
    setSubFolders(subFolders); // Save the reordered products
    try {
      const data = {
        newOrder: subFolders,
      };
      const response = await updateSubFoldersOrdering(data).unwrap();
      if (response.success) {
        toast.success("Updated Successfully!");
        navigate(-1);
      }
    } catch (error) {
      toast.error("Update Failed!");
    }
  };

  const handleCancel = () => {
    setSubFolders([...subFolders]); // Reset to original order
    navigate(-1);
  };

  // pagination
  const designsPerPage = 20;
  const totalDesigns = subFolders?.length;
  const totalPages = Math.ceil(totalDesigns / designsPerPage);

  // Create a structure of paginated designs
  const paginatedDesigns = Array.from({ length: totalPages }, (_, index) => {
    const startIndex = index * designsPerPage;
    const endIndex = startIndex + designsPerPage;
    return subFolders?.slice(startIndex, endIndex);
  });

  return (
    <div className="max-width my-10">
      <div className="mb-5 flex items-center gap-5">
        <button
          className="rounded-[30px] bg-primary px-5 py-2 text-lg font-medium text-white"
          onClick={handleSave}
        >
          Save
        </button>
        <button
          className="rounded-[30px] bg-revision px-5 py-2 text-lg font-medium text-white"
          onClick={handleCancel}
        >
          Cancel
        </button>
      </div>
      {subFolders?.length > 0 && (
        <>
          {paginatedDesigns?.map((pageDesigns, pageIndex) => (
            <div key={pageIndex}>
              <div className="grid grid-cols-2 gap-5 md:grid-cols-3 lg:grid-cols-4">
                {pageDesigns?.map((subfolder, index) => {
                  const thumbnail = subfolder?.images?.find(
                    (img) => img?.thumbnail === true,
                  ).url;
                  return (
                    <div
                      key={index}
                      className="w-full border bg-white"
                      draggable={isCustomizing}
                      onDragStart={() => handleDragStart(index)}
                      onDragEnter={() => handleDragEnter(index)}
                      onDragEnd={handleDragEnd}
                    >
                      <img src={thumbnail} alt="" />
                      <h1 className="line-clamp-2 px-3 py-2 text-sm sm:text-base">
                        {subfolder?.subFolder}
                      </h1>
                    </div>
                  );
                })}
              </div>
              <p className="my-5 bg-lightcream py-5 text-center font-semibold">
                Page {pageIndex + 1} of {totalPages}
              </p>
            </div>
          ))}
        </>
      )}
    </div>
  );
};

export default DragAndDropSubFolders;
