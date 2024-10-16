import { IoStar } from "react-icons/io5";
import { useSelector } from "react-redux";

const OrderReview = () => {
  const { user } = useSelector((state) => state.user);
  return (
    <div className="mt-5 border border-gray-200 shadow-btn-shadow">
      <h1 className="bg-lightskyblue p-4 text-xl font-semibold">
        Client Name&apos;s Review
      </h1>
      <div className="p-4">
        <div className="flex items-center gap-3">
          {user?.image ? (
            <img
              src={user?.image}
              alt=""
              className="size-10 rounded-full object-cover"
            />
          ) : (
            <div className="flex size-10 items-center justify-center rounded-full bg-[#ffefef]/80 object-cover text-3xl font-bold text-[#3b3b3b]/50">
              {user?.userName?.charAt(0)}
            </div>
          )}
          <h1 className="text-lg font-semibold">{user?.userName}</h1>
        </div>
        <p className="my-5">
          Great experience! Great buyer!! Thank you very much!!! Great
          experience! Great buyer!! Thank you very much!!! Great experience!
          Great buyer!! Thank you
        </p>
        <div className="flex items-center gap-2 text-lg font-semibold">
          5{" "}
          <div className="flex justify-center gap-2 text-lg text-[#C8E3F6] md:text-2xl">
            <IoStar className="text-primary" />
            <IoStar className="text-primary" />
            <IoStar className="text-primary" />
            <IoStar className="text-primary" />
            <IoStar className="text-primary" />
          </div>
          <span className="ms-3 text-sm font-medium text-black/50">
            5 hours ago
          </span>
        </div>
      </div>
    </div>
  );
};

export default OrderReview;
