import { useRef, useState } from "react";
import { IoMdClose } from "react-icons/io";
import useOutsideClick from "../../hooks/useOutsideClick";

const EditQuickMsgModal = ({ handleClose, value }) => {
  const editQuickMsgRef = useRef(null);
  const [form, setForm] = useState({
    id: value.id,
    title: value.title,
    text: value.text,
  });
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   if (form.title && form.title.length <= 60 && form.text) {
  //     onMsgSubmit(form);
  //     handleClose(null);
  //   }
  // };

  useOutsideClick(editQuickMsgRef, () => handleClose(null));
  return (
    <div className="fixed left-0 top-0 !z-[9999999] !flex h-screen w-full items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
      <button
        className="absolute right-10 top-10"
        onClick={() => handleClose(null)}
      >
        <IoMdClose className="text-3xl text-canceled" />
      </button>
      <form
        className="w-full max-w-[600px] rounded-md bg-white px-4 py-5"
        onSubmit={handleSubmit}
        ref={editQuickMsgRef}
      >
        <h1 className="text-center text-lg font-semibold">Add Quick Message</h1>
        <label className="block w-full font-medium">Title</label>
        <input
          type="text"
          className={`block w-full rounded-md px-3 py-2 text-sm outline-none ${form.title.length > 60 ? "border border-canceled" : "border"}`}
          placeholder="Enter Title"
          name="title"
          value={form.title}
          onChange={handleChange}
        />
        <p className="my-3 text-xs">
          Title Character must be under{" "}
          <span className={form.title.length > 60 ? "text-canceled" : ""}>
            {form.title.length}/60
          </span>
        </p>
        <label className="block w-full font-medium">Description</label>
        <textarea
          className="block min-h-[100px] w-full resize-none rounded-md border px-3 py-2 text-sm outline-none"
          placeholder="Enter Message"
          name="text"
          value={form.text}
          onChange={handleChange}
        ></textarea>
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

export default EditQuickMsgModal;
