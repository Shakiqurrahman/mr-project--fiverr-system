import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useFetchGetUploadQuery } from "../Redux/api/uploadDesignApiSlice";
import { syncCartWithDesigns } from "../Redux/features/cartSlice";

const useSyncCart = () => {
  const dispatch = useDispatch();
  const { data: allDesigns, isLoading, error } = useFetchGetUploadQuery();

  useEffect(() => {
    if (allDesigns && !isLoading && !error) {
      dispatch(syncCartWithDesigns(allDesigns));
    }
  }, [allDesigns, isLoading, error, dispatch]);
};

export default useSyncCart;
