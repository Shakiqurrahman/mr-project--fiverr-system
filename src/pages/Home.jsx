import FeatureCategory from "../components/categories/FeatureCategory";
import CompletedProject from "../components/CompletedProject";
import Hero from "../components/Hero";
import HomeActivityCards from "../components/HomeActivityCards";
import HomeKeywords from "../components/HomeKeywords";
import SocialMediaLinks from "../components/SocialMediaLinks";
import Testimonials from "../components/Testimonials";

function Home() {
  return (
    <>
      {/* hero section */}
      <Hero />

      {/* Homepage Category Keywords section */}
      <HomeKeywords />

      {/* Feature Component section */}
      <FeatureCategory />

      {/* Activity Cards section */}
      <HomeActivityCards />

      {/* Completed Project Card section */}
      <CompletedProject />

      {/* Testimonial section */}
      <Testimonials />

      {/* Social Media Section  */}
      <SocialMediaLinks />
    </>
  );
}

export default Home;
