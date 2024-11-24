import React, { useState } from "react";
import toast from "react-hot-toast";
import { useLocation, useNavigate } from "react-router-dom";
import { useUpdateAllSubFoldersByFolderSlugMutation } from "../Redux/api/uploadDesignApiSlice";

const DragAndDropSubFolders = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  const [updateSubFoldersOrdering] =
    useUpdateAllSubFoldersByFolderSlugMutation();

  const [subFolders, setSubFolders] = useState(state?.subFolders || []);
  const [draggedIndex, setDraggedIndex] = useState(null);
  const [isCustomizing, setIsCustomizing] = useState(true);
  //   const [tempProducts, setTempProducts] = useState([]);

  const folderObject = state?.folderObject;

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
    // setIsCustomizing(false);
    const newArr = subFolders.map((folder) => ({ id: folder.id }));
    try {
      const data = {};
      const response = await updateSubFoldersOrdering();
      if (response.status === 200) {
        toast.success("Updated Successfully!");
      }
    } catch (error) {
      toast.error("Update Failed!");
    }
  };

  const handleCancel = () => {
    setSubFolders([...subFolders]); // Reset to original order
    // setIsCustomizing(false);
    navigate(-1);
  };

  console.log(subFolders);
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
        <div className="grid grid-cols-4 gap-5">
          {subFolders?.map((subfolder, index) => {
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
                <h1 className="line-clamp-2 px-3 py-2">
                  {subfolder?.subFolder}
                </h1>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default DragAndDropSubFolders;
