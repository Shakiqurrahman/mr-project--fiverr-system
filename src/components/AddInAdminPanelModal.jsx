import React, { useRef, useState } from "react";
import toast from "react-hot-toast";
import useOutsideClick from "../hooks/useOutsideClick";
import { useUpdateUserRolesMutation } from "../Redux/api/allUserApiSlice";

const AddInAdminPanelModal = ({ handleClose }) => {
  const [updateUserRoles, { isLoading: isUpdating }] =
    useUpdateUserRolesMutation();
  const AddPanelRef = useRef(null);

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
    if (form?.title && form?.title.length <= 60 && form?.description) {
      try {
        // await updateUserRoles({
        //   title: form.title,
        //   description: form.description,
        // }).unwrap();
        toast.success("Message created successfully");

        // Close the modal on success
        handleClose(false);
      } catch (err) {
        console.error("Failed to create the quick message:", err);
        toast.error("Failed to create the quick message");
      }
    }
  };

  useOutsideClick(AddPanelRef, () => handleClose(false));
  return (
    <div className="fixed left-0 top-0 z-[9999999] flex h-screen w-full items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
      <form
        ref={AddPanelRef}
        className="w-full max-w-[600px] rounded-md bg-white px-4 py-5"
        onSubmit={handleSubmit}
      >
        <h1 className="mb-4 text-center text-lg font-semibold">
          Add User In Admin Panel
        </h1>
        <div className="flex items-center gap-2">
          <input
            type="text"
            className={`mb-4 block w-full rounded-md px-3 py-2 text-sm outline-none ${form.title.length > 60 ? "border border-canceled" : "border"}`}
            placeholder="Search by the user email"
            name="title"
            value={form.title}
            onChange={handleChange}
          />
        </div>
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

export default AddInAdminPanelModal;
