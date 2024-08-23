import React, { useState } from "react";
import { IoIosStar } from "react-icons/io";
import sellerImg from "../../assets/images/icons/money.svg";
import downArrow from '../../assets/images/icons/Down Arrow.svg'
import upperArrow from '../../assets/images/icons/Upper Arrow.svg'

const AllReviews = () => {
  const [showMore, setShowMore] = useState(false);

  const [allReviews] = useState([
    {
      id: 1,
      name: "Mahfuj25",
      img: sellerImg,
      review: "This is a great service! I would recommend it to others.",
      rating: 5,
      time: "5 hours ago",
    },
    {
      id: 2,
      name: "Mahfuj25",
      img: sellerImg,
      review: `I was thoroughly impressed with the level of service and the quality of work delivered. The project was completed ahead of schedule, and the attention to detail was evident in every aspect. Communication was seamless throughout the process, making it a smooth and enjoyable experience. I highly recommend this team to anyone looking for professional and reliable service.`,
      rating: 5,
      time: "5 hours ago",
    },
    {
      id: 3,
      name: "Mahfuj25",
      img: sellerImg,
      review: "This is a great service! I would recommend it to others.",
      rating: 3,
      time: "5 hours ago",
    },
    {
      id: 4,
      name: "Mahfuj25",
      img: sellerImg,
      review: `Overall, a good experience. The team was efficient and delivered a solid result. There were a few hiccups along the way, but they were resolved effectively. I appreciated their flexibility and willingness to make adjustments as needed. The final product was worth the investment.`,
      rating: 5,
      time: "5 hours ago",
    },
    {
      id: 5,
      name: "Mahfuj25",
      img: sellerImg,
      review: "Good experience, but there were some delays.",
      rating: 4,
      time: "1 day ago",
    },
    {
      id: 6,
      name: "Mahfuj25",
      img: sellerImg,
      review: "The service was okay, but communication could be improved.",
      rating: 3,
      time: "2 days ago",
    },
    {
      id: 7,
      name: "Mahfuj25",
      img: sellerImg,
      review: "Great value for the price. Would use again.",
      rating: 4,
      time: "3 days ago",
    },
    {
      id: 8,
      name: "Mahfuj25",
      img: sellerImg,
      review: "Satisfied with the outcome, though there were minor issues.",
      rating: 4,
      time: "4 days ago",
    },
    {
      id: 9,
      name: "Mahfuj25",
      img: sellerImg,
      review: "Excellent service. Exceeded expectations.",
      rating: 5,
      time: "5 days ago",
    },
  ]);

  const initialReviews = 5;
  const reviewsToShow = showMore ? allReviews : allReviews.slice(0, initialReviews);

  return (
    <div className="mt-16">
      <h2 className="mb-2 text-2xl font-semibold">Reviews from seller</h2>
      <h3 className="text-xl font-medium">{allReviews?.length} Reviews</h3>
      {/* divider */}
      <div className="my-8 h-0.5 w-20 bg-gray-300"></div>

      <div className="space-y-8">
        {allReviews.length > 0 ? (reviewsToShow.map((review) => (
          <div key={review.id}>
            <div className="mb-2 flex items-center gap-4">
              <img
                src={review.img}
                alt=""
                className="size-10 rounded-full object-cover"
              />
              <h4 className="text-lg font-semibold">{review.name}</h4>
            </div>
            <p className="mb-2 text-gray-600">{review.review}</p>
            <div className="flex items-center gap-8">
              <span className="flex items-center gap-2">
                {review?.rating}
                {[...Array(review.rating)].map((_, i) => (
                <IoIosStar  className="text-primary" key={i} />
              ))}
              </span>
              <p className="text-xs text-gray-500">{review.time}</p>
            </div>
          </div>
        ))) : <p>There are currently no reviews!</p>}
      </div>

      {/* see more/less button  */}
      {allReviews.length > initialReviews && (
        <button
          onClick={() => setShowMore(!showMore)}
          className="mt-8 text-center text-primary text-lg sm:text-xl font-semibold flex items-center gap-2"
        >
          {showMore ? 'Show Less' : 'See More'}
          <img className="size-7 border rounded-full" src={showMore ? upperArrow : downArrow} alt="" />
        </button>
      )}
    </div>
  );
};

export default AllReviews;
