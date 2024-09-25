import React, { useRef, useState } from "react";
import { IoMdClose } from "react-icons/io";
import useOutsideClick from "../../hooks/useOutsideClick";

const AddDesignerModal = ({ handleClose, onMsgSubmit }) => {
  const formRef = useRef(null);
  const [form, setForm] = useState({
    title: "",
  });
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (form.title && form.title.length <= 60 && form.text) {
      onMsgSubmit(form);
      handleClose(false);
    }
  };

  useOutsideClick(formRef, () => handleClose(false));
  return (
    <div className="fixed left-0 top-0 z-[9999999] flex h-screen w-full items-center justify-center bg-black/20 p-4 backdrop-blur-sm">
      <form
        ref={formRef}
        className="w-full max-w-[500px] rounded-md bg-white px-8 py-8"
        onSubmit={handleSubmit}
      >
        <h1 className="text-center text-xl font-semibold mb-6">Add Designer Name</h1>
        <label className="block w-full font-medium mb-2">Designer</label>
        <input
          type="text"
          className={`block w-full rounded-md px-3 py-2 text-sm outline-none ${form.title.length > 60 ? "border border-canceled" : "border"}`}
          placeholder="Enter Designer Name"
          name="title"
          value={form.title}
          onChange={handleChange}
        />
        <button
          type="submit"
          className="mt-3 block w-full rounded-md bg-primary px-3 py-2 font-medium text-white outline-none"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default AddDesignerModal;
