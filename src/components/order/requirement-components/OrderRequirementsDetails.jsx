import React, { useEffect, useState } from "react";
import { BiDownload } from "react-icons/bi";
import { useSelector } from "react-redux";
import formatFileSize from "../../../libs/formatFileSize";

const OrderRequirementsDetails = () => {
  const { user } = useSelector((state) => state.user);
  const { projectDetails } = useSelector((state) => state.order);
  // Checking Admin
  const isAdmin = ["ADMIN", "SUPER_ADMIN", "SUB_ADMIN"].includes(user?.role);

  // All states here
  const [requirements, setRequirements] = useState([]);
  const [isOrderStartByAdmin, setIsOrderStartByAdmin] = useState(false);

  // all side effects here
  useEffect(() => {
    if (projectDetails?.isRequirementsFullFilled) {
      setRequirements(projectDetails?.requirements || []);
    }
  }, [projectDetails?.isRequirementsFullFilled, projectDetails?.requirements]);

  useEffect(() => {
    if (projectDetails) {
      const allAnswers = projectDetails?.requirements?.every(
        (item) => item?.answer,
      );
      if (!allAnswers && projectDetails?.isRequirementsFullFilled) {
        setIsOrderStartByAdmin(true);
      }
    }
  }, [projectDetails]);

  // handle download all button
  const handleDownloadAll = (files) => {
    files.forEach((file) => {
      // Use fetch to download the file as a Blob
      fetch(file.url)
        .then((response) => response.blob()) // Convert response to a Blob
        .then((blob) => {
          const link = document.createElement("a");
          const url = URL.createObjectURL(blob); // Create a URL for the Blob
          link.href = url;
          link.setAttribute("download", file.name); // Set the filename for download
          document.body.appendChild(link);
          link.click(); // Trigger the download
          document.body.removeChild(link); // Clean up after download
          URL.revokeObjectURL(url); // Clean up the object URL
        })
        .catch((error) => {
          console.error("Download failed");
        });
    });
  };

  const handleSingleDownload = (fileUrl, fileName) => {
    fetch(fileUrl)
      .then((response) => response.blob()) // Convert response to a Blob
      .then((blob) => {
        const link = document.createElement("a");
        const url = URL.createObjectURL(blob); // Create a URL for the Blob
        link.href = url;
        link.setAttribute("download", fileName); // Set the filename for download
        document.body.appendChild(link);
        link.click(); // Trigger the download
        document.body.removeChild(link); // Clean up after download
        URL.revokeObjectURL(url); // Clean up the object URL
      })
      .catch((error) => {
        console.error("Download failed");
      });
  };

  return (
    <>
      <h1 className="mb-5 text-xl font-bold text-primary">
        PROJECT REQUIREMENTS
      </h1>
      <div>
        {!isOrderStartByAdmin &&
          requirements?.map((faq, index) => (
            <div key={index} className="my-8 flex items-start gap-3">
              <span className="shrink-0 font-semibold text-primary">
                {index + 1}.
              </span>
              <div>
                <h1 className="font-semibold">{faq?.question}</h1>
                <p className="my-1 whitespace-pre-wrap">{faq?.answer}</p>
                {faq?.attachments?.length > 0 && (
                  <div>
                    {faq?.attachments?.length > 3 && (
                      <button
                        onClick={() => handleDownloadAll(faq?.attachments)}
                        className="mt-2 font-medium text-primary"
                      >
                        Download All
                      </button>
                    )}
                    <div className="mt-3 grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4">
                      {faq?.attachments?.map((att, index) => (
                        <div key={index}>
                          <img
                            src={att?.url}
                            alt=""
                            className="h-[100px] w-full object-cover sm:h-[180px]"
                          />
                          <button
                            onClick={() =>
                              handleSingleDownload(att?.url, att?.name)
                            }
                            className="mt-2 flex items-center justify-center text-xs"
                          >
                            <BiDownload className="shrink-0 text-lg text-primary" />
                            <p
                              className="mx-2 line-clamp-1 font-medium"
                              title={att?.name}
                            >
                              {att.name}
                            </p>
                            <span className="shrink-0 text-black/50">
                              ({formatFileSize(att.size)})
                            </span>
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        {isAdmin && !projectDetails?.isRequirementsFullFilled && (
          <button className="rounded-[30px] bg-primary px-4 py-2 text-base font-semibold text-white sm:text-lg">
            Start The Project
          </button>
        )}
      </div>
      {isOrderStartByAdmin && (
        <div className="text-lg font-medium">
          This Project Requirements Are Manually Submitted.
        </div>
      )}
    </>
  );
};

export default React.memo(OrderRequirementsDetails);
