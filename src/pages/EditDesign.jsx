import { Editor } from "@tinymce/tinymce-react";
import axios from "axios";
import { useEffect, useMemo, useRef, useState } from "react";
import { FaSpinner } from "react-icons/fa";
import { RxCross2 } from "react-icons/rx";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import {
  useFetchDesignsQuery,
  useFetchFoldersQuery,
  useFetchIndustriesQuery,
  useFetchRelatedTagsQuery,
  useFetchSubFoldersQuery,
} from "../Redux/api/uploadDesignApiSlice";
import { fetchCategory } from "../Redux/features/category/categoryApi";
import Check from "../assets/svg/Check";
import Datalist from "../components/Datalist";
import { configApi } from "../libs/configApi";

function EditDesign() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, category } = useSelector((state) => state.category);
  const [submitLoading, setSubmitLoading] = useState(false);

  useEffect(() => {
    if (state === null) {
      navigate("/not-found");
    }
  }, [navigate, state]);

  // initial state of form
  const [form, setForm] = useState({
    title: state?.title,
    size: state.size,
    fileFormat: state.fileFormat,
  });

  // description related work
  const initialValue = state?.description;
  const editorRef = useRef(null);
  const [content, setContent] = useState(initialValue ?? "");

  useEffect(() => setContent(initialValue ?? ""), [initialValue]);

  const editorInit = {
    height: 400,
    placeholder: "Start typing...",
    menubar: false,
    plugins: [
      "advlist",
      "autolink",
      "lists",
      "link",
      "charmap",
      "preview",
      "anchor",
      "searchreplace",
      "visualblocks",
      "fullscreen",
      "help",
      "wordcount",
    ],
    toolbar:
      "undo redo blocks fontsize " +
      "bold italic backcolor forecolor alignleft aligncenter alignright alignjustify" +
      " link bullist numlist outdent indent  fullscreen " +
      " help",
  };
  const log = () => {
    if (editorRef.current) {
      setContent(editorRef.current.getContent());
    }
  };

  // Sample data for categories and subcategories
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(
    state.category || "",
  );
  const [subCategories, setSubCategories] = useState([]);
  const [selectedSubCategory, setSelectedSubCategory] = useState(
    state.subCategory || "",
  );

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
      const fetchSubCategory = categories?.filter(
        (cat) => cat.categoryName === selectedCategory,
      )[0]?.subCategory;
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

  // Image Uploading Works
  const prevImages = useMemo(() => {
    let value = 0;
    return state?.images?.map((img) => {
      return {
        ...img,
        value: value++,
      };
    });
  }, [state?.images]);
  const [matchingImages, setMatchingImages] = useState(prevImages || []);
  // const [errorImg, setErrorImg] = useState(null);

  const getImagesWithDimensions = (files) => {
    const images = [];
    let isError = false;

    const handleImageLoad = (file, img, index) => {
      const value = matchingImages.length + index;
      // if (img.width === 2700 && img.height === 2000) {
      images.push({
        file: file,
        url: img.src,
        thumbnail: matchingImages.length === 0 && index === 0,
        value,
      });
      // }
      if (images.length === files.length && !isError) {
        setMatchingImages((prevImages) => [...prevImages, ...images]);
        // setErrorImg(null);
      }
      // else {
      //   setErrorImg("Resolution does not match. Expected 2700x2000");
      // }
    };

    const processFile = (file, i) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        const img = new Image();
        img.onload = () => {
          handleImageLoad(file, img, i);
        };
        img.src = event.target.result;
      };
      reader.readAsDataURL(file);
    };

    for (let i = 0; i < files.length; i++) {
      processFile(files[i], i);
    }
  };

  const handleFileChange = (event) => {
    const files = Array.from(event.target.files);
    getImagesWithDimensions(files);
  };

  const handleImageRemove = (index) => {
    setMatchingImages((prevImages) =>
      prevImages
        .filter((_, i) => i !== index)
        .map((v, i) => ({ ...v, value: i })),
    );
  };

  const handleRadioChange = (e) => {
    const selectedValue = parseInt(e.target.value, 10);
    setMatchingImages((prevImages) =>
      prevImages.map((obj) => ({
        ...obj,
        thumbnail: obj.value === selectedValue,
      })),
    );
  };

  // Tags Operations
  const [tags, setTags] = useState(state.tags);
  const [newTag, setNewTag] = useState("");

  const addTag = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (newTag) {
        const newTagsArr = newTag
          .split(",")
          .map((tag) => tag.trim())
          .filter((tag) => tag); // Clean up and remove empty tags

        const uniqueNewTagsSet = new Set(newTagsArr);
        const existingTagsSet = new Set(tags);
        const uniqueNewTags = [...uniqueNewTagsSet].filter(
          (tag) => !existingTagsSet.has(tag),
        );

        if (uniqueNewTags.length > 0) {
          setTags([...tags, ...uniqueNewTags]);
        }
        setNewTag("");
      }
    }
  };

  const removeTag = (indexToRemove, e) => {
    e.preventDefault();
    setTags((prevTags) =>
      prevTags.filter((_, index) => index !== indexToRemove),
    );
  };

  // Related Designs Operations
  const [relatedTags, setRelatedTags] = useState(state.relatedDesigns);
  const [newRelatedTag, setNewRelatedTag] = useState("");
  const { data: relatedDesign } = useFetchRelatedTagsQuery();

  const relatedDesigns = useMemo(() => relatedDesign, [relatedDesign]);

  const handleNewRelatedTag = (e) => {
    e.preventDefault();
    setNewRelatedTag(e.target.value);
  };

  const addNewRelatedTag = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (newRelatedTag) {
        const newRelatedTagArr = newRelatedTag
          .split(",")
          .map((tag) => tag.trim())
          .filter((tag) => tag); // Clean up and remove empty tags

        const uniqueNewRelatedTagsSet = new Set(newRelatedTagArr);

        const existingRelatedTagsSet = new Set(relatedTags);
        const uniqueNewRelatedTags = [...uniqueNewRelatedTagsSet].filter(
          (tag) => !existingRelatedTagsSet.has(tag),
        );

        if (uniqueNewRelatedTags.length > 0) {
          setRelatedTags([...relatedTags, ...uniqueNewRelatedTags]);
        }

        setNewRelatedTag("");
      }
    }
  };

  const addRelatedTag = (e) => {
    e.preventDefault();
    const isFound = relatedTags.find((value) => value === e.target.value);
    if (!isFound) {
      setRelatedTags([...relatedTags, e.target.value]);
    }
  };

  const removeRelatedTag = (indexToRemove, e) => {
    e.preventDefault();
    setRelatedTags((prevTag) =>
      prevTag.filter((_, index) => index !== indexToRemove),
    );
  };

  // Folder Operations
  const [selectedFolder, setSelectedFolder] = useState(state.folder);
  const [newFolder, setNewFolder] = useState(state.folder);
  const { data: folder } = useFetchFoldersQuery();

  const folders = useMemo(() => folder, [folder]);

  const addNewFolder = (e) => {
    e.preventDefault();
    setSelectedFolder(e.target.value);
    setNewFolder(e.target.value);
  };

  const handleChangeFolder = (e) => {
    setSelectedFolder(e.target.value);
    setNewFolder(e.target.value);
  };

  // SubFolder Operations
  const [newSubFolder, setNewSubFolder] = useState(state.subFolder);
  const { data: subFolder } = useFetchSubFoldersQuery(selectedFolder, {
    skip: selectedFolder === null,
  });

  const subFolders = useMemo(() => subFolder?.map((v) => v.name), [subFolder]);

  const addNewSubFolder = (e) => {
    e.preventDefault();
    setNewSubFolder(e.target.value);
  };

  // Industries Operations
  const [industries, setIndustries] = useState(state.industrys);
  const { data: industrie } = useFetchIndustriesQuery();

  const allIndustries = useMemo(() => industrie, [industrie]);

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
        const newIndustriesArr = newIndustrie
          .split(",")
          .map((tag) => tag.trim())
          .filter((tag) => tag);

        const uniqueNewIndustriesSet = new Set(newIndustriesArr);
        const existingIndustriesSet = new Set(industries);
        const uniqueNewIndustries = [...uniqueNewIndustriesSet].filter(
          (tag) => !existingIndustriesSet.has(tag),
        );

        if (uniqueNewIndustries.length > 0) {
          setIndustries([...industries, ...uniqueNewIndustries]);
        }
        setNewIndustrie("");
      }
    }
  };

  // Designs Operations
  const [designs, setDesigns] = useState(state.designs);
  const { data: design } = useFetchDesignsQuery();
  const [newDesign, setNewDesign] = useState("");

  const allDesigns = useMemo(() => design, [design]);

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
        const newDesignsArr = newDesign
          .split(",")
          .map((tag) => tag.trim())
          .filter((tag) => tag);

        const uniqueNewDesignsSet = new Set(newDesignsArr);
        const existingDesignsSet = new Set(designs);
        const uniqueNewDesigns = [...uniqueNewDesignsSet].filter(
          (tag) => !existingDesignsSet.has(tag),
        );

        if (uniqueNewDesigns.length > 0) {
          setDesigns([...designs, ...uniqueNewDesigns]);
        }
        setNewDesign("");
      }
    }
  };

  const removeDesign = (indexToRemove, e) => {
    e.preventDefault();
    setDesigns((prevTags) =>
      prevTags.filter((_, index) => index !== indexToRemove),
    );
  };

  // Global Operations
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    setSubmitLoading(true);
    e.preventDefault();
    const withoutFiles = matchingImages
      .filter((file) => !file.file)
      ?.map(({ value, ...rest }) => rest);
    const withFiles = matchingImages.filter((file) => file.file);
    const imagesPromise = withFiles?.map(async (file) => {
      if (file.file) {
        const formData = new FormData();
        formData.append("image", file.file);

        const apiKey = "7a4a20aea9e7d64e24c6e75b2972ff00";
        const uploadUrl = `https://api.imgbb.com/1/upload?key=${apiKey}`;
        try {
          // setUploading(true);
          const response = await axios.post(uploadUrl, formData);
          console.log(response);
          const name = response.data.data.title;
          const imageUrl = response.data.data.url;

          return {
            url: imageUrl,
            name,
            thumbnail: file.thumbnail,
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
    const withFileImages = await Promise.all(imagesPromise);
    const images = [...withoutFiles, ...withFileImages];
    if (images) {
      const data = {
        title: form.title,
        description: content,
        category: selectedCategory,
        subCategory: selectedSubCategory,
        fileFormat: form.fileFormat,
        size: form.size,
        images: images,
        tags,
        relatedDesigns: relatedTags,
        folder: newFolder,
        subFolder: newSubFolder,
        industries,
        designs,
      };
      try {
        const url = `${configApi.api}upload/update/${state.designId}`;

        const response = await axios.put(url, data);

        if (response.data.success) {
          console.log(response.data);
          navigate(`/design/${state.designId}`);
        }
      } catch (error) {
        console.log(error);
      }
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
              value={form.title}
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
            <Editor
              apiKey="58wpfurekzo6c0xguijfdjdm4un9yozey638o61t47zosj2t"
              onInit={(_evt, editor) => (editorRef.current = editor)}
              initialValue={initialValue}
              init={editorInit}
              onChange={log}
            />
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
                  categories?.map((item) => (
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
                {subCategories?.map((sub) => (
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
                value={form.size}
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
                value={form.fileFormat}
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
              onChange={handleFileChange}
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
              {matchingImages.map((item, index) => (
                <div key={index} className="flex items-start gap-3 p-2">
                  <div>
                    <input
                      type="radio"
                      name="thumbnail"
                      className="peer"
                      hidden
                      value={item?.value || index} // Set the value as the image name
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
                    src={item?.url}
                    alt={item?.name}
                    className="h-[100px] w-[150px] object-cover"
                  />
                  <h1 className="flex-grow">{item.name || item.file.name}</h1>
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
            {/* {errorImg && <p className="text-sm text-red-400">{errorImg}</p>} */}
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
                className="flex-grow outline-none"
                value={newTag}
                onChange={(e) => setNewTag(e.target.value)}
                onKeyDown={addTag}
              />
            </div>
          </div>
          <div className="mt-5 flex flex-col">
            <label className="block px-2">Related Designs</label>
            <div className="mt-3 flex min-h-[46px] w-full flex-wrap gap-2 border border-solid border-[#e7e7e7] bg-white p-2 outline-none">
              {relatedTags?.map((item, index) => (
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
              <input
                type="text"
                list="relatedTags"
                className="w-full appearance-none outline-none"
                placeholder="Search related design"
                value={newRelatedTag}
                onChange={handleNewRelatedTag}
                onKeyDown={addNewRelatedTag}
              />
              <Datalist
                id={"relatedTags"}
                options={relatedDesigns}
                maxCount={10}
                value={newRelatedTag}
              />
            </div>
            <div className="mt-3 flex flex-wrap gap-2">
              {relatedDesigns?.map((d) => (
                <button
                  key={d}
                  className="rounded-[30px] bg-lightcream px-4 py-1 text-sm"
                  value={d}
                  onClick={addRelatedTag}
                >
                  {d}
                </button>
              ))}
            </div>
          </div>
          <div className="flex flex-wrap gap-2 sm:flex-nowrap">
            <div className="mt-5 flex w-full flex-col sm:w-1/2">
              <label className="block px-2">Folder</label>
              <input
                type="text"
                name="folder"
                list="folder"
                value={newFolder}
                onChange={handleChangeFolder}
                className="mt-3 flex min-h-[46px] w-full flex-wrap gap-2 border border-solid border-[#e7e7e7] bg-white p-2 outline-none"
              />
              <Datalist
                id={"folder"}
                options={folders}
                maxCount={10}
                value={newFolder}
              />
              <div className="mt-3 flex flex-wrap gap-2">
                {folders?.map((v, i) => (
                  <button
                    key={i}
                    className="rounded-[30px] bg-[#e7e7e7] px-3 py-1 text-xs"
                    value={v}
                    onClick={addNewFolder}
                  >
                    {v}
                  </button>
                ))}
              </div>
            </div>
            <div className="mt-5 flex w-full flex-col sm:w-1/2">
              <label className="block px-2">Subfolder</label>
              <input
                type="text"
                name="subFolder"
                list="subFolder"
                value={newSubFolder}
                onChange={addNewSubFolder}
                className="mt-3 flex min-h-[46px] w-full flex-wrap gap-2 border border-solid border-[#e7e7e7] bg-white p-2 outline-none"
              />
              <Datalist
                id={"subFolder"}
                options={subFolders}
                maxCount={10}
                value={newSubFolder}
              />
              {subFolders?.length > 0 && (
                <div className="mt-3 flex flex-wrap gap-2">
                  {subFolders?.map((v, i) => (
                    <button
                      key={i}
                      className="rounded-[30px] bg-lightcream px-3 py-1 text-xs"
                      value={v}
                      onClick={addNewSubFolder}
                    >
                      {v}
                    </button>
                  ))}
                </div>
              )}
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
                  list="industries"
                  className="w-full outline-none"
                  placeholder="Add industries"
                  value={newIndustrie}
                  onChange={(e) => setNewIndustrie(e.target.value)}
                  onKeyDown={addNewIndusTrie}
                />
                <Datalist
                  id={"industries"}
                  options={allIndustries}
                  maxCount={10}
                  value={newIndustrie}
                />
              </div>
              <div className="mt-3 flex flex-wrap gap-2">
                {allIndustries?.map((v, i) => (
                  <button
                    key={i}
                    className="rounded-[30px] bg-lightcream px-3 py-1 text-xs"
                    value={v}
                    onClick={addIndustrie}
                  >
                    {v}
                  </button>
                ))}
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
                  list="design"
                  className="w-full outline-none"
                  placeholder="Add Design"
                  value={newDesign}
                  onChange={(e) => setNewDesign(e.target.value)}
                  onKeyDown={addNewDesign}
                />
                <Datalist
                  id={"design"}
                  options={allDesigns}
                  maxCount={10}
                  value={newDesign}
                />
              </div>
              <div className="mt-3 flex flex-wrap gap-2">
                {allDesigns?.map((v, i) => (
                  <button
                    key={i}
                    className="rounded-[30px] bg-lightcream px-3 py-1 text-xs"
                    value={v}
                    onClick={addDesign}
                  >
                    {v}
                  </button>
                ))}
              </div>
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
                "Update"
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
    </div>
  );
}

export default EditDesign;
