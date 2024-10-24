import { Link } from "react-router-dom";

const SitemapProject = () => {
  return (
    <div className="my-10 ml-5">
      <ul className="list-disc marker:text-xl marker:text-revision">
        <li>
          <Link
            className="text-lg font-semibold text-primary hover:underline"
            to={"/project"}
          >
            Project
          </Link>
          <p className="mb-10 mt-3">
            Click on &quot;Project&quot; from the top bar or footer, then select
            your required category and sub-category and continue.
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
          <p className="mb-10 mt-3">
            Click on &quot;Price List&quot; from the top bar or footer, then
            click on &quot;Start Project&quot; from the design you need, then
            select your sub-category and continue.
          </p>
        </li>
      </ul>
      <ul className="list-disc marker:text-xl marker:text-revision">
        <li>
          <Link
            className="text-lg font-semibold text-primary hover:underline"
            to={"/"}
          >
            Design Description
          </Link>
          <p className="mb-10 mt-3">
            Go to the &quot;Design Description&quot; page by clicking on the
            design of your choice, then click on &quot;Start Project&quot; and
            continue.
          </p>
        </li>
      </ul>
      <ul className="list-disc marker:text-xl marker:text-revision">
        <li>
          <Link
            className="text-lg font-semibold text-primary hover:underline"
            to={"/cart"}
          >
            Cart List
          </Link>
          <p className="mb-5 mt-3">
            First collect the designs you need in the &quot;cart list&quot;,
            then you start the project for the design you need from the cart
            list. (You can start a project for one or more designs)
          </p>
          <ul className="mb-10 ml-8 list-disc marker:!text-primary">
            <li>
              Select a design from the cart list, then click
              &quot;Checkout&quot; and continue.
            </li>
            <li>
              Select multiple designs from the cart list, then click
              &quot;Checkout&quot;, then save each design and continue.
            </li>
          </ul>
        </li>
      </ul>
      <ul className="list-disc marker:text-xl marker:text-revision">
        <li>
          <Link
            className="text-lg font-semibold text-primary hover:underline"
            to={"/inbox"}
          >
            Inbox
          </Link>
          <p className="mb-10 mt-3">
            Click on Inbox from the top bar, and text us, then we will discuss
            with you about your design and send you a project offer, then you
            accept the offer and continue.
          </p>
        </li>
      </ul>
      <ul className="list-disc marker:text-xl marker:text-revision">
        <li>
          <Link
            className="text-lg font-semibold text-primary hover:underline"
            to={"/"}
          >
            Offer Project
          </Link>
          <p className="mb-10 mt-3">
            Start the offer project from the home page banner, you first select
            the 3 designs you need, then select one option for each selected
            design, then click &quot;Project Start&quot; and continue.
          </p>
        </li>
      </ul>
    </div>
  );
};

export default SitemapProject;
