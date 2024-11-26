import axios from "axios";
import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { ImPlus } from "react-icons/im";
import { IoIosArrowDown, IoIosArrowUp, IoIosAttach } from "react-icons/io";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useSelector } from "react-redux";
import {
  useFetchCustomOfferImageQuery,
  useSendAMessageMutation,
  useUpdateCustomOfferImageMutation,
} from "../../Redux/api/inboxApiSlice";
import thumbnailDemo from "../../assets/images/project-thumbnail.jpg";
import useOutsideClick from "../../hooks/useOutsideClick";
import { configApi } from "../../libs/configApi";

const CreateOfferModal = ({
  handleClose,
  onOfferSubmit,
  values,
  reply,
  setReplyTo,
}) => {
  const { data: imageObject } = useFetchCustomOfferImageQuery();
  const [updateImage] = useUpdateCustomOfferImageMutation();
  const { conversationUser } = useSelector((state) => state.chat);
  const [sendAMessage] = useSendAMessageMutation();
  const { user } = useSelector((state) => state.user);
  const isAuthorized = ["SUB_ADMIN", "ADMIN", "SUPER_ADMIN"].includes(
    user?.role,
  );
  const [collapse, setCollapse] = useState(false);
  const [form, setForm] = useState({
    thumbnail: null,
    title: "",
    deliveryCount: "",
    deliveryWay: "hours",
    price: "",
    desc: "",
  });
  const fileInputRef = useRef(null);
  const formRef = useRef(null);
  const [requirements, setRequirements] = useState([
    "Which industry do you work in?",
    "Do you have your own company logo?",
    "",
  ]);

  useEffect(() => {
    if (imageObject) {
      setForm((prev) => ({ ...prev, thumbnail: imageObject.url }));
    }
  }, [imageObject]);

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    try {
      const formData = new FormData();
      // formData.append("fileName", file.file);
      formData.append("files", file);

      // const apiKey = "7a4a20aea9e7d64e24c6e75b2972ff00";
      // const uploadUrl = `${configApi.api}upload-image`;
      const uploadUrl = `${configApi.api}upload-attachment-optimized`;
      const res = await axios.post(uploadUrl, formData);
      if (res?.data?.success) {
        const url = res.data.data.file.optimizedUrl;
        setForm((prev) => ({ ...prev, thumbnail: url }));
      }
    } catch {
      toast.error("Image Upload Failed!");
    }

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const addRequirements = () => {
    setCollapse(true);
    setRequirements([...requirements, ""]);
  };

  const deleteRequirements = (index) => {
    setRequirements(requirements.filter((_, i) => i !== index));
  };

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const dates = new Date();
  const timeAndDate = dates.getTime();

  const handleSubmit = async (e) => {
    const { title, thumbnail, price, deliveryCount, desc } = form;
    e.preventDefault();
    if (values && title && thumbnail && price && deliveryCount && desc) {
      const imageObj = {
        url: form.thumbnail,
      };
      const formData = {
        ...form,
        requirements,
      };
      const offerMessage = {
        messageText: "",
        attachment: [],
        customOffer: formData,
        timeAndDate,
        replyTo: reply || null,
        // contactForm: null,
      };
      if (isAuthorized) {
        onOfferSubmit?.emit("admin-message", {
          userId: conversationUser,
          ...offerMessage,
        });
        try {
          await updateImage(imageObj);
          const res = await sendAMessage({
            recipientId: conversationUser,
            ...offerMessage,
          }).unwrap();
          setForm({
            thumbnail: null,
            title: "",
            deliveryCount: "",
            deliveryWay: "hours",
            price: "",
            desc: "",
          });
          setReplyTo(null);
        } catch (error) {
          toast.error("Something went wrong!");
        }
      }

      handleClose(false);
    }
  };

  useOutsideClick(formRef, () => handleClose(false));

  return (
    <div className="fixed left-0 top-0 z-[9999999] flex h-screen w-full items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
      <form
        ref={formRef}
        className="w-full max-w-[600px] bg-lightskyblue"
        onSubmit={handleSubmit}
      >
        <div className="flex items-center justify-between bg-primary p-3 text-white">
          <h1 className="text-base font-medium md:text-lg">
            Create a single payment offer
          </h1>
          <div>
            <input
              type="file"
              hidden
              id="offer-thumbnail"
              ref={fileInputRef}
              onChange={handleImageChange}
            />
            <label htmlFor="offer-thumbnail" className="cursor-pointer">
              <IoIosAttach className="text-2xl" />
            </label>
          </div>
        </div>
        <div className="px-3 py-4">
          <label className="block w-full font-medium">Title</label>
          <div className="flex items-start gap-3 border bg-white p-4">
            <img
              src={form.thumbnail ? form.thumbnail : thumbnailDemo}
              alt=""
              className="w-[80px] shrink-0 object-cover sm:w-[100px]"
            />
            <input
              type="text"
              name="title"
              className="w-full grow text-sm font-semibold outline-none md:text-2xl"
              placeholder="Enter Title"
              value={form.title}
              onChange={handleChange}
            />
          </div>
          <div className="my-5 flex flex-wrap items-center justify-start gap-3 sm:flex-nowrap sm:justify-between">
            <div className="flex w-full items-center gap-3 sm:w-1/2">
              <p className="text-sm font-medium">Delivery</p>
              <div className="flex items-center border bg-white pr-3">
                <input
                  type="number"
                  className="w-auto max-w-[100px] p-2 font-semibold outline-none"
                  name="deliveryCount"
                  value={form.deliveryCount}
                  onChange={handleChange}
                />
                <select
                  name="deliveryWay"
                  value={form.deliveryWay}
                  onChange={handleChange}
                  className="block p-2 font-semibold outline-none"
                >
                  <option value="hours">hours</option>
                  <option value="day">day</option>
                  <option value="days">days</option>
                </select>
              </div>
            </div>
            <div className="flex w-full items-center justify-start gap-3 sm:w-1/2 sm:justify-end">
              <p className="text-sm font-medium">Price</p>
              <div className="flex items-center border bg-white">
                <input
                  type="number"
                  className="max-w-[100px] p-2 font-semibold outline-none"
                  name="price"
                  value={form.price}
                  onChange={handleChange}
                />
                <span className="p-2 font-semibold">$</span>
              </div>
            </div>
          </div>
          <textarea
            name="desc"
            value={form.desc}
            onChange={handleChange}
            placeholder="Type here"
            className="block h-[150px] w-full resize-none border bg-white p-3 outline-none"
          ></textarea>
          <div className="my-5">
            <div className="flex items-center justify-between bg-primary p-2 text-white sm:p-3">
              <h1>Requirements</h1>
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  className="bg-transparent"
                  onClick={() => setCollapse(!collapse)}
                >
                  {collapse ? (
                    <IoIosArrowUp className="text-2xl" />
                  ) : (
                    <IoIosArrowDown className="text-2xl" />
                  )}
                </button>
                <ImPlus onClick={addRequirements} className="cursor-pointer" />
              </div>
            </div>
            <div
              className={`${collapse ? "block" : "hidden"} ${requirements.length > 0 ? "border p-3" : ""} max-h-[100px] overflow-y-auto bg-white`}
            >
              {requirements.length > 0 &&
                requirements.map((requirement, index) => (
                  <div key={index} className="mb-2 flex items-center gap-2">
                    <input
                      type="text"
                      placeholder="Type"
                      value={requirement}
                      onChange={(e) => {
                        const newRequirements = [...requirements];
                        newRequirements[index] = e.target.value;
                        setRequirements(newRequirements);
                      }}
                      className="block w-full border border-solid border-[#e7e7e7] bg-white p-2 text-sm outline-none sm:text-base"
                    />
                    <RiDeleteBin6Line
                      className="cursor-pointer text-gray-500"
                      onClick={() => deleteRequirements(index)}
                    />
                  </div>
                ))}
            </div>
          </div>
          <div className="flex gap-3">
            <button
              type="button"
              className="w-1/2 bg-canceled p-2 font-medium text-white"
              onClick={() => handleClose(false)}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="w-1/2 bg-primary p-2 font-medium text-white"
            >
              Send Offer
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CreateOfferModal;
