import React, { useEffect, useState } from "react";
import {
  useFetchGetAllFoldersQuery,
  useFetchGetUploadQuery,
  useLazyFetchGetAllDesignsByFolderSubFolderQuery,
  useLazyFetchGetAllSubFoldersByFolderSlugQuery,
} from "../Redux/api/uploadDesignApiSlice";

const useGetCategory = () => {
  const { data: uploadDesigns, error, loading } = useFetchGetUploadQuery();
  const { data: folders } = useFetchGetAllFoldersQuery();
  const [getAllSubFoldersData] =
    useLazyFetchGetAllSubFoldersByFolderSlugQuery();
  const [getAllDesignByFolderSubFolder] =
    useLazyFetchGetAllDesignsByFolderSubFolderQuery();

  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchSubFoldersData = async () => {
      if (folders) {
        try {
          const subFoldersDataResult = await Promise.all(
            folders.map((f) => getAllSubFoldersData({ slug: f.slug })),
          );
          const subFoldersData = subFoldersDataResult?.map((d) => {
            const subfolders = d?.data?.subFoldersData;
            return [...subfolders]?.sort((a, b) => a?.order - b?.order);
          });
          const resultOfSubFolderDesign = await Promise.all(
            subFoldersData?.map(async (subArr) => {
              const resolvedData = await Promise.all(
                subArr?.map((s) =>
                  getAllDesignByFolderSubFolder({
                    folderName: s.folderName,
                    subFolderName: s.subFolder,
                  }),
                ),
              );
              const resolvedDataArr = resolvedData?.map((i) => {
                if (typeof i === "object" && i?.data) {
                  // Initialize with the first item in the data array as the starting point
                  return i?.data?.reduce((min, current) => {
                    // Check if current order is less than the minimum order value
                    if (min === undefined || current?.order < min?.order) {
                      return current; // Return the whole object, not just the designId
                    }
                    return min; // Keep the current minimum
                  }); // After reduce, return only the designId
                }
                // If the item is a string, return it as is
                return i;
              });
              return resolvedDataArr;
            }),
          );

          if (uploadDesigns && resultOfSubFolderDesign) {
            const resultOfSubFolderDesignsData = resultOfSubFolderDesign?.map(
              (subArr) => {
                const filteredArray = subArr
                  ?.map((item) => {
                    const design = uploadDesigns?.find(
                      (f) =>
                        f.folder === item.folderName &&
                        f.subFolder === item.subFolderName &&
                        f.designId === item.designId,
                    );

                    if (!design) return null; // If no design is found, skip this entry.

                    const { id, ...rest } = design || {};
                    const result = {
                      ...item,
                      ...rest,
                      designDB: id,
                      folderSlug: rest?.folder
                        ?.split(" ")
                        ?.join("-")
                        ?.toLowerCase(),
                      subFolderSlug: rest?.subFolder
                        ?.split(" ")
                        ?.join("-")
                        ?.toLowerCase(),
                    };

                    // Remove keys with undefined values
                    return Object.fromEntries(
                      Object.entries(result).filter(
                        ([_, value]) => value !== undefined,
                      ),
                    );
                  })
                  .filter((item) => item !== null);
                return filteredArray;
              },
            );
            const finalArray = folders?.map((item, i) => ({
              ...item,
              subFolders: resultOfSubFolderDesignsData[i],
            }));
            setCategories(finalArray);
          }
        } catch (error) {
          console.error("Error fetching subfolders data:", error);
        }
      }
    };

    fetchSubFoldersData();
  }, [folders, uploadDesigns]);

  return { categories, error, loading };
};

export default React.memo(useGetCategory);
