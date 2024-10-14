import axios from "axios";
import { useRef, useState } from "react";
import { CgAttachment } from "react-icons/cg";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import CircleProgressBar from "../components/CircleProgressBar";
import FilePreview from "../components/FilePreview";
import { configApi } from "../libs/configApi";
import formatFileSize from "../libs/formatFileSize";
import { useStartContactForChatMutation } from "../Redux/api/inboxApiSlice";

function Contact() {
  const navigate = useNavigate();
  const [createContract, { isLoading, error }] =
    useStartContactForChatMutation();
  const [value, setValue] = useState({
    name: "",
    email: "",
    link: "",
    Message: "",
  });
  const textarea = useRef();

  const handleChange = (e) => {
    setValue({
      ...value,
      [e.target.name]: e.target.value,
    });
  };

  // Image Uploading Works
  const [matchingImages, setMatchingImages] = useState([]);
  // const [errorImg, setErrorImg] = useState(null);
  const fileInputRef = useRef(); // Add a ref for the file input

  const getImagesWithDimensions = (files) => {
    const handleImageLoad = async (file, index) => {
      console.log(file);
      const formData = new FormData();
      formData.append("image", file);

      const uploadUrl = `${configApi.api}upload-image`;

      const uploadData = {
        name: file.name,
        size: file.size,
        progress: 0,
        url: null,
        type: file.type,
        format: null,
      };

      setMatchingImages((prev) => [...prev, uploadData]); // Add the new upload

      try {
        const response = await axios.post(uploadUrl, formData, {
          onUploadProgress: (data) => {
            const percentage = Math.round((data.loaded / data.total) * 100);
            setMatchingImages((prev) => {
              const newImages = [...prev];
              newImages[index].progress = percentage; // Update progress
              return newImages;
            });
          },
        });

        // Update image data upon successful upload
        const imageUrl = response.data.data[0].result.url;
        const fileFormat = response.data.data[0].result.format;
        setMatchingImages((prev) => {
          const newImages = [...prev];
          newImages[index] = {
            ...newImages[index],
            url: imageUrl,
            progress: 100,
            format: fileFormat,
          }; // Set URL and progress to 100%
          return newImages;
        });
      } catch (error) {
        console.error("Error uploading image:", error);
      }
    };

    Array.from(files).forEach((file, i) => {
      const index = matchingImages?.length + i;
      handleImageLoad(file, index);
    }); // Process each file
  };

  const handleFileChange = (event) => {
    const files = Array.from(event.target.files);
    getImagesWithDimensions(files);
  };

  const handleImageRemove = (index) => {
    setMatchingImages((prevImages) => {
      const newImages = prevImages.filter((_, i) => i !== index);
      return newImages;
    });

    // Reset the file input to allow re-uploading the same file
    fileInputRef.current.value = null;
  };

  // Form Submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await createContract({
      name: value.name,
      email: value.email,
      websiteOrFacebook: value.link,
      message: value.Message,
      exampleDesign: matchingImages,
    }).unwrap();
    console.log(res, value.Message);
    navigate("/inbox");
  };

  const handleKeyUp = (e) => {
    textarea.current.style.height = `${e.target.scrollHeight}px`;
  };
  return (
    <div className="max-width">
      <h1 className="mx-auto mt-[40px] max-w-[700px] text-center text-2xl">
        If you have any questions or inquiries about our services, please feel
        free to contact us by filling out this form.
      </h1>

      <form
        onSubmit={handleSubmit}
        className="mx-auto mt-10 max-w-[800px] rounded-xl bg-lightskyblue p-5"
      >
        <input
          className="mt-5 block w-full border border-solid border-gray-400 p-3 text-base outline-0"
          type="text"
          name="name"
          value={value.name}
          placeholder="Name"
          onChange={handleChange}
        />
        <input
          className="mt-5 block w-full border border-solid border-gray-400 p-3 text-base outline-0"
          type="email"
          name="email"
          value={value.email}
          placeholder="Email"
          onChange={handleChange}
        />
        <input
          className="mt-5 block w-full border border-solid border-gray-400 p-3 text-base outline-0"
          type="text"
          name="link"
          value={value.link}
          placeholder="Website/Facebook"
          onChange={handleChange}
        />
        <input
          name="file"
          type="file"
          multiple
          id="file"
          hidden
          ref={fileInputRef} // Attach the ref to the file input
          onChange={handleFileChange}
        />
        <label
          className="mt-5 flex w-full cursor-pointer items-center justify-between border border-solid border-gray-400 bg-white p-3"
          htmlFor="file"
        >
          <span className="text-gray-400">Example design</span>
          <CgAttachment className="text-gray-400" />
        </label>

        <div className="preview-scroll-overflow-x mt-5 flex gap-2">
          {matchingImages.map((image, index) => (
            <div key={index} className="w-[120px]">
              <div className="group relative">
                {image.url ? (
                  <FilePreview file={image} />
                ) : (
                  <div className="flex h-[100px] items-center justify-center bg-lightcream">
                    <CircleProgressBar
                      precentage={image.progress}
                      circleWidth={50}
                    />
                  </div>
                )}
                {(image?.url || image?.progress === 100) && (
                  <button
                    type="button"
                    className="absolute right-2 top-2 rounded-full bg-black bg-opacity-50 p-1 text-white opacity-0 transition-opacity group-hover:opacity-100"
                    onClick={() => handleImageRemove(index)}
                  >
                    <RiDeleteBin6Line size={20} />
                  </button>
                )}
              </div>
              <h1 className="truncate text-xs font-medium" title={image.name}>
                {image.name}
              </h1>
              <span className="text-xs">({formatFileSize(image.size)})</span>
            </div>
          ))}
        </div>

        <textarea
          name="Message"
          className="cusotomTextarea mt-5 h-auto min-h-[100px] w-full border border-solid border-gray-400 p-3 text-base outline-none"
          value={value.Message}
          onChange={handleChange}
          placeholder="Message"
          ref={textarea}
          onKeyUp={handleKeyUp}
        ></textarea>

        <div className="mt-5 text-center">
          <button
            type="submit"
            className="scro w-[200px] bg-[#248EDA] p-3 text-[20px] font-medium text-white"
          >
            SUBMIT
          </button>
        </div>
      </form>
    </div>
  );
}

export default Contact;
