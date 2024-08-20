import React, { useState } from 'react';
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
        { id: 2, name: "Subcategory Two" }
      ]
    },
    {
      id: 2,
      name: "Category Two",
      subcategories: [
        { id: 3, name: "Subcategory Three" },
        { id: 4, name: "Subcategory Four" }
      ]
    }
  ];

  const [form, setForm] = useState({
    title: '',
    description: '',
    category: categories[0].id,
    subcategory: '',
    size: '',
    fileFormat: '',
    images: ''
  });

  const selectedCategory = categories.find(cat => cat.id == form.category);
  const subcategories = selectedCategory ? selectedCategory.subcategories : [];

  const handleCategoryChange = (e) => {
    const selectedCategoryId = e.target.value;
    setForm({
      ...form,
      category: selectedCategoryId,
      subcategory: ''
    });
  };

  const [selectedImages, setSelectedImages] = useState([]);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0); // Start with the first image selected

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    const images = files.map(file => ({
      url: URL.createObjectURL(file),
      name: file.name
    }));
    setSelectedImages(prevImages => [...prevImages, ...images]);
    // Automatically select the first image if it's the first upload
    if (images.length > 0) {
      setSelectedImageIndex(0);
    }
  };

  const handleImageRemove = (index) => {
    setSelectedImages(prevImages => prevImages.filter((_, i) => i !== index));
    if (selectedImageIndex === index) {
      setSelectedImageIndex(prevIndex => prevIndex > 0 ? prevIndex - 1 : 0);
    }
  };

  const handleRadioChange = (index) => {
    setSelectedImageIndex(index);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      form: form,
      images: selectedImages,
      selectedImageIndex: selectedImageIndex
    };
    console.log(data);
  };

  return (
    <div className='max-width mt-10 sm:mt-20'>
      <div className='max-w-[1000px] mx-auto bg-lightskyblue py-5'>
        <h1 className='text-center font-bold text-lg px-4 py-2 border border-primary block rounded-full text-primary w-56 m-auto'>
          Upload Design
        </h1>
        <form action="" className='p-3' onSubmit={handleSubmit}>
          <div className='flex flex-col'>
            <label className="block px-2">Title</label>
            <input
              type="text"
              name="title"
              className="bg-white block w-full p-2 border border-solid border-[#e7e7e7] mt-3 outline-none"
              onChange={handleChange}
              required
            />
            <p className="text-red-600 text-xs mt-2 px-2 hidden">There was an error!</p>
          </div>
          <div className='flex flex-col mt-2'>
            <label className="block px-2">Description</label>
            <textarea
              type="text"
              name="description"
              className="bg-white block w-full p-2 border border-solid h-[150px] border-[#e7e7e7] mt-3 outline-none"
              onChange={handleChange}
              required
            ></textarea>
            <p className="text-red-600 text-xs mt-2 px-2 hidden">There was an error!</p>
          </div>
          <div className='flex flex-col md:flex-row gap-2 mt-2'>
            <div className='w-full'>
              <label className="block px-2">Category</label>
              <select 
                name="category"
                className="bg-white block min-h-11 w-full p-2 border border-solid border-[#e7e7e7] mt-3 outline-none"
                value={form.category}
                onChange={handleCategoryChange}
              >
                {categories.map(item => (
                  <option key={item.id} value={item.id}>{item.name}</option>
                ))}
              </select>
              <p className="text-red-600 text-xs mt-2 px-2 hidden">There was an error!</p>
            </div>
            <div className='w-full'>
              <label className="block px-2">Subcategory</label>
              <select 
                name="subcategory"
                className="bg-white custom-arrow block min-h-11 w-full p-2 border border-solid border-[#e7e7e7] mt-3 outline-none"
                value={form.subcategory}
                onChange={handleChange}
              >
                <option value="">Select Subcategory</option>
                {subcategories.map(sub => (
                  <option key={sub.id} value={sub.id}>{sub.name}</option>
                ))}
              </select>
              <p className="text-red-600 text-xs mt-2 px-2 hidden">There was an error!</p>
            </div>
          </div>
          <div className='flex flex-col md:flex-row gap-2 mt-2'>
            <div className='w-full'>
              <label className="block px-2">Size</label>
              <input
                type="text"
                name="size"
                className="bg-white block w-full p-2 border border-solid border-[#e7e7e7] mt-3 outline-none"
                onChange={handleChange}
                required
              />
              <p className="text-red-600 text-xs mt-2 px-2 hidden">There was an error!</p>
            </div>
            <div className='w-full'>
              <label className="block px-2">File Format</label>
              <input
                type="text"
                name="fileFormat"
                className="bg-white block w-full p-2 border border-solid border-[#e7e7e7] mt-3 outline-none"
                onChange={handleChange}
                required
              />
              <p className="text-red-600 text-xs mt-2 px-2 hidden">There was an error!</p>
            </div>
          </div>
          <div className='flex flex-col mt-2'>
            <label className="block px-2 pt-2">Image</label>
            <input
              name="images"
              type="file"
              id="images"
              onChange={handleImageUpload}
              accept='image/jpeg, image/png'
              multiple
              hidden
            />
            <label htmlFor='images' className="p-3 w-full mt-2 block text-center bg-white cursor-pointer">Upload Images</label>
            <p className="text-red-600 text-xs mt-2 px-2 hidden">There was an error!</p>
            <div className='mt-5 grid grid-cols-1 md:grid-cols-2 gap-3'>
              {selectedImages.map((item, index) => (
                <div key={index} className='flex items-start gap-3 p-2'>
                  <input
                    type="radio"
                    name="selectedImage"
                    checked={selectedImageIndex === index}
                    onChange={() => handleRadioChange(index)}
                    className="mr-2"
                  />
                  <img
                    src={item.url}
                    alt={item.name}
                    className='h-[100px] w-[150px] object-cover'
                  />
                  <div className='flex-grow'>
                    <h2 className='font-bold'>{item.name}</h2>
                  </div>
                  <button
                    type='button'
                    className='min-h-6 min-w-6 grid place-content-center border border-slate-500 rounded-full'
                    onClick={() => handleImageRemove(index)}
                  >
                    <RxCross2 className='text-slate-500' />  
                  </button>
                </div>
              ))}
            </div>
          </div>
          <button className="p-3 text-center text-white bg-primary rounded-3xl w-1/2 mx-auto block mt-5">
            Upload
          </button>
        </form>
      </div>
    </div>
  );
}

export default UploadDesign;
