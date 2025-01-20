import { Rating } from "@mui/material";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { GiCheckMark } from "react-icons/gi";
import { IoStarOutline, IoStarSharp } from "react-icons/io5";
import { useSelector } from "react-redux";
import { useCreateAReviewMutation } from "../../Redux/api/orderApiSlice";
import Divider from "../Divider";

const OrderReviewForm = () => {
  const [submitReview, { isLoading }] = useCreateAReviewMutation();
  const { user } = useSelector((state) => state.user);
  const { projectDetails } = useSelector((state) => state.order);

  const [isThumbnail, setIsThumbnail] = useState(true);
  const [value, setValue] = useState(0);
  const [text, setText] = useState("");

  useEffect(() => {
    if (projectDetails?.review?.length > 0) {
      const getThumbnailTrueOrFalse = projectDetails?.review?.find(
        (r) => r?.senderType === "CLIENT",
      );
      setIsThumbnail(getThumbnailTrueOrFalse?.isThumbnail);
    }
  }, [projectDetails]);

  const handleText = (e) => {
    setText(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (text && value) {
      const data = {
        orderId: projectDetails?.id,
        thumbnail: projectDetails?.projectThumbnail,
        isThumbnail: isThumbnail,
        rating: value,
        message: text,
        userName: user?.role === "USER" ? null : projectDetails?.user?.userName,
      };
      try {
        const res = await submitReview(data).unwrap();
      } catch (error) {
        toast.error("Something went wrong!");
      }
    }
  };

  return (
    <div className="mx-auto mt-5 w-full sm:max-w-[80%]">
      <h1 className="text-center text-2xl font-semibold text-primary">
        LEAVE A FEEDBACK
      </h1>
      <Divider className="mt-5 h-px w-full !bg-black/20" />
      <div className="my-10 text-center">
        <Rating
          className="rating-icon !text-[40px] !text-primary lg:!text-[50px]"
          name="simple-controlled"
          value={value}
          onChange={(event, newValue) => {
            setValue(newValue);
          }}
          icon={<IoStarSharp />}
          emptyIcon={<IoStarOutline />}
        />
      </div>
      <div className="flex flex-col items-stretch gap-3 sm:flex-row">
        <textarea
          className="block h-[200px] flex-grow resize-none border-2 border-solid px-4 py-3 outline-none sm:h-auto"
          value={text}
          onChange={handleText}
          name=""
          id=""
          placeholder="Type your experience"
        ></textarea>
        <div className="relative select-none">
          <span className="block text-center">Add your review</span>
          <img
            src={projectDetails?.projectThumbnail}
            alt=""
            className="w-full object-cover sm:w-[150px]"
          />
          <input
            type="checkbox"
            className="is-checked peer"
            name="thumbnail"
            id="thumbnail"
            checked={isThumbnail}
            onChange={() => setIsThumbnail(!isThumbnail)}
            hidden
          />
          <label
            htmlFor="thumbnail"
            className="absolute bottom-2 right-2 flex h-[20px] w-[20px] cursor-pointer items-center justify-center border border-solid bg-white text-sm text-primary *:opacity-0 peer-[.is-checked]:peer-checked:*:opacity-100"
          >
            <GiCheckMark />
          </label>
        </div>
      </div>
      <div className="mt-5 text-center">
        <button
          type="button"
          onClick={handleSubmit}
          disabled={isLoading}
          className="rounded-md bg-primary px-10 py-2 text-lg font-semibold text-white disabled:bg-primary/50"
        >
          Send Feedback
        </button>
      </div>
    </div>
  );
};

export default OrderReviewForm;
