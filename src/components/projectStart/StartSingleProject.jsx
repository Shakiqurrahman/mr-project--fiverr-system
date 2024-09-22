import React, { useCallback, useEffect, useMemo, useState } from "react";
import { FaCheckCircle } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategory } from "../../Redux/features/category/categoryApi";
import Check from "../../assets/svg/Check";
import { useNavigate } from "react-router-dom";

const StartSingleProject = ({ item }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, category, error } = useSelector((state) => state.category);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedSubCategory, setSelectedSubCategory] = useState("");
  const [selectedQuantity, setSelectedQuantity] = useState(1);
  const [isFastDelivery, setIsFastDelivery] = useState(false);

  useEffect(() => {
    dispatch(fetchCategory());
  }, [dispatch]);

  useEffect(() => {
    if (category?.length > 0) {
      setCategories(category);
      setSelectedCategory(item?.categoryName || category[0]?.categoryName); // Set the first category as selected by default
    }
  }, [category, item?.categoryName]);

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  const handleSubCategoryChange = (e) => {
    setSelectedSubCategory(e.target.value);
  };

  const selectedCategoryData = useMemo(
    () =>
      categories?.find(
        (cat) =>
          cat?.categoryName.toLowerCase() === selectedCategory.toLowerCase(),
      ),
    [categories, selectedCategory],
  );

  useEffect(() => {
    if (selectedCategoryData?.subCategory?.length > 0) {
      setSelectedSubCategory(selectedCategoryData.subCategory[0].subTitle); // Set first subcategory by default
    }
  }, [selectedCategoryData]);

  const selectedSubCategoryData = useCallback(() => {
    return selectedSubCategory
      ? selectedCategoryData?.subCategory?.find(
          (subCat) => subCat?.subTitle === selectedSubCategory,
        )
      : null;
  }, [selectedCategoryData?.subCategory, selectedSubCategory]);

  const subCategoryData = selectedSubCategoryData();

  const handleFastDeliveryToggle = () => {
    setIsFastDelivery(!isFastDelivery);
  };

  const quantities = [1, 2, 3, 4, 5, 6, 7, 8, 9];

  const extraFastDeliveryDay =
    parseInt(subCategoryData?.fastDeliveryDays) * selectedQuantity || 0;

  const regularDeliveryDay =
    parseInt(subCategoryData?.regularDeliveryDays) * selectedQuantity || 0;

  const baseAmount = parseInt(subCategoryData?.subAmount || 0);
  const selectedQty = parseInt(selectedQuantity || 1);
  const fastDeliveryPrice =
    parseInt(subCategoryData?.fastDeliveryPrice) * selectedQty || 0;

  const totalAmount = isFastDelivery
    ? baseAmount * selectedQty + fastDeliveryPrice
    : baseAmount * selectedQty;

  const handleSubmit = (e) => {
    e.preventDefault();
    const selectedCategory = {
      ...selectedCategoryData,
      subCategory: subCategoryData?.subTitle,
    };
    const data = {
      ...selectedCategory,
      selectedQuantity,
      title : selectedCategory.categoryName, 
      deliveryDuration: isFastDelivery
        ? extraFastDeliveryDay
        : regularDeliveryDay,
      isFastDelivery,
      fastDeliveryAmount: fastDeliveryPrice,
      fastDeliveryDuration: extraFastDeliveryDay,
      subTotal : baseAmount,
      totalAmount,
    };
    navigate('/payment', {state : data});
    // console.log("submittedData", data);
  };

  return (
    <section>
      <div className="mx-auto max-w-[800px] border">
        <h3 className="bg-primary py-4 text-center text-xl font-semibold text-white">
          You are starting a project
        </h3>
        <form onSubmit={handleSubmit} className="bg-lightskyblue p-4 pt-10">
          <p className="mb-2 text-sm sm:text-lg">
            Choose the category you need
          </p>
          <div className="flex flex-col items-center justify-between gap-2 border bg-white p-6 sm:flex-row">
            <img
              className="h-[93px] w-32 object-cover"
              src={selectedCategoryData?.image?.url}
              alt={selectedCategoryData?.image?.name}
            />
            {item ? (
              <h1 className="w-full px-4 text-base font-semibold sm:text-2xl">
                {selectedCategory}
              </h1>
            ) : (
              <select
                name="subcategory"
                id="subcategory"
                value={selectedCategory}
                onChange={handleCategoryChange}
                className={`w-full p-4 text-base font-semibold outline-none sm:text-2xl`}
              >
                {categories?.map((category) => (
                  <option
                    key={category.id}
                    className="text-base"
                    value={category?.categoryName}
                  >
                    {category?.categoryName}
                  </option>
                ))}
              </select>
            )}
          </div>
          <p className="mb-2 mt-6 text-sm sm:text-lg">
            Choose the subcategory you need
          </p>
          <select
            name="subcategory"
            id="subcategory"
            value={selectedSubCategory}
            onChange={handleSubCategoryChange}
            className="w-full border p-4 font-medium outline-none"
          >
            {selectedCategoryData?.subCategory.map((i) => (
              <option key={i.id} value={i.subTitle}>
                {i.subTitle}
              </option>
            ))}
          </select>

          <div className="my-5 flex flex-wrap items-center gap-3 sm:flex-nowrap">
            <div className="w-full border bg-white p-3 text-sm sm:text-base">
              {regularDeliveryDay} Days Delivery
            </div>
            <div className="flex w-full items-center gap-3 sm:justify-end">
              <div className="flex items-center gap-x-2 text-sm font-medium sm:text-base">
                <input
                  type="checkbox"
                  name="extraDelivery"
                  id="extraDelivery"
                  className={"is-checked peer"}
                  onChange={handleFastDeliveryToggle}
                  checked={isFastDelivery}
                  hidden
                />
                <label
                  htmlFor="extraDelivery"
                  className="flex h-[16px] w-[16px] cursor-pointer items-center justify-center border border-solid border-primary bg-white *:opacity-0 peer-[.is-checked]:peer-checked:*:opacity-100 sm:h-[20px] sm:w-[20px]"
                >
                  <Check className="h-[8px] sm:h-[10px]" />
                </label>
                Extra Fast {extraFastDeliveryDay}
                -day delivery
              </div>
              <span className="mr-3 font-bold leading-none text-primary">
                ${fastDeliveryPrice}
              </span>
            </div>
          </div>

          <div className="flex flex-wrap items-start gap-3 sm:flex-nowrap">
            <div className="w-full">
              {selectedCategoryData?.bulletPoint?.map((v, i) => (
                <p key={i} className="my-2 flex items-center gap-2">
                  <FaCheckCircle className="shrink-0 text-primary" /> {v}
                </p>
              ))}
            </div>
            <div className="w-full">
              <div className="flex items-center justify-between gap-3 sm:justify-end">
                <span className="font-medium">Quantity</span>
                <select
                  className="w-[150px] border bg-white p-3 font-semibold outline-none sm:w-[100px]"
                  name="quantity"
                  value={selectedQuantity}
                  onChange={(e) => setSelectedQuantity(e.target.value)}
                >
                  {quantities.map((q) => (
                    <option key={q} value={q}>
                      {q}
                    </option>
                  ))}
                </select>
              </div>
              <div className="mt-5 border bg-white p-3 text-center text-lg font-medium text-primary sm:text-xl">
                Total -{" "}
                <span className="font-bold">
                  ${totalAmount}
                  USD
                </span>
              </div>
            </div>
          </div>
          <button
            type="submit"
            className="my-5 block w-full bg-primary p-3 text-center font-semibold text-white"
          >
            Continue ($
            {totalAmount})
          </button>
          <p className="my-8 text-center text-sm sm:text-base">
            Go to the payment option by clicking &quot;Continue&quot;
          </p>
        </form>
      </div>
    </section>
  );
};

export default StartSingleProject;
