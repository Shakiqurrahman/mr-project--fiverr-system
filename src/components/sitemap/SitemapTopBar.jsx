import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import {
  setOpenNotificationDrawer,
  setOpenNotifications,
} from "../../Redux/features/userSlice";

const SitemapTopBar = () => {
  const dispatch = useDispatch();
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
            to={"/inbox"}
          >
            Inbox
          </Link>
          <p className="mb-10 mt-3">
            You can conversations with us anytime through the inbox.
          </p>
        </li>
      </ul>
      <ul className="list-disc marker:text-xl marker:text-revision">
        <li
          className="hidden md:block"
          onClick={() => dispatch(setOpenNotifications(true))}
        >
          <Link
            className="text-lg font-semibold text-primary hover:underline"
            // to={"/"}
          >
            Notifications
          </Link>
          <p className="mb-10 mt-3">
            If you start a project, you&apos;ll see all the updates and
            conversations we have from start to finish in notifications.
          </p>
        </li>
        <li
          className="block md:hidden"
          onClick={() => dispatch(setOpenNotificationDrawer(true))}
        >
          <Link
            className="text-lg font-semibold text-primary hover:underline"
            // to={"/"}
          >
            Notifications
          </Link>
          <p className="mb-10 mt-3">
            If you start a project, you&apos;ll see all the updates and
            conversations we have from start to finish in notifications.
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
    </div>
  );
};

export default SitemapTopBar;
