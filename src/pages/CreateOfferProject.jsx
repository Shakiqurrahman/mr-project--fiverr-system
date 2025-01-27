import { Backdrop, CircularProgress } from "@mui/material";
import axios from "axios";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { FaEye } from "react-icons/fa";
import { ImPlus } from "react-icons/im";
import { RiDeleteBin6Line } from "react-icons/ri";
import { RxCross2 } from "react-icons/rx";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import shortid from "shortid";
import { useUpdateOfferProjectMutation } from "../Redux/api/offerProjectApiSlice";
import { setPreviewImage } from "../Redux/features/previewImageSlice";
import { configApi } from "../libs/configApi";

function CreateOfferProject() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const offerProjects = useSelector((state) => state.offerProject.offerProject);
  const [updateOfferProject, { isLoading, error }] =
    useUpdateOfferProjectMutation();
  const [projectImage, setProjectImage] = useState(
    offerProjects?.projectImage || {},
  );

  // Form state
  const [form, setForm] = useState({
    title: offerProjects?.title || "",
    freeBannerName: offerProjects?.freeDesignName || "",
    offerAmount: offerProjects?.offerAmount || "",
    originalAmount: offerProjects?.originalAmount || "",
    regularDeliveryDays: offerProjects?.delivery || "",
    fastDeliveryDays: offerProjects?.extraFastDelivery || "",
    fdAmount: offerProjects?.extraFastDeliveryAmount || "",
  });

  // Handle form input change
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    const url = URL.createObjectURL(file);
    setProjectImage({ file: file, name: file.name, url });
  };

  const handleOpenPreviewImage = () => {
    dispatch(setPreviewImage(projectImage?.url));
  };

  // Design sections state
  const [designs, setDesigns] = useState(offerProjects?.designs || []);
  const [freeDesignTypographys, setFreeDesignTypographys] = useState(
    offerProjects?.freeDesignTypographys || [],
  );

  // State for new variant input
  const [newVariant, setNewVariant] = useState({});

  const designId = shortid();

  // Add new design
  const addDesign = () => {
    setDesigns([
      ...designs,
      { designId, designName: "", designView: ["Single Side", "Double Side"] },
    ]);
  };

  // Remove design
  const removeDesign = (designId) => {
    setDesigns(designs?.filter((design) => design.designId !== designId));
    const { [designName]: _, ...rest } = newVariant;
    setNewVariant(rest);
  };

  // Handle design name change
  const handleDesignChange = (index, e) => {
    setDesigns(
      designs?.map((design, i) =>
        i === index ? { ...design, designName: e.target.value } : design,
      ),
    );
  };

  // Add variant to design
  const addVariant = (designName) => {
    const variantValue = newVariant[designName] || "";
    if (variantValue.trim() === "") return;

    setDesigns(
      designs?.map((design) =>
        design.designName === designName
          ? {
              ...design,
              designId,
              designView: [...design.designView, variantValue],
            }
          : design,
      ),
    );
    setNewVariant({ ...newVariant, [designName]: "" }); // Clear input after adding
  };

  // Add variant to free design
  const addFreeVariant = (designName) => {
    const variantValue = newVariant[designName] || "";
    if (variantValue.trim() === "") return;

    // Check if the designName matches the freeBannerName
    if (form.freeBannerName === designName) {
      setFreeDesignTypographys((prevTypographys) => {
        // Add the new variant to the current freeDesignTypographys array
        const updatedTypographys = [...prevTypographys, variantValue];
        return updatedTypographys;
      });
    }

    // Clear the input after adding
    setNewVariant({ ...newVariant, [designName]: "" });
  };

  // Remove variant from design
  const removeVariant = (designId, variant) => {
    setDesigns(
      designs?.map((design) =>
        design.designId === designId
          ? {
              ...design,
              designView: design.designView.filter((v) => v !== variant),
            }
          : design,
      ),
    );
  };

  // Remove variant from free design
  const removeFreeVariant = (designName, variantToRemove) => {
    if (form.freeBannerName === designName) {
      setFreeDesignTypographys((prevTypographys) => {
        const updatedTypographys = prevTypographys.filter(
          (variant) => variant !== variantToRemove,
        );
        return updatedTypographys;
      });
    }
  };

  // Handle Enter key for variant input
  const createVariantEventHandler = (e, designName) => {
    if (e.key === "Enter") {
      e.preventDefault(); // Prevent form reload
      addVariant(designName);
    }
  };

  // Handle Enter key for free variant input
  const createFreeVariantEventHandler = (e, designName) => {
    if (e.key === "Enter") {
      e.preventDefault(); // Prevent form reload
      addFreeVariant(designName);
    }
  };

  // Handle variant input change
  const handleNewVariantChange = (e, designName) => {
    setNewVariant({ ...newVariant, [designName]: e.target.value });
  };

  // Bullet section state
  const [bullets, setBullets] = useState(offerProjects?.bullPoints || []);

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
    if (e.key === "Enter") {
      e.preventDefault(); // Prevent form reload
      addBullet();
    }
  };

  // Requirements section state
  const [requirements, setRequirements] = useState(
    offerProjects?.requirements || [],
  );

  // Add new requirement
  const addRequirements = () => {
    setRequirements([...requirements, ""]);
  };

  // Remove requirement
  const deleteRequirements = (index) => {
    setRequirements(requirements.filter((_, i) => i !== index));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    let uploadSuccess = true;
    const imageRes = async () => {
      if (projectImage.file) {
        const formData = new FormData();
        // formData.append("image", projectImage.file);
        formData.append("files", projectImage.file);

        // const apiKey = "7a4a20aea9e7d64e24c6e75b2972ff00";
        // const uploadUrl = `https://api.imgbb.com/1/upload?key=${apiKey}`;
        const uploadUrl = `${configApi.api}upload-attachment-optimized`;
        try {
          const response = await axios.post(uploadUrl, formData);
          const name = response.data.data.file.originalName;
          const imageUrl = response.data.data.file.optimizedUrl;
          const watermark = response.data.data.file.url;
          setProjectImage({ name, url: imageUrl, watermark });
          return {
            url: imageUrl,
            name,
            watermark,
          };
        } catch (error) {
          toast.error("Something went wrong!");
          // You can use a library like react-toastify to display error messages
          // toast.error("Failed to upload image");
          uploadSuccess = false;
        } finally {
          // setUploading(false);
        }
      }
    };
    const imageResult = await imageRes();

    const image = { ...projectImage, ...imageResult };

    if (image && form.title) {
      const data = {
        title: form.title,
        projectImage: imageResult,
        offerAmount: form.offerAmount,
        originalAmount: form.originalAmount,
        delivery: form.regularDeliveryDays,
        extraFastDelivery: form.fastDeliveryDays,
        extraFastDeliveryAmount: form.fdAmount,
        freeDesignName: form.freeBannerName,
        freeDesignTypographys,
        designs,
        bullPoints: bullets,
        requirements: requirements.filter((req) => req.trim() !== ""),
      };
      try {
        // Call the mutation function with the constructed data
        const response = await updateOfferProject(data).unwrap();
        if (!uploadSuccess) {
          toast.error("Failed to upload image");
        }
        toast.success("Updated Successfully!");
        navigate(-1);
      } catch (error) {
        toast.error("Update failed!");
      }
    }
  };

  return (
    <div className="max-width mt-5">
      <h1 className="text-center text-[28px] font-semibold uppercase">
        Offer Project Details
      </h1>
      <form className="mx-auto w-full max-w-[800px]" onSubmit={handleSubmit}>
        {/* Image */}
        <div className="mt-5 bg-lightskyblue">
          <h1 className="flex items-center justify-between bg-primary p-3 text-white">
            Image{" "}
            <button type="button" onClick={handleOpenPreviewImage}>
              <FaEye className="text-2xl" />
            </button>
          </h1>
          <input
            type="file"
            name="image"
            id="image"
            className="file-input"
            onChange={handleFileChange}
            hidden
            // disabled={uploading}
          />
          <div className="flex items-stretch">
            <label
              htmlFor="image"
              className="block flex-shrink-0 bg-[#7c7c7c] px-4 py-2 text-sm text-white sm:text-base"
            >
              CHOOSE FILE
            </label>
            <div className="overflow-hidden text-ellipsis whitespace-nowrap px-4 py-2">
              {projectImage?.name || "No file chosen"}
            </div>
          </div>
        </div>

        <div className="mt-6 bg-lightskyblue">
          <h1 className="bg-primary p-3 text-white">Project Title</h1>
          <div className="p-3">
            <input
              type="text"
              name="title"
              value={form.title}
              onChange={handleChange}
              placeholder="Project Title"
              className="block w-full border border-solid border-[#e7e7e7] bg-white p-2 outline-none"
              required
            />
          </div>
        </div>
        <div className="mt-6 bg-lightskyblue">
          <h1 className="bg-primary p-3 text-white">Banner Free Design Name</h1>
          <div className="p-3">
            <input
              type="text"
              name="freeBannerName"
              value={form.freeBannerName}
              onChange={handleChange}
              placeholder="Banner Free Design Name"
              className="block w-full border border-solid border-[#e7e7e7] bg-white p-2 outline-none"
              required
            />
            <div className="mt-2 flex flex-wrap gap-2">
              {freeDesignTypographys.map((variant) => (
                <small
                  key={variant}
                  className="flex items-center gap-2 rounded-sm bg-white p-2"
                >
                  {variant}
                  <RxCross2
                    className="text-red-600"
                    onClick={() =>
                      removeFreeVariant(form.freeBannerName, variant)
                    }
                  />
                </small>
              ))}
              <input
                type="text"
                placeholder="Type Here"
                value={newVariant[form.freeBannerName] || ""}
                onChange={(e) => handleNewVariantChange(e, form.freeBannerName)}
                onKeyDown={(e) =>
                  createFreeVariantEventHandler(e, form.freeBannerName)
                }
                className="bg-transparent focus:outline-none"
              />
            </div>
          </div>
        </div>
        <div className="mt-5 bg-lightskyblue">
          <h1 className="bg-primary p-3 text-white">Price & Delivery</h1>
          <div className="p-3">
            <div className="flex gap-2">
              <div className="flex-grow">
                <input
                  type="text"
                  name="offerAmount"
                  value={form.offerAmount}
                  onChange={handleChange}
                  placeholder="Offer Amount"
                  className="mt-3 block w-full border border-solid border-[#e7e7e7] bg-white p-2 outline-none"
                  required
                />
              </div>
              <div className="flex-grow">
                <input
                  type="text"
                  name="originalAmount"
                  value={form.originalAmount}
                  onChange={handleChange}
                  placeholder="Original Amount"
                  className="mt-3 block w-full border border-solid border-[#e7e7e7] bg-white p-2 outline-none"
                  required
                />
              </div>
            </div>
            <input
              type="text"
              name="regularDeliveryDays"
              value={form.regularDeliveryDays}
              onChange={handleChange}
              placeholder="Regular Delivery Days"
              className="mt-3 block w-full border border-solid border-[#e7e7e7] bg-white p-2 outline-none"
              required
            />
            <div className="flex">
              <div className="flex-grow">
                <input
                  type="text"
                  name="fastDeliveryDays"
                  value={form.fastDeliveryDays}
                  onChange={handleChange}
                  placeholder="Fast Delivery Days"
                  className="mt-3 block w-full border border-solid border-[#e7e7e7] bg-white p-2 outline-none"
                  required
                />
              </div>
              <div className="w-56">
                <input
                  type="text"
                  name="fdAmount"
                  value={form.fdAmount}
                  onChange={handleChange}
                  placeholder="F.D. Amount"
                  className="mt-3 block w-full border border-solid border-[#e7e7e7] bg-white p-2 outline-none"
                  required
                />
              </div>
            </div>
          </div>
        </div>
        <div className="mt-5 bg-lightskyblue">
          <div className="flex justify-between bg-primary p-3 text-white">
            <h1 className="">Design</h1>
            <ImPlus onClick={addDesign} />
          </div>
          <div className="p-3">
            {designs?.map((design, idx) => (
              <div key={idx}>
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    placeholder="Design Name"
                    value={design?.designName}
                    onChange={(e) => handleDesignChange(idx, e)}
                    className="mt-3 block w-full border border-solid border-[#e7e7e7] bg-white p-2 outline-none"
                    required
                  />
                  <RiDeleteBin6Line
                    className="mt-2 text-gray-500"
                    onClick={() => removeDesign(design.designId)}
                  />
                </div>
                <div className="mt-2 flex flex-wrap gap-2">
                  {design?.designView.map((variant) => (
                    <small
                      key={variant}
                      className="flex items-center gap-2 rounded-sm bg-white p-2"
                    >
                      {variant}{" "}
                      <RxCross2
                        className="text-red-600"
                        onClick={() => removeVariant(design.designId, variant)}
                      />
                    </small>
                  ))}
                  <input
                    type="text"
                    placeholder="Type Here"
                    value={newVariant[design.designName] || ""}
                    onChange={(e) =>
                      handleNewVariantChange(e, design.designName)
                    }
                    onKeyDown={(e) =>
                      createVariantEventHandler(e, design.designName)
                    }
                    className="bg-transparent focus:outline-none"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
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
          <button
            type="submit"
            className="mt-5 block w-1/2 max-w-[200px] rounded-3xl bg-primary p-3 text-center text-white"
          >
            Update
          </button>
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="mt-5 block w-1/2 max-w-[200px] rounded-3xl bg-canceled p-3 text-center text-white"
          >
            Cancel
          </button>
        </div>
      </form>
      {isLoading && (
        <Backdrop
          sx={{
            color: "#fff",
            zIndex: (theme) => theme.zIndex.drawer + 1,
          }}
          open
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      )}
    </div>
  );
}

export default CreateOfferProject;
