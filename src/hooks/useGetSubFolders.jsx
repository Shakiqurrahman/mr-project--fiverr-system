import { useEffect, useState } from "react";
import {
  useFetchGetAllSubFoldersByFolderSlugQuery,
  useFetchGetUploadQuery,
  useLazyFetchGetAllDesignsByFolderSubFolderQuery,
} from "../Redux/api/uploadDesignApiSlice";

const useGetSubFolders = ({ slug }) => {
  const { data: uploadDesigns } = useFetchGetUploadQuery();
  const { data: allSubFoldersData } = useFetchGetAllSubFoldersByFolderSlugQuery(
    {
      slug,
    },
  );
  const [getAllDesignByFolderSubFolder] =
    useLazyFetchGetAllDesignsByFolderSubFolderQuery();
  const [subFolders, setSubFolders] = useState([]);
  const [folderObject, setFolderObject] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      if (allSubFoldersData?.subFoldersData?.length > 0) {
        const result = await Promise.all(
          allSubFoldersData?.subFoldersData?.map(async (sub) => {
            const subData = await getAllDesignByFolderSubFolder({
              folderName: sub?.folderName,
              subFolderName: sub?.subFolder,
            });
            return subData;
          }),
        );
        const data = result?.map((i) => {
          if (typeof i === "object" && i?.data && i?.data?.length > 0) {
            // Initialize with the first item in the data array as the starting point
            return i?.data?.reduce((min, current) => {
              // Check if current order is less than the minimum order value
              if (min === undefined || current?.order < min?.order) {
                return current; // Return the whole object, not just the designId
              }
              return min; // Keep the current minimum
            })?.designId; // After reduce, return only the designId
          }
          // If the item is a string, return it as is
          return i;
        });
        const subFoldersWithDesignId = data?.map((item, i) => ({
          designId: item,
          ...allSubFoldersData?.subFoldersData[i],
        }));
        if (uploadDesigns && subFoldersWithDesignId) {
          const filteredArray = subFoldersWithDesignId
            ?.map((item) => {
              const design = uploadDesigns?.find(
                (f) =>
                  f.folder === item.folderName &&
                  f.subFolder === item.subFolder &&
                  f.designId === item.designId,
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
                Object.entries(result).filter(
                  ([_, value]) => value !== undefined,
                ),
              );
            })
            .filter((item) => item !== null);
          const { subFoldersData, ...folderData } = allSubFoldersData;
          setSubFolders(filteredArray);
          setFolderObject(folderData);
        }
      }
    };

    fetchData();
  }, [allSubFoldersData, uploadDesigns, getAllDesignByFolderSubFolder]);

  return { subFolders, folderObject };
};

export default useGetSubFolders;
