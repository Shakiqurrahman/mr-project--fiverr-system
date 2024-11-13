import { Rating } from "@mui/material";
import { useState } from "react";
import { GiCheckMark } from "react-icons/gi";
import { IoStarOutline, IoStarSharp } from "react-icons/io5";
import Image from "../../assets/images/project-thumbnail.jpg";
import Divider from "../Divider";

const OrderReviewForm = () => {
  const [thumbnail, setThumbnail] = useState(true);
  const [value, setValue] = useState(0);
  const [text, setText] = useState("");

  const handleText = (e) => {
    setText(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      isThumbnail: thumbnail,
      stars: value,
      text,
    };
    console.log(data);
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
            src={Image}
            alt=""
            className="h-full w-full sm:h-[150px] sm:w-[150px]"
          />
          <input
            type="checkbox"
            className="is-checked peer"
            name="thumbnail"
            id="thumbnail"
            checked={thumbnail}
            onChange={() => setThumbnail(!thumbnail)}
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
          className="rounded-md bg-primary px-10 py-2 text-lg font-semibold text-white"
        >
          Send Feedback
        </button>
      </div>
    </div>
  );
};

export default OrderReviewForm;
