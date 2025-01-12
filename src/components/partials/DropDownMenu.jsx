import React from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  useFetchAllDesignKeywordsQuery,
  useFetchAllIndustryKeywordsQuery,
} from "../../Redux/api/uploadDesignApiSlice";

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

  const slicedDesignKeywordsData =
    designKeywordsData?.length > 30
      ? designKeywordsData?.slice(0, 30)
      : designKeywordsData;
  const slicedIndustryKeywordsData =
    industryKeywordsData?.length > 30
      ? industryKeywordsData?.slice(0, 30)
      : industryKeywordsData;
  return (
    <div
      className={`${className} absolute left-0 top-full w-full border-t bg-primary py-6`}
    >
      <div className="flex flex-wrap justify-center gap-4">
        {isDesign && (
          <>
            {slicedDesignKeywordsData?.map((designKeyword, idx) => (
              <button
                key={idx}
                onClick={() => navigate("/designs", { state: designKeyword })}
                className="rounded-[30px] bg-white/20 px-2 py-1 text-sm font-medium text-white duration-300 hover:bg-white hover:text-primary sm:px-4 sm:py-2 sm:text-base"
              >
                {designKeyword}
              </button>
            ))}
            {designKeywordsData?.length > 30 && (
              <button
                onClick={() => navigate("/designs")}
                className="rounded-[30px] bg-white/20 px-2 py-1 text-sm font-medium text-white duration-300 hover:bg-white hover:text-primary sm:px-4 sm:py-2 sm:text-base"
              >
                See More
              </button>
            )}
          </>
        )}
        {isIndustry && (
          <>
            {slicedIndustryKeywordsData?.map((industryKeyword, idx) => (
              <Link
                key={idx}
                to={"/industries"}
                state={industryKeyword}
                className="rounded-[30px] bg-white/20 px-2 py-1 text-sm font-medium text-white duration-300 hover:bg-white hover:text-primary sm:px-4 sm:py-2 sm:text-base"
              >
                {industryKeyword}
              </Link>
            ))}
            {industryKeywordsData?.length > 30 && (
              <Link
                to={"/industries"}
                className="rounded-[30px] bg-white/20 px-2 py-1 text-sm font-medium text-white duration-300 hover:bg-white hover:text-primary sm:px-4 sm:py-2 sm:text-base"
              >
                See More
              </Link>
            )}
          </>
        )}
        {isLoadingIndustry && isLoadingDesign && "Loading..."}
        {errorDesign && errorIndustry && "Something went wrong!"}
      </div>
    </div>
  );
};

export default DropDownMenu;
