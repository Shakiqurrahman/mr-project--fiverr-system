import axios from "axios";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { configApi } from "../libs/configApi";

const useSaveAffiliate = () => {
  useEffect(() => {
    if (typeof window !== "undefined" && window.location.search) {
      const params = new URLSearchParams(window.location.search);
      const affQuery = [...params].find(([key]) => key.startsWith("aff-"))?.[0];

      if (affQuery) {
        const savedAffQuery = localStorage.getItem("aff-query");

        if (savedAffQuery !== affQuery) {
          // Save in sessionStorage
          localStorage.setItem("aff-query", affQuery);
          axios
            .put(`${configApi.api}affiliate/update?link=${affQuery}`)
            .then((response) => {})
            .catch((err) => {
              toast.error("Something went wrong!");
            });
        }
      }
    }
  }, []);
};

export default useSaveAffiliate;
