import { MdOutlineCheck } from "react-icons/md";
import { Link } from "react-router-dom";
import Divider from "../components/Divider";

function About() {
  return (
    <div className="max-width">
      <h1 className="mb-8 mt-[50px] text-2xl font-medium text-primary md:text-4xl">
        About
      </h1>
      <p>
        We are a team of graphic designers. We have worked with many online
        marketplaces since 2016 with graphics design. And we&apos;ve been
        successful in those marketplaces. Now we have created this site in 2024.
        We want to help many businesses worldwide improve their business through
        marketing design based on our experience.
      </p>
      {/* Section -02 starts here */}
      <div className="mt-[70px]">
        <h3 className="my-2 text-2xl font-medium text-primary md:text-3xl">
          What kind of designs do we like to create?
        </h3>
        <div className="mt-10 flex items-stretch gap-5">
          <Divider className="w-[3px] flex-shrink-0 bg-[#1b8cdc!important]" />
          <div>
            <p className="text-gray-600">
              We like to create all kinds of business advertising designs. Print
              design and social media post design. Most of the designs we
              create.
            </p>
            <div className="mt-5 gap-[120px] text-[18px] font-normal leading-[50px] md:flex">
              <ul>
                <li className="flex items-center gap-2">
                  <MdOutlineCheck className="text-[24px] font-semibold text-primary" />
                  Door Hanger Design
                </li>
                <li className="flex items-center gap-2">
                  <MdOutlineCheck className="text-[24px] font-semibold text-primary" />{" "}
                  Flyer Design
                </li>
                <li className="flex items-center gap-2">
                  <MdOutlineCheck className="text-[24px] font-semibold text-primary" />{" "}
                  Postcard Design
                </li>
                <li className="flex items-center gap-2">
                  <MdOutlineCheck className="text-[24px] font-semibold text-primary" />{" "}
                  Poster Design
                </li>
                <li className="flex items-center gap-2">
                  <MdOutlineCheck className="text-[24px] font-semibold text-primary" />{" "}
                  Rack Card Design
                </li>
                <li className="flex items-center gap-2">
                  <MdOutlineCheck className="text-[24px] font-semibold text-primary" />{" "}
                  Business Card Design
                </li>
                <li className="flex items-center gap-2">
                  <MdOutlineCheck className="text-[24px] font-semibold text-primary" />{" "}
                  Brochure Design
                </li>
                <li className="flex items-center gap-2">
                  <MdOutlineCheck className="text-[24px] font-semibold text-primary" />{" "}
                  Social Media Post Design
                </li>
                <li className="flex items-center gap-2">
                  <MdOutlineCheck className="text-[24px] font-semibold text-primary" />{" "}
                  Facebook Cover Design
                </li>
                <li className="flex items-center gap-2">
                  <MdOutlineCheck className="text-2xl font-semibold text-primary" />{" "}
                  Billboard Design
                </li>
              </ul>
              <ul>
                <li className="flex items-center gap-2">
                  <MdOutlineCheck className="text-2xl font-semibold text-primary" />{" "}
                  Yard Sign Design
                </li>
                <li className="flex items-center gap-2">
                  <MdOutlineCheck className="text-2xl font-semibold text-primary" />{" "}
                  Roll-up Banner Design
                </li>
                <li className="flex items-center gap-2">
                  <MdOutlineCheck className="text-2xl font-semibold text-primary" />{" "}
                  Sidewalk Sign Design
                </li>
                <li className="flex items-center gap-2">
                  <MdOutlineCheck className="text-2xl font-semibold text-primary" />{" "}
                  Trade Show Banner Design
                </li>
                <li className="flex items-center gap-2">
                  <MdOutlineCheck className="text-2xl font-semibold text-primary" />{" "}
                  Menu Design
                </li>
                <li className="flex items-center gap-2">
                  <MdOutlineCheck className="text-2xl font-semibold text-primary" />{" "}
                  Magazine Cover Design
                </li>
                <li className="flex items-center gap-2">
                  <MdOutlineCheck className="text-2xl font-semibold text-primary" />{" "}
                  Magazine Ads Design
                </li>

                <li className="flex items-center gap-2">
                  <MdOutlineCheck className="text-2xl font-semibold text-primary" />{" "}
                  Book Cover Design
                </li>

                <li className="flex items-center gap-2">
                  <MdOutlineCheck className="text-2xl font-semibold text-primary" />{" "}
                  Podcast Cover Design
                </li>

                <li className="flex items-center gap-2">
                  <MdOutlineCheck className="text-2xl font-semibold text-primary" />{" "}
                  And Much More
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      {/* Section -02 ends here */}

      {/* Section -03 starts here */}
      <div className="mt-[70px]">
        <h3 className="my-2 text-2xl font-medium text-primary md:text-3xl">
          Why should you choose us for your design?
        </h3>
        <div className="mt-10 flex items-stretch gap-5 leading-6">
          <Divider className="w-[3px] flex-shrink-0 bg-[#1b8cdc!important]" />
          <div>
            <p>
              We create every design for a specific business. Due to this the
              contents of each of our designs are of the right quality. After
              the business owners/customers see our designs, they no longer have
              to worry about the content of the designs. The business
              owner/customer can choose any design from the many designs created
              by us and easily edit that design with their own information
              through us. Or the business owner/customer can create a new design
              through us with some ideas from these designs. Also, if the
              business owner/customer already has a design idea of his own.
              However, we make designs according to their own ideas.
            </p>
            <p className="mt-5">
              (
              <Link className="font-medium text-primary underline" to="#">
                Click here
              </Link>{" "}
              to see which businesses we have already created designs for.)
            </p>
            <p className="mt-5">
              Also, we can design for any business other than the businesses we
              have already designed for. For that, the business owner/customer
              must give us their design information.
            </p>
          </div>
        </div>
      </div>
      {/* Section -03 ends here */}

      {/* Section -04 starts here  */}
      <div className="mt-[70px]">
        <h3 className="my-2 text-2xl font-medium text-primary md:text-3xl">
          What are our future plans?
        </h3>
        <p className="mt-5">
          Our main goal is to create advertising designs for different types of
          businesses. We have already created many types of advertising designs.
          We will create more different types of advertising designs in the
          coming days. So that the advertising work of businesses becomes easier
          through our designs.
        </p>
      </div>
      {/* Section -04 ends here   */}
    </div>
  );
}

export default About;
