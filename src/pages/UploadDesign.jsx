import { Editor } from "@tinymce/tinymce-react";
import axios from "axios";
import { useEffect, useMemo, useRef, useState } from "react";
import toast from "react-hot-toast";
import { FaSpinner } from "react-icons/fa";
import { RxCross2 } from "react-icons/rx";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  useFetchDesignsQuery,
  useFetchFoldersQuery,
  useFetchIndustriesQuery,
  useFetchRelatedTagsQuery,
  useLazyFetchSubFoldersQuery,
  useUploadADesignMutation,
} from "../Redux/api/uploadDesignApiSlice";
import { fetchCategory } from "../Redux/features/category/categoryApi";
import Check from "../assets/svg/Check";
import Datalist from "../components/Datalist";
import { configApi } from "../libs/configApi";

function UploadDesign() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, category, error } = useSelector((state) => state.category);
  const [submitLoading, setSubmitLoading] = useState(false);

  const [uploadADesign] = useUploadADesignMutation();

  // initial state of form
  const [form, setForm] = useState({
    title: "",
    size: "",
    fileFormat: "",
  });

  // description related work
  const editorRef = useRef(null);
  const [content, setContent] = useState("");
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
    relative_urls: false,
  };
  const log = () => {
    if (editorRef.current) {
      setContent(editorRef.current.getContent());
    }
  };

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

  // Image Uploading Works
  const [matchingImages, setMatchingImages] = useState([]);
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
  const [tags, setTags] = useState([]);
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
  const [relatedTags, setRelatedTags] = useState([]);
  const [newRelatedTag, setNewRelatedTag] = useState("");
  const [relatedDesignsExtend, setRelatedDesignsExtend] = useState(false);
  const { data: relatedDesign } = useFetchRelatedTagsQuery();

  const relatedDesigns = useMemo(
    () => relatedDesign?.length && [...relatedDesign].reverse().slice(0, 50),
    [relatedDesign],
  );

  const relatedDesignsShow =
    relatedDesignsExtend && relatedDesigns?.length > 25
      ? relatedDesigns
      : relatedDesigns?.slice(0, 25);

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
  const [selectedFolder, setSelectedFolder] = useState(null);
  const [newFolder, setNewFolder] = useState("");
  const [folderExtend, setFolderExtend] = useState(false);
  const { data: folder } = useFetchFoldersQuery();

  const folders = useMemo(() => folder, [folder]);

  const foldersShow =
    folderExtend && folders?.length > 10 ? folders : folders?.slice(0, 10);

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
  const [newSubFolder, setNewSubFolder] = useState("");
  const [subFolderExtend, setSubFolderExtend] = useState(false);
  const [getSubFolders, { data: subFolder }] = useLazyFetchSubFoldersQuery();

  useEffect(() => {
    if (selectedFolder) {
      getSubFolders({ folderName: selectedFolder });
    }
  }, [selectedFolder]);

  const subFolders = useMemo(() => subFolder?.map((v) => v), [subFolder]);

  const subFoldersShow =
    subFolderExtend && subFolders?.length > 10
      ? subFolders
      : subFolders?.slice(0, 10);

  const addNewSubFolder = (e) => {
    e.preventDefault();
    setNewSubFolder(e.target.value);
  };

  // Industries Operations
  const [industries, setIndustries] = useState([]);
  const [industryExtend, setIndustryExtend] = useState(false);
  const { data: industrie } = useFetchIndustriesQuery();

  const allIndustries = useMemo(() => industrie, [industrie]);

  const allIndustriesShow =
    industryExtend && allIndustries?.length > 10
      ? allIndustries
      : allIndustries?.slice(0, 10);

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
  const [designs, setDesigns] = useState([]);
  const { data: design } = useFetchDesignsQuery();
  const [newDesign, setNewDesign] = useState("");
  const [designExtend, setDesignExtend] = useState(false);

  const allDesigns = useMemo(() => design, [design]);

  const allDesignsShow =
    designExtend && allDesigns?.length > 10
      ? allDesigns
      : allDesigns?.slice(0, 10);

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
    const imagesArray = matchingImages?.map((file) => file.file);

    let imagesRes = null;
    try {
      const formData = new FormData();
      // Append each file in the array individually
      imagesArray.forEach((file) => {
        formData.append("files", file); // Optionally, you can add a second argument with a filename like so: `formData.append("files", file, file.name)`
      });
      const uploadUrl = `${configApi.api}upload-attachment-optimized`;
      const response = await axios.post(uploadUrl, formData);
      if (response.data.success) {
        if (response.data.data.files) {
          imagesRes = response.data.data.files.map((file) => ({
            url: file.optimizedUrl,
            watermark: file.url,
            name: file.originalName,
          }));
        } else {
          imagesRes = [
            {
              url: response.data.data.file.optimizedUrl,
              watermark: response.data.data.file.url,
              name: response.data.data.file.originalName,
            },
          ];
        }
      }
    } catch (error) {
      toast.error("Something went wrong!");
    }

    const images = imagesRes.map((image, index) => ({
      ...image, // Spread the properties of the image object
      thumbnail: matchingImages[index]?.thumbnail, // Add the thumbnail property from thumbnailsArray
    }));

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
      const isThumbnailHasTrue = images?.find((i) => i.thumbnail) || false;
      if (images?.length === 0 && isThumbnailHasTrue) {
        toast.error("At least 1 Image Must be selected!");
        setSubmitLoading(false);
        return;
      }
      if (
        !form.title ||
        !content ||
        !selectedCategory ||
        !selectedSubCategory ||
        !form.fileFormat ||
        !form.size ||
        tags?.length === 0 ||
        !newFolder ||
        !newSubFolder ||
        industries?.length === 0 ||
        designs?.length === 0
      ) {
        toast.error("All fields are required without Related Designs!!!");
        setSubmitLoading(false);
        return;
      }
      try {
        const response = await uploadADesign(data).unwrap();

        if (response.success) {
          toast.success("Design Uploaded Successfully!!!");
          navigate("/");
        }
      } catch (error) {
        toast.error("Something went wrong!");
      }
    }

    setSubmitLoading(false);
  };

  return (
    <div className="max-width mt-5">
      <div className="mx-auto max-w-[1000px] bg-lightskyblue py-5">
        <h1 className="m-auto block w-56 rounded-full border border-primary px-4 py-2 text-center text-lg font-bold text-primary">
          Upload Design
        </h1>
        <form className="p-3" onSubmit={handleSubmit}>
          <div className="flex flex-col">
            <label className="block px-2">Title</label>
            <input
              type="text"
              name="title"
              className="mt-1 block w-full border border-solid border-[#e7e7e7] bg-white p-2 outline-none"
              onChange={handleChange}
              required
            />
            <p className="mt-2 hidden px-2 text-xs text-red-600">
              There was an error!
            </p>
          </div>
          <div className="mt-3 flex flex-col">
            <label className="block px-2">Description</label>
            <Editor
              apiKey="58wpfurekzo6c0xguijfdjdm4un9yozey638o61t47zosj2t"
              onInit={(_evt, editor) => (editorRef.current = editor)}
              init={editorInit}
              onChange={log}
            />
            <p className="mt-2 hidden px-2 text-xs text-red-600">
              There was an error!
            </p>
          </div>
          <div className="mt-3 flex flex-col gap-2 md:flex-row">
            <div className="w-full">
              <label className="block px-2">Category</label>
              <select
                disabled={loading}
                name="category"
                className="mt-1 block min-h-11 w-full border border-solid border-[#e7e7e7] bg-white p-2 outline-none"
                value={selectedCategory}
                onChange={handleCategoryChange}
              >
                <option value={""}>Select Category</option>
                {categories?.length > 0 &&
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
                className="custom-arrow mt-1 block min-h-11 w-full border border-solid border-[#e7e7e7] bg-white p-2 outline-none"
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
          <div className="mt-3 flex flex-col gap-2 md:flex-row">
            <div className="w-full">
              <label className="block px-2">Size</label>
              <input
                type="text"
                name="size"
                className="mt-1 block w-full border border-solid border-[#e7e7e7] bg-white p-2 outline-none"
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
                className="mt-1 block w-full border border-solid border-[#e7e7e7] bg-white p-2 outline-none"
                onChange={handleChange}
                required
              />
              <p className="mt-2 hidden px-2 text-xs text-red-600">
                There was an error!
              </p>
            </div>
          </div>
          <div className="mt-3 flex flex-col">
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
              className="mt-1 block w-full cursor-pointer border border-solid bg-white p-3 text-center"
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
                  <h1 className="flex-grow">{item.file.name}</h1>
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
          <div className="flex flex-col">
            <label className="block px-2">Tags</label>
            <div className="mt-1 flex w-full flex-wrap gap-2 border border-solid border-[#e7e7e7] bg-white p-2 outline-none">
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
            <div className="mt-1 flex min-h-[46px] w-full flex-wrap gap-2 border border-solid border-[#e7e7e7] bg-white p-2 outline-none">
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
              {relatedDesignsShow?.map((d) => (
                <button
                  key={d}
                  className="rounded-[30px] bg-lightcream px-4 py-1 text-sm"
                  value={d}
                  onClick={addRelatedTag}
                >
                  {d}
                </button>
              ))}
              {relatedDesigns?.length > 25 && (
                <button
                  className="rounded-[30px] bg-lightcream px-4 py-1 text-sm"
                  onClick={(e) => {
                    e.preventDefault();
                    setRelatedDesignsExtend(!relatedDesignsExtend);
                  }}
                >
                  {relatedDesignsExtend ? "See Less" : "See More"}
                </button>
              )}
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
                className="mt-1 flex min-h-[46px] w-full flex-wrap gap-2 border border-solid border-[#e7e7e7] bg-white p-2 outline-none"
              />
              <Datalist
                id={"folder"}
                options={folders}
                maxCount={10}
                value={newFolder}
              />
              <div className="mt-3 flex flex-wrap gap-2">
                {foldersShow?.map((v, i) => (
                  <button
                    key={i}
                    className="rounded-[30px] bg-[#e7e7e7] px-3 py-1 text-xs"
                    value={v}
                    onClick={addNewFolder}
                  >
                    {v}
                  </button>
                ))}
                {folders?.length > 10 && (
                  <button
                    className="rounded-[30px] bg-[#e7e7e7] px-3 py-1 text-xs"
                    onClick={(e) => {
                      e.preventDefault();
                      setFolderExtend(!folderExtend);
                    }}
                  >
                    {folderExtend ? "See Less" : "See More"}
                  </button>
                )}
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
                className="mt-1 flex min-h-[46px] w-full flex-wrap gap-2 border border-solid border-[#e7e7e7] bg-white p-2 outline-none"
              />
              <Datalist
                id={"subFolder"}
                options={subFolders}
                maxCount={10}
                value={newSubFolder}
              />
              {subFolders?.length > 0 && (
                <div className="mt-3 flex flex-wrap gap-2">
                  {subFoldersShow?.map((v, i) => (
                    <button
                      key={i}
                      className="rounded-[30px] bg-lightcream px-3 py-1 text-xs"
                      value={v}
                      onClick={addNewSubFolder}
                    >
                      {v}
                    </button>
                  ))}
                  {subFolders?.length > 10 && (
                    <button
                      className="rounded-[30px] bg-lightcream px-3 py-1 text-xs"
                      onClick={(e) => {
                        e.preventDefault();
                        setSubFolderExtend(!subFolderExtend);
                      }}
                    >
                      {subFolderExtend ? "See Less" : "See More"}
                    </button>
                  )}
                </div>
              )}
            </div>
          </div>
          <div className="flex flex-wrap gap-2 sm:flex-nowrap">
            <div className="mt-5 flex w-full flex-col sm:w-1/2">
              <label className="block px-2">Industries</label>
              <div className="mt-1 flex min-h-[46px] w-full flex-wrap gap-2 border border-solid border-[#e7e7e7] bg-white p-2 outline-none">
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
                {allIndustriesShow?.map((v, i) => (
                  <button
                    key={i}
                    className="rounded-[30px] bg-lightcream px-3 py-1 text-xs"
                    value={v}
                    onClick={addIndustrie}
                  >
                    {v}
                  </button>
                ))}
                {allIndustries?.length > 10 && (
                  <button
                    className="rounded-[30px] bg-lightcream px-3 py-1 text-xs"
                    onClick={(e) => {
                      e.preventDefault();
                      setIndustryExtend(!industryExtend);
                    }}
                  >
                    {industryExtend ? "See Less" : "See More"}
                  </button>
                )}
              </div>
            </div>
            <div className="mt-5 flex w-full flex-col sm:w-1/2">
              <label className="block px-2">Designs</label>
              <div className="mt-1 flex min-h-[46px] w-full flex-wrap gap-2 border border-solid border-[#e7e7e7] bg-white p-2 outline-none">
                {designs.map((item, index) => (
                  <span
                    key={index}
                    className="flex items-center gap-2 rounded-full bg-[#e7e7e7] px-2 py-1 text-sm"
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
                {allDesignsShow?.map((v, i) => (
                  <button
                    key={i}
                    className="rounded-[30px] bg-[#e7e7e7] px-3 py-1 text-xs"
                    value={v}
                    onClick={addDesign}
                  >
                    {v}
                  </button>
                ))}
                {allDesigns?.length > 10 && (
                  <button
                    className="rounded-[30px] bg-[#e7e7e7] px-3 py-1 text-xs"
                    onClick={(e) => {
                      e.preventDefault();
                      setDesignExtend(!designExtend);
                    }}
                  >
                    {designExtend ? "See Less" : "See More"}
                  </button>
                )}
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
                "Upload"
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

export default UploadDesign;
