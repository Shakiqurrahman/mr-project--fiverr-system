import { MdOutlineCheck } from 'react-icons/md';
import { Link } from 'react-router-dom';
import Divider from '../components/Divider';

function About() {
    return (
        <div className="max-width">
            <h1 className="text-primary text-2xl md:text-4xl mt-[50px] mb-8 font-medium ">
                About
            </h1>
            <p>
                We are a team of graphic designers. We have worked with many
                online marketplaces since 2016 with graphics design. And we've
                been successful in those marketplaces. Now we have created this
                site in 2024. We want to help many businesses worldwide improve
                their business through marketing design based on our experience.
            </p>
            {/* Section -02 starts here */}
            <div className="mt-[70px]">
                <h3 className="text-primary text-2xl md:text-3xl my-2 font-medium">
                    What kind of designs do we like to create?
                </h3>
                <div className="flex items-stretch gap-5 mt-10">
                    <Divider className="w-[3px] bg-[#1b8cdc!important] flex-shrink-0" />
                    <div>
                        <p className="text-gray-600">
                            We like to create all kinds of business advertising
                            designs. Print design and social media post design.
                            Most of the designs we create.
                        </p>
                        <div className="md:flex gap-[120px] leading-[50px] text-[18px] mt-5 font-normal">
                            <ul>
                                <li className="flex items-center gap-2">
                                    <MdOutlineCheck className="text-primary font-semibold text-[24px]" />
                                    Door Hanger Design
                                </li>
                                <li className="flex items-center gap-2">
                                    <MdOutlineCheck className="text-primary font-semibold text-[24px]" />{' '}
                                    Flyer Design
                                </li>
                                <li className="flex items-center gap-2">
                                    <MdOutlineCheck className="text-primary font-semibold text-[24px]" />{' '}
                                    Postcard Design
                                </li>
                                <li className="flex items-center gap-2">
                                    <MdOutlineCheck className="text-primary font-semibold text-[24px]" />{' '}
                                    Poster Design
                                </li>
                                <li className="flex items-center gap-2">
                                    <MdOutlineCheck className="text-primary font-semibold text-[24px]" />{' '}
                                    Rack Card Design
                                </li>
                                <li className="flex items-center gap-2">
                                    <MdOutlineCheck className="text-primary font-semibold text-[24px]" />{' '}
                                    Business Card Design
                                </li>
                                <li className="flex items-center gap-2">
                                    <MdOutlineCheck className="text-primary font-semibold text-[24px]" />{' '}
                                    Brochure Design
                                </li>
                                <li className="flex items-center gap-2">
                                    <MdOutlineCheck className="text-primary font-semibold text-[24px]" />{' '}
                                    Social Media Post Design
                                </li>
                                <li className="flex items-center gap-2">
                                    <MdOutlineCheck className="text-primary font-semibold text-[24px]" />{' '}
                                    Facebook Cover Design
                                </li>
                                <li className="flex items-center gap-2">
                                    <MdOutlineCheck className="text-primary font-semibold text-2xl" />{' '}
                                    Billboard Design
                                </li>
                            </ul>
                            <ul>
                                <li className="flex items-center gap-2">
                                    <MdOutlineCheck className="text-primary font-semibold text-2xl" />{' '}
                                    Yard Sign Design
                                </li>
                                <li className="flex items-center gap-2">
                                    <MdOutlineCheck className="text-primary font-semibold text-2xl" />{' '}
                                    Roll-up Banner Design
                                </li>
                                <li className="flex items-center gap-2">
                                    <MdOutlineCheck className="text-primary font-semibold text-2xl" />{' '}
                                    Sidewalk Sign Design
                                </li>
                                <li className="flex items-center gap-2">
                                    <MdOutlineCheck className="text-primary font-semibold text-2xl" />{' '}
                                    Trade Show Banner Design
                                </li>
                                <li className="flex items-center gap-2">
                                    <MdOutlineCheck className="text-primary font-semibold text-2xl" />{' '}
                                    Menu Design
                                </li>
                                <li className="flex items-center gap-2">
                                    <MdOutlineCheck className="text-primary font-semibold text-2xl" />{' '}
                                    Magazine Cover Design
                                </li>
                                <li className="flex items-center gap-2">
                                    <MdOutlineCheck className="text-primary font-semibold text-2xl" />{' '}
                                    Magazine Ads Design
                                </li>

                                <li className="flex items-center gap-2">
                                    <MdOutlineCheck className="text-primary font-semibold text-2xl" />{' '}
                                    Book Cover Design
                                </li>

                                <li className="flex items-center gap-2">
                                    <MdOutlineCheck className="text-primary font-semibold text-2xl" />{' '}
                                    Podcast Cover Design
                                </li>

                                <li className="flex items-center gap-2">
                                    <MdOutlineCheck className="text-primary font-semibold text-2xl" />{' '}
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
                <h3 className="text-primary text-2xl md:text-3xl my-2 font-medium">
                    Why should you choose us for your design?
                </h3>
                <div className="flex items-stretch gap-5 mt-10 leading-6">
                    <Divider className="w-[3px] bg-[#1b8cdc!important] flex-shrink-0" />
                    <div>
                        <p>
                            We create every design for a specific business. Due
                            to this the contents of each of our designs are of
                            the right quality. After the business
                            owners/customers see our designs, they no longer
                            have to worry about the content of the designs. The
                            business owner/customer can choose any design from
                            the many designs created by us and easily edit that
                            design with their own information through us. Or the
                            business owner/customer can create a new design
                            through us with some ideas from these designs. Also,
                            if the business owner/customer already has a design
                            idea of ​his own. However, we make designs according
                            to their own ideas.
                        </p>
                        <p className="mt-5">
                            (
                            <Link
                                className="text-primary underline font-medium"
                                to="#"
                            >
                                Click here
                            </Link>{' '}
                            to see which businesses we have already created
                            designs for.)
                        </p>
                        <p className="mt-5">
                            Also, we can design for any business other than the
                            businesses we have already designed for. For that,
                            the business owner/customer must give us their
                            design information.
                        </p>
                    </div>
                </div>
            </div>
            {/* Section -03 ends here */}

            {/* Section -04 starts here  */}
            <div className="mt-[70px]">
                <h3 className="text-primary text-2xl md:text-3xl my-2 font-medium">
                    Why should you choose us for your design?
                </h3>
                <p className="mt-5">
                    Our main goal is to create advertising designs for different
                    types of businesses. We have already created many types of
                    advertising designs. We will create more different types of
                    advertising designs in the coming days. So that the
                    advertising work of businesses becomes easier through our
                    designs.
                </p>
            </div>
            {/* Section -04 ends here   */}
        </div>
    );
}

export default About;
