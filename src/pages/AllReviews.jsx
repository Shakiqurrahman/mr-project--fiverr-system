import { Fragment, useEffect, useState } from "react";
import { FaQuoteLeft, FaQuoteRight } from "react-icons/fa";
import { IoSearch, IoStar } from "react-icons/io5";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import { useGetMahfujurDetailsQuery } from "../Redux/api/dashboardApiSlice";
import { useGetAllAdminReviewsQuery } from "../Redux/api/orderApiSlice";
import { setPreviewImage } from "../Redux/features/previewImageSlice";
import Divider from "../components/Divider";
import { timeAgoTracker } from "../libs/timeAgoTracker";

const AllReviews = () => {
  const { data: adminInfo } = useGetMahfujurDetailsQuery();
  const { data } = useGetAllAdminReviewsQuery();
  const dispatch = useDispatch();
  const [sortBtn, setSortBtn] = useState("Most relevant");
  const [reviews, setReviews] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  const [selectedReviewTab, setSelectedReviewTab] = useState("");

  const reviewSetting = {
    dots: false,
    draggable: false,
    infinite: false,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 2000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          draggable: true,
          infinite: true,
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 600,
        settings: {
          draggable: true,
          infinite: true,
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          draggable: true,
          infinite: true,
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  useEffect(() => {
    if (data) {
      setReviews(data);
    }
  }, [data]);

  useEffect(() => {
    // List of attractive words
    const attractiveWords = [
      "amazing",
      "exceeded",
      "fantastic",
      "highly recommended",
      "loved",
      "Great Work",
      "very professional",
      "efficient work",
      "great job",
      "good job",
      "Highly Recommend",
      "100% recommend",
      "5 stars",
      "Quick response",
      "fast delivery",
      "great experience",
      "responsible",
      "Very responsive",
      "Easy process",
      "good communication",
      "great result",
      "definitely recommend",
      "satisfied",
      "Amazing work",
      "fast work",
      "amazing job",
      `I’m so happy`,
      `I’m very happy`,
      "Amazing person",
      "wonderful job",
      "professional designer",
      `won’t be disappointed`,
      "excellent experience",
      "quick work",
      "Quick reply",
      "fast turn around",
      "Quick service",
      "unique design",
      "looks professional",
      "Quick delivery",
      "Great communication",
      `He's the best`,
      "Always great service",
      "Top quality designs",
      "professionalism",
      "Fast service",
      "efficient service",
      "Very professional work",
      "always happy",
      "Very creative",
      "easy to work with",
      "Easy to communicate with",
      "very understanding",
      "Exceeded my expectation",
      "Revised all details requested",
      "Great seller",
      "Very convenient",
      "timely, Excellent work",
      "professional skills",
      "very patient",
      "Awesome",
      "Awesome job",
      "Never disappoints",
      "Did amazing",
      "Beautiful design",
      "Mahfujurrahm535",
      "MR",
      "Wonderful work",
      "Very nice work",
      "good work",
      "good experience",
      "look amazing",
      "very good",
      "Fantastic",
      "Fantastic work",
    ];
    if (sortBtn === "Delivery images" && data) {
      const filterReviews = data?.filter((r) => r.isThumbnail);
      setReviews(filterReviews);
    }
    if (sortBtn === "Most recent" && data) {
      setReviews(data);
    }
    if (sortBtn === "Most relevant" && data) {
      // Separate relevant and non-relevant reviews
      const relevantReviews = [];
      const nonRelevantReviews = [];

      data?.forEach((reviewObj) => {
        const isRelevant = attractiveWords.some((word) =>
          reviewObj?.message?.toLowerCase().includes(word.toLowerCase()),
        );

        // Push to the respective arrays
        if (isRelevant) {
          relevantReviews.push(reviewObj);
        } else {
          nonRelevantReviews.push(reviewObj);
        }
      });

      // Concatenate the relevant reviews first, followed by non-relevant ones
      const reorderedReviews = [...relevantReviews, ...nonRelevantReviews];

      // Update the reviews state with the reordered array
      setReviews(reorderedReviews);
    }
  }, [sortBtn, data]);

  const handleSortBtn = (e) => {
    setSortBtn(e.target.value);
  };

  const handlePreviewImage = (e, url) => {
    e.preventDefault();
    dispatch(setPreviewImage(url));
  };

  const handleSearch = (e) => {
    e.preventDefault();
    // Filter reviews based on the search query (userName field)
    const filteredReviews = data?.filter((reviewObj) =>
      reviewObj.sender?.userName
        ?.toLowerCase()
        .includes(searchQuery.toLowerCase()),
    );

    setReviews(filteredReviews);
  };

  const oneStarReviews = data?.filter((review) => review?.rating === 1)?.length;
  const twoStarReviews = data?.filter((review) => review?.rating === 2)?.length;
  const threeStarReviews = data?.filter(
    (review) => review?.rating === 3,
  )?.length;
  const fourStarReviews = data?.filter(
    (review) => review?.rating === 4,
  )?.length;
  const fiveStarReviews = data?.filter(
    (review) => review?.rating === 5,
  )?.length;

  // stars
  const flooredStars = Math.floor(adminInfo?.Avg_Rating);

  const imageAttachedReviewsLength = data?.filter((r) => r.isThumbnail)?.length;

  const reversedReviews = reviews && [...reviews]?.reverse();

  const handleReviewTab = (review) => {
    setSelectedReviewTab((prev) => {
      return review === prev ? "" : review;
    });
  };

  useEffect(() => {
    const ratingMap = {
      oneStar: 1,
      twoStar: 2,
      threeStar: 3,
      fourStar: 4,
      fiveStar: 5,
    };
    if (selectedReviewTab) {
      // filter review by selecting tab
      const filteredReviews = data?.filter((r) => {
        return r.rating === ratingMap[selectedReviewTab];
      });
      setReviews(filteredReviews);
    } else {
      setReviews(data);
    }
  }, [selectedReviewTab, data]);

  return (
    <div className="max-width">
      <div className="relative mt-20 rounded-lg bg-[#E7F4FC] p-5 pt-0">
        <div className="text-center">
          <h1 className="relative inline-block -translate-y-1/2 rounded-[50px] bg-[#FFEFEF] px-10 py-3 text-lg font-bold sm:px-20 sm:text-2xl">
            TESTIMONIALS
          </h1>
        </div>
        <div className="mb-10 flex flex-col items-center justify-between sm:flex-row">
          <h3 className="text-lg font-semibold sm:text-2xl">
            {data?.length} Reviews
          </h3>
          <div className="flex items-center gap-3">
            <h3 className="text-lg font-medium sm:text-2xl">
              Average {adminInfo?.Avg_Rating?.toFixed(1)}
            </h3>
            <div className="flex items-center gap-2 text-lg text-primary sm:text-2xl">
              {Array.from({ length: flooredStars })?.map((_, index) => (
                <IoStar key={index} />
              ))}
            </div>
          </div>
        </div>
        <div>
          <Slider {...reviewSetting}>
            <div className="px-2 lg:pr-4">
              <div
                onClick={() => handleReviewTab("oneStar")}
                className={`rounded-2xl ${selectedReviewTab === "oneStar" ? "bg-white/70" : "bg-white"} cursor-pointer p-5 text-center`}
              >
                <h1 className="text-lg font-semibold sm:text-2xl">1 Star</h1>
                <div className="my-2 flex justify-center gap-3 text-lg text-[#C8E3F6] sm:my-5 sm:text-3xl">
                  <IoStar className="text-primary" />
                  <IoStar />
                  <IoStar />
                  <IoStar />
                  <IoStar />
                </div>
                <span className="text-lg sm:text-2xl">
                  ({oneStarReviews < 10 ? "0" + oneStarReviews : oneStarReviews}
                  )
                </span>
              </div>
            </div>
            <div className="px-2 lg:pr-4">
              <div
                onClick={() => handleReviewTab("twoStar")}
                className={`rounded-2xl ${selectedReviewTab === "twoStar" ? "bg-white/70" : "bg-white"} cursor-pointer p-5 text-center`}
              >
                <h1 className="text-lg font-semibold sm:text-2xl">2 Stars</h1>
                <div className="my-2 flex justify-center gap-3 text-lg text-[#C8E3F6] sm:my-5 sm:text-3xl">
                  <IoStar className="text-primary" />
                  <IoStar className="text-primary" />
                  <IoStar />
                  <IoStar />
                  <IoStar />
                </div>
                <span className="text-lg sm:text-2xl">
                  ({twoStarReviews < 10 ? "0" + twoStarReviews : twoStarReviews}
                  )
                </span>
              </div>
            </div>
            <div className="px-2 lg:pr-4">
              <div
                onClick={() => handleReviewTab("threeStar")}
                className={`rounded-2xl ${selectedReviewTab === "threeStar" ? "bg-white/70" : "bg-white"} cursor-pointer p-5 text-center`}
              >
                <h1 className="text-lg font-semibold sm:text-2xl">3 Stars</h1>
                <div className="my-2 flex justify-center gap-3 text-lg text-[#C8E3F6] sm:my-5 sm:text-3xl">
                  <IoStar className="text-primary" />
                  <IoStar className="text-primary" />
                  <IoStar className="text-primary" />
                  <IoStar />
                  <IoStar />
                </div>
                <span className="text-lg sm:text-2xl">
                  (
                  {threeStarReviews < 10
                    ? "0" + threeStarReviews
                    : threeStarReviews}
                  )
                </span>
              </div>
            </div>
            <div className="px-2 lg:pr-4">
              <div
                onClick={() => handleReviewTab("fourStar")}
                className={`rounded-2xl ${selectedReviewTab === "fourStar" ? "bg-white/70" : "bg-white"} cursor-pointer p-5 text-center`}
              >
                <h1 className="text-lg font-semibold sm:text-2xl">4 Stars</h1>
                <div className="my-2 flex justify-center gap-3 text-lg text-[#C8E3F6] sm:my-5 sm:text-3xl">
                  <IoStar className="text-primary" />
                  <IoStar className="text-primary" />
                  <IoStar className="text-primary" />
                  <IoStar className="text-primary" />
                  <IoStar />
                </div>
                <span className="text-lg sm:text-2xl">
                  (
                  {fourStarReviews < 10
                    ? "0" + fourStarReviews
                    : fourStarReviews}
                  )
                </span>
              </div>
            </div>
            <div className="px-2 lg:pr-0">
              <div
                onClick={() => handleReviewTab("fiveStar")}
                className={`rounded-2xl ${selectedReviewTab === "fiveStar" ? "bg-white/70" : "bg-white"} cursor-pointer p-5 text-center`}
              >
                <h1 className="text-lg font-semibold sm:text-2xl">5 Stars</h1>
                <div className="my-2 flex justify-center gap-3 text-lg text-[#C8E3F6] sm:my-5 sm:text-3xl">
                  <IoStar className="text-primary" />
                  <IoStar className="text-primary" />
                  <IoStar className="text-primary" />
                  <IoStar className="text-primary" />
                  <IoStar className="text-primary" />
                </div>
                <span className="text-lg sm:text-2xl">
                  (
                  {fiveStarReviews < 10
                    ? "0" + fiveStarReviews
                    : fiveStarReviews}
                  )
                </span>
              </div>
            </div>
          </Slider>
        </div>
        <div className="mt-10 flex flex-wrap-reverse items-center gap-y-5 md:flex-nowrap md:gap-0">
          <div className="flex w-full flex-wrap items-center justify-start gap-x-3 gap-y-4 md:w-3/4">
            <h1 className="text-sm font-semibold sm:text-base lg:order-none lg:text-xl">
              Sort By
            </h1>

            <button
              value="Most relevant"
              onClick={handleSortBtn}
              type="button"
              className={`sortingBtn rounded border border-transparent p-1 text-xs font-medium sm:px-3 sm:py-2 lg:order-none lg:mx-0 lg:text-lg ${sortBtn === "Most relevant" ? "active" : ""}`}
            >
              Most relevant
            </button>

            <button
              value="Most recent"
              onClick={handleSortBtn}
              type="button"
              className={`sortingBtn rounded border border-transparent p-1 text-xs font-medium sm:px-3 sm:py-2 lg:order-none lg:text-lg ${sortBtn === "Most recent" ? "active" : ""}`}
            >
              Most recent
            </button>
            <button
              value="Delivery images"
              onClick={handleSortBtn}
              type="button"
              className={`sortingBtn rounded border border-transparent p-1 text-xs font-medium sm:px-3 sm:py-2 lg:order-none lg:text-lg ${sortBtn === "Delivery images" ? "active" : ""}`}
            >
              Delivery images (
              {imageAttachedReviewsLength < 10
                ? "0" + imageAttachedReviewsLength
                : imageAttachedReviewsLength}
              )
            </button>
          </div>
          <form className="flex w-full items-stretch rounded bg-white md:w-1/4">
            <input
              type="search"
              className="block w-full rounded px-3 py-2 outline-none"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button
              type="submit"
              onClick={handleSearch}
              className="block shrink-0 rounded bg-primary px-3 py-2 text-base text-white sm:p-2 sm:text-2xl"
            >
              <IoSearch />
            </button>
          </form>
        </div>
        {reversedReviews?.length > 0 ? (
          reversedReviews?.map((review, index) => (
            <Fragment key={index}>
              <Divider className="my-5 h-px w-full !bg-black/30 sm:my-10" />
              <div className="mb-5">
                <div className="">
                  <div className="flex flex-col-reverse items-center gap-4 sm:flex-row sm:items-start sm:justify-between">
                    <div>
                      <p className="text-center text-base leading-[40px] sm:text-start md:text-lg">
                        <span>
                          <FaQuoteLeft className="mb-3 mr-1 inline text-xs text-red-500" />
                        </span>
                        {review?.message}
                        <span>
                          <FaQuoteRight className="mb-3 ml-1 inline text-xs text-red-500" />
                        </span>
                      </p>
                      <div className="mt-5 flex flex-col items-center gap-2 sm:gap-4 lg:flex-row">
                        {review?.sender?.image ? (
                          <img
                            src={review?.sender?.image}
                            alt=""
                            className="size-[30px] rounded-full sm:size-[40px]"
                          />
                        ) : (
                          <div className="flex size-[30px] items-center justify-center rounded-full bg-[#ffefef]/80 object-cover text-3xl font-bold text-[#3b3b3b]/50 sm:size-[40px]">
                            {review?.sender?.userName?.charAt(0)?.toUpperCase()}
                          </div>
                        )}
                        <Link
                          to={`/${review?.sender?.userName}`}
                          className="text-base font-semibold md:text-xl"
                        >
                          {review?.sender?.userName}
                        </Link>
                        <div className="ml-0 flex justify-center gap-2 text-lg text-[#C8E3F6] md:text-2xl lg:ml-3">
                          {Array.from(
                            { length: review?.rating },
                            (_, index) => index + 1,
                          )?.map((_, i) => (
                            <IoStar key={i} className="text-primary" />
                          ))}
                        </div>
                        <p className="ml-0 text-base md:text-lg lg:ml-3">
                          {review?.sender?.country}
                        </p>
                        <p className="mt-2 text-xs md:text-base lg:mt-0">
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
                        className="h-[80px] w-[100px] cursor-pointer rounded-xl object-cover object-top sm:h-[120px] sm:w-[150px]"
                        onClick={(e) =>
                          handlePreviewImage(e, review?.thumbnail)
                        }
                      />
                    )}
                  </div>
                </div>
              </div>
            </Fragment>
          ))
        ) : (
          <>
            <Divider className="my-5 h-px w-full !bg-black/30 sm:my-10" />
            <p className="mb-5 text-center">No reviews found!</p>
          </>
        )}
      </div>
    </div>
  );
};

export default AllReviews;
