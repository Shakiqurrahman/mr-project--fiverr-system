import { Link } from "react-router-dom";
import {
  useFetchAllDesignKeywordsQuery,
  useFetchAllIndustryKeywordsQuery,
} from "../Redux/api/uploadDesignApiSlice";
import Divider from "./Divider";

function HomeKeywords() {
  const { data: designKeywordsData } = useFetchAllDesignKeywordsQuery();
  const { data: industryKeywordsData } = useFetchAllIndustryKeywordsQuery();

  return (
    <>
      <div className="max-width mt-10">
        <div className="flex flex-wrap gap-3">
          {designKeywordsData?.slice(0, 12).map((value, i) => (
            <Link
              key={i}
              to={"/designs"}
              state={value}
              className="rounded-[30px] bg-[#edf7fd] px-2 py-1 text-sm font-medium duration-300 hover:bg-primary hover:text-white sm:px-4 sm:py-2 sm:text-base"
            >
              {value}
            </Link>
          ))}
          {designKeywordsData?.length >= 12 && (
            <Link
              to={"/designs"}
              className="rounded-[30px] bg-[#edf7fd] px-2 py-1 text-sm font-medium duration-300 hover:bg-primary hover:text-white sm:px-4 sm:py-2 sm:text-base"
            >
              See More
            </Link>
          )}
        </div>
      </div>
      <Divider className={"my-8 h-px w-full !bg-primary"} />
      <div className="max-width">
        <div className="flex flex-wrap gap-3">
          {industryKeywordsData?.slice(0, 12).map((value, i) => (
            <Link
              key={i}
              to={"/industries"}
              state={value}
              className="rounded-[30px] bg-[#ffefef] px-2 py-1 text-sm font-medium duration-300 hover:bg-secondary hover:text-white sm:px-4 sm:py-2 sm:text-base"
            >
              {value}
            </Link>
          ))}
          {industryKeywordsData?.length >= 12 && (
            <Link
              to={"/industries"}
              className="rounded-[30px] bg-[#ffefef] px-2 py-1 text-sm font-medium duration-300 hover:bg-secondary hover:text-white sm:px-4 sm:py-2 sm:text-base"
            >
              See More
            </Link>
          )}
        </div>
      </div>
    </>
  );
}

export default HomeKeywords;
