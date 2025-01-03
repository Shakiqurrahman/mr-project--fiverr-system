import axios from "axios";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { FaEye } from "react-icons/fa";
import { ImPlus } from "react-icons/im";
import { RiDeleteBin6Line } from "react-icons/ri";
import { RxCross2 } from "react-icons/rx";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setPreviewImage } from "../Redux/features/previewImageSlice";
import { configApi } from "../libs/configApi";

// CreateCategory Component
function CreateCategory() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // Form State
  const [form, setForm] = useState({
    categoryName: "",
    categoryImage: {
      name: "",
      url: "",
      watermark: "",
    },
  });

  const [subCategory, setSubcategory] = useState([
    {
      subTitle: "",
      subAmount: "",
      regularDeliveryDays: "",
      fastDeliveryDays: "",
      fastDeliveryPrice: "",
    },
  ]);

  const addSubcategory = () => {
    setSubcategory([
      ...subCategory,
      {
        subTitle: "",
        subAmount: "",
        regularDeliveryDays: "",
        fastDeliveryDays: "",
        fastDeliveryPrice: "",
      },
    ]);
  };

  const handleSubCategoryRemove = (index) => {
    setSubcategory(subCategory.filter((_, i) => i !== index));
  };

  const [uploading, setUploading] = useState(false);

  const [bullets, setBullets] = useState([
    "Unlimited Revision",
    "PSD Source file",
  ]);

  const [newBullet, setNewBullet] = useState("");

  const [requirements, setRequirements] = useState([
    "Which industry do you work in?",
    "Do you have your own company logo?",
    "",
  ]);

  const handleChange = (e, index) => {
    if (index !== undefined) {
      const updatedSubCategories = [...subCategory];
      updatedSubCategories[index] = {
        ...updatedSubCategories[index],
        [e.target.name]: e.target.value,
      };
      setSubcategory(updatedSubCategories);
    } else {
      setForm({ ...form, [e.target.name]: e.target.value });
    }
  };

  const handleFileChange = async (event) => {
    const file = event.target.files[0];

    if (file) {
      const formData = new FormData();
      // formData.append("image", file);
      formData.append("files", file);

      // const apiKey = "7a4a20aea9e7d64e24c6e75b2972ff00";
      // const uploadUrl = `https://api.imgbb.com/1/upload?key=${apiKey}`;
      const uploadUrl = `${configApi.api}upload-attachment-optimized`;

      try {
        setUploading(true);
        const response = await axios.post(uploadUrl, formData);
        const imageUrl = response.data.data.file.optimizedUrl;
        const watermark = response.data.data.file.url;

        // Update the form state with the new image URL
        setForm((prevForm) => ({
          ...prevForm,
          categoryImage: {
            name: file.name,
            url: imageUrl,
            watermark,
          },
        }));

        // Optionally, you can also store this data in localStorage if needed
        // localStorage.setItem("profileData", JSON.stringify({ ...form, categoryImage: imageUrl }));
      } catch (error) {
        toast.error("Something went wrong!");
        // You can use a library like react-toastify to display error messages
        // toast.error("Failed to upload image");
      } finally {
        setUploading(false);
      }
    }
  };

  const handleImgPreview = () => {
    if (form.categoryImage.url) {
      dispatch(setPreviewImage(form.categoryImage.url));
    }
  };

  const addBullet = () => {
    if (newBullet.trim() === "") return;
    setBullets([...bullets, newBullet]);
    setNewBullet("");
  };

  const removeBullet = (index) => {
    setBullets(bullets.filter((_, i) => i !== index));
  };

  const createBulletEventHandler = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addBullet();
    }
  };

  const addRequirements = () => {
    setRequirements([...requirements, ""]);
  };

  const deleteRequirements = (index) => {
    setRequirements(requirements.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (subCategory.length === 0) {
      toast.error("At Least One SubCategory Needed to Create Category!!!");
      return false;
    }
    const data = {
      categoryName: form.categoryName,
      image: form.categoryImage,
      subCategory,
      bulletPoint: bullets,
      requirements: requirements.filter((req) => req.trim() !== ""),
    };
    // Here you can handle form submission, e.g., by sending the data to your backend
    try {
      const api = `${configApi.api}category/create`;
      const response = await axios.post(api, data);

      if (response.data.success) {
        navigate("/pricelist");
      }
    } catch (error) {
      toast.error("Something went wrong!");
    }
  };

  return (
    <div className="max-width mt-5">
      <form className="mx-auto w-full max-w-[800px]" onSubmit={handleSubmit}>
        {/* Category */}
        <div className="bg-lightskyblue">
          <h1 className="bg-primary p-3 text-white">Category</h1>
          <div className="p-3">
            <input
              type="text"
              name="categoryName"
              value={form.categoryName}
              onChange={handleChange}
              placeholder="Category Name"
              className="mt-3 block w-full border border-solid border-[#e7e7e7] bg-white p-2 outline-none"
              required
            />
          </div>
        </div>

        {/* Image */}
        <div className="mt-10 bg-lightskyblue">
          <h1 className="flex items-center justify-between bg-primary p-3 text-white">
            Image{" "}
            <button type="button" onClick={handleImgPreview}>
              <FaEye className="text-2xl" />
            </button>
          </h1>
          <input
            type="file"
            name="image"
            id="image"
            className="file-input"
            onChange={handleFileChange}
            disabled={uploading} // Disable while uploading
          />
          {uploading && <p>Uploading...</p>}
        </div>

        {/* Subcategory */}
        <div className="mt-5 bg-lightskyblue">
          <div className="flex items-center justify-between bg-primary p-3 text-white">
            <h1 className="">Subcategory</h1>
            <ImPlus onClick={addSubcategory} />
          </div>
          <div className="pb-3">
            {subCategory.map((input, index) => (
              <SubCategory
                key={index}
                input={input}
                index={index}
                handleChange={handleChange}
                subCategoryLength={subCategory.length}
                handleSubCategoryRemove={(index) =>
                  handleSubCategoryRemove(index)
                }
              />
            ))}
          </div>
        </div>

        {/* Bullets */}
        <div className="mt-5 bg-lightskyblue">
          <h1 className="bg-primary p-3 text-white">Bullet Point</h1>
          <div className="p-3">
            <div className="mt-2 flex flex-wrap gap-2">
              {bullets.map((bullet, index) => (
                <small
                  key={index}
                  className="flex items-center gap-2 rounded-sm bg-white p-2"
                >
                  {bullet}
                  <RxCross2
                    className="text-red-600"
                    onClick={() => removeBullet(index)}
                  />
                </small>
              ))}
              <input
                type="text"
                placeholder="Add new bullet"
                value={newBullet}
                onChange={(e) => setNewBullet(e.target.value)}
                onKeyDown={createBulletEventHandler}
                className="bg-transparent focus:outline-none"
              />
            </div>
          </div>
        </div>

        {/* Requirements */}
        <div className="mt-5 bg-lightskyblue">
          <div className="flex justify-between bg-primary p-3 text-white">
            <h1 className="">Requirements</h1>
            <ImPlus onClick={addRequirements} />
          </div>
          <div className="p-3">
            {requirements.map((requirement, index) => (
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
                  className="block w-full border border-solid border-[#e7e7e7] bg-white p-2 outline-none"
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
          {/* Submit */}
          <button
            type="submit"
            className="mt-5 block w-1/2 max-w-[200px] rounded-3xl bg-primary p-3 text-center text-white"
          >
            Create
          </button>
          {/* cancel */}
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="mt-5 block w-1/2 max-w-[200px] rounded-3xl bg-revision p-3 text-center text-white"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

// SubCategory Component
function SubCategory({
  input,
  index,
  handleChange,
  subCategoryLength,
  handleSubCategoryRemove,
}) {
  return (
    <div className="flex items-start gap-2 px-3">
      <div className="relative w-full shrink">
        <input
          type="text"
          name="subTitle"
          value={input.subTitle}
          onChange={(e) => handleChange(e, index)}
          placeholder="Subcategory Title"
          className="mt-3 block w-full border border-solid border-[#e7e7e7] bg-white p-2 outline-none"
          required
        />
        <input
          type="text"
          name="subAmount"
          value={input.subAmount}
          onChange={(e) => handleChange(e, index)}
          placeholder="Subcategory Amount"
          className="mt-3 block w-full border border-solid border-[#e7e7e7] bg-white p-2 outline-none"
          required
        />
        <input
          type="text"
          name="regularDeliveryDays"
          value={input.regularDeliveryDays}
          onChange={(e) => handleChange(e, index)}
          placeholder="Regular Delivery Days"
          className="mt-3 block w-full border border-solid border-[#e7e7e7] bg-white p-2 outline-none"
          required
        />
        <div className="flex">
          <input
            type="text"
            name="fastDeliveryDays"
            value={input.fastDeliveryDays}
            onChange={(e) => handleChange(e, index)}
            placeholder="Fast Delivery Days"
            className="mt-3 block w-full flex-grow border border-solid border-[#e7e7e7] bg-white p-2 outline-none"
            required
          />
          <input
            type="text"
            name="fastDeliveryPrice"
            value={input.fastDeliveryPrice}
            onChange={(e) => handleChange(e, index)}
            placeholder="F.D. Amount"
            className="mt-3 block w-56 border border-solid border-[#e7e7e7] bg-white p-2 outline-none"
            required
          />
        </div>

        {/* Conditionally render the divider */}
        {index !== subCategoryLength - 1 && (
          <div className="mt-4 border-b border-gray-300" />
        )}
      </div>
      <button
        type="button"
        className="mt-5 shrink-0 text-black/50"
        onClick={() => handleSubCategoryRemove(index)}
      >
        <RiDeleteBin6Line size={16} />
      </button>
    </div>
  );
}

export default CreateCategory;
