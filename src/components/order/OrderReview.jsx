import { IoStar } from "react-icons/io5";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import adminLogo from "../../assets/images/MR Logo Icon.png";
import { timeAgoTracker } from "../../libs/timeAgoTracker";

const OrderReview = ({ reviewDetails }) => {
  const { user } = useSelector((state) => state.user);
  const isAdmin = reviewDetails?.senderType === "OWNER";
  return (
    <div className="mt-5 border border-gray-200 shadow-btn-shadow">
      <h1 className="bg-lightskyblue p-4 text-lg font-semibold sm:text-xl">
        {user?.role === "USER"
          ? "Mahfujurrahm535"
          : reviewDetails?.sender?.userName}
        &apos;s Review
      </h1>
      <div className="p-4">
        <div className="flex items-center gap-3">
          {isAdmin || reviewDetails?.sender?.image ? (
            <img
              src={isAdmin ? adminLogo : reviewDetails?.sender?.image}
              alt=""
              className="size-10 rounded-full object-cover"
            />
          ) : (
            <div className="flex size-10 items-center justify-center rounded-full bg-[#ffefef]/80 object-cover text-3xl font-bold text-[#3b3b3b]/50">
              {reviewDetails?.sender?.userName?.charAt(0).toUpperCase()}
            </div>
          )}
          <Link
            to={`/${isAdmin ? "Mahfujurrahm535" : reviewDetails?.sender?.userName}`}
            className="text-lg font-semibold"
          >
            {isAdmin ? "Mahfujurrahm535" : reviewDetails?.sender?.userName}
          </Link>
        </div>
        <p className="my-5">{reviewDetails?.message}</p>
        <div className="flex items-center gap-2 text-lg font-semibold">
          {reviewDetails?.rating}{" "}
          <div className="flex justify-center gap-2 text-lg text-[#C8E3F6] md:text-2xl">
            {Array.from(
              { length: reviewDetails?.rating },
              (_, index) => index + 1,
            )?.map((_, i) => (
              <IoStar key={i} className="text-primary" />
            ))}
          </div>
          <span className="ms-3 text-sm font-medium text-black/50">
            {timeAgoTracker(reviewDetails?.createdAt)}
          </span>
        </div>
      </div>
    </div>
  );
};

export default OrderReview;
