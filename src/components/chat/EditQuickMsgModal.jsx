import { useRef, useState } from "react";
import toast from "react-hot-toast";
import { IoMdClose } from "react-icons/io";
import { useUpdateQuickResMsgMutation } from "../../Redux/api/inboxApiSlice";
import useOutsideClick from "../../hooks/useOutsideClick";

const EditQuickMsgModal = ({ handleClose, value, controller }) => {
  const editQuickMsgRef = useRef(null);
  const [updateQuickResMsg, { isLoading, error }] =
    useUpdateQuickResMsgMutation();

  // Initialize form state with existing message values
  const [form, setForm] = useState({
    id: value.id,
    title: value.title,
    description: value.description,
  });

  // Handle form input changes
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Handle form submission and trigger the mutation
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (form.title && form.title.length <= 60 && form.description) {
      try {
        await updateQuickResMsg({
          id: form.id,
          updatedMessage: {
            title: form.title,
            description: form.description,
          },
        }).unwrap();

        toast.success("Message updated successfully");
        handleClose(null);
      } catch (err) {
        toast.error("Failed to update message");
      }
      controller(null);
    }
  };

  // Close the modal when clicking outside of it
  useOutsideClick(editQuickMsgRef, () => handleClose(null));

  return (
    <div className="fixed left-0 top-0 !z-[99999999] !flex h-screen w-full items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
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
          name="description"
          value={form.description}
          onChange={handleChange}
        ></textarea>
        <button
          type="submit"
          className="mt-3 block w-full rounded-md bg-primary px-3 py-2 font-medium text-white outline-none"
        >
          Update
        </button>
      </form>
    </div>
  );
};

export default EditQuickMsgModal;
