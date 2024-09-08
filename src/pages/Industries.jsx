import ProjectCard from "../components/categories/ProjectCard";

import Pagination from "@mui/material/Pagination";
import PaginationItem from "@mui/material/PaginationItem";
import Stack from "@mui/material/Stack";
import { useCallback, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import {
  useFetchAllDesignKeywordsQuery,
  useFetchAllIndustryKeywordsQuery,
  useFetchDesignByKeyQuery,
  useFetchDesignNdIndustryByKeyQuery,
  useFetchGetUploadQuery,
  useFetchIndustryByKeyQuery,
} from "../Redux/api/uploadDesignApiSlice";
import prevBtn from "../assets/images/icons/Left Arrow.svg";
import nextBtn from "../assets/images/icons/Right Arrow.svg";
import ButtonPrimary from "../components/ButtonPrimary";
import ButtonSecondary from "../components/ButtonSecondary";
import Divider from "../components/Divider";
import SortDropdown from "../components/SortDropdown";

function Industries() {
  const { state } = useLocation();
  const { data: designKeyWordsData } = useFetchAllDesignKeywordsQuery();
  const { data: industryKeyWordsData } = useFetchAllIndustryKeywordsQuery();
  const { data: designsData } = useFetchGetUploadQuery();

  const [designs, setDesigns] = useState([]);
  const [designKeywords, setDesignKeywords] = useState([]);
  const [industryKeywords, setIndustryKeywords] = useState([]);

  const [selectedValue, setSelectedValue] = useState(null);
  const [industrySelectedValue, setIndustrySelectedValue] = useState(
    state || null,
  );
  const { data: filterDesignData } = useFetchDesignByKeyQuery(selectedValue, {
    skip: !selectedValue,
  });
  const { data: filterIndustryData } = useFetchIndustryByKeyQuery(
    industrySelectedValue,
    {
      skip: !industrySelectedValue,
    },
  );
  const { data: filterBothData } = useFetchDesignNdIndustryByKeyQuery(
    {
      dKey: selectedValue,
      iKey: industrySelectedValue,
    },
    {
      skip: !selectedValue && !industrySelectedValue,
    },
  );

  console.log("filtered", filterBothData);

  useEffect(() => {
    if (!designsData) return; // Return early if no designs data is available

    // Check if both design and industry keywords are selected
    if (selectedValue && industrySelectedValue) {
      // updateKeywordsData(filterBothData, designKeyWordsData, industryKeyWordsData);
      setDesigns(filterBothData);
    }
    // Check if only design keyword is selected
    else if (filterDesignData && selectedValue) {
      const updatedDesignKeywords = designKeyWordsData?.map((key) => ({
        name: key,
        quantity: designsData?.filter((design) =>
          design?.designs?.includes(key),
        ).length,
      }));
      setDesignKeywords(updatedDesignKeywords);
      const updatedIndustryKeywords = industryKeyWordsData?.map((key) => ({
        name: key,
        quantity: filterDesignData?.filter((design) =>
          design?.industrys?.includes(key),
        ).length,
      }));
      setIndustryKeywords(updatedIndustryKeywords);
      setDesigns(filterDesignData);
    }
    // Check if only industry keyword is selected
    else if (filterIndustryData && industrySelectedValue) {
      const updatedDesignKeywords = designKeyWordsData?.map((key) => ({
        name: key,
        quantity: filterIndustryData?.filter((design) =>
          design?.designs?.includes(key),
        ).length,
      }));
      setDesignKeywords(updatedDesignKeywords);

      const updatedIndustryKeywords = industryKeyWordsData?.map((key) => ({
        name: key,
        quantity: designsData?.filter((design) =>
          design?.industrys?.includes(key),
        ).length,
      }));
      setIndustryKeywords(updatedIndustryKeywords);
      setDesigns(filterIndustryData);
    }
    // Default case: no keywords selected, set original designs and update keywords
    else {
      setDesigns(designsData);
      const updatedDesignKeywords = designKeyWordsData?.map((key) => ({
        name: key,
        quantity: designsData?.filter((design) =>
          design?.designs?.includes(key),
        ).length,
      }));
      setDesignKeywords(updatedDesignKeywords);
      const updatedIndustryKeywords = industryKeyWordsData?.map((key) => ({
        name: key,
        quantity: designsData?.filter((design) =>
          design?.industrys?.includes(key),
        ).length,
      }));
      setIndustryKeywords(updatedIndustryKeywords);
    }
  }, [
    designsData,
    filterDesignData,
    filterIndustryData,
    filterBothData,
    industrySelectedValue,
    selectedValue,
    designKeyWordsData,
    industryKeyWordsData,
  ]);

  const handleDesignClick = useCallback((value) => {
    setSelectedValue((prev) => (prev === value ? null : value));
  }, []);

  const handleIndustryClick = useCallback((value) => {
    setIndustrySelectedValue((prev) => (prev === value ? null : value));
  }, []);

  const sortingOptions = [
    "Default Designs",
    "Newest Designs",
    "Oldest Designs",
  ];

  const handleSortChange = (option) => {
    // console.log("Selected sorting option:", option);
    // Implement sorting logic here
  };

  return (
    <>
      <div className="max-width">
        <h1 className="my-10 text-center text-lg font-bold sm:text-2xl md:text-3xl">
          You select the industry and design of your need.{" "}
          <br className="hidden md:block" /> And see your selected items below.
        </h1>
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
        <Divider className={"my-10 h-px w-full !bg-primary"} />
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
                design={design}
                slug={`/design/${design.designId}`}
              />
            );
          })}
        </div>

        {designs?.length > 20 && (
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
        )}
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

export default Industries;
