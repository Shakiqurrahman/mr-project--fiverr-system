import React, { useRef, useState } from "react";
import { useSelector } from "react-redux";
import useOutsideClick from "../../../hooks/useOutsideClick";

const AddNoteModal = ({ handleClose, onNoteSubmit }) => {
  const { projectDetails } = useSelector((state) => state.order);
  const modalRef = useRef(null);
  const [form, setForm] = useState({
    title: "",
    note: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onNoteSubmit(form);
    handleClose(false);
  };

  useOutsideClick(modalRef, () => handleClose(false));
  return (
    <div className="fixed left-0 top-0 z-[999] flex h-screen w-full items-center justify-center bg-black/20 p-4 backdrop-blur-sm">
      <form
        ref={modalRef}
        className="w-full max-w-[500px] rounded-md bg-white px-6 py-6"
        onSubmit={handleSubmit}
      >
        <h1 className="mb-6 text-center text-xl font-semibold">Private Note</h1>
        <input
          type="text"
          className={`mb-4 block w-full rounded border px-3 py-3 text-sm outline-none`}
          placeholder="Title"
          name="title"
          value={form.title}
          onChange={handleChange}
        />
        <textarea
          className="block min-h-[140px] w-full resize-none rounded border px-3 py-2 text-sm outline-none"
          placeholder="Note"
          name="note"
          value={form.note}
          onChange={handleChange}
        ></textarea>

        <div className="mt-4 flex justify-end gap-4">
          <button
            onClick={handleClose}
            type="button"
            className="w-[110px] rounded bg-gray-500 px-5 py-2 text-lg font-semibold text-white outline-none duration-300 hover:bg-gray-500/80"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="w-[110px] rounded bg-primary px-5 py-2 text-lg font-semibold text-white outline-none duration-300 hover:bg-primary/80"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddNoteModal;
