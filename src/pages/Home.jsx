import CompletedProject from "../components/CompletedProject";
import Hero from "../components/Hero";
import HomeActivityCards from "../components/HomeActivityCards";
import Testimonials from "../components/Testimonials";

function Home() {
    return (
        <>
            {/* hero section */}
            <Hero />
            <HomeActivityCards />
            <CompletedProject />
            <Testimonials />
        </>
    )
}

export default Home;
