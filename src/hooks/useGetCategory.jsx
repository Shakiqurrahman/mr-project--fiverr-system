import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import {
  useFetchGetAllFoldersQuery,
  useFetchGetUploadQuery,
  useLazyFetchGetAllDesignsByFolderSubFolderQuery,
  useLazyFetchGetAllSubFoldersByFolderSlugQuery,
} from "../Redux/api/uploadDesignApiSlice";

const useGetCategory = () => {
  const { data: uploadDesigns, error } = useFetchGetUploadQuery();
  const { data: folders } = useFetchGetAllFoldersQuery();
  const [getAllSubFoldersData] =
    useLazyFetchGetAllSubFoldersByFolderSlugQuery();
  const [getAllDesignByFolderSubFolder] =
    useLazyFetchGetAllDesignsByFolderSubFolderQuery();

  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchSubFoldersData = async () => {
      if (folders) {
        try {
          setIsLoading(true);
          const subFoldersDataResult = await Promise.all(
            folders.map((f) => getAllSubFoldersData({ slug: f.slug })),
          );
          const subFoldersData = subFoldersDataResult?.map((d) => {
            const subfolders = d?.data?.subFoldersData;
            return [...subfolders]?.sort((a, b) => a?.order - b?.order);
          });
          const resultOfSubFolderDesign = await Promise.all(
            subFoldersData?.map(async (subArr, index) => {
              try {
                const resolvedData = await Promise.all(
                  subArr?.map((s, innerIndex) => {
                    return getAllDesignByFolderSubFolder({
                      folderName: s.folderName,
                      subFolderName: s.subFolder,
                    });
                  }),
                );

                const resolvedDataArr = resolvedData?.map((i) => {
                  if (typeof i === "object" && i?.data && i?.data.length > 0) {
                    return i?.data?.reduce((min, current) => {
                      if (min === undefined || current?.order < min?.order) {
                        return current;
                      }
                      return min;
                    });
                  }
                  return i;
                });

                return resolvedDataArr;
              } catch (error) {
                // console.error(`Error processing subArr ${index}:`, error); // Catch and log any error
                return []; // Return an empty array in case of error
              }
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
            setIsLoading(false);
          }
        } catch (error) {
          toast.error("Something Want Wrong!");
        }
      }
    };

    fetchSubFoldersData();
  }, [
    folders,
    uploadDesigns,
    getAllDesignByFolderSubFolder,
    getAllSubFoldersData,
  ]);

  return { categories, error, isLoading };
};

export default useGetCategory;
