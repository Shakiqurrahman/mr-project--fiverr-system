import bgImage from "../assets/images/Page Title Backround Alt.jpg";
import thumbnailAlt from "../assets/images/project-thumbnail-alt.jpg";
import PageHeader from "../components/PageHeader";

import Pagination from "@mui/material/Pagination";
import PaginationItem from "@mui/material/PaginationItem";
import Stack from "@mui/material/Stack";
import { useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import prevBtn from "../assets/images/icons/Left Arrow.svg";
import nextBtn from "../assets/images/icons/Right Arrow.svg";
import RelatedDesigns from "../components/RelatedDesigns";
import ProjectCard from "../components/categories/ProjectCard";
import useGetCategory from "../hooks/useGetCategory";

function AllDesign() {
  const { catSlug, slug } = useParams();
  const [currentPage, setCurrentPage] = useState(1);
  const { categories, isLoading } = useGetCategory();
  const navigate = useNavigate();

  // Find the category by `catSlug`
  const category = (categories || []).find((cat) => cat.slug === catSlug);

  // Find the subFolder within the selected category by `slug`
  const subFolder = category?.subFolders?.find(
    (subFolder) => subFolder.slug === slug,
  );

  // Extract the designs and title
  const designs = subFolder?.designs;
  const title = subFolder?.subFolder;

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

  // Pagination related work
  const limit = 20;
  const totalPages = Math.ceil(designs?.length / limit) || 0;
  const startIndex = (currentPage - 1) * limit;
  const currentPageData = designs?.slice(startIndex, startIndex + limit);

  return (
    <>
      <PageHeader bgImage={bgImage} color={"text-secondary"}>
        {title}
      </PageHeader>
      <div className="max-width">
        <div className="my-10 flex items-center justify-between">
          <h1 className="text-base font-semibold sm:text-lg">
            Click on the design you need to see more designs.
          </h1>
          <button className="rounded-[30px] border border-solid border-primary px-4 py-1 text-sm font-semibold duration-300 hover:bg-primary hover:text-white">
            Customise
          </button>
        </div>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {currentPageData?.map((design) => {
            const thumbnail = design.images.find((img) => img.thumbnail);
            return (
              <ProjectCard
                cart={true}
                key={design.id}
                thumbnail={thumbnail.url}
                thumbnailName={thumbnail.name}
                title={design.title}
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
        bgColor={"bg-lightcream"}
        color={"text-[#f1592a]"}
        img={thumbnailAlt}
        relatedDesigns={relatedDesigns}
      />
    </>
  );
}

const prevBtnIcon = () => {
  return <img src={prevBtn} alt="" className="h-8 w-8 rounded-full" />;
};
const nextBtnIcon = () => {
  return <img src={nextBtn} alt="" className="h-8 w-8 rounded-full" />;
};

export default AllDesign;
