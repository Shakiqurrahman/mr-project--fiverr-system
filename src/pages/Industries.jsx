import ProjectCard from "../components/categories/ProjectCard";

import Pagination from "@mui/material/Pagination";
import PaginationItem from "@mui/material/PaginationItem";
import Stack from "@mui/material/Stack";
import { useCallback, useEffect, useRef, useState } from "react";
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
  const [currentPage, setCurrentPage] = useState(1);
  const { data: designKeyWordsData } = useFetchAllDesignKeywordsQuery();
  const { data: industryKeyWordsData } = useFetchAllIndustryKeywordsQuery();
  const { data: designsData } = useFetchGetUploadQuery();

  const [toggleDesignBtns, setToggleDesignBtns] = useState(false);
  const [toggleIndustryBtns, setToggleIndustryBtns] = useState(false);

  const [designs, setDesigns] = useState([]);
  const [designKeywords, setDesignKeywords] = useState([]);
  const [industryKeywords, setIndustryKeywords] = useState([]);

  const sortingOptions = ["Newest Designs", "Oldest Designs"];
  const [sortedBy, setSortedBy] = useState("NewestDesigns");

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

  const selectedOption = useCallback(
    (data) => {
      if (data) {
        const prevDesigns = [...data];
        if (sortedBy === "NewestDesigns") {
          setDesigns(prevDesigns);
        } else if (sortedBy === "OldestDesigns") {
          setDesigns([...prevDesigns].reverse());
        } else {
          setDesigns(prevDesigns);
        }
      }
    },
    [sortedBy],
  );

  const prevDesignKeyword = useRef(null);
  const prevIndustryKeyword = useRef(null);

  useEffect(() => {
    if (!designsData) return; // Return early if no designs data is available

    // Check if both design and industry keywords are selected
    if (selectedValue && industrySelectedValue) {
      // updateKeywordsData(filterBothData, designKeyWordsData, industryKeyWordsData);
      if (filterBothData?.length > 0) {
        setDesigns([...filterBothData].reverse());
        selectedOption([...filterBothData].reverse());
        setCurrentPage(1);
      } else {
        setDesigns([]);
        selectedOption([]);
        setCurrentPage(1);
      }
      if (
        prevDesignKeyword?.current &&
        selectedValue === prevDesignKeyword?.current
      ) {
        const updatedIndustryKeywords = industryKeyWordsData?.map((key) => ({
          name: key,
          quantity: filterDesignData?.filter((design) =>
            design?.industrys?.includes(key),
          ).length,
        }));
        setIndustryKeywords(updatedIndustryKeywords);
      }
      if (
        prevIndustryKeyword?.current &&
        industrySelectedValue === prevIndustryKeyword?.current
      ) {
        const updatedDesignKeywords = designKeyWordsData?.map((key) => ({
          name: key,
          quantity: filterIndustryData?.filter((design) =>
            design?.designs?.includes(key),
          ).length,
        }));
        setDesignKeywords(updatedDesignKeywords);
      }
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
      selectedOption(filterDesignData);
      setCurrentPage(1);
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
      selectedOption(filterIndustryData);
      setCurrentPage(1);
    }
    // Default case: no keywords selected, set original designs and update keywords
    else {
      setDesigns([...designsData].reverse());
      selectedOption([...designsData].reverse());
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
      setCurrentPage(1);
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
    selectedOption,
    prevDesignKeyword,
    prevIndustryKeyword,
  ]);

  const handleDesignClick = useCallback((value) => {
    prevDesignKeyword.current = value;
    setSelectedValue((prev) => (prev === value ? null : value));
  }, []);

  const handleIndustryClick = useCallback((value) => {
    prevIndustryKeyword.current = value;
    setIndustrySelectedValue((prev) => (prev === value ? null : value));
  }, []);

  const handleSortChange = (option) => {
    setSortedBy(option);
  };
  // Pagination related work
  const limit = 20;
  const totalPages = Math.ceil(designs?.length / limit) || 0;
  const startIndex = (currentPage - 1) * limit;
  const currentPageData = designs?.slice(startIndex, startIndex + limit);

  const designBtnsData =
    designKeywords?.length > 25 && !toggleDesignBtns
      ? designKeywords?.slice(0, 25)
      : designKeywords;

  const industryBtnsData =
    industryKeywords?.length > 25 && !toggleIndustryBtns
      ? industryKeywords?.slice(0, 25)
      : industryKeywords;

  return (
    <>
      <div className="max-width">
        <h1 className="my-10 text-center text-lg font-bold sm:text-2xl md:text-3xl">
          You select the industry and design of your need.{" "}
          <br className="hidden md:block" /> And see your selected items below.
        </h1>
        <div className="flex flex-wrap gap-3">
          {industryBtnsData?.map((btn) => (
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
          {industryKeywords?.length > 25 && (
            <button
              onClick={() => setToggleIndustryBtns(!toggleIndustryBtns)}
              className={`rounded-[30px] bg-[#ffefef] px-2 py-1 text-sm font-medium duration-300 hover:bg-secondary hover:text-white sm:px-4 sm:py-2 sm:text-base`}
            >
              {toggleIndustryBtns ? "See Less" : "See More"}
            </button>
          )}
        </div>
        <Divider className={"my-10 h-px w-full !bg-primary"} />
        <div className="flex flex-wrap gap-3">
          {designBtnsData?.map((btn) => (
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
          {designKeywords?.length > 25 && (
            <button
              onClick={() => setToggleDesignBtns(!toggleDesignBtns)}
              className={`rounded-[30px] bg-[#edf7fd] px-2 py-1 text-sm font-medium duration-300 hover:bg-primary hover:text-white sm:px-4 sm:py-2 sm:text-base`}
            >
              {toggleDesignBtns ? "See Less" : "See More"}
            </button>
          )}
        </div>
        <div className="my-10 text-end">
          <SortDropdown
            options={sortingOptions}
            onSortChange={handleSortChange}
          />
        </div>
        <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4">
          {currentPageData?.map((design, idx) => {
            const thumbnail = design?.images?.find((i) => i?.thumbnail);
            return (
              <ProjectCard
                cart={true}
                key={idx}
                thumbnail={thumbnail?.url}
                watermark={thumbnail?.watermark}
                thumbnailName={thumbnail?.name}
                title={design?.title}
                design={design}
                slug={`/design/${design?.designId}`}
              />
            );
          })}
        </div>

        {designs?.length > 20 && (
          <div className="mt-10 flex justify-center">
            <Stack spacing={2}>
              <Pagination
                count={totalPages}
                page={currentPage}
                onChange={(_, page) => {
                  setCurrentPage(page);
                  window.scrollTo(0, 0);
                }}
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
  return (
    <img
      src={prevBtn}
      alt=""
      className="h-8 w-8 rounded-full border border-solid shadow-md"
    />
  );
};
const nextBtnIcon = () => {
  return (
    <img
      src={nextBtn}
      alt=""
      className="h-8 w-8 rounded-full border border-solid shadow-md"
    />
  );
};

export default Industries;
