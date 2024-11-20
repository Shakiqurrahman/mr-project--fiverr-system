import React, { useRef, useState } from "react";
import toast from "react-hot-toast";
import useOutsideClick from "../../hooks/useOutsideClick";
import { useAddDesignerMutation } from "../../Redux/api/dashboardApiSlice";

const AddDesignerModal = ({ handleClose, orderId, value }) => {
  const [addDesigner] = useAddDesignerMutation();

  const modalRef = useRef(null);
  const [form, setForm] = useState({
    title: value || "",
  });
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.title !== value) {
      try {
        const response = await addDesigner({
          designerName: form.title,
          orderId,
        });
        if (response?.data?.success) {
          toast.success("Designer added successfully!");
        }
      } catch (error) {
        toast.error("Failed to add designer!");
      }
    }
    handleClose(false);
  };

  useOutsideClick(modalRef, () => handleClose(false));

  return (
    <div className="fixed left-0 top-0 z-[999] flex h-screen w-full items-center justify-center bg-black/20 p-4 backdrop-blur-sm">
      <form
        ref={modalRef}
        className="w-full max-w-[500px] rounded-md bg-white px-8 py-8"
        onSubmit={handleSubmit}
      >
        <h1 className="mb-6 text-center text-xl font-semibold">
          Add Designer Name
        </h1>
        <label className="mb-2 block w-full font-medium">Designer</label>
        <input
          type="text"
          className={`block w-full rounded-md border px-3 py-2 text-sm outline-none`}
          placeholder="Enter Designer Name"
          name="title"
          value={form.title}
          onChange={handleChange}
        />
        <button
          type="submit"
          className="mt-4 block w-full rounded-md bg-primary px-3 py-2 font-medium text-white outline-none"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default AddDesignerModal;
