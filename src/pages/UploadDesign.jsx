import { useState } from "react";
import { RxCross2 } from "react-icons/rx";
import Check from "../assets/svg/Check";

function UploadDesign() {
  // Sample data for categories and subcategories
  const categories = [
    {
      id: 1,
      name: "Category One",
      subcategories: [
        { id: 1, name: "Subcategory One" },
        { id: 2, name: "Subcategory Two" },
      ],
    },
    {
      id: 2,
      name: "Category Two",
      subcategories: [
        { id: 3, name: "Subcategory Three" },
        { id: 4, name: "Subcategory Four" },
      ],
    },
  ];

  const [tags, setTags] = useState([
    "Tag One",
    "Tag Two",
    "Tag Three",
    "Tag Four",
  ]);

  const [form, setForm] = useState({
    title: "",
    description: "",
    category: categories[0].name,
    subcategory: "",
    size: "",
    fileFormat: "",
    images: "",
    thumbnail: "",
  });

  const selectedCategory = categories.find((cat) => cat.id == form.category);
  const subcategories = selectedCategory ? selectedCategory.subcategories : [];

  const handleCategoryChange = (e) => {
    const selectedCategoryId = e.target.value;
    setForm({
      ...form,
      category: selectedCategoryId,
      subcategory: "",
    });
  };

  // Image Operations
  const [selectedImages, setSelectedImages] = useState([]);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    const images = files.map((file) => ({
      url: URL.createObjectURL(file),
      name: file.name,
    }));
    setSelectedImages((prevImages) => [...prevImages, ...images]);
    // Automatically select the first image if it's the first upload
    if (images.length > 0 && selectedImages.length === 0) {
      setSelectedImageIndex(0);
      setForm((prevForm) => ({
        ...prevForm,
        thumbnail: images[0].name,
      }));
    }
  };

  const handleImageRemove = (index) => {
    setSelectedImages((prevImages) => prevImages.filter((_, i) => i !== index));
    if (selectedImageIndex === index) {
      const newIndex = index > 0 ? index - 1 : 0;
      setSelectedImageIndex(newIndex);
      setForm((prevForm) => ({
        ...prevForm,
        thumbnail: selectedImages[newIndex]?.name || "",
      }));
    }
  };

  const handleRadioChange = (index) => {
    setSelectedImageIndex(index);
    setForm((prevForm) => ({
      ...prevForm,
      thumbnail: selectedImages[index].name,
    }));
  };

  // Tags Operations
  const removeTag = (indexToRemove) => {
    setTags((prevTags) =>
      prevTags.filter((_, index) => index !== indexToRemove),
    );
  };

  const [newTag, setNewTag] = useState("");

  const addBullet = () => {
    if (newBullet.trim() === "") return;

    setBullets([...bullets, newBullet]);
    setNewBullet("");
  };

  // Global Operations
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      form: form,
      images: selectedImages,
      selectedImageIndex: selectedImageIndex,
    };
    console.log(data);
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
                name="category"
                className="mt-3 block min-h-11 w-full border border-solid border-[#e7e7e7] bg-white p-2 outline-none"
                value={form.category}
                onChange={handleCategoryChange}
              >
                {categories.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.name}
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
                name="subcategory"
                className="custom-arrow mt-3 block min-h-11 w-full border border-solid border-[#e7e7e7] bg-white p-2 outline-none"
                value={form.subcategory}
                onChange={handleChange}
              >
                <option value="">Select Subcategory</option>
                {subcategories.map((sub) => (
                  <option key={sub.id} value={sub.id}>
                    {sub.name}
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
              accept="image/jpeg, image/png"
              multiple
              hidden
            />
            <label
              htmlFor="images"
              className="mt-2 block w-full cursor-pointer bg-white p-3 text-center"
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
                      value={item.name} // Set the value as the image name
                      className="hidden"
                      onChange={() => handleRadioChange(index)}
                      checked={selectedImageIndex === index} // Check if this is the selected image
                    />
                    <label
                      htmlFor={`thumbnail-${index}`}
                      className="flex h-[20px] w-[20px] cursor-pointer items-center justify-center border border-solid border-primary bg-white"
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
            <div className="mt-3 flex w-full gap-2 border border-solid border-[#e7e7e7] bg-white p-2 outline-none">
              {tags.map((item, index) => (
                <span
                  key={index}
                  className="flex items-center gap-2 rounded-full bg-[#FFEFEF] px-2 py-1 text-sm"
                >
                  {item}
                  <button
                    className="rounded-full bg-white p-1"
                    onClick={() => removeTag(index)}
                  >
                    <RxCross2 className="h-3 w-3 text-slate-700" />
                  </button>
                </span>
              ))}
            </div>
          </div>
          <button className="mx-auto mt-5 block w-1/2 rounded-3xl bg-primary p-3 text-center text-white">
            Upload
          </button>
        </form>
      </div>
    </div>
  );
}

export default UploadDesign;
