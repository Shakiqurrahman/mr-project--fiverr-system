import { Backdrop, CircularProgress } from "@mui/material";
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { FaEye, FaSpinner } from "react-icons/fa";
import { ImPlus } from "react-icons/im";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useFetchMultiProjectQuery } from "../Redux/api/multiProjectApiSlice";
import { useCreateMultipleProjectMutation } from "../Redux/api/uploadDesignApiSlice";
import { setPreviewImage } from "../Redux/features/previewImageSlice";
import { configApi } from "../libs/configApi";

const MultiProject = () => {
  const dispatch = useDispatch();
  const { data, isLoading } = useFetchMultiProjectQuery();
  const imageRef = useRef(null);
  const navigate = useNavigate();
  const [submitLoading, setSubmitLoading] = useState(false);
  const [id, setId] = useState("");
  const [projectTitle, setProjectTitle] = useState("");
  const [projectImage, setProjectImage] = useState(null);
  const [selectImage, setSelectImage] = useState(null);
  const [requirements, setRequirements] = useState([
    "Which industry do you work in?",
    "Do you have your own company logo?",
    "",
  ]);

  const [createMultiProject] = useCreateMultipleProjectMutation();

  useEffect(() => {
    if (data) {
      const existingData = data[0];
      setId(existingData?.id || "");
      setProjectTitle(existingData?.projectTitle || "");
      setProjectImage(existingData?.projectImage || null);
      setRequirements(
        existingData?.requirements || [
          "Which industry do you work in?",
          "Do you have your own company logo?",
          "",
        ],
      );
    }
  }, [data]);

  const handleImageChange = (e) => {
    if (imageRef.current) {
      const file = Array.from(e.target.files)[0];
      setSelectImage(file);
      setProjectImage({
        name: file.name,
        url: URL.createObjectURL(file),
      });
      imageRef.current.value = "";
    }
  };

  const handleOpenPreviewImage = () => {
    dispatch(setPreviewImage(projectImage?.url));
  };

  const addRequirements = () => {
    setRequirements([...requirements, ""]);
  };

  const deleteRequirements = (index) => {
    setRequirements(requirements.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if all required fields are filled
    if (projectTitle && requirements && projectImage) {
      const reqArray = requirements?.filter((i) => i);

      const formData = new FormData();

      // Check if a new image is selected
      if (selectImage) {
        formData.append("files", selectImage);
      }

      const uploadUrl = `${configApi.api}upload-attachment-optimized`;

      try {
        setSubmitLoading(true);

        let imageObj = null;

        // Only upload a new image if one is selected
        if (selectImage) {
          const response = await axios.post(uploadUrl, formData);

          if (response.data.success) {
            const name = selectImage?.name;
            const imageUrl = response.data.data.file.optimizedUrl;
            const watermark = response.data.data.file.url;

            imageObj = {
              url: imageUrl,
              name,
            };
          } else {
            toast.error("Image upload failed");
          }
        } else {
          // If no new image, use existing image
          imageObj = projectImage; // Assuming projectImage contains the existing image data
        }

        // Prepare the data to update
        const data = {
          id,
          projectTitle,
          projectImage: imageObj,
          requirements: reqArray,
        };

        const res = await createMultiProject(data).unwrap();
        setId(res?.data?.id);
        setProjectTitle(res?.data?.projectTitle);
        setProjectImage(res?.data?.projectImage);
        setRequirements(res?.data?.requirements);
        setSubmitLoading(false);
        toast.success("Successfully Saved!");
      } catch (error) {
        setSubmitLoading(false);
        toast.error("Failed to upload image or update project");
      }
    } else {
      toast.error("All Fields are Required!!!");
    }
  };

  return (
    <div className="max-width my-16">
      {isLoading && (
        <Backdrop
          sx={{
            color: "#fff",
            zIndex: (theme) => theme.zIndex.drawer + 1,
          }}
          open
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      )}
      <form className="mx-auto w-full max-w-[800px]" onSubmit={handleSubmit}>
        {/* Project Title */}
        <div className="bg-lightskyblue">
          <h1 className="bg-primary p-3 text-white">Project Title</h1>
          <div className="p-3">
            <input
              type="text"
              name="categoryName"
              value={projectTitle}
              onChange={(e) => setProjectTitle(e.target.value)}
              placeholder="Project Name"
              className="mt-3 block w-full border border-solid border-[#e7e7e7] bg-white p-2 text-base outline-none"
              required
            />
          </div>
        </div>

        {/* Project Image */}
        <div className="mt-5 bg-lightskyblue">
          <div className="flex items-center justify-between gap-3 bg-primary p-3 text-white">
            <h1>Project Image</h1>
            <button type="button" onClick={handleOpenPreviewImage}>
              <FaEye className="text-2xl" />
            </button>
          </div>
          <input
            ref={imageRef}
            type="file"
            name="image"
            id="image"
            hidden
            onChange={handleImageChange}
          />
          <div className="flex items-stretch">
            <label
              htmlFor="image"
              className="block flex-shrink-0 bg-[#7c7c7c] px-4 py-2 text-sm text-white sm:text-base"
            >
              CHOOSE FILE
            </label>
            <div className="overflow-hidden text-ellipsis whitespace-nowrap px-4 py-2">
              {projectImage?.name || "No file chosen"}
            </div>
          </div>
        </div>

        {/* Project Requirements */}
        <div className="mt-5 bg-lightskyblue">
          <div className="flex items-center justify-between bg-primary p-3 text-white">
            <h1 className="">Project Requirements</h1>
            <ImPlus onClick={addRequirements} />
          </div>
          <div className="p-3">
            {requirements?.map((requirement, index) => (
              <div key={index} className="mb-2 flex items-center gap-2">
                <input
                  type="text"
                  placeholder="Type"
                  value={requirement}
                  onChange={(e) => {
                    const newRequirements = [...requirements];
                    newRequirements[index] = e.target.value;
                    setRequirements(newRequirements);
                  }}
                  className="block w-full border border-solid border-[#e7e7e7] bg-white p-2 text-base outline-none"
                />
                <RiDeleteBin6Line
                  className="cursor-pointer text-gray-500"
                  onClick={() => deleteRequirements(index)}
                />
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-center gap-5">
          <button
            type="submit"
            disabled={submitLoading}
            className="mt-5 flex h-[45px] w-1/2 max-w-[200px] items-center justify-center rounded-3xl bg-primary text-white disabled:cursor-not-allowed"
          >
            {submitLoading ? (
              <span className="animate-spin text-xl">
                <FaSpinner />
              </span>
            ) : (
              "Save"
            )}
          </button>
          <button
            type="button"
            onClick={() => navigate(-1)}
            disabled={submitLoading}
            className="mt-5 flex h-[45px] w-1/2 max-w-[200px] items-center justify-center rounded-3xl bg-revision text-white disabled:cursor-not-allowed"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default MultiProject;
