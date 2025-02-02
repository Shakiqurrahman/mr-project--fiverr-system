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
  const [draggedItem, setDraggedItem] = useState(null);
  const [isCustomizing, setIsCustomizing] = useState(true);

  // Load initial data (subfolders) from state
  useEffect(() => {
    if (state?.subFolders) {
      const sortedSubFolders = state?.subFolders?.sort(
        (a, b) => a.order - b.order,
      );
      setSubFolders(sortedSubFolders);
    }
  }, [state?.subFolders]);

  // Handle drag start
  const handleDragStart = (index) => {
    setDraggedIndex(index);
    setDraggedItem(subFolders[index]); // Store the item being dragged
  };

  // Handle when dragged item enters a new position
  const handleDragEnter = (index) => {
    if (draggedIndex !== index) {
      const updatedSubFolders = [...subFolders];
      updatedSubFolders.splice(draggedIndex, 1); // Remove from old position
      updatedSubFolders.splice(index, 0, draggedItem); // Insert at new position
      setSubFolders(updatedSubFolders); // Update the order of subfolders
      setDraggedIndex(index); // Update the dragged index
    }
  };

  // Handle drag end (reset dragged state)
  const handleDragEnd = () => {
    setDraggedIndex(null);
    setDraggedItem(null);
  };

  // Save new order
  const handleSave = async () => {
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

  // Cancel changes and reset order
  const handleCancel = () => {
    setSubFolders([...subFolders]);
    navigate(-1);
  };

  const handleDragOver = (event) => {
    event.preventDefault(); // Allow dragging over event
  };

  // Pagination logic
  const designsPerPage = 20; // Number of items per page
  const totalDesigns = subFolders?.length; // Total number of items
  const totalPages = Math.ceil(totalDesigns / designsPerPage); // Total pages based on designsPerPage

  // Create structure for paginated designs
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
            <div key={pageIndex} onDragOver={handleDragOver}>
              <div className="grid grid-cols-2 gap-5 md:grid-cols-3 lg:grid-cols-4">
                {pageDesigns?.map((subfolder, index) => {
                  const thumbnail = subfolder?.images?.find(
                    (img) => img?.thumbnail === true,
                  )?.url;

                  // Determine the correct index in the global list after pagination
                  const globalIndex = pageIndex * designsPerPage + index;

                  return (
                    <div
                      key={index}
                      className="w-full border bg-white"
                      draggable={isCustomizing}
                      onDragStart={() => handleDragStart(globalIndex)}
                      onDragEnter={() => handleDragEnter(globalIndex)}
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
