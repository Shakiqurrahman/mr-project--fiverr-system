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
    size: '',
    fileFormat: '',
    category: categories[0].id,
    subcategory: ''
  });


  const selectedCategory = categories.find(cat => cat.id == form.category);
  const subcategories = selectedCategory ? selectedCategory.subcategories : [];


  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };


  // they are always bottom.
  const handleCategoryChange = (e) => {
    const selectedCategoryId = e.target.value;
    setForm({
      ...form,
      category: selectedCategoryId,
      subcategory: ''
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(form);
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
              name="file"
              type="file"
              multiple
              id="file"
              hidden
            />
            <label className="p-3 w-full mt-2 block text-center bg-white cursor-pointer">Upload Images</label>
            <p className="text-red-600 text-xs mt-2 px-2 hidden">There was an error!</p>
            <div className='mt-5 grid grid-cols-2 gap-3'>
              <div className='flex items-start gap-3'>
                <div>
                  <input
                    type="checkbox"
                    name="businessCard"
                    className="is-checked peer"
                    hidden
                  />
                  <label className="h-[20px] w-[20px] bg-white flex items-center justify-center cursor-pointer border border-solid border-primary *:opacity-0 peer-[.is-checked]:peer-checked:*:opacity-100">
                    <Check className="h-[14px] sm:h-[18px]" />
                  </label>
                </div>
                <img
                  src=''
                  alt=''
                  className='h-[100px] w-[150px]'
                />
                <h2 className='font-bold flex-grow'>Image Name</h2>
                <button
                  type='button'
                  className='min-h-6 min-w-6 grid place-content-center border border-slate-500 rounded-full'
                >
                      <RxCross2 className='text-slate-500' />  
                </button>
              </div>
              <div className='flex items-start gap-3'>
                <div>
                  <input
                    type="checkbox"
                    name="businessCard"
                    className="is-checked peer"
                    hidden
                  />
                  <label className="h-[20px] w-[20px] bg-white flex items-center justify-center cursor-pointer border border-solid border-primary *:opacity-0 peer-[.is-checked]:peer-checked:*:opacity-100">
                    <Check className="h-[14px] sm:h-[18px]" />
                  </label>
                </div>
                <img
                  src=''
                  alt=''
                  className='h-[100px] w-[150px]'
                />
                <h2 className='font-bold flex-grow'>Image Name</h2>
                <button
                  type='button'
                  className='min-h-6 min-w-6 grid place-content-center border border-slate-500 rounded-full'
                >
                      <RxCross2 className='text-slate-500' />  
                </button>
              </div>
            </div>
          </div>
          <button className="p-3 text-center text-white bg-primary rounded-3xl w-1/2 mx-auto block mt-5">
            Upload
          </button>
        </form>
      </div>
    </div>
  )
}

export default UploadDesign;


// import React, { useState, useEffect } from 'react';
// import { RxCross2 } from "react-icons/rx";
// import Check from "../assets/svg/Check";

// function UploadDesign() {
//   const folders = ["Door Hanger Design", "Flyer Design", "Postcard Design", "Business Card Design"];
//   const subFolders = ["Door Hanger Design", "Flyer Design", "Postcard Design", "Business Card Design"];
//   const industries = ["Pressure Washing", "Exterior Cleaning", "Postcard Design", "Business Card Design"];
//   const designs = ["Door Hanger Design", "Hello", "Postcard Design", "Business Card Design"];

//   const [form, setForm] = useState({
//     title: "",
//     description: "",
//     size: "",
//     fileFormat: "",
//     category: "",
//     subcategory: "",
//     image: "",
//   });

//   const [subcategories, setSubcategories] = useState([]);

//   const categories = [
//     {
//       id: 1,
//       name: "Category One",
//       subcategories: [
//         { id: 1, name: "Subcategory One" },
//         { id: 2, name: "Subcategory Two" }
//       ]
//     },
//     {
//       id: 2,
//       name: "Category Two",
//       subcategories: [
//         { id: 3, name: "Subcategory Three" },
//         { id: 4, name: "Subcategory Four" }
//       ]
//     }
//   ];

//   const [tags, setTags] = useState(['Solar Flyer', 'Dore Hanger', 'Flayer', 'Post Card']);
//   const [newTag, setNewTag] = useState("");

//   const [selectedImages, setSelectedImages] = useState([]);
//   const [loadingImages, setLoadingImages] = useState([]);

//   const [relatedDesign, setRelatedDesign] = useState([
//     "https://mafujurrahm535.com/design-1",
//     "https://mafujurrahm535.com/design-2",
//   ]);

//   const [selectedRelatedDesigns, setSelectedRelatedDesigns] = useState([]);

//   const [selectedFolder, setSelectedFolder] = useState("");
//   const [selectedSubfolder, setSelectedSubfolder] = useState("");
//   const [selectedIndustries, setSelectedIndustries] = useState([]);
//   const [selectedDesigns, setSelectedDesigns] = useState([]);

//   useEffect(() => {
//     if (form.category) {
//       const selectedCategory = categories.find(category => category.id === parseInt(form.category));
//       setSubcategories(selectedCategory ? selectedCategory.subcategories : []);
//     } else {
//       setSubcategories([]);
//     }
//   }, [form.category]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setForm({ ...form, [name]: value });
//   };

//   const handleFileChange = (e) => {
//     const files = Array.from(e.target.files);
//     const images = files.map(file => ({
//       url: URL.createObjectURL(file),
//       name: file.name
//     }));
//     setSelectedImages(prevImages => [...prevImages, ...images]);
//     setLoadingImages(prevLoading => [...prevLoading, ...Array(files.length).fill(true)]); // Initialize loading states
//   };

//   const handleImageLoad = (index) => {
//     setLoadingImages(prevLoading => {
//       const newLoading = [...prevLoading];
//       newLoading[index] = false;
//       return newLoading;
//     });
//   };

//   const handleDeleteImage = (index) => {
//     setSelectedImages(prevImages => prevImages.filter((_, i) => i !== index));
//     setLoadingImages(prevLoading => prevLoading.filter((_, i) => i !== index));
//   };

//   const addTag = () => {
//     if (newTag.trim() === "") return;

//     setTags(prevTags => [...prevTags, newTag]);
//     setNewTag("");
//   };

//   const removeTag = (index) => {
//     setTags(prevTags => prevTags.filter((_, i) => i !== index));
//   };

//   const createTagEventHandler = (e) => {
//     if (e.key === 'Enter') {
//       e.preventDefault();
//       addTag();
//     }
//   };

//   const handleFolderSelect = (folder) => {
//     setSelectedFolder(folder);
//   };

//   const handleSubfolderSelect = (subfolder) => {
//     setSelectedSubfolder(subfolder);
//   };

//   const handleIndustrySelect = (industry) => {
//     setSelectedIndustries(prevIndustries => 
//       prevIndustries.includes(industry) 
//         ? prevIndustries.filter(item => item !== industry) 
//         : [...prevIndustries, industry]
//     );
//   };

//   const handleDesignSelect = (design) => {
//     setSelectedDesigns(prevDesigns => 
//       prevDesigns.includes(design) 
//         ? prevDesigns.filter(item => item !== design) 
//         : [...prevDesigns, design]
//     );
//   };

//   const handleRelatedDesignSelect = (design) => {
//     setSelectedRelatedDesigns((prevSelected) =>
//       prevSelected.includes(design)
//         ? prevSelected.filter((item) => item !== design)
//         : [...prevSelected, design]
//     );
//   };

//   return (
//     <div className="max-width mt-10 sm:mt-20">
//       <form className="w-full max-w-[1000px] mx-auto">
//         <div className="bg-lightskyblue mt-10 pt-5">
//           <h1 className='text-center font-bold text-lg px-4 py-2 border border-primary block rounded-full text-primary w-56 m-auto'>
//             Upload Design
//           </h1>
//           <div className='p-3'>
//             {/* Title */}
//             <label className="block px-2 pt-2">Title</label>
//             <input
//               type="text"
//               name="title"
//               value={form.title}
//               onChange={handleChange}
//               className="bg-white block w-full p-2 border border-solid border-[#e7e7e7] mt-3 outline-none"
//               required
//             />
//             <p className="text-red-600 text-xs mt-2 px-2 hidden">There was an error!</p>

//             {/* Description */}
//             <label className="block px-2 pt-2">Description</label>
//             <textarea
//               name="description"
//               value={form.description}
//               onChange={handleChange}
//               className="bg-white block w-full p-2 border border-solid border-[#e7e7e7] mt-3 outline-none h-[150px] resize-y"
//             ></textarea>
//             <p className="text-red-600 text-xs mt-2 px-2 hidden">There was an error!</p>

//             {/* Category & Subcategory */}
//             <div className='flex flex-wrap md:flex-nowrap gap-2'>
//               <div className='w-full'>
//                 <label className="block px-2 pt-2">Category</label>
//                 <select
//                   name="category"
//                   value={form.category}
//                   onChange={handleChange}
//                   className='bg-white block w-full p-2 border border-solid border-[#e7e7e7] mt-3 outline-none'
//                 >
//                   <option value="">Select Category</option>
//                   {categories.map(item => (
//                     <option key={item.id} value={item.id}>{item.name}</option>
//                   ))}
//                 </select>
//                 <p className="text-red-600 text-xs mt-2 px-2 hidden">There was an error!</p>
//               </div>
//               <div className='w-full'>
//                 <label className="block px-2 pt-2">Subcategory</label>
//                 <select
//                   name="subcategory"
//                   value={form.subcategory}
//                   onChange={handleChange}
//                   className='bg-white block w-full p-2 border border-solid border-[#e7e7e7] mt-3 outline-none'
//                 >
//                   <option value="">Select Subcategory</option>
//                   {subcategories.map(item => (
//                     <option key={item.id} value={item.id}>{item.name}</option>
//                   ))}
//                 </select>
//                 <p className="text-red-600 text-xs mt-2 px-2 hidden">There was an error!</p>
//               </div>
//             </div>

//             {/* Size & File Format */}
//             <div className='flex gap-2'>
//               <div className='w-full'>
//                 <label className="block px-2 pt-2">Size</label>
//                 <input
//                   type="text"
//                   name="size"
//                   value={form.size}
//                   onChange={handleChange}
//                   className="bg-white block w-full p-2 border border-solid border-[#e7e7e7] mt-3 outline-none"
//                   required
//                 />
//                 <p className="text-red-600 text-xs mt-2 px-2 hidden">There was an error!</p>
//               </div>
//               <div className='w-full'>
//                 <label className="block px-2 pt-2">File Format</label>
//                 <input
//                   type="text"
//                   name="fileFormat"
//                   value={form.fileFormat}
//                   onChange={handleChange}
//                   className="bg-white block w-full p-2 border border-solid border-[#e7e7e7] mt-3 outline-none"
//                   required
//                 />
//                 <p className="text-red-600 text-xs mt-2 px-2 hidden">There was an error!</p>
//               </div>
//             </div>

//             {/* File Upload */}
//             <label className="block px-2 pt-2">Image</label>
//             <input
//               name="file"
//               type="file"
//               multiple
//               id="file"
//               hidden
//               onChange={handleFileChange}
//             />
//             <label
//               className="p-3 w-full mt-2 block text-center bg-white cursor-pointer"
//               htmlFor="file"
//             >Upload Images</label>
//             <p className="text-red-600 text-xs mt-2 px-2 hidden">There was an error!</p>

//             {/* Show Upload */}
//             <div className='grid grid-cols-1 md:grid-cols-2 gap-5 mt-5'>
//               {selectedImages.map((image, index) => (
//                 <div key={index} className='flex items-start gap-3'>
//                   <div>
//                     <input
//                       type="checkbox"
//                       name="businessCard"
//                       id={`businessCard-${index}`}
//                       className="is-checked peer"
//                       checked={index === 0} // Adjust based on your logic for checked state
//                       readOnly
//                       hidden
//                     />
//                     <label
//                       htmlFor={`businessCard-${index}`}
//                       className="h-[20px] w-[20px] bg-white flex items-center justify-center cursor-pointer border border-solid border-primary *:opacity-0 peer-[.is-checked]:peer-checked:*:opacity-100"
//                     >
//                       <Check className="h-[14px] sm:h-[18px]" />
//                     </label>
//                   </div>
//                   <img
//                     src={image.url}
//                     alt={image.name}
//                     onLoad={() => handleImageLoad(index)}
//                     className='h-[100px] w-[150px]'
//                   />
//                   <h2 className='font-bold'>{image.name}</h2>
//                   <button
//                     type='button'
//                     onClick={() => handleDeleteImage(index)}
//                     className='min-h-6 min-w-6 grid place-content-center border border-slate-500 rounded-full'
//                   >
//                     <RxCross2 className='text-slate-500' />  
//                   </button>
//                 </div>
//               ))}
//             </div>

//             {/* Tags */}
//             <label className="block px-2 pt-2">Tags</label>
//             <div className='bg-white flex flex-wrap gap-2 w-full p-2 border border-solid border-[#e7e7e7] mt-3 outline-none'>
//               {tags.map((item, index) => (
//                 <small key={index} className='flex items-center gap-2 bg-[#FFEFEF] p-2 rounded-full text-w'>
//                   {item}
//                   <button className='p-1 bg-white rounded-full' onClick={() => removeTag(index)}>
//                     <RxCross2 className='text-slate-600' />
//                   </button>
//                 </small>
//               ))}
//               <input
//                 type="text"
//                 placeholder='Type Here'
//                 className='bg-transparent focus:outline-none'
//                 value={newTag}
//                 onChange={(e) => setNewTag(e.target.value)}
//                 onKeyDown={createTagEventHandler}
//               />
//             </div>

//             {/* Related Design */}
//             <label className="block px-2 pt-2">Related Design</label>
//             <div className="bg-white flex items-center w-full p-2 border border-solid border-[#e7e7e7] mt-3 outline-none h-12">
//               <div className="flex flex-wrap gap-2">
//                 {selectedRelatedDesigns.map((design, index) => (
//                     <small
//                       key={index}
//                       className="px-2 bg-[#EBEBEB] rounded-full cursor-pointer text-nowrap"
//                     >{design}
//                     </small>
//                   ))}
//               </div>
//             </div>
//             <ul className="mt-3">
//               {relatedDesign.map((item, index) => (
//                 <li
//                   key={index}
//                   className="cursor-pointer"
//                   onClick={() => handleRelatedDesignSelect(item)}
//                 >
//                   {item}
//                 </li>
//               ))}
//             </ul>
//             <p className="text-red-600 text-xs mt-2 px-2 hidden">There was an error!</p>

//             {/* Folder & Subfolder */}
//             <div className='flex gap-2 mt-5'>
//               <div className='w-full'>
//                 <div className='flex justify-between'>
//                   <label className="block px-2 pt-2">Folder</label>
//                   <button type='button' className='px-2'>New Create</button>
//                 </div>
//                 <div className='bg-white flex flex-wrap gap-2 min-h-12 items-center w-full p-2 border border-solid border-[#e7e7e7] mt-3 outline-none'>
//                   <small className=' px-2 bg-[#EBEBEB] rounded-full cursor-pointer text-nowrap'>{selectedFolder || 'Select Folder'}</small>  
//                 </div>
//                 <div className='mt-3 flex flex-wrap gap-2'>
//                   {folders.map((item, index) => (
//                     <small
//                       key={index}
//                       className={`px-2 rounded-full cursor-pointer ${selectedFolder === item ? 'bg-[#EBEBEB]' : 'bg-[#FFEFEF]'}`}
//                       onClick={() => handleFolderSelect(item)}
//                     >
//                       {item}
//                     </small>
//                   ))}
//                 </div>
//                 <p className="text-red-600 text-xs mt-2 px-2 hidden">There was an error!</p>
//               </div>
//               <div className='w-full'>
//                 <div className='flex justify-between'>
//                   <label className="block px-2 pt-2">Subfolder</label>
//                   <button type='button' className='px-2'>New Create</button>
//                 </div>
//                 <div className='bg-white flex flex-wrap gap-2 min-h-12 items-center w-full p-2 border border-solid border-[#e7e7e7] mt-3 outline-none'>
//                   <small className=' px-2 bg-[#EBEBEB] rounded-full cursor-pointer text-nowrap'>{selectedSubfolder || 'Select Subfolder'}</small>  
//                 </div>
//                 <div className='mt-3 flex flex-wrap gap-2'>
//                   {subFolders.map((item, index) => (
//                     <small
//                       key={index}
//                       className={`px-2 rounded-full cursor-pointer ${selectedSubfolder === item ? 'bg-[#EBEBEB]' : 'bg-[#FFEFEF]'}`}
//                       onClick={() => handleSubfolderSelect(item)}
//                     >
//                       {item}
//                     </small>
//                   ))}
//                 </div>
//                 <p className="text-red-600 text-xs mt-2 px-2 hidden">There was an error!</p>
//               </div>
//             </div>

//             {/* Industries */}
//             <div className='flex gap-2 mt-5'>
//               <div className='w-full'>
//                 <div className='flex justify-between'>
//                   <label className="block px-2 pt-2">Industries</label>
//                   <button type='button'>New Create</button>
//                 </div>
//                 <div className='bg-white flex flex-wrap gap-2 min-h-12 items-center w-full p-2 border border-solid border-[#e7e7e7] mt-3 outline-none'>
//                   {selectedIndustries.length > 0 ? (
//                     selectedIndustries.map((industry, index) => (
//                       <small key={index} className='px-2 bg-[#EBEBEB] rounded-full cursor-pointer text-nowrap'>
//                         {industry}
//                       </small>
//                     ))
//                   ) : (
//                     <small className='px-2 bg-[#EBEBEB] rounded-full cursor-pointer text-nowrap'>
//                       Select Industries
//                     </small>
//                   )}
//                 </div>
//                 <div className='mt-3 flex flex-wrap gap-2'>
//                   {industries.map((item, index) => (
//                     <small
//                       key={index}
//                       className={`px-2 rounded-full cursor-pointer ${selectedIndustries.includes(item) ? 'bg-[#FFEFEF]' : 'bg-[#EBEBEB]'}`}
//                       onClick={() => handleIndustrySelect(item)}
//                     >
//                       {item}
//                     </small>
//                   ))}
//                 </div>
//               </div>

//               {/* Designs */}
//               <div className='w-full'>
//                 <div className='flex justify-between'>
//                   <label className="block px-2 pt-2">Design</label>
//                   <button type='button'>New Create</button>
//                 </div>
//                 <div className='bg-white flex flex-wrap gap-2 min-h-12 items-center w-full p-2 border border-solid border-[#e7e7e7] mt-3 outline-none'>
//                   {selectedDesigns.length > 0 ? (
//                     selectedDesigns.map((design, index) => (
//                       <small key={index} className='px-2 bg-[#EBEBEB] rounded-full cursor-pointer text-nowrap'>
//                         {design}
//                       </small>
//                     ))
//                   ) : (
//                     <small className='px-2 bg-[#EBEBEB] rounded-full cursor-pointer text-nowrap'>
//                       Select Designs
//                     </small>
//                   )}
//                 </div>
//                 <div className='mt-3 flex flex-wrap gap-2'>
//                   {designs.map((item, index) => (
//                     <small
//                       key={index}
//                       className={`px-2 rounded-full cursor-pointer ${selectedDesigns.includes(item) ? 'bg-[#FFEFEF]' : 'bg-[#EBEBEB]'}`}
//                       onClick={() => handleDesignSelect(item)}
//                     >
//                       {item}
//                     </small>
//                   ))}
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//         <button
//           type="submit"
//           className="p-3 text-center text-white bg-primary rounded-3xl w-1/2 mx-auto block mt-5">
//           Upload
//         </button>
//       </form>
//     </div>
//   );
// }

// export default UploadDesign;
