import { useEffect, useState } from "react";
import {
  useFetchGetAllFoldersQuery,
  useFetchGetUploadQuery,
} from "../Redux/api/uploadDesignApiSlice";

const useGetCategory = () => {
  const { data: uploadDesigns, error, isLoading } = useFetchGetUploadQuery();
  const { data: folders } = useFetchGetAllFoldersQuery();
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    if (folders && uploadDesigns) {
      // Initialize folders with empty subfolders and designs
      const processedFolders = folders.map((folder) => ({
        id: folder.id,
        slug: folder.slug,
        folder: folder.folder,
        order: folder.order,
        subFolders: [], // Initialize subFolders
      }));

      // Process designs to populate folders and subfolders
      uploadDesigns.forEach((design) => {
        // Find or create the folder
        let folder = processedFolders.find(
          (item) => item.folder === design.folder,
        );
        if (!folder) {
          folder = {
            id: design.folderId, // Use a unique identifier if available
            slug: design.folderSlug, // Assuming this is available in the design data
            folder: design.folder,
            order: 0, // Default order, or assign based on your needs
            subFolders: [],
          };
          processedFolders.push(folder);
        }

        // Find or create the subfolder
        let subFolder = folder.subFolders.find(
          (item) => item.subFolder === design.subFolder,
        );
        if (!subFolder) {
          subFolder = {
            subFolder: design.subFolder,
            slug: design.subFolder.split(' ').join("-").toLowerCase(), // Assuming this is available in the design data
            designs: [],
          };
          folder.subFolders.push(subFolder);
        }

        // Add the design to the appropriate subfolder
        if (!subFolder.designs.find((d) => d.id === design.id)) {
          subFolder.designs.push(design);
        }
      });

      setCategories(processedFolders);
    }
  }, [folders, uploadDesigns]);

  return { categories, error, isLoading };
};

export default useGetCategory;
