import ProjectCard from "../components/categories/ProjectCard";

import Pagination from "@mui/material/Pagination";
import PaginationItem from "@mui/material/PaginationItem";
import Stack from "@mui/material/Stack";
import { useEffect, useState } from "react";
import prevBtn from "../assets/images/icons/Left Arrow.svg";
import nextBtn from "../assets/images/icons/Right Arrow.svg";
import ButtonPrimary from "../components/ButtonPrimary";
import ButtonSecondary from "../components/ButtonSecondary";
import Divider from "../components/Divider";
import SortDropdown from "../components/SortDropdown";
import {
  useFetchAllDesignKeywordsQuery,
  useFetchAllIndustryKeywordsQuery,
  useFetchDesignByKeyQuery,
  useFetchGetUploadQuery,
} from "../Redux/api/uploadDesignApiSlice";

function Designs() {
  const { data: designKeyWordsData } = useFetchAllDesignKeywordsQuery();
  const { data: industryKeyWordsData } = useFetchAllIndustryKeywordsQuery();
  const { data: designsData, isLoading } = useFetchGetUploadQuery();

  const [designs, setDesigns] = useState([]);
  const [designKeywords, setDesignKeywords] = useState([]);
  const [industryKeywords, setIndustryKeywords] = useState([]);

  const [selectedValue, setSelectedValue] = useState(null);
  const [industrySelectedValue, setIndustrySelectedValue] = useState(null);
  const { data: filterData } = useFetchDesignByKeyQuery(selectedValue, {
    skip: !selectedValue,
  });

  useEffect(() => {
    if (designsData) {
      setDesigns(designsData);
    }
    if (filterData) {
      setDesigns(filterData);
    }
    if (designKeyWordsData) {
      setDesignKeywords(designKeyWordsData);
    }
    if (industryKeyWordsData) {
      setIndustryKeywords(industryKeyWordsData);
    }
  }, [designsData, designKeyWordsData, industryKeyWordsData, filterData]);

  // setDesigns(filterData);
  console.log("filter", filterData);

  // const QueryData = (design, industry) => {
  //   if (design && !industry) {
  //     const response = fetchDesignByKey(design);
  //     console.log("resss", response);
  //   }
  // };

  const handleDesignClick = (value) => {
    setSelectedValue(value === selectedValue ? null : value);
    // QueryData(value);
  };

  const handleIndustryClick = (value) => {
    setIndustrySelectedValue(value === industrySelectedValue ? null : value);
  };

  const sortingOptions = [
    "Default Designs",
    "Newest Designs",
    "Oldest Designs",
  ];

  useEffect(() => {
    if (designs) {
      const response = designKeyWordsData?.map((key) => {
        const returnData = designs?.filter((design) =>
          design?.designs?.includes(key),
        );
        return {
          name: key,
          quantity: returnData.length,
        };
      });
      setDesignKeywords(response);
    }

    if (designs) {
      const response = industryKeyWordsData?.map((key) => {
        const returnData = designs?.filter((design) =>
          design?.industrys?.includes(key),
        );
        return {
          name: key,
          quantity: returnData.length,
        };
      });
      setIndustryKeywords(response);
    }
  }, [designKeyWordsData, designs, industryKeyWordsData]);

  const handleSortChange = (option) => {
    // console.log("Selected sorting option:", option);
    // Implement sorting logic here
  };

  return (
    <>
      <div className="max-width">
        <h1 className="my-10 text-center text-lg font-bold sm:text-2xl md:text-3xl">
          You select the design and industry of your need.{" "}
          <br className="hidden md:block" /> And see your selected items below.
        </h1>
        <div className="flex flex-wrap gap-3">
          {designKeywords?.map((btn) => (
            <ButtonPrimary
              key={Math.random()}
              items={btn.quantity}
              selectedValue={selectedValue}
              value={btn.name}
              onClick={() => handleDesignClick(btn.name)}
            >
              {btn.name}
            </ButtonPrimary>
          ))}
        </div>
        <Divider className={"my-10 h-px w-full !bg-primary"} />
        <div className="flex flex-wrap gap-3">
          {industryKeywords?.map((btn) => (
            <ButtonSecondary
              key={Math.random()}
              items={btn.quantity}
              industrySelectedValue={industrySelectedValue}
              value={btn.name}
              onClick={() => handleIndustryClick(btn.name)}
            >
              {btn.name}
            </ButtonSecondary>
          ))}
        </div>
        <div className="my-10 text-end">
          <SortDropdown
            options={sortingOptions}
            onSortChange={handleSortChange}
          />
        </div>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {designs?.map((design, idx) => {
            const thumbnail = design.images.find((i) => i.thumbnail);
            return (
              <ProjectCard
                cart={true}
                key={idx}
                thumbnail={thumbnail.url}
                thumbnailName={thumbnail.name}
                title={design.title}
                slug={`/design/${design.designId}`}
              />
            );
          })}
        </div>

        <div className="mt-10 flex justify-center">
          <Stack spacing={2}>
            <Pagination
              count={10}
              renderItem={(item) => (
                <PaginationItem
                  slots={{ previous: prevBtnIcon, next: nextBtnIcon }}
                  {...item}
                />
              )}
            />
          </Stack>
        </div>
      </div>
    </>
  );
}

const prevBtnIcon = () => {
  return <img src={prevBtn} alt="" className="h-8 w-8 rounded-full" />;
};
const nextBtnIcon = () => {
  return <img src={nextBtn} alt="" className="h-8 w-8 rounded-full" />;
};

export default Designs;
