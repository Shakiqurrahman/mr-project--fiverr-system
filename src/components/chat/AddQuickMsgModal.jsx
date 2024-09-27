import { useRef, useState } from "react";
import { IoMdClose } from "react-icons/io";
import useOutsideClick from "../../hooks/useOutsideClick";
import { useCreateQuickResMsgMutation } from "../../Redux/api/inboxApiSlice";

const AddQuickMsgModal = ({ handleClose }) => {
  const [createQuickResMsg, { isLoading, error }] =
    useCreateQuickResMsgMutation();
  const formRef = useRef(null);
  const [form, setForm] = useState({
    title: "",
    description: "",
  });
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate form input
    if (form.title && form.title.length <= 60 && form.description) {
      try {
        // Trigger the mutation to create a new quick message
        const newMessage = await createQuickResMsg({
          title: form.title,
          description: form.description,
        }).unwrap();
        console.log(newMessage);

        // Close the modal on success
        handleClose(false);
      } catch (err) {
        console.error("Failed to create the quick message:", err);
      }
    }
  };

  useOutsideClick(formRef, () => handleClose(false));
  return (
    <div className="fixed left-0 top-0 z-[9999999] flex h-screen w-full items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
      <button
        className="absolute right-10 top-10"
        onClick={() => handleClose(false)}
      >
        <IoMdClose className="text-3xl text-canceled" />
      </button>
      <form
        ref={formRef}
        className="w-full max-w-[600px] rounded-md bg-white px-4 py-5"
        onSubmit={handleSubmit}
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
          Submit
        </button>
      </form>
    </div>
  );
};

export default AddQuickMsgModal;
