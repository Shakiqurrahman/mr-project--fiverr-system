import axios from "axios";
import { useRef, useState } from "react";
import { CgAttachment } from "react-icons/cg";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
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
    const images = [];

    const handleImageLoad = (file, img) => {
      // if (img.width === 2700 && img.height === 2000) {
      images.push({
        file: file,
        url: img.src,
      });
      // }
      if (images.length === files.length) {
        setMatchingImages((prev) => [...prev, ...images]);
        // setErrorImg(null);
      }
      // else {
      //   setErrorImg("Resolution does not match. Expected 2700x2000");
      // }
    };

    const processFile = (file) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        const img = new Image();
        img.onload = () => {
          handleImageLoad(file, img);
        };
        img.src = event.target.result;
      };
      reader.readAsDataURL(file);
    };

    for (let i = 0; i < files.length; i++) {
      processFile(files[i]);
    }
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
    const imagesPromise = matchingImages?.map(async (file) => {
      if (file.file) {
        const formData = new FormData();
        formData.append("image", file.file);

        const apiKey = "7a4a20aea9e7d64e24c6e75b2972ff00";
        const uploadUrl = `https://api.imgbb.com/1/upload?key=${apiKey}`;
        try {
          // setUploading(true);
          const response = await axios.post(uploadUrl, formData);
          console.log(response);
          const name = file.file.name;
          const imageUrl = response.data.data.url;
          const size = response.data.data.size;

          return {
            url: imageUrl,
            name,
            size,
          };
        } catch (error) {
          console.error("Error uploading image:", error);
          // You can use a library like react-toastify to display error messages
          // toast.error("Failed to upload image");
        } finally {
          // setUploading(false);
        }
      }
    });
    const images = await Promise.all(imagesPromise);
    console.log(value, images);
    const res = await createContract({
      name: value.name,
      email: value.email,
      websiteOrFacebook: value.link,
      message: value.Message,
      exampleDesign: images,
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
        free to contact us by filling out this form
      </h1>

      <form
        onSubmit={handleSubmit}
        className="mx-auto mt-10 max-w-[800px] rounded-xl bg-[#FFEFEF] p-5"
      >
        <input
          className="mt-5 block w-full border border-solid border-gray-400 p-3 outline-0"
          type="text"
          name="name"
          value={value.name}
          placeholder="Name"
          onChange={handleChange}
        />
        <input
          className="mt-5 block w-full border border-solid border-gray-400 p-3 outline-0"
          type="email"
          name="email"
          value={value.email}
          placeholder="Email"
          onChange={handleChange}
        />
        <input
          className="mt-5 block w-full border border-solid border-gray-400 p-3 outline-0"
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
          className="mt-5 flex w-full cursor-pointer justify-between border border-solid border-gray-400 bg-white p-3"
          htmlFor="file"
        >
          <span className="text-gray-400">Example design</span>
          <CgAttachment className="text-gray-400" />
        </label>

        <div className="mt-5 flex gap-2 overflow-x-auto">
          {matchingImages.map((image, index) => (
            <div key={index} className="w-[120px]">
              <div className="group relative">
                <img
                  className={`h-[100px] w-full object-contain`}
                  src={image.url}
                  alt={`Selected ${index}`}
                />
                <button
                  type="button"
                  className="absolute right-2 top-2 rounded-full bg-black bg-opacity-50 p-1 text-white opacity-0 transition-opacity group-hover:opacity-100"
                  onClick={() => handleImageRemove(index)}
                >
                  <RiDeleteBin6Line size={20} />
                </button>
              </div>
              <h1
                className="truncate text-xs font-medium"
                title={image.file.name}
              >
                {image.file.name}
              </h1>
              <span className="text-xs">
                ({formatFileSize(image.file.size)})
              </span>
            </div>
          ))}
        </div>
        {/* {errorImg && <p className="text-sm text-red-600">{errorImg}</p>} */}

        <textarea
          name="Message"
          className="cusotomTextarea mt-5 h-auto min-h-[100px] w-full border border-solid border-gray-400 p-3 outline-none"
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
