import axios from "axios";
import { useEffect, useState } from "react";
import { FaSpinner } from "react-icons/fa";
import { RxCross2 } from "react-icons/rx";
import { useDispatch, useSelector } from "react-redux";
import Check from "../assets/svg/Check";
import { configApi } from "../libs/configApi";
import { fetchCategory } from "../Redux/features/category/categoryApi";

function UploadDesign() {
  const dispatch = useDispatch();
  const { loading, category, error } = useSelector((state) => state.category);
  const [submitLoading, setSubmitLoading] = useState(false);

  // initial state of form
  const [form, setForm] = useState({
    title: "",
    description: "",
    size: "",
    fileFormat: "",
    images: "",
    thumbnail: "",
  });

  // Sample data for categories and subcategories
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [subCategories, setSubCategories] = useState([]);
  const [selectedSubCategory, setSelectedSubCategory] = useState("");

  // category fetching

  useEffect(() => {
    dispatch(fetchCategory());
  }, [dispatch]);

  // updating categories with database
  useEffect(() => {
    setCategories(category);
  }, [category, setCategories]);

  // updating subCategories using category state
  useEffect(() => {
    if (selectedCategory) {
      const fetchSubCategory = categories.filter(
        (cat) => cat.categoryName === selectedCategory,
      )[0].subCategory;
      setSubCategories(fetchSubCategory);
    }
  }, [categories, selectedCategory]);

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
    setSelectedSubCategory("");
  };

  const handleSubCategoryChange = (e) => {
    setSelectedSubCategory(e.target.value);
  };

  // Image Operations
  const [selectedImages, setSelectedImages] = useState([]);

  const handleImageUpload = async (e) => {
    const files = Array.from(e.target.files);
    const imagesPromise = files.map(async (file, index) => {
      if (file) {
        const formData = new FormData();
        formData.append("image", file);

        const apiKey = "7a4a20aea9e7d64e24c6e75b2972ff00";
        const uploadUrl = `https://api.imgbb.com/1/upload?key=${apiKey}`;
        try {
          // setUploading(true);
          const response = await axios.post(uploadUrl, formData);
          const name = response.data.data.title;
          const imageUrl = response.data.data.url;

          // Update the form state with the new image URL
          const value = selectedImages.length + index;
          return {
            url: imageUrl,
            name,
            thumbnail: selectedImages.length === 0 && index === 0,
            value,
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
    setSelectedImages((prevImages) => [...prevImages, ...images]);
  };

  const handleImageRemove = (index) => {
    setSelectedImages((prevImages) =>
      prevImages
        .filter((_, i) => i !== index)
        .map((v, i) => ({ ...v, value: i })),
    );
  };

  const handleRadioChange = (e) => {
    const selectedValue = parseInt(e.target.value, 10);
    setSelectedImages((prevImages) =>
      prevImages.map((obj) => ({
        ...obj,
        thumbnail: obj.value === selectedValue,
      })),
    );
  };

  // Tags Operations
  const [tags, setTags] = useState([]);
  const removeTag = (indexToRemove, e) => {
    e.preventDefault();
    setTags((prevTags) =>
      prevTags.filter((_, index) => index !== indexToRemove),
    );
  };

  const [newTag, setNewTag] = useState("");

  const addTag = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (newTag) {
        setTags([...tags, newTag]);
        setNewTag("");
      }
    }
  };
  // Related Designs Operations
  const [relatedTags, setRelatedTags] = useState([]);
  const removeRelatedTag = (indexToRemove, e) => {
    e.preventDefault();
    setRelatedTags((prevTag) =>
      prevTag.filter((_, index) => index !== indexToRemove),
    );
  };

  const addRelatedTag = (e) => {
    e.preventDefault();
    const isFound = relatedTags.find((value) => value === e.target.value);
    if (!isFound) {
      setRelatedTags([...relatedTags, e.target.value]);
    }
  };

  // Folder Operations
  const [newFolder, setNewFolder] = useState("");

  const addNewFolder = (e) => {
    e.preventDefault();
    setNewFolder(e.target.value);
  };

  // SubFolder Operations
  const [newSubFolder, setNewSubFolder] = useState("");

  const addNewSubFolder = (e) => {
    e.preventDefault();
    setNewSubFolder(e.target.value);
  };

  // Industries Operations
  const [industries, setIndustries] = useState([]);
  const removeIndustrie = (indexToRemove, e) => {
    e.preventDefault();
    setIndustries((prevTags) =>
      prevTags.filter((_, index) => index !== indexToRemove),
    );
  };

  const [newIndustrie, setNewIndustrie] = useState("");

  const addIndustrie = (e) => {
    e.preventDefault();
    const isFound = industries.find((value) => value === e.target.value);
    if (!isFound) {
      setIndustries([...industries, e.target.value]);
    }
  };

  const addNewIndusTrie = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (newIndustrie) {
        setIndustries([...industries, newIndustrie]);
        setNewIndustrie("");
      }
    }
  };

  // Designs Operations
  const [designs, setDesigns] = useState([]);
  const removeDesign = (indexToRemove, e) => {
    e.preventDefault();
    setDesigns((prevTags) =>
      prevTags.filter((_, index) => index !== indexToRemove),
    );
  };

  const [newDesign, setNewDesign] = useState("");

  const addDesign = (e) => {
    e.preventDefault();
    const isFound = designs.find((value) => value === e.target.value);
    if (!isFound) {
      setDesigns([...designs, e.target.value]);
    }
  };

  const addNewDesign = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (newDesign) {
        setDesigns([...designs, newDesign]);
        setNewDesign("");
      }
    }
  };

  // Global Operations
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    setSubmitLoading(true);
    e.preventDefault();
    const data = {
      title: form.title,
      description: form.description,
      category: selectedCategory,
      subCategory: selectedSubCategory,
      fileFormat: form.fileFormat,
      size: form.size,
      images: selectedImages,
      tags,
      relatedDesigns: relatedTags,
      folder: newFolder,
      subFolder: newSubFolder,
      industries,
      designs,
    };
    try {
      const url = `${configApi.api}upload/create`;

      const response = await axios.post(url, data);

      if (response.data.success) {
        console.log(response.data);
      }
    } catch (error) {
      console.log(error);
    }
    setSubmitLoading(false);
  };

  return (
    <div className="max-width mt-10 sm:mt-20">
      <div className="mx-auto max-w-[1000px] bg-lightskyblue py-5">
        <h1 className="m-auto block w-56 rounded-full border border-primary px-4 py-2 text-center text-lg font-bold text-primary">
          Upload Design
        </h1>
        <form action="" className="p-3" onSubmit={handleSubmit}>
          <div className="flex flex-col">
            <label className="block px-2">Title</label>
            <input
              type="text"
              name="title"
              className="mt-3 block w-full border border-solid border-[#e7e7e7] bg-white p-2 outline-none"
              onChange={handleChange}
              required
            />
            <p className="mt-2 hidden px-2 text-xs text-red-600">
              There was an error!
            </p>
          </div>
          <div className="mt-2 flex flex-col">
            <label className="block px-2">Description</label>
            <textarea
              type="text"
              name="description"
              className="mt-3 block h-[150px] w-full border border-solid border-[#e7e7e7] bg-white p-2 outline-none"
              onChange={handleChange}
              required
            ></textarea>
            <p className="mt-2 hidden px-2 text-xs text-red-600">
              There was an error!
            </p>
          </div>
          <div className="mt-2 flex flex-col gap-2 md:flex-row">
            <div className="w-full">
              <label className="block px-2">Category</label>
              <select
                disabled={loading}
                name="category"
                className="mt-3 block min-h-11 w-full border border-solid border-[#e7e7e7] bg-white p-2 outline-none"
                value={selectedCategory}
                onChange={handleCategoryChange}
              >
                <option value={""}>Select Category</option>
                {categories.length > 0 &&
                  categories.map((item) => (
                    <option key={item.id} value={item.categoryName}>
                      {item.categoryName}
                    </option>
                  ))}
              </select>
              <p className="mt-2 hidden px-2 text-xs text-red-600">
                There was an error!
              </p>
            </div>
            <div className="w-full">
              <label className="block px-2">Subcategory</label>
              <select
                disabled={loading}
                name="subcategory"
                className="custom-arrow mt-3 block min-h-11 w-full border border-solid border-[#e7e7e7] bg-white p-2 outline-none"
                value={selectedSubCategory}
                onChange={handleSubCategoryChange}
              >
                <option value="">Select Subcategory</option>
                {subCategories.map((sub) => (
                  <option key={sub.id} value={sub.subTitle}>
                    {sub.subTitle}
                  </option>
                ))}
              </select>
              <p className="mt-2 hidden px-2 text-xs text-red-600">
                There was an error!
              </p>
            </div>
          </div>
          <div className="mt-2 flex flex-col gap-2 md:flex-row">
            <div className="w-full">
              <label className="block px-2">Size</label>
              <input
                type="text"
                name="size"
                className="mt-3 block w-full border border-solid border-[#e7e7e7] bg-white p-2 outline-none"
                onChange={handleChange}
                required
              />
              <p className="mt-2 hidden px-2 text-xs text-red-600">
                There was an error!
              </p>
            </div>
            <div className="w-full">
              <label className="block px-2">File Format</label>
              <input
                type="text"
                name="fileFormat"
                className="mt-3 block w-full border border-solid border-[#e7e7e7] bg-white p-2 outline-none"
                onChange={handleChange}
                required
              />
              <p className="mt-2 hidden px-2 text-xs text-red-600">
                There was an error!
              </p>
            </div>
          </div>
          <div className="mt-2 flex flex-col">
            <label className="block px-2 pt-2">Image</label>
            <input
              name="images"
              type="file"
              id="images"
              onChange={handleImageUpload}
              accept="image/*"
              multiple
              hidden
            />
            <label
              htmlFor="images"
              className="mt-2 block w-full cursor-pointer border border-solid bg-white p-3 text-center"
            >
              Upload Images
            </label>
            <p className="mt-2 hidden px-2 text-xs text-red-600">
              There was an error!
            </p>
            <div className="mt-5 grid grid-cols-1 gap-3 md:grid-cols-2">
              {selectedImages.map((item, index) => (
                <div key={index} className="flex items-start gap-3 p-2">
                  <div>
                    <input
                      type="radio"
                      name="thumbnail"
                      className="peer"
                      hidden
                      value={item.value} // Set the value as the image name
                      id={`thumbnail-${index}`}
                      onChange={handleRadioChange}
                      checked={item.thumbnail} // Check if this is the selected image
                    />
                    <label
                      htmlFor={`thumbnail-${index}`}
                      className="flex h-[20px] w-[20px] cursor-pointer items-center justify-center border border-solid border-primary bg-white *:opacity-0 peer-checked:*:opacity-100"
                    >
                      <Check className="h-[14px] sm:h-[18px]" />
                    </label>
                  </div>
                  <img
                    src={item.url}
                    alt={item.name}
                    className="h-[100px] w-[150px] object-cover"
                  />
                  <h1 className="flex-grow">{item.name}</h1>
                  <button
                    type="button"
                    className="grid min-h-6 min-w-6 place-content-center rounded-full border border-slate-500"
                    onClick={() => handleImageRemove(index)}
                  >
                    <RxCross2 className="text-slate-500" />
                  </button>
                </div>
              ))}
            </div>
          </div>
          <div className="mt-2 flex flex-col">
            <label className="block px-2">Tags</label>
            <div className="mt-3 flex w-full flex-wrap gap-2 border border-solid border-[#e7e7e7] bg-white p-2 outline-none">
              {tags.map((item, index) => (
                <span
                  key={index}
                  className="flex items-center gap-2 rounded-full bg-[#FFEFEF] px-2 py-1 text-sm"
                >
                  {item}
                  <button
                    className="rounded-full bg-white p-1"
                    onClick={(e) => removeTag(index, e)}
                  >
                    <RxCross2 className="h-3 w-3 text-slate-700" />
                  </button>
                </span>
              ))}
              <input
                type="text"
                name="tag"
                placeholder="Add tag"
                className="outline-none"
                value={newTag}
                onChange={(e) => setNewTag(e.target.value)}
                onKeyDown={addTag}
              />
            </div>
          </div>
          <div className="mt-5 flex flex-col">
            <label className="block px-2">Related Designs</label>
            <div className="mt-3 flex min-h-[46px] w-full flex-wrap gap-2 border border-solid border-[#e7e7e7] bg-white p-2 outline-none">
              {relatedTags.map((item, index) => (
                <span
                  key={index}
                  className="flex items-center gap-2 rounded-full bg-[#FFEFEF] px-2 py-1 text-sm"
                >
                  {item}
                  <button
                    className="rounded-full bg-white p-1"
                    onClick={(e) => removeRelatedTag(index, e)}
                  >
                    <RxCross2 className="h-3 w-3 text-slate-700" />
                  </button>
                </span>
              ))}
            </div>
            <div className="mt-3 flex flex-wrap gap-2">
              <button
                className="rounded-[30px] bg-lightcream px-4 py-1 text-sm"
                value={"MR1DN"}
                onClick={addRelatedTag}
              >
                MR1DN
              </button>
            </div>
          </div>
          <div className="flex flex-wrap gap-2 sm:flex-nowrap">
            <div className="mt-5 flex w-full flex-col sm:w-1/2">
              <label className="block px-2">Folder</label>
              <input
                type="text"
                name="folder"
                value={newFolder}
                onChange={(e) => setNewFolder(e.target.value)}
                className="mt-3 flex min-h-[46px] w-full flex-wrap gap-2 border border-solid border-[#e7e7e7] bg-white p-2 outline-none"
              />
              <div className="mt-3 flex flex-wrap gap-2">
                <button
                  className="rounded-[30px] bg-[#e7e7e7] px-3 py-1 text-xs"
                  value={"MR1DN"}
                  onClick={addNewFolder}
                >
                  MR1DN
                </button>
              </div>
            </div>
            <div className="mt-5 flex w-full flex-col sm:w-1/2">
              <label className="block px-2">Subfolder</label>
              <input
                type="text"
                name="subFolder"
                value={newSubFolder}
                onChange={addNewSubFolder}
                className="mt-3 flex min-h-[46px] w-full flex-wrap gap-2 border border-solid border-[#e7e7e7] bg-white p-2 outline-none"
              />
              <div className="mt-3 flex flex-wrap gap-2">
                <button
                  className="rounded-[30px] bg-lightcream px-3 py-1 text-xs"
                  value={"MR1DN"}
                  onClick={addNewSubFolder}
                >
                  MR1DN
                </button>
              </div>
            </div>
          </div>
          <div className="flex flex-wrap gap-2 sm:flex-nowrap">
            <div className="mt-5 flex w-full flex-col sm:w-1/2">
              <label className="block px-2">Industries</label>
              <div className="mt-3 flex min-h-[46px] w-full flex-wrap gap-2 border border-solid border-[#e7e7e7] bg-white p-2 outline-none">
                {industries.map((item, index) => (
                  <span
                    key={index}
                    className="flex items-center gap-2 rounded-full bg-[#FFEFEF] px-2 py-1 text-sm"
                  >
                    {item}
                    <button
                      className="rounded-full bg-white p-1"
                      onClick={(e) => removeIndustrie(index, e)}
                    >
                      <RxCross2 className="h-3 w-3 text-slate-700" />
                    </button>
                  </span>
                ))}
                <input
                  type="text"
                  name="industries"
                  className="outline-none"
                  placeholder="Add industries"
                  value={newIndustrie}
                  onChange={(e) => setNewIndustrie(e.target.value)}
                  onKeyDown={addNewIndusTrie}
                />
              </div>
              <div className="mt-3 flex flex-wrap gap-2">
                <button
                  className="rounded-[30px] bg-lightcream px-3 py-1 text-xs"
                  value={"MR1DN"}
                  onClick={addIndustrie}
                >
                  MR1DN
                </button>
              </div>
            </div>
            <div className="mt-5 flex w-full flex-col sm:w-1/2">
              <label className="block px-2">Designs</label>
              <div className="mt-3 flex min-h-[46px] w-full flex-wrap gap-2 border border-solid border-[#e7e7e7] bg-white p-2 outline-none">
                {designs.map((item, index) => (
                  <span
                    key={index}
                    className="flex items-center gap-2 rounded-full bg-[#FFEFEF] px-2 py-1 text-sm"
                  >
                    {item}
                    <button
                      className="rounded-full bg-white p-1"
                      onClick={(e) => removeDesign(index, e)}
                    >
                      <RxCross2 className="h-3 w-3 text-slate-700" />
                    </button>
                  </span>
                ))}
                <input
                  type="text"
                  name="design"
                  className="outline-none"
                  placeholder="Add Design"
                  value={newDesign}
                  onChange={(e) => setNewDesign(e.target.value)}
                  onKeyDown={addNewDesign}
                />
              </div>
              <div className="mt-3 flex flex-wrap gap-2">
                <button
                  className="rounded-[30px] bg-lightcream px-3 py-1 text-xs"
                  value={"MR1DN"}
                  onClick={addDesign}
                >
                  MR1DN
                </button>
              </div>
            </div>
          </div>
          <button
            type="submit"
            disabled={submitLoading}
            className="mx-auto mt-5 flex h-[45px] w-1/2 items-center justify-center rounded-3xl bg-primary text-white disabled:cursor-not-allowed"
          >
            {submitLoading ? (
              <span className="animate-spin text-xl">
                <FaSpinner />
              </span>
            ) : (
              "Upload"
            )}
          </button>
        </form>
      </div>
    </div>
  );
}

export default UploadDesign;
