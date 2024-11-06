import { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import useOutsideClick from "../../../hooks/useOutsideClick";
import { setMessages } from "../../../Redux/features/orderSlice";

const AdditionalOfferModal = ({ handleClose, onOfferSubmit }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state?.user);

  // Checking Admin
  const isAdmin = ["ADMIN", "SUPER_ADMIN", "SUB_ADMIN"].includes(user?.role);

  const formRef = useRef(null);

  const [form, setForm] = useState({
    text: "",
    price: "",
    duration: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Setup sending message time and date
  const dates = new Date();
  const timeAndDate = dates.getTime();

  const handleSubmit = (e) => {
    e.preventDefault();

    const submitForm = {
      messageText: "",
      senderUserName: user?.userName,
      userImage: user?.image,
      attachment: [],
      additionalOffer: form,
      extendDeliveryTime: null,
      deliverProject: null,
      cancelProject: null,
      imageComments: [],
      timeAndDate,
      // replyTo,
    };

    if (isAdmin) {
      onOfferSubmit?.emit("order:admin-message", {
        userId: "671ba677ed05eed5d29efb35",
        ...submitForm,
      });
    } else {
      onOfferSubmit?.emit("order:user-message", {
        ...submitForm,
      });
    }

    dispatch(
      setMessages({
        ...submitForm,
        recipientId: isAdmin ? "671ba677ed05eed5d29efb35" : "",
      }),
    );

    setForm({
      text: "",
      price: "",
      duration: "",
    });
    // setReplyTo(null);
    handleClose(false);
  };

  useOutsideClick(formRef, () => handleClose(false));
  return (
    <div className="fixed left-0 top-0 z-[999] flex h-screen w-full items-center justify-center bg-black/50 p-5 backdrop-blur-sm">
      <form
        className="w-full max-w-[800px] border border-gray-200 bg-white shadow-btn-shadow"
        ref={formRef}
        onSubmit={handleSubmit}
      >
        <h1 className="bg-lightskyblue px-4 py-2 text-lg font-semibold">
          Additional Offer
        </h1>
        <textarea
          className="h-[150px] w-full resize-none bg-transparent px-4 py-3 outline-none"
          placeholder="Typing"
          name="text"
          value={form.text}
          onChange={handleChange}
          required
        ></textarea>
        <div className="flex flex-wrap items-center gap-5 p-4 sm:gap-10">
          <div className="flex items-center gap-3">
            <span className="text-xs sm:text-base">Amount</span>
            <input
              type="number"
              className="w-[70px] border border-gray-200 px-3 py-1 outline-none sm:w-[100px] sm:py-2"
              name="price"
              value={form.price}
              onChange={handleChange}
              required
            />
          </div>
          <div className="flex items-center gap-3">
            <span className="text-xs sm:text-base">Days</span>
            <input
              type="number"
              className="w-[70px] border border-gray-200 px-3 py-1 outline-none sm:w-[100px] sm:py-2"
              name="duration"
              value={form.duration}
              onChange={handleChange}
              required
            />
          </div>
          <button
            type="submit"
            className="mx-auto bg-primary px-8 py-2 font-semibold text-white sm:me-0 sm:ms-auto"
          >
            Send
          </button>
        </div>
      </form>
    </div>
  );
};

export default AdditionalOfferModal;
