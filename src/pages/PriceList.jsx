import axios from "axios";
import { Reorder } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { BsThreeDotsVertical } from "react-icons/bs";
import { FaCircleCheck } from "react-icons/fa6";
import { ImSpinner9 } from "react-icons/im";
import { IoMdClose } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import {
  deleteCategory,
  fetchCategory,
} from "../Redux/features/category/categoryApi";
import Check from "../assets/svg/Check";
import useOutsideClick from "../hooks/useOutsideClick";
import { configApi } from "../libs/configApi";

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
    if (category) {
      setCategoryList([...category]);
    }
  }, [category]);

  const handleSave = async () => {
    setIsDraggable(false);
    try {
      // Send the full list of items to the backend
      await axios.post(`${configApi.api}category/update/all`, {
        newOrder: categoryList,
      });
      toast.success("List updated successfully!");
    } catch (error) {
      toast.error("Failed to update list.");
    }
  };

  const handleCancel = () => {
    setIsDraggable(false);
    setCategoryList(category);
  };

  const handleController = (id) => {
    setController(controller === id ? null : id);
  };

  useOutsideClick(menuRef, () => setController(false));

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#1b8cdc",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(deleteCategory(id))
          .then(() => {
            dispatch(fetchCategory());
            Swal.fire("Deleted!", "Your category has been deleted.", "success");
          })
          .catch((error) => {
            Swal.fire(
              "Error!",
              "There was an error deleting the category.",
              "error",
            );
          });
      }
    });
  };

  const isAdmin = ["ADMIN", "SUPER_ADMIN"].includes(user?.role);

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
          className={`flex items-center ${user?.role === "ADMIN" || user?.role === "SUPER_ADMIN" ? "justify-center sm:justify-between" : "justify-center"} flex-wrap sm:flex-nowrap`}
        >
          {user?.role === "ADMIN" ||
            (user?.role === "SUPER_ADMIN" && (
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
            ))}
          <h1
            className={`${user?.role === "ADMIN" || user?.role === "SUPER_ADMIN" ? "my-5 sm:my-0" : ""} w-full text-center text-xl font-semibold text-primary sm:my-0 sm:w-auto sm:text-3xl`}
          >
            PRICE LIST
          </h1>
          {isAdmin && (
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
          {loading ? (
            <div className="py-10">
              <ImSpinner9 className="mx-auto animate-spin text-4xl text-primary" />
            </div>
          ) : categoryList?.length > 0 ? (
            categoryList.map((category) => (
              <Reorder.Item
                key={category.id}
                value={category}
                drag={isDraggable ? "y" : false}
              >
                <div
                  key={category.id}
                  className="mt-8 overflow-hidden rounded-lg border-2 border-solid border-gray-300 bg-white"
                >
                  <div className="flex items-center justify-between bg-lightcream p-2">
                    <div className="relative flex items-center gap-1 sm:gap-4">
                      {isAdmin && (
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
                              <Link
                                to="/edit-category"
                                state={category}
                                className="text-sm hover:bg-gray-200"
                              >
                                Edit
                              </Link>
                              {user?.role === "SUPER_ADMIN" && (
                                <button
                                  onClick={() => handleDelete(category.id)}
                                  className="w-full text-sm hover:bg-gray-200"
                                >
                                  Delete
                                </button>
                              )}
                            </div>
                          )}
                        </>
                      )}
                      <h1 className="text-sm font-semibold sm:text-lg">
                        {category.categoryName}
                      </h1>
                    </div>
                    {!user?.block_for_chat && (
                      <Link
                        to="/project"
                        state={{ item: category }}
                        className="rounded-lg bg-primary px-2 py-1 text-center text-xs font-medium text-white sm:px-3 sm:py-2 sm:text-sm"
                      >
                        PROJECT START
                      </Link>
                    )}
                  </div>
                  <div
                    className={`md:*:border-b-1 grid items-center border-t-2 *:border-b-2 *:border-solid *:border-gray-300 md:grid-cols-2 md:*:border-e-2`}
                  >
                    {category.subCategory.map((sub, index) => (
                      <div
                        key={Math.random()}
                        className={`p-5 text-center last:border-e-0 even:border-e-0 ${index === category.subCategory.length - 1 && category.subCategory.length % 2 === 1 ? "md:col-span-2" : "md:col-span-1"}`}
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
                      <li
                        key={Math.random()}
                        className="flex items-center gap-2"
                      >
                        <FaCircleCheck className="text-primary" />
                        {bulletText}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reorder.Item>
            ))
          ) : (
            <div className="pt-10 text-center">
              <h2 className="text-2xl">No projects available here!</h2>
            </div>
          )}
        </Reorder.Group>
      </div>
    </div>
  );
}

export default PriceList;
