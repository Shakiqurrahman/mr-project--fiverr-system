import React from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  useFetchAllDesignKeywordsQuery,
  useFetchAllIndustryKeywordsQuery,
} from "../Redux/api/uploadDesignApiSlice";

const DropDownMenu = ({ className, isDesign, isIndustry }) => {
  const navigate = useNavigate();
  const {
    data: designKeywordsData,
    isLoading: isLoadingDesign,
    error: errorDesign,
  } = useFetchAllDesignKeywordsQuery();
  const {
    data: industryKeywordsData,
    isLoading: isLoadingIndustry,
    error: errorIndustry,
  } = useFetchAllIndustryKeywordsQuery();
  return (
    <div
      className={`${className} absolute left-0 top-[56px] w-full border-t bg-primary py-6`}
    >
      <div className="flex flex-wrap justify-center gap-4">
        {isDesign &&
          designKeywordsData?.map((designKeyword, idx) => (
            <button
              key={idx}
              onClick={() => navigate("/designs", { state: designKeyword })}
              className="rounded-[30px] bg-white/20 px-2 py-1 text-sm font-medium text-white duration-300 hover:bg-white hover:text-primary sm:px-4 sm:py-2 sm:text-base"
            >
              {designKeyword}
            </button>
          ))}
        {isIndustry &&
          industryKeywordsData?.map((industryKeyword, idx) => (
            <Link
              key={idx}
              to={"/industries"}
              state={industryKeyword}
              className="rounded-[30px] bg-white/20 px-2 py-1 text-sm font-medium text-white duration-300 hover:bg-white hover:text-primary sm:px-4 sm:py-2 sm:text-base"
            >
              {industryKeyword}
            </Link>
          ))}
        {isLoadingIndustry && isLoadingDesign && "Loading..."}
        {errorDesign && errorIndustry && "Something went wrong!"}
      </div>
    </div>
  );
};

export default DropDownMenu;
