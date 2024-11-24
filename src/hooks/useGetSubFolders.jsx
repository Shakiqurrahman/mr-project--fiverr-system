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
      const filteredArray = allSubFoldersData?.subFoldersData?.map((item) => {
        const design = uploadDesigns?.find(
          (f) => f.folderName === item.folder && f.subFolder === item.subFolder,
        );
        const { id, ...rest } = design;
        return {
          ...item,
          ...rest,
          designDB: id,
        };
      });
      const { subFoldersData, ...folderData } = allSubFoldersData;
      setSubFolders(filteredArray);
      setFolderObject(folderData);
    }
  }, [uploadDesigns, allSubFoldersData]);

  return { subFolders, folderObject };
};

export default useGetSubFolders;
