import { useEffect, useState } from "react";
import { useFetchGetUploadQuery } from "../Redux/api/uploadDesignApiSlice";

const useGetCategory = () => {
  const { data: uploadDesigns, error, isLoading } = useFetchGetUploadQuery();
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    if (uploadDesigns) {
      // Process the designs to organize into folders and subfolders
      const processedFolders = uploadDesigns.reduce((acc, design) => {
        // Find or create the folder
        let folder = acc.find((item) => item.folder === design.folder);
        if (!folder) {
          folder = { folder: design.folder, subFolders: [] };
          acc.unshift(folder);
        }

        // Find or create the subfolder
        let subFolder = folder.subFolders.find(
          (item) => item.subFolder === design.subFolder,
        );
        if (!subFolder) {
          subFolder = { subFolder: design.subFolder, designs: [] };
          folder.subFolders.unshift(subFolder);
        }

        // Add the design to the appropriate subfolder
        if (!subFolder.designs.find((d) => d.id === design.id)) {
          subFolder.designs.unshift(design);
        }

        return acc;
      }, []);

      setCategories(processedFolders);
    }
  }, [uploadDesigns]);

  // Function to handle reordering of folders
  const handleReorder = (newFolders) => {
    setCategories(newFolders);
  };

  return { categories, error, isLoading, handleReorder };
};

export default useGetCategory;
