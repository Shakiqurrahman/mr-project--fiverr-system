import React, { useRef, useState } from "react";
import useOutsideClick from "../../../hooks/useOutsideClick";
import { IoCloseSharp } from "react-icons/io5";

const CancelProjectModal = ({ handleClose }) => {
    const modalRef = useRef(null);
  const [extendType, setExtendType] = useState("requestByClient");

  const [form, setForm] = useState({
    explainWhyCancel: "",
  });

  const isAdmin = true;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };


  const handleExtendType = (e) => {
    setExtendType(e.target.id);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {...form, extendType}
    console.log(data);

    // onNoteSubmit(form);
    handleClose(false);
  };

  useOutsideClick(modalRef, () => handleClose(false));
  return (
    <div className="fixed left-0 top-0 z-[999] flex h-screen w-full items-center justify-center bg-black/20 p-4 backdrop-blur-sm">
      <div ref={modalRef} className="w-full max-w-[650px] rounded-md">
        <div className="flex items-center justify-between bg-lightskyblue px-6 py-4">
          <h1 className="text-lg font-semibold">Cancel Project</h1>
          <IoCloseSharp
            onClick={() => handleClose(false)}
            className="cursor-pointer text-[27px] text-gray-500"
          />
        </div>
        <form onSubmit={handleSubmit} className="bg-white px-6 py-6">
          <textarea
            className="block min-h-[140px] w-full resize-none border px-3 py-2 text-sm outline-none"
            placeholder="Explain the reason for cancellation..."
            name="explainWhyCancel"
            value={form.explainWhyCancel}
            onChange={handleChange}
          ></textarea>

          {isAdmin && (
            <div className="mt-4 flex justify-center gap-8">
              <div className="flex items-center gap-2">
                <input
                  className="size-4"
                  type="radio"
                  name="extendType"
                  onChange={handleExtendType}
                  id="requestByClient"
                  checked={extendType === "requestByClient"}
                />
                <label htmlFor="requestByClient">Requested by client</label>
              </div>
              <div className="flex items-center gap-2">
                <input
                  className="size-4"
                  type="radio"
                  name="extendType"
                  onChange={handleExtendType}
                  id="requestByMe"
                  checked={extendType === "requestByMe"}
                />
                <label htmlFor="requestByMe">Request by me</label>
              </div>
            </div>
          )}

          <div className="mt-10 flex items-center justify-end gap-6 sm:flex-row sm:gap-2">
            <button
              type="submit"
            //   disabled={form.days <= 0}
              className="rounded bg-primary px-5 py-2 text-base font-semibold text-white outline-none duration-300 hover:bg-primary/80 disabled:bg-primary/60"
            >
              Confirm Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CancelProjectModal;
