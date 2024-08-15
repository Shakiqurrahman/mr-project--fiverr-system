import FeatureCategory from "../components/categories/FeatureCategory";
import CompletedProject from "../components/CompletedProject";
import Hero from "../components/Hero";
import HomeActivityCards from "../components/HomeActivityCards";
import Testimonials from "../components/Testimonials";

function Home() {
  return (
    <>
      {/* hero section */}
      <Hero />

      {/* Feature Component section */}
      <FeatureCategory />

      {/* Activity Cards section */}
      <HomeActivityCards />

      {/* Completed Project Card section */}
      <CompletedProject />

      {/* Testimonial section */}
      <Testimonials />
    </>
  );
}

export default Home;
