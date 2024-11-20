import Pagination from "@mui/material/Pagination";
import PaginationItem from "@mui/material/PaginationItem";
import Stack from "@mui/material/Stack";
import { useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import prevBtn from "../assets/images/icons/Left Arrow.svg";
import nextBtn from "../assets/images/icons/Right Arrow.svg";
import PageHeader from "../components/PageHeader";
import RelatedDesigns from "../components/RelatedDesigns";
import ProjectCard from "../components/categories/ProjectCard";
import useGetCategory from "../hooks/useGetCategory";
import useGetSubFolders from "../hooks/useGetSubFolders";

function AllCategory() {
  const { categories: dddd } = useGetSubFolders();
  const { slug } = useParams();
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();
  const { categories, isLoading } = useGetCategory();
  console.log(categories);

  const selectedCategory = (categories || []).find(
    (data) => data.slug === slug,
  );
  const subFolders = selectedCategory?.subFolders;
  const title = selectedCategory?.folder;

  // filtering related folders
  const relatedFolders = useMemo(
    () => categories?.filter((cat) => cat.slug !== slug),
    [categories, slug],
  );

  // Pagination related work
  const limit = 20;
  const totalPages = Math.ceil(subFolders?.length / limit) || 0;
  const startIndex = (currentPage - 1) * limit;
  const currentPageData = subFolders?.slice(startIndex, startIndex + limit);

  return (
    <>
      <PageHeader>{title}</PageHeader>
      <div className="max-width">
        <div className="my-10 flex items-center justify-between">
          <h1 className="text-base font-semibold sm:text-lg">
            Click on the design you need to see more designs.
          </h1>
          <button className="rounded-[30px] border border-solid border-primary px-4 py-1 text-sm font-semibold duration-300 hover:bg-primary hover:text-white">
            Customise
          </button>
        </div>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {currentPageData?.map((subFolder, idx) => {
            const design = subFolder?.designs[0];
            const thumbnail = design.images.filter(
              (img) => img?.thumbnail === true,
            )[0];
            return (
              <ProjectCard
                folder={true}
                key={idx}
                thumbnail={thumbnail?.url}
                thumbnailName={design?.title}
                watermark={thumbnail?.watermark}
                title={subFolder?.subFolder}
                slug={`/designs/${slug}/${subFolder?.slug}`}
              />
            );
          })}
        </div>

        {subFolders?.length > 20 && (
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
