import { Link } from "react-router-dom";

const SitemapFooter = () => {
  return (
    <div className="my-10 ml-5">
      <ul className="list-disc marker:text-xl marker:text-revision">
        <li>
          <Link
            className="text-lg font-semibold text-primary hover:underline"
            to={"/"}
          >
            Home
          </Link>
          <p className="mb-10 mt-3">
            On the home page, you will find an offer project option, and you
            will see many of our designs and a lot about how we provide
            services.
          </p>
        </li>
      </ul>
      <ul className="list-disc marker:text-xl marker:text-revision">
        <li>
          <Link
            className="text-lg font-semibold text-primary hover:underline"
            to={"/about"}
          >
            About
          </Link>
          <p className="mb-10 mt-3">
            A lot of things have been mentioned about us in about if you want
            you can know about us by reading about page.
          </p>
        </li>
      </ul>
      <ul className="list-disc marker:text-xl marker:text-revision">
        <li>
          <Link
            className="text-lg font-semibold text-primary hover:underline"
            to={"/designs"}
          >
            Designs
          </Link>
          <p className="mb-10 mt-3">
            The designs page has many design and industry tags, firstly select
            the design tag you need and then select your specific or similar
            industry tag. Then see your chosen designs below.
          </p>
        </li>
      </ul>
      <ul className="list-disc marker:text-xl marker:text-revision">
        <li>
          <Link
            className="text-lg font-semibold text-primary hover:underline"
            to={"/industries"}
          >
            Industries
          </Link>
          <p className="mb-10 mt-3">
            The Industries page has many industry and design tags, firstly
            select your specific or similar industry tag and then select your
            required design tag. Then see your chosen designs below.
          </p>
        </li>
      </ul>
      <ul className="list-disc marker:text-xl marker:text-revision">
        <li>
          <Link
            className="text-lg font-semibold text-primary hover:underline"
            to={"/pricelist"}
          >
            Price List
          </Link>
          <div className="mb-10 mt-3">
            For all the designs that we usually create, we have mentioned the
            price of all those designs in the price list, you can see the price
            of all our designs in the price list.
            <p>
              (Also we create other graphics-related designs, if you want to
              create any other graphics-related designs please inbox us)
            </p>
          </div>
        </li>
      </ul>
      <ul className="list-disc marker:text-xl marker:text-revision">
        <li>
          <Link
            className="text-lg font-semibold text-primary hover:underline"
            to={"/project"}
          >
            Project
          </Link>
          <p className="mb-10 mt-3">
            You can start the project by selecting the category and subcategory
            from the project page for the design you need.
          </p>
        </li>
      </ul>
      <ul className="list-disc marker:text-xl marker:text-revision">
        <li>
          <Link
            className="text-lg font-semibold text-primary hover:underline"
            to={"/contact"}
          >
            Contact
          </Link>
          <p className="mb-10 mt-3">
            If you are a new user, you must first fill out a form from the
            contact page before inboxing us.
          </p>
        </li>
      </ul>
      <ul className="list-disc marker:text-xl marker:text-revision">
        <li>
          <Link
            className="text-lg font-semibold text-primary hover:underline"
            to={"/affiliate"}
          >
            Affiliate
          </Link>
          <p className="mb-10 mt-3">
            We offer you an affiliate program, you can generate an affiliate
            link with the link of any page of our website and you can earn by
            sharing that link with your friends, relatives, social media, and
            website.
          </p>
        </li>
      </ul>
    </div>
  );
};

export default SitemapFooter;
