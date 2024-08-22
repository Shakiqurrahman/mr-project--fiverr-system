import { Reorder } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { FaCircleCheck } from "react-icons/fa6";
import { IoMdClose } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Check from "../assets/svg/Check";
import { fetchCategory } from "../Redux/features/categorySlice";

function PriceList() {
  const dispatch = useDispatch();
  const [controller, setController] = useState(null);
  const menuRef = useRef(null);
  const { user } = useSelector((state) => state.user);
  const { loading, category, error } = useSelector((state) => state.category);
  const [isDraggable, setIsDraggable] = useState(false);
  const [categoryList, setCategoryList] = useState([]);

  // Get the category data from API
  useEffect(() => {
    dispatch(fetchCategory());
  }, [dispatch]);

  useEffect(() => {
    setCategoryList(category);
  }, [category]);

  const handleSave = () => {
    setIsDraggable(false);
  };

  const handleCancel = () => {
    setIsDraggable(false);
    setCategoryList(category);
  };

  const handleController = (id) => {
    setController(controller === id ? null : id);
  };

  const handleClickOutside = (event) => {
    if (menuRef.current && !menuRef.current.contains(event.target)) {
      setController(null);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="max-width">
      <div className="mx-auto mt-10 max-w-[800px]">
        <p className="text-base font-medium sm:text-xl">
          We have priced many designs below. The design you need, You can start
          a project for that design. We will create your design.
        </p>
        <p className="my-3 text-base sm:text-xl">
          Please contact us first if you need any designs other than those
          below.
        </p>
        <p className="my-3 text-base sm:text-xl">
          (Also, if you need more than one design, you can start a separate
          project for each design. Or you can contact us to start a custom
          project for all your design.)
        </p>
        <p className="mb-5 text-base sm:mb-10 sm:text-xl">
          If you would like to take a template/source file of any design we gave
          created, please contact us, and show us the design you like. We will
          provide you the template/source file through a project.
        </p>
        <div
          className={`flex items-center ${user?.role === "ADMIN" ? "justify-center sm:justify-between" : "justify-center"} flex-wrap sm:flex-nowrap`}
        >
          {user?.role === "ADMIN" && (
            <div>
              <button
                className={`${isDraggable ? "hidden" : "block"} rounded-[30px] border border-solid border-primary bg-lightskyblue px-4 py-1 duration-300 hover:bg-primary hover:text-white`}
                onClick={() => setIsDraggable(true)}
              >
                CUSTOMISE
              </button>
              {isDraggable && (
                <div className="flex gap-4">
                  <button
                    className="flex h-[35px] w-[35px] items-center justify-center rounded-full border-2 border-solid border-primary bg-[#EEF7FE]"
                    onClick={handleSave}
                  >
                    <Check className={"h-4 w-4"} />
                  </button>
                  <button
                    className="flex h-[35px] w-[35px] items-center justify-center rounded-full border-2 border-solid border-canceled bg-[#EEF7FE]"
                    onClick={handleCancel}
                  >
                    <IoMdClose className="text-xl text-canceled" />
                  </button>
                </div>
              )}
            </div>
          )}
          <h1
            className={`${user?.role === "ADMIN" ? "my-5 sm:my-0" : ""} w-full text-center text-xl font-semibold text-primary sm:my-0 sm:w-auto sm:text-3xl`}
          >
            PRICE LIST
          </h1>
          {user?.role === "ADMIN" && (
            <Link
              to={"/create-category"}
              className="rounded-[30px] border border-solid border-primary bg-lightskyblue px-4 py-1 duration-300 hover:bg-primary hover:text-white"
            >
              CREATE
            </Link>
          )}
        </div>
        <Reorder.Group
          axis="y"
          values={categoryList}
          onReorder={setCategoryList}
          style={{ cursor: isDraggable ? "grab" : "default" }}
        >
          {categoryList.map((category) => (
            <Reorder.Item
              key={category.id}
              value={category}
              drag={isDraggable ? "y" : false}
            >
              <div
                key={category.id}
                className="mt-8 overflow-hidden rounded-lg border-2 border-solid border-gray-300"
              >
                <div className="flex items-center justify-between bg-lightcream p-2">
                  <div className="relative flex items-center gap-1 sm:gap-4">
                    {user?.role === "ADMIN" && (
                      <>
                        <button
                          className="text-lg text-gray-600 sm:text-3xl"
                          onClick={() => handleController(category.id)}
                        >
                          <BsThreeDotsVertical />
                        </button>
                        {controller === category.id && (
                          <div
                            className="absolute left-10 top-0 z-10 min-w-[150px] rounded-lg border border-solid bg-white py-2 text-center *:block *:p-[5px_15px]"
                            ref={menuRef}
                          >
                            <Link className="text-sm hover:bg-gray-200">
                              Edit
                            </Link>
                            <Link className="text-sm hover:bg-gray-200">
                              Delete
                            </Link>
                          </div>
                        )}
                      </>
                    )}
                    <h1 className="text-sm font-semibold sm:text-lg">
                      {category.categoryName}
                    </h1>
                  </div>
                  <Link className="rounded-lg bg-primary px-2 py-1 text-center text-xs font-medium text-white sm:px-3 sm:py-2 sm:text-sm">
                    PROJECT START
                  </Link>
                </div>
                <div
                  className={`grid md:grid-cols-${category.subCategory.length} items-center border-y-2 *:border-b-2 *:border-solid *:border-gray-300 md:*:border-b-0 md:*:border-e-2`}
                >
                  {category.subCategory.map((sub) => (
                    <div
                      key={Math.random()}
                      className="p-5 text-center last-of-type:border-0"
                    >
                      <h1 className="text-base font-semibold sm:text-lg">
                        {sub.subTitle}
                      </h1>
                      <span className="my-3 text-lg font-bold text-primary sm:text-2xl">
                        ${sub.subAmount} USD
                      </span>
                      <p className="text-sm font-medium">
                        {sub.regularDeliveryDays} Days Delivery
                      </p>
                      <p className="text-sm font-medium">
                        Extra-Fast {sub.fastDeliveryDays} Day Delivery $
                        {sub.fastDeliveryPrice}
                      </p>
                    </div>
                  ))}
                </div>
                <ul className="flex flex-col items-center justify-center gap-2 bg-lightskyblue p-3 text-sm font-medium sm:flex-row sm:gap-5">
                  {category.bulletPoint.map((bulletText) => (
                    <li key={Math.random()} className="flex items-center gap-2">
                      <FaCircleCheck className="text-primary" />
                      {bulletText}
                    </li>
                  ))}
                </ul>
              </div>
            </Reorder.Item>
          ))}
        </Reorder.Group>
      </div>
    </div>
  );
}

export default PriceList;
