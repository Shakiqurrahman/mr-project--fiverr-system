import bgImage from "../assets/images/Page Title Backround Alt.jpg";
import thumbnailAlt from "../assets/images/project-thumbnail-alt.jpg";
import PageHeader from "../components/PageHeader";

import Pagination from "@mui/material/Pagination";
import PaginationItem from "@mui/material/PaginationItem";
import Stack from "@mui/material/Stack";
import { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import prevBtn from "../assets/images/icons/Left Arrow.svg";
import nextBtn from "../assets/images/icons/Right Arrow.svg";
import RelatedDesigns from "../components/RelatedDesigns";
import SortDropdown from "../components/SortDropdown";
import ProjectCard from "../components/categories/ProjectCard";
import useGetCategory from "../hooks/useGetCategory";
import useGetSubFolderDesigns from "../hooks/useGetSubFolderDesigns";

function AllDesign() {
  const navigate = useNavigate();
  const { catSlug, slug } = useParams();
  const { categories } = useGetCategory();

  const { user } = useSelector((state) => state.user);
  const isAuthorized = ["ADMIN", "SUPER_ADMIN"].includes(user?.role);

  const [currentPage, setCurrentPage] = useState(1);
  const [sortedBy, setSortedBy] = useState("DefaultDesigns");
  const [allFilteredDesigns, setAllFilteredDesigns] = useState([]);

  const sortingOptions = [
    "Default Designs",
    "Newest Designs",
    "Oldest Designs",
  ];

  const { subFolderName, subFolderDesigns } = useGetSubFolderDesigns({
    folderSlug: catSlug,
    subFolderSlug: slug,
  });

  useEffect(() => {
    if (subFolderDesigns) {
      if (sortedBy === "DefaultDesigns") {
        // Sort by the 'order' property
        const sortedDefaultDesigns = [...subFolderDesigns].sort(
          (a, b) => a.order - b.order,
        );
        setAllFilteredDesigns(sortedDefaultDesigns);
      } else if (sortedBy === "NewestDesigns") {
        // Reverse the array to show oldest first
        const sortedOldestDesigns = [...subFolderDesigns].reverse();
        setAllFilteredDesigns(sortedOldestDesigns);
      } else if (sortedBy === "OldestDesigns") {
        // No sorting, just set as is
        setAllFilteredDesigns([...subFolderDesigns]);
      }
    }
  }, [subFolderDesigns, sortedBy]);

  // Filtering relatedDesign
  const relatedDesigns = useMemo(
    () =>
      categories
        ?.filter((folder) => folder.slug !== catSlug) // Filter out folders without catSlag
        .flatMap((folder) =>
          folder.subFolders
            .filter((subFolder) => subFolder.slug === slug) // Find subfolders with slug
            .map((subFolder) => ({
              subFolder: { ...subFolder },
              folder: folder.folder,
              slug: folder.slug,
            })),
        ),
    [catSlug, categories, slug],
  );

  const handleCustomize = (e) => {
    e.preventDefault();
    if (subFolderDesigns?.length > 0) {
      navigate("/drag-and-drop-designs", {
        state: { subFolderDesigns: subFolderDesigns },
      });
    }
  };

  const handleSortChange = (option) => {
    setSortedBy(option);
  };

  // Pagination related work
  const limit = 20;
  const totalPages = Math.ceil(allFilteredDesigns?.length / limit) || 0;
  const startIndex = (currentPage - 1) * limit;
  const currentPageData = allFilteredDesigns?.slice(
    startIndex,
    startIndex + limit,
  );

  return (
    <>
      <PageHeader bgImage={bgImage} color={"text-secondary"}>
        {subFolderName}
      </PageHeader>
      <div className="max-width">
        <div className="my-10 flex flex-wrap items-center justify-start gap-5 lg:flex-nowrap lg:justify-between">
          <h1 className="w-full text-base font-semibold sm:text-lg lg:w-auto">
            Click on the design of your choice to view the design description.
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
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {currentPageData?.map((design) => {
            const thumbnail = design?.images?.find((img) => img.thumbnail);
            return (
              <ProjectCard
                cart={true}
                key={design?.id}
                thumbnail={thumbnail?.url}
                watermark={thumbnail?.watermark}
                title={design?.title}
                design={design}
                slug={`/design/${design?.designId}`}
              />
            );
          })}
        </div>

        {subFolderDesigns?.length > 20 && (
          <div className="mt-10 flex justify-center">
            <Stack spacing={2}>
              <Pagination
                count={totalPages}
                page={currentPage}
                onChange={(_, page) => setCurrentPage(page)}
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
      <RelatedDesigns
        isFolder={true}
        bgColor={"bg-lightcream"}
        color={"text-[#f1592a]"}
        img={thumbnailAlt}
        relatedDesigns={relatedDesigns}
      />
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

export default AllDesign;
