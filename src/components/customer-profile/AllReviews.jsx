import React, { useState } from "react";
import { FaQuoteLeft, FaQuoteRight } from "react-icons/fa6";
import { IoIosStar } from "react-icons/io";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { setPreviewImage } from "../../Redux/features/previewImageSlice";
import logo from "../../assets/images/MR Logo Icon.png";
import downArrow from "../../assets/images/icons/Down Arrow.svg";
import upperArrow from "../../assets/images/icons/Upper Arrow.svg";
import { timeAgoTracker } from "../../libs/timeAgoTracker";

const AllReviews = ({ user, allReviews }) => {
  const dispatch = useDispatch();
  const [showMore, setShowMore] = useState(false);

  const handlePreviewImage = (e, url) => {
    e.preventDefault();
    dispatch(setPreviewImage(url));
  };

  const initialReviews = 5;
  const reviewsToShow = showMore
    ? [...allReviews].reverse()
    : [...allReviews]?.slice(0, initialReviews)?.reverse();

  return (
    <div>
      <h2 className="mb-2 text-2xl font-semibold">
        {user?.role === "USER"
          ? "Reviews from Seller"
          : "Reviews From Customer"}
      </h2>
      <h3 className="text-xl font-medium">{allReviews?.length} Reviews</h3>
      {/* divider */}
      <div className="my-8 h-0.5 w-20 bg-gray-300"></div>

      <div className="space-y-8">
        {allReviews?.length > 0 ? (
          reviewsToShow?.map((review, index) => (
            <div key={index}>
              <div className="mb-2 flex items-center gap-4">
                {review?.sender?.image && review?.sender?.role === "USER" ? (
                  <img
                    src={review?.sender?.image}
                    alt=""
                    className="size-10 rounded-full object-cover"
                  />
                ) : !review?.sender?.image &&
                  review?.sender?.role === "USER" ? (
                  <div className="flex size-10 items-center justify-center rounded-full bg-[#ffefef]/80 object-cover text-3xl font-bold text-[#3b3b3b]/50">
                    {review?.sender?.userName?.charAt(0)?.toUpperCase()}
                  </div>
                ) : (
                  <img
                    src={logo}
                    alt=""
                    className="size-10 rounded-full object-cover"
                  />
                )}
                <Link
                  to={`/${
                    review?.sender?.role === "USER"
                      ? review?.sender?.userName
                      : "mahfujurrahm535"
                  }`}
                  className="text-lg font-semibold"
                >
                  {review?.sender?.role === "USER"
                    ? review?.sender?.userName
                    : "Mahfujurrahm535"}
                </Link>
              </div>
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="mb-2 text-gray-600">
                    <span>
                      <FaQuoteLeft className="mb-3 mr-1 inline text-xs text-red-500" />
                    </span>
                    {review?.message}
                    <span>
                      <FaQuoteRight className="mb-3 ml-1 inline text-xs text-red-500" />
                    </span>
                  </p>
                  <div className="flex items-center gap-8">
                    <span className="flex items-center gap-2">
                      {review?.rating}
                      {[...Array(review?.rating)].map((_, i) => (
                        <IoIosStar className="text-primary" key={i} />
                      ))}
                    </span>
                    <p className="text-xs text-gray-500">
                      {timeAgoTracker(review?.createdAt)}
                    </p>
                  </div>
                </div>
                {review?.isThumbnail && (
                  <img
                    src={review?.thumbnail?.replaceAll(
                      "-watermark-resized",
                      "",
                    )}
                    alt=""
                    className="h-[40px] w-[60px] cursor-pointer rounded object-cover object-top sm:h-[80px] sm:w-[120px]"
                    onClick={(e) => handlePreviewImage(e, review?.thumbnail)}
                  />
                )}
              </div>
            </div>
          ))
        ) : (
          <p>There are currently no reviews!</p>
        )}
      </div>

      {/* see more/less button  */}
      {allReviews.length > initialReviews && (
        <button
          onClick={() => setShowMore(!showMore)}
          className="mt-8 flex items-center gap-2 text-center text-lg font-semibold text-primary sm:text-xl"
        >
          {showMore ? "Show Less" : "See More"}
          <img
            className="size-7 rounded-full border"
            src={showMore ? upperArrow : downArrow}
            alt=""
          />
        </button>
      )}
    </div>
  );
};

export default AllReviews;
