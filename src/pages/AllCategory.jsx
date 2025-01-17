import Pagination from "@mui/material/Pagination";
import PaginationItem from "@mui/material/PaginationItem";
import Stack from "@mui/material/Stack";
import { useEffect, useMemo, useState } from "react";
import { ImSpinner9 } from "react-icons/im";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import prevBtn from "../assets/images/icons/Left Arrow.svg";
import nextBtn from "../assets/images/icons/Right Arrow.svg";
import PageHeader from "../components/PageHeader";
import RelatedDesigns from "../components/RelatedDesigns";
import SortDropdown from "../components/SortDropdown";
import ProjectCard from "../components/categories/ProjectCard";
import useGetCategory from "../hooks/useGetCategory";
import useGetSubFolders from "../hooks/useGetSubFolders";

function AllCategory() {
  const { slug } = useParams();
  const navigate = useNavigate();

  const { subFolders, folderObject } = useGetSubFolders({ slug });
  const { categories } = useGetCategory();

  const [currentPage, setCurrentPage] = useState(1);
  const [sortedBy, setSortedBy] = useState("DefaultDesigns");
  const [allFilteredSubFolders, setAllFilteredSubFolders] = useState([]);

  const sortingOptions = [
    "Default Designs",
    "Newest Designs",
    "Oldest Designs",
  ];

  const { user } = useSelector((state) => state.user);
  const isAuthorized = ["ADMIN", "SUPER_ADMIN"].includes(user?.role);

  useEffect(() => {
    if (subFolders) {
      if (sortedBy === "DefaultDesigns") {
        // Sort by the 'order' property
        const sortedDefaultDesigns = [...subFolders].sort(
          (a, b) => a.order - b.order,
        );
        setAllFilteredSubFolders(sortedDefaultDesigns);
      } else if (sortedBy === "NewestDesigns") {
        // Reverse the array to show oldest first
        const sortedOldestDesigns = [...subFolders].reverse();
        setAllFilteredSubFolders(sortedOldestDesigns);
      } else if (sortedBy === "OldestDesigns") {
        // No sorting, just set as is
        setAllFilteredSubFolders([...subFolders]);
      }
    }
  }, [subFolders, sortedBy]);

  // filtering related folders
  const relatedFolders = useMemo(
    () => categories?.filter((cat) => cat.slug !== slug),
    [categories, slug],
  );

  const handleCustomize = (e) => {
    e.preventDefault();
    if (subFolders?.length > 0 && folderObject) {
      navigate("/drag-and-drop", { state: { subFolders, folderObject } });
    }
  };

  const handleSortChange = (option) => {
    setSortedBy(option);
  };

  // Pagination related work
  const limit = 20;
  const totalPages = Math.ceil(subFolders?.length / limit) || 0;
  const startIndex = (currentPage - 1) * limit;
  const currentPageData = allFilteredSubFolders.slice(
    startIndex,
    startIndex + limit,
  );

  return (
    <>
      <PageHeader>{folderObject?.folderName}</PageHeader>
      <div className="max-width">
        <div className="my-10 flex flex-wrap items-center justify-start gap-5 lg:flex-nowrap lg:justify-between">
          <h1 className="w-full text-base font-semibold sm:text-lg lg:w-auto">
            Click on the design you need to see more designs.
          </h1>
          {isAuthorized && (
            <button
              className="rounded-[30px] border border-solid border-primary px-4 py-2 text-sm font-medium duration-300 hover:bg-primary hover:text-white lg:ml-auto"
              onClick={handleCustomize}
            >
              Customise
            </button>
          )}
          <SortDropdown
            options={sortingOptions}
            onSortChange={handleSortChange}
          />
        </div>
        {allFilteredSubFolders?.length > 0 ? (
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {currentPageData?.map((design, idx) => {
              const thumbnail = design?.images?.find(
                (img) => img?.thumbnail === true,
              );
              return (
                <ProjectCard
                  folder={true}
                  key={idx}
                  thumbnail={thumbnail?.url}
                  thumbnailName={design?.title}
                  watermark={thumbnail?.watermark}
                  title={design?.subFolder}
                  slug={`/designs/${slug}/${design?.slug}`}
                />
              );
            })}
          </div>
        ) : (
          <div className="mt-10">
            <ImSpinner9 className="mx-auto animate-spin text-4xl text-primary" />
          </div>
        )}

        {subFolders?.length > 20 && (
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
      <RelatedDesigns isFolder={true} relatedFolders={relatedFolders} />
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

export default AllCategory;
