import { useEffect, useState } from "react";
import {
  useFetchGetAllSubFoldersByFolderSlugQuery,
  useFetchGetUploadQuery,
} from "../Redux/api/uploadDesignApiSlice";

const useGetSubFolders = ({ slug }) => {
  const { data: uploadDesigns } = useFetchGetUploadQuery();
  const { data: allSubFoldersData } = useFetchGetAllSubFoldersByFolderSlugQuery(
    {
      slug,
    },
  );
  const [subFolders, setSubFolders] = useState([]);
  const [folderObject, setFolderObject] = useState({});

  useEffect(() => {
    if (uploadDesigns && allSubFoldersData?.subFoldersData) {
      const filteredArray = allSubFoldersData?.subFoldersData
        ?.map((item) => {
          const design = uploadDesigns?.find(
            (f) =>
              f.folder === item.folderName && f.subFolder === item.subFolder,
          );

          if (!design) return null; // If no design is found, skip this entry.

          const { id, ...rest } = design || {};
          const result = {
            ...item,
            ...rest,
            designDB: id,
          };

          // Remove keys with undefined values
          return Object.fromEntries(
            Object.entries(result).filter(([_, value]) => value !== undefined),
          );
        })
        .filter((item) => item !== null);
      const { subFoldersData, ...folderData } = allSubFoldersData;
      setSubFolders(filteredArray);
      setFolderObject(folderData);
    }
  }, [uploadDesigns, allSubFoldersData]);

  return { subFolders, folderObject };
};

export default useGetSubFolders;
