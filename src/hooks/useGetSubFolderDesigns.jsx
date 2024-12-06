import { useEffect, useState } from "react";
import {
  useFetchGetUploadQuery,
  useLazyFetchGetAllDesignsByFolderSubFolderQuery,
} from "../Redux/api/uploadDesignApiSlice";
import useGetCategory from "./useGetCategory";

const useGetSubFolderDesigns = ({ folderSlug, subFolderSlug }) => {
  const { data: uploadDesigns } = useFetchGetUploadQuery();
  const { categories, isLoading } = useGetCategory();
  const [getAllDesignByFolderSubFolder, { data: allSubFolderdesignsData }] =
    useLazyFetchGetAllDesignsByFolderSubFolderQuery();
  const [subFolderDesigns, setSubFolderDesigns] = useState([]);
  const [subFolderName, setSubFolderName] = useState("");

  useEffect(() => {
    if (categories?.length > 0) {
      const categoryObj = categories?.find((c) => c.slug === folderSlug);
      const subFolderObj = categoryObj?.subFolders?.find(
        (s) => s.subFolderSlug === subFolderSlug,
      );
      const folderName = categoryObj?.folder || "";
      const subfolderName = subFolderObj?.subFolder || "";
      if (folderName && subfolderName) {
        setSubFolderName(subfolderName);
        getAllDesignByFolderSubFolder({
          folderName,
          subFolderName: subfolderName,
        });
      }
    }
  }, [categories, folderSlug, subFolderSlug]);

  useEffect(() => {
    if (uploadDesigns?.length > 0 && allSubFolderdesignsData?.length > 0) {
      const filteredArray = allSubFolderdesignsData
        ?.map((item) => {
          const design = uploadDesigns?.find(
            (f) =>
              f.folder === item.folderName &&
              f.subFolder === item.subFolderName &&
              f.designId === item.designId,
          );

          if (!design) return null; // If no design is found, skip this entry.

          const { id, designId, ...rest } = design || {};
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
      setSubFolderDesigns(filteredArray);
    }
  }, [uploadDesigns, allSubFolderdesignsData]);

  return { subFolderName, subFolderDesigns };
};

export default useGetSubFolderDesigns;
