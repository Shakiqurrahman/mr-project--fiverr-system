import { useState } from "react";
import { Link } from "react-router-dom";
import SearchBox from "../partials/SearchBox";

const SitemapDesign = () => {
  const [openSearchBox, setOpenSearchBox] = useState(false);
  return (
    <>
      <div className="my-10">
        <h1 className="mb-10 text-xl font-semibold text-revision">
          Homepage Designs
        </h1>
        <div className="ml-5">
          <ul className="list-disc marker:text-xl marker:text-revision">
            <li>
              <Link
                className="text-lg font-semibold text-primary hover:underline"
                to={"/"}
              >
                Boxes
              </Link>
              <p className="mb-10 mt-3">
                There are different boxes on the homepage for different designs,
                you can see the design you need from the specific box.
              </p>
            </li>
          </ul>
          <ul className="ml-10 list-disc marker:text-xl marker:text-revision">
            <li>
              <Link
                className="text-lg font-semibold text-primary hover:underline"
                to={"/"}
              >
                Folders
              </Link>
              <p className="mb-10 mt-3">
                There are different folders in each design box, and each folder
                is for different industry designs, you can find the folder you
                need by clicking the &quot;Arrow Icon&quot; in the box, or you
                can see all the folders together by clicking &quot;See
                More&quot; on the top right side of the box.
              </p>
            </li>
          </ul>
          <ul className="ml-20 list-disc marker:text-xl marker:text-revision">
            <li>
              <Link
                className="text-lg font-semibold text-primary hover:underline"
                to={"/"}
              >
                Industries
              </Link>
              <div className="mb-10 mt-3">
                Find your specific industry or similar industry by checking the
                title below each design and click on the selected industry to
                view the designs within the folder.
                <p>
                  (If you can&apos;t find your specific or similar industry,
                  please inbox us)
                </p>
              </div>
            </li>
          </ul>
          <ul className="ml-[120px] list-disc marker:text-xl marker:text-revision">
            <li>
              <Link
                className="text-lg font-semibold text-primary hover:underline"
                to={"/"}
              >
                Designs
              </Link>
              <p className="mb-10 mt-3">
                Click on the design to view the design of your choice better and
                view the design information.
              </p>
            </li>
          </ul>
        </div>

        <h1 className="mb-10 text-xl font-semibold text-revision">Others</h1>

        <div className="ml-5">
          <ul className="list-disc marker:text-xl marker:text-revision">
            <li>
              <Link
                className="text-lg font-semibold text-primary hover:underline"
                onClick={() => setOpenSearchBox(true)}
              >
                Search
              </Link>
              <p className="mb-10 mt-3">
                You can search for the design you need from the search box of
                the top bar.
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
              <div className="mb-10 mt-3">
                Click on &quot;Designs&quot; from the top bar or footer, then
                select the design tag you need, and then select your specific or
                similar industry tag. Then see your selected designs below.
                <p>
                  (if you don&apos;t find your preferred design please inbox us)
                </p>
              </div>
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
              <div className="mb-10 mt-3">
                Click on &quot;Industries&quot; from the top bar or footer, then
                select your specific or similar industry tag, and then select
                the design tag you need. Then see your selected designs below.
                <p>
                  (if you don&apos;t find your preferred design please inbox us)
                </p>
              </div>
            </li>
          </ul>
          <ul className="list-disc marker:text-xl marker:text-revision">
            <li>
              <Link
                className="text-lg font-semibold text-primary hover:underline"
                to={"/"}
              >
                Completed Projects
              </Link>
              <p className="mb-10 mt-3">
                At the bottom of the home page there is a box called
                &quot;Completed Projects&quot;, from there you can see some of
                our previous completed project designs.
              </p>
            </li>
          </ul>
        </div>
      </div>
      {openSearchBox && <SearchBox handleClose={setOpenSearchBox} />}
    </>
  );
};

export default SitemapDesign;
