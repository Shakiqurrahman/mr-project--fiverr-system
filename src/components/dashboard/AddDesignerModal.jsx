import React, { useRef, useState } from "react";
import useOutsideClick from "../../hooks/useOutsideClick";

const AddDesignerModal = ({ handleClose, onMsgSubmit }) => {
  const modalRef = useRef(null);
  const [form, setForm] = useState({
    title: "",
  });
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    onMsgSubmit(form);
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
          className={`block w-full rounded-md px-3 py-2 text-sm outline-none border`}
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
