import React, { useState } from 'react';
import { ImPlus } from "react-icons/im";
import { RiDeleteBin6Line } from "react-icons/ri";
import { RxCross2 } from "react-icons/rx";

function CreateProject() {
  // Form state
  const [form, setForm] = useState({
    image: "",
    offerAmount: "",
    originalAmount: "",
    regularDeliveryDays: "",
    fastDeliveryDays: "",
    fdAmount: "",
  });

  // Handle form input change
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    console.log(file);
    setForm({ ...form, image: file });
  };

  // Design sections state
  const [designs, setDesigns] = useState([
    {
      id: 1,
      name: "Design 1",
      variant: ["Single Variant", "Double Variant"],
    },
  ]);
  
  // State for new variant input
  const [newVariant, setNewVariant] = useState({});

  // Add new design
  const addDesign = () => {
    setDesigns([...designs, { id: Date.now(), name: "", variant: ["Single Slider", "Double Slider"] }]);
  };

  // Remove design
  const removeDesign = (id) => {
    setDesigns(designs.filter(design => design.id !== id));
    const { [id]: _, ...rest } = newVariant;
    setNewVariant(rest);
  };

  // Handle design name change
  const handleDesignChange = (id, e) => {
    setDesigns(designs.map(design => 
      design.id === id ? { ...design, name: e.target.value } : design
    ));
  };

  // Add variant to design
  const addVariant = (designId) => {
    const variantValue = newVariant[designId] || "";
    if (variantValue.trim() === "") return; 

    setDesigns(designs.map(design => 
      design.id === designId 
        ? { ...design, variant: [...design.variant, variantValue] } 
        : design
    ));
    setNewVariant({ ...newVariant, [designId]: "" }); // Clear input after adding
  };

  // Remove variant from design
  const removeVariant = (designId, variant) => {
    setDesigns(designs.map(design => 
      design.id === designId 
        ? { ...design, variant: design.variant.filter(v => v !== variant) } 
        : design
    ));
  };

  // Handle Enter key for variant input
  const createVariantEventHandler = (e, designId) => {
    if (e.key === 'Enter') {
      e.preventDefault(); // Prevent form reload
      addVariant(designId);
    }
  };

  // Handle variant input change
  const handleNewVariantChange = (e, designId) => {
    setNewVariant({ ...newVariant, [designId]: e.target.value });
  };

  // Bullet section state
  const [bullets, setBullets] = useState([
    "Unlimited Revision", 
    "PSD Source file", 
    "Print Ready PDF"
  ]);
  
  // State for new bullet input
  const [newBullet, setNewBullet] = useState("");

  // Add new bullet
  const addBullet = () => {
    if (newBullet.trim() === "") return; // Prevent adding empty bullets

    setBullets([...bullets, newBullet]);
    setNewBullet("");
  };
  
  // Remove bullet
  const removeBullet = (index) => {
    setBullets(bullets.filter((_, i) => i !== index));
  };

  // Handle Enter key for bullet input
  const createBulletEventHandler = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault(); // Prevent form reload
      addBullet();
    }
  };

  // Requirements section state
  const [requirements, setRequirements] = useState([
    "Which industry do you work in?", 
    "Do you have your own company logo?", 
    ""
  ]);

  // Add new requirement
  const addRequirements = () => {
    setRequirements([...requirements, ""]);
  };

  // Remove requirement
  const deleteRequirements = (index) => {
    setRequirements(requirements.filter((_, i) => i !== index));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      form,
      designs,
      bullets,
      requirements: requirements.filter(req => req.trim() !== "")
    };
    console.log(data);
  };

  return (
    <div className="max-width mt-10 sm:mt-20">
      <form className="w-full max-w-[800px] mx-auto" onSubmit={handleSubmit}>
        <div className="bg-[#DCEEFA] mt-10">
          <h1 className="bg-primary text-white p-3">Image</h1>
          <input type="file" name="image" id="image" className='file-input' onChange={handleFileChange} />
        </div>
        <div className="bg-[#DCEEFA] mt-5">
          <h1 className="bg-primary text-white p-3">Price & Delivery</h1>
          <div className="p-3">
            <div className='flex gap-2'>
              <div className='flex-grow'>
                <input
                    type="text"
                    name="offerAmount"
                    value={form.offerAmount}
                    onChange={handleChange}
                    placeholder='Offer Amount'
                    className="bg-white block w-full p-2 border border-solid border-[#e7e7e7] mt-3 outline-none"
                    required
                />
                <p className="text-red-600 text-xs mt-2 px-2 hidden">
                  There was an error!
                </p>
              </div>
              <div className='flex-grow'>
                <input
                    type="text"
                    name="originalAmount"
                    value={form.originalAmount}
                    onChange={handleChange}
                    placeholder='Original Amount'
                    className="bg-white block w-full p-2 border border-solid border-[#e7e7e7] mt-3 outline-none"
                    required
                />
                <p className="text-red-600 text-xs mt-2 px-2 hidden">
                  There was an error!
                </p>
              </div>
            </div>
            <input
                type="text"
                name="regularDeliveryDays"
                value={form.regularDeliveryDays}
                onChange={handleChange}
                placeholder='Regular Delivery Days'
                className="bg-white block w-full p-2 border border-solid border-[#e7e7e7] mt-3 outline-none"
                required
            />
            <p className="text-red-600 text-xs mt-2 px-2 hidden">
              There was an error!
            </p>
            <div className='flex'>
              <div className='flex-grow'>
                <input
                    type="text"
                    name="fastDeliveryDays"
                    value={form.fastDeliveryDays}
                    onChange={handleChange}
                    placeholder='Fast Delivery Days'
                    className="bg-white block w-full p-2 border border-solid border-[#e7e7e7] mt-3 outline-none"
                    required
                />
                <p className="text-red-600 text-xs mt-2 px-2 hidden">
                  There was an error!
                </p>
              </div>
              <div className='w-56'>
                <input
                    type="text"
                    name="fdAmount"
                    value={form.fdAmount}
                    onChange={handleChange}
                    placeholder='F.D. Amount'
                    className="bg-white block w-full p-2 border border-solid border-[#e7e7e7] mt-3 outline-none"
                    required
                />
                <p className="text-red-600 text-xs mt-2 px-2 hidden">
                  There was an error!
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-[#DCEEFA] mt-5">
          <div className='bg-primary text-white p-3 flex justify-between'>
            <h1 className="">Design</h1>
            <ImPlus onClick={addDesign} />
          </div>
          <div className='p-3'>
            {designs.map(design => (
              <div key={design.id}>
                <div className='flex items-center gap-2'>
                  <input
                    type="text"
                    placeholder='Design Name'
                    value={design.name}
                    onChange={(e) => handleDesignChange(design.id, e)}
                    className='bg-white block w-full p-2 border border-solid border-[#e7e7e7] mt-3 outline-none'
                    required
                  />
                  <RiDeleteBin6Line
                    className='text-gray-500 mt-2'
                    onClick={() => removeDesign(design.id)}
                  />
                </div>
                <div className='flex flex-wrap mt-2 gap-2'>
                  {design.variant.map(variant => (
                    <small key={variant} className='flex items-center gap-2 bg-white p-2 rounded-sm'>
                      {variant} <RxCross2 className='text-red-600' onClick={() => removeVariant(design.id, variant)} />
                    </small>
                  ))}
                  <input
                    type="text"
                    placeholder='Type Here'
                    value={newVariant[design.id] || ""}
                    onChange={(e) => handleNewVariantChange(e, design.id)}
                    onKeyDown={(e) => createVariantEventHandler(e, design.id)}
                    className='bg-transparent focus:outline-none'
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="bg-[#DCEEFA] mt-5">
          <h1 className="bg-primary text-white p-3">Bullet Point</h1>
          <div className="p-3">
            <div className='flex flex-wrap mt-2 gap-2'>
              {bullets.map((bullet, index) => (
                <small key={index} className='flex items-center gap-2 bg-white p-2 rounded-sm'>
                  {bullet} 
                  <RxCross2 className='text-red-600' onClick={() => removeBullet(index)} />
                </small>
              ))}
              <input 
                type="text" 
                placeholder='Add new bullet'
                value={newBullet}
                onChange={(e) => setNewBullet(e.target.value)}
                onKeyDown={createBulletEventHandler}
                className='bg-transparent focus:outline-none'
              />
            </div>
          </div>
        </div>
        <div className="bg-[#DCEEFA] mt-5">
          <div className='bg-primary text-white p-3 flex justify-between'>
            <h1 className="">Requirements</h1>
            <ImPlus onClick={addRequirements} />
          </div>
          <div className="p-3">
            {requirements.map((requirement, index) => (
              <div key={index} className='flex items-center gap-2 mb-2'>
                <input
                  type="text"
                  placeholder='Type'
                  value={requirement}
                  onChange={(e) => {
                    const newRequirements = [...requirements];
                    newRequirements[index] = e.target.value;
                    setRequirements(newRequirements);
                  }}
                  className='bg-white block w-full p-2 border border-solid border-[#e7e7e7] outline-none'
                />
                <RiDeleteBin6Line
                  className='text-gray-500 cursor-pointer'
                  onClick={() => deleteRequirements(index)}
                />
              </div>
          ))}
          </div>
        </div>
        <button
          type="submit"
          className="p-3 text-center text-white bg-primary rounded-3xl w-1/2 mx-auto block mt-5">
          Update
        </button>
      </form>
    </div>
  );
}

export default CreateProject;
