import { saveAs } from "file-saver";
import JSZip from "jszip";
import Slider from "react-slick/lib/slider";
import LeftArrowIcon from "../../../assets/images/icons/Left Arrow.svg";
import RightArrowIcon from "../../../assets/images/icons/Right Arrow.svg";

import { BiDownload } from "react-icons/bi";
import thumbnail from "../../../assets/images/project-thumbnail.jpg";
import Divider from "../../Divider";

const OrderDeliveryPreview = ({ data }) => {
  // handle download all button
  const handleDownloadAll = (files) => {
    files.forEach((file) => {
      const link = document.createElement("a");
      link.href = file.url; // Ensure this points to the file's URL
      link.setAttribute("download", file.name); // Set the filename
      document.body.appendChild(link);
      link.click(); // Simulate click to download
      document.body.removeChild(link); // Clean up
    });
  };

  //   handle download all files zip
  const handleDownloadZip = async (files) => {
    const zip = new JSZip();

    // Fetch and add files to the zip
    for (const file of files) {
      const response = await fetch(file.url);
      const blob = await response.blob();
      zip.file(file.name || file.url.split("/").pop(), blob); // Use file.name or fallback to the URL's last segment
    }

    // Generate the zip file
    const content = await zip.generateAsync({ type: "blob" });
    saveAs(content, "files.zip"); // Save the zip file
  };

  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    autoplay: true,
    autoplaySpeed: 2000,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 768,
        settings: {
          arrows: false,
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 576,
        settings: {
          arrows: false,
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
    ],
  };
  return (
    <div className="mt-5 flex items-start gap-3">
      <div className="w-2/3">
        <h1 className="mb-2 text-lg font-semibold">Preview Image</h1>
        <div className="w-full">
          <Slider {...settings}>
            {[1, 2, 3].map((v) => (
              <div key={v} className="w-full">
                <img
                  src={thumbnail}
                  alt=""
                  className="block w-full object-cover"
                />
                <div className="mb-10 mt-4 text-center">
                  <a
                    href={thumbnail}
                    download={"thumbnail.jpg"}
                    className="rounded-[30px] border border-gray-400 px-5 py-2 text-lg font-medium text-black/50"
                  >
                    Download
                  </a>
                </div>
              </div>
            ))}
          </Slider>
        </div>
        <div className="flex gap-3">
          <button
            type="button"
            className="w-1/2 rounded-[30px] bg-primary p-2 text-center font-semibold text-white"
            onClick={() => handleDownloadZip()}
          >
            Zip Download
          </button>
          <button
            type="button"
            className="w-1/2 rounded-[30px] bg-revision p-2 text-center font-semibold text-white"
            onClick={() => handleDownloadAll()}
          >
            Individual Download
          </button>
        </div>
        <div className="mt-10">
          <p>
            The watermark will no longer show after accepting the delivery file.
            Please accept your final file first, then download the files.
          </p>
          <div className="my-10 flex justify-center gap-5">
            <button
              type="button"
              className="rounded-[30px] bg-primary px-10 py-2 text-center font-semibold text-white"
            >
              Accept
            </button>
            <button
              type="button"
              className="rounded-[30px] bg-revision px-10 py-2 text-center font-semibold text-white"
            >
              Revision
            </button>
          </div>
        </div>
      </div>
      <div className="w-1/3">
        <h1 className="mb-2 ms-6 text-lg font-semibold">Final Files</h1>
        <div>
          <a className="flex items-start gap-2 text-sm">
            <BiDownload className="shrink-0 text-lg text-primary" />
            <p>
              Pressure and Soft Washing Door Hanger Design.jpg{" "}
              <span className="text-black/50">(3.25 mb)</span>
            </p>
          </a>
          <Divider className="my-5 ms-6 h-px w-[50px] !bg-black" />
          <a className="flex items-start gap-2 text-sm">
            <BiDownload className="shrink-0 text-lg text-primary" />
            <p>
              Door Hanger Front.jpg{" "}
              <span className="text-black/50">(3.64 mb)</span>
            </p>
          </a>
          <a className="flex items-start gap-2 text-sm">
            <BiDownload className="shrink-0 text-lg text-primary" />
            <p>
              Door Hanger Back.jpg{" "}
              <span className="text-black/50">(3.37 mb)</span>
            </p>
          </a>
          <a className="flex items-start gap-2 text-sm">
            <BiDownload className="shrink-0 text-lg text-primary" />
            <p>
              Door Hanger Front.pdf{" "}
              <span className="text-black/50">(5.82 mb)</span>
            </p>
          </a>
          <a className="flex items-start gap-2 text-sm">
            <BiDownload className="shrink-0 text-lg text-primary" />
            <p>
              Door Hanger Back.pdf{" "}
              <span className="text-black/50">(4.75 mb)</span>
            </p>
          </a>
          <a className="flex items-start gap-2 text-sm">
            <BiDownload className="shrink-0 text-lg text-primary" />
            <p>
              Door Hanger Front.psd{" "}
              <span className="text-black/50">(25.55 mb)</span>
            </p>
          </a>
          <a className="flex items-start gap-2 text-sm">
            <BiDownload className="shrink-0 text-lg text-primary" />
            <p>
              Door Hanger Back.psd{" "}
              <span className="text-black/50">(23.65 mb)</span>
            </p>
          </a>
        </div>
      </div>
    </div>
  );
};

// Custom arrows design components
function NextArrow({ onClick }) {
  return (
    <div
      onClick={onClick}
      className="slick-arrow absolute right-0 top-[35%] z-10 flex h-[35px] w-[35px] translate-y-[35%] cursor-pointer items-center justify-center rounded-full border before:content-none"
    >
      <img src={RightArrowIcon} alt="" />
    </div>
  );
}

function PrevArrow({ onClick }) {
  return (
    <div
      onClick={onClick}
      className="slick-arrow absolute left-0 top-[35%] z-10 flex h-[35px] w-[35px] translate-y-[35%] cursor-pointer items-center justify-center rounded-full border before:content-none"
    >
      <img src={LeftArrowIcon} alt="" />
    </div>
  );
}

export default OrderDeliveryPreview;
