import ProjectCard from "../components/categories/ProjectCard";

import { Pagination, PaginationItem, Stack } from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import {
  useFetchAllDesignKeywordsQuery,
  useFetchAllIndustryKeywordsQuery,
  useFetchDesignByKeyQuery,
  useFetchDesignNdIndustryByKeyQuery,
  useFetchGetUploadQuery,
  useFetchIndustryByKeyQuery,
} from "../Redux/api/uploadDesignApiSlice";
import { setSearchedText } from "../Redux/features/utilSlice";
import prevBtn from "../assets/images/icons/Left Arrow.svg";
import nextBtn from "../assets/images/icons/Right Arrow.svg";
import ButtonPrimary from "../components/ButtonPrimary";
import ButtonSecondary from "../components/ButtonSecondary";
import Divider from "../components/Divider";
import SortDropdown from "../components/SortDropdown";

function Designs() {
  const { state } = useLocation();
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const { data: designKeyWordsData } = useFetchAllDesignKeywordsQuery();
  const { data: industryKeyWordsData } = useFetchAllIndustryKeywordsQuery();
  const { data: designsData } = useFetchGetUploadQuery();

  const { searchedText, searchResult } = useSelector((state) => state.utils);

  const [designs, setDesigns] = useState([]);
  const [designKeywords, setDesignKeywords] = useState([]);
  const [industryKeywords, setIndustryKeywords] = useState([]);
  const sortingOptions = ["Newest Designs", "Oldest Designs"];
  const [sortedBy, setSortedBy] = useState("NewestDesigns");

  const [selectedValue, setSelectedValue] = useState(state || null);
  const [industrySelectedValue, setIndustrySelectedValue] = useState(null);
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
          setDesigns(prevDesigns);
        } else {
          setDesigns(prevDesigns);
        }
      }
    },
    [sortedBy],
  );

  useEffect(() => {
    if (!designsData) return; // Return early if no designs data is available
    // searching results
    if (designsData && searchedText) {
      const searchDesigns = designsData.filter((d) =>
        searchResult?.some((sr) => sr.designId === d.designId),
      );
      setDesigns(searchDesigns);
      selectedOption(searchDesigns);
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
    // Check if both design and industry keywords are selected
    else if (selectedValue && industrySelectedValue) {
      // updateKeywordsData(filterBothData, designKeyWordsData, industryKeyWordsData);
      setDesigns(filterBothData);
      selectedOption(filterBothData);
      setCurrentPage(1);
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
    searchedText,
    searchResult,
  ]);

  const handleDesignClick = useCallback((value) => {
    dispatch(setSearchedText(""));
    setSelectedValue((prev) => (prev === value ? null : value));
  }, []);

  const handleIndustryClick = useCallback((value) => {
    dispatch(setSearchedText(""));
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

  useEffect(() => {
    setSelectedValue(state);
  }, [state]);

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
        <div className="my-10 flex flex-wrap items-center justify-between gap-6 md:flex-nowrap md:gap-2">
          <div className="w-full md:w-3/4">
            {searchedText && (
              <div className="flex w-full items-center rounded-[30px] border px-4">
                <h1 className="w-full py-2.5 text-lg font-semibold text-primary">
                  {`Results For " ${searchedText} "`}
                </h1>
                <span
                  onClick={() => dispatch(setSearchedText(""))}
                  className="cursor-pointer border-l pl-4 text-lg font-medium text-primary"
                >
                  Clear
                </span>
              </div>
            )}
          </div>
          <div className="w-full justify-end md:flex md:w-1/4">
            <SortDropdown
              options={sortingOptions}
              onSortChange={handleSortChange}
            />
          </div>
        </div>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {currentPageData?.map((design, idx) => {
            const thumbnail = design.images.find((i) => i.thumbnail);
            return (
              <ProjectCard
                cart={true}
                key={idx}
                thumbnail={thumbnail.url}
                watermark={thumbnail?.watermark}
                thumbnailName={thumbnail.name}
                title={design.title}
                design={design}
                slug={`/design/${design.designId}`}
              />
            );
          })}
        </div>

        {designs?.length === 0 && (
          <div>
            <p className="text-center">
              {searchedText
                ? "Sorry, no designs were found for your search."
                : "No designs found!"}
            </p>
          </div>
        )}

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

export default Designs;
