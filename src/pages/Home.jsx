import { useEffect, useState } from "react";
import { useGetAllProjectsQuery } from "../Redux/api/dashboardApiSlice";
import { useGetAllAdminReviewsQuery } from "../Redux/api/orderApiSlice";
import CompletedProject from "../components/CompletedProject";
import Hero from "../components/Hero";
import HomeActivityCards from "../components/HomeActivityCards";
import HomeKeywords from "../components/HomeKeywords";
import Testimonials from "../components/Testimonials";
import FeatureCategory from "../components/categories/FeatureCategory";

function Home() {
  const { data: reviews } = useGetAllAdminReviewsQuery();
  const { data: completedProjects } = useGetAllProjectsQuery({
    status: "Completed",
  });
  const [filteredProjects, setFilteredProjects] = useState([]);

  useEffect(() => {
    if (completedProjects?.length > 0) {
      const filterData = completedProjects?.filter((order) =>
        order?.review?.find(
          (r) => r?.isThumbnail && r?.senderType === "CLIENT",
        ),
      );
      setFilteredProjects(filterData);
    }
  }, [completedProjects]);

  return (
    <>
      {/* hero section */}
      <Hero />

      <div className="bg-lightcream py-5">
        <div className="max-width">
          <p className="text-center text-base font-medium sm:text-lg">
            We do not own the images used in our designs. We used those images
            from Google/Stock Marketplace. You must give us the images to use in
            your design.
          </p>
        </div>
      </div>

      {/* Homepage Category Keywords section */}
      <HomeKeywords />

      {/* Feature Component section */}
      <FeatureCategory />

      {/* Activity Cards section */}
      <HomeActivityCards />

      {/* Completed Project Card section */}
      {filteredProjects?.length > 0 && <CompletedProject />}

      {/* Testimonial section */}
      {reviews?.length > 0 && <Testimonials />}
    </>
  );
}

export default Home;
