import { BiDownload } from "react-icons/bi";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import thumbnail from "../../../assets/images/project-thumbnail.jpg";
import formatFileSize from "../../../libs/formatFileSize";

const OrderRequirementsDetails = () => {
  const { user } = useSelector((state) => state.user);
  const requirements = [
    {
      id: 1,
      question: "Which industry do you work in?",
      answer: "Post control and bed maintenance ",
      attachments: [],
    },
    {
      id: 2,
      question: "Do you have your own/Industry logo?",
      answer: "use one of those or combination for the aeration image.",
      attachments: [
        {
          name: "Image name 0123456789.JPG",
          url: thumbnail,
          size: 1245624,
        },
        {
          name: "Image name 0123456789.JPG",
          url: thumbnail,
          size: 1245624,
        },
      ],
    },
    {
      id: 3,
      question: "Do you have your own/Industry website?",
      answer: "www.website.com",
      attachments: [],
    },
    {
      id: 4,
      question: "Do you have your specific design size?",
      answer: "please use this image for fertilizing add please use",
      attachments: [],
    },
    {
      id: 5,
      question: "Do you have any imaginary or specific design ideas?",
      answer: "4.5x11 inch",
      attachments: [],
    },
    {
      id: 6,
      question:
        "You have to give clear information that you need in the design. (E.g. all texts, all photos, logo, contact info, etc.)",
      answer:
        "please use a combination of these for pest control and bed maintenance ads",
      attachments: [
        {
          name: "Image name 0123456789.JPG",
          url: thumbnail,
          size: 1245624,
        },
        {
          name: "Image name 0123456789.JPG",
          url: thumbnail,
          size: 1245624,
        },
        {
          name: "Image name 0123456789.JPG",
          url: thumbnail,
          size: 1245624,
        },
        {
          name: "Image name 0123456789.JPG",
          url: thumbnail,
          size: 1245624,
        },
      ],
    },
  ];

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

  return (
    <>
      <h1 className="mb-5 text-xl font-bold text-primary">
        PROJECT REQUIREMENTS
      </h1>
      <div>
        {requirements?.map((faq, index) => (
          <div key={index} className="my-8 flex items-start gap-3">
            <span className="shrink-0 font-semibold text-primary">
              {index + 1}.
            </span>
            <div>
              <h1 className="font-semibold">{faq?.question}</h1>
              <p className="my-1">{faq?.answer}</p>
              {faq?.attachments?.length > 0 && (
                <div>
                  {faq.attachments.length > 3 && (
                    <Link
                      onClick={() => handleDownloadAll(faq.attachments)}
                      className="mt-2 font-medium text-primary"
                    >
                      Download All
                    </Link>
                  )}
                  <div className="mt-3 grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4">
                    {faq?.attachments?.map((att, index) => (
                      <div key={index}>
                        <img
                          src={att.url}
                          alt=""
                          className="h-[100px] w-full object-cover sm:h-[180px]"
                        />
                        <a
                          href={att.url}
                          download={att.name}
                          className="mt-2 flex items-center justify-center text-xs"
                        >
                          <BiDownload className="shrink-0 text-lg text-primary" />
                          <p
                            className="mx-2 line-clamp-1 font-medium"
                            title={att.name}
                          >
                            {att.name}
                          </p>
                          <span className="shrink-0 text-black/50">
                            ({formatFileSize(att.size)})
                          </span>
                        </a>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
        {user?.role !== "USER" && (
          <button className="rounded-[30px] bg-primary px-4 py-2 text-base font-semibold text-white sm:text-lg">
            Start The Project
          </button>
        )}
      </div>
    </>
  );
};

export default OrderRequirementsDetails;
