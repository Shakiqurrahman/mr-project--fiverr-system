import axios from "axios";
import { useEffect, useState } from "react";
import { configApi } from "../libs/configApi";
import { useFetchGetUploadQuery } from "../Redux/api/uploadDesignApiSlice";

const useGetSubFolders = () => {
  const { data: uploadDesigns, error, loading } = useFetchGetUploadQuery();
  const [categories, setCategories] = useState([]);

  const [sub, setSub] = useState(null);

  useEffect(() => {
    const response = async () => {
      try {
        const res = await axios.get(`${configApi.api}/upload/sub-folder`, {
          folderSlug: "flyer-design",
        });
        setSub(res.data.data);
      } catch (error) {
        console.log(error);
      }
    };
    response();
  }, []);

  console.log("sub", sub);

  useEffect(() => {
    // if (subFolders && uploadDesigns) {
    //   // Initialize folders with empty subfolders and designs
    //   const processedSubFolders = subFolders.map((subFolder) => ({
    //     id: subFolder.id,
    //     slug: subFolder.slug,
    //     folder: subFolder.folder,
    //     order: subFolder.order,
    //     subFolders: [], // Initialize subFolders
    //   }));
    //   console.log(processedSubFolders);
    //   console.log("SubFolders", subFolders);
    // Process designs to populate folders and subfolders
    // uploadDesigns.forEach((design) => {
    //   // Find or create the folder
    //   let subFolder = processedSubFolders.find(
    //     (item) => item.subFolder === design.subFolder,
    //   );
    //   if (!folder) {
    //     folder = {
    //       id: design.folderId, // Use a unique identifier if available
    //       slug: design.folderSlug, // Assuming this is available in the design data
    //       folder: design.folder,
    //       order: 0, // Default order, or assign based on your needs
    //       subFolders: [],
    //     };
    //     processedFolders.push(folder);
    //   }
    //   // Find or create the subfolder
    //   let subFolder = folder.subFolders.find(
    //     (item) => item.subFolder === design.subFolder,
    //   );
    //   if (!subFolder) {
    //     subFolder = {
    //       subFolder: design.subFolder,
    //       slug: design.subFolder.split(" ").join("-").toLowerCase(), // Assuming this is available in the design data
    //       designs: [],
    //     };
    //     folder.subFolders.push(subFolder);
    //   }
    //   // Add the design to the appropriate subfolder
    //   if (!subFolder.designs.find((d) => d.id === design.id)) {
    //     subFolder.designs.push(design);
    //   }
    // });
    // setCategories(processedSubFolders);
    // }
  }, []);

  return { categories, error, loading };
};

export default useGetSubFolders;
