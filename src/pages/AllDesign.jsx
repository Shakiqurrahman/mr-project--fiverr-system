import bgImage from "../assets/images/Page Title Backround Alt.jpg";
import thumbnailAlt from "../assets/images/project-thumbnail-alt.jpg";
import PageHeader from "../components/PageHeader";

import Pagination from "@mui/material/Pagination";
import PaginationItem from "@mui/material/PaginationItem";
import Stack from "@mui/material/Stack";
import { useLocation, useParams } from "react-router-dom";
import prevBtn from "../assets/images/icons/Left Arrow.svg";
import nextBtn from "../assets/images/icons/Right Arrow.svg";
import RelatedDesigns from "../components/RelatedDesigns";
import ProjectCard from "../components/categories/ProjectCard";

function AllDesign() {
  // const { slug } = useParams();
  const location = useLocation();
  const { title, designs } = location.state;
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
          {designs?.map((design) => {
          const slug = design.title.split(' ').join('-').toLowerCase();
          return (
            <ProjectCard
              cart={true}
              key={design.id}
              thumbnail={design.images.find(img => img.thumbnail).url}
              title={design.title}
              designs={design}
              slug={`/design/${slug}`}
            />
          )})}
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
