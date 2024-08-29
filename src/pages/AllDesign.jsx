import bgImage from "../assets/images/Page Title Backround Alt.jpg";
import thumbnailAlt from "../assets/images/project-thumbnail-alt.jpg";
import PageHeader from "../components/PageHeader";

import Pagination from "@mui/material/Pagination";
import PaginationItem from "@mui/material/PaginationItem";
import Stack from "@mui/material/Stack";
import { useNavigate, useParams } from "react-router-dom";
import prevBtn from "../assets/images/icons/Left Arrow.svg";
import nextBtn from "../assets/images/icons/Right Arrow.svg";
import RelatedDesigns from "../components/RelatedDesigns";
import ProjectCard from "../components/categories/ProjectCard";
import useGetCategory from "../hooks/useGetCategory";

function AllDesign() {
  const { catSlug, slug } = useParams();
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
  const title = designs?.[0]?.title;
  console.log('dseigin',designs);

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
          {designs?.map((design) => (
            <ProjectCard
              cart={true}
              key={design.id}
              thumbnail={design.images.find((img) => img.thumbnail).url}
              title={design.title}
              designs={design}
              slug={`/design/${design?.designId}`}
            />
          ))}
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
      <RelatedDesigns
        bgColor={"bg-lightcream"}
        color={"text-[#f1592a]"}
        img={thumbnailAlt}
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
