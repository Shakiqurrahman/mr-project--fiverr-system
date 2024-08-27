import { useFetchGetUploadQuery } from "../Redux/api/uploadDesignApiSlice";
import { useState, useEffect } from "react";

const useGetFolders = () => {
  const { data: uploadDesigns, error, isLoading } = useFetchGetUploadQuery();
  const [folders, setFolders] = useState([]);

  useEffect(() => {
    if (uploadDesigns) {
      const updatedFolders = (uploadDesigns || [])
        .reduce((acc, design) => {
          const existing = acc.find(item => item.folder === design.folder);
          if (!existing) {
            acc.push({ folder: design.folder, designs: [design] });
          } else {
            existing.designs.push(design);
          }
          return acc;
        }, []);
      
      setFolders(updatedFolders);
    }
  }, [uploadDesigns]);

  // Function to handle reordering of folders
  const handleReorder = (newFolders) => {
    setFolders(newFolders);
  };

  return { folders, error, isLoading, handleReorder };
};

export default useGetFolders;
