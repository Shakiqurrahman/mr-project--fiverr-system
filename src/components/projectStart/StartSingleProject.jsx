import React, { useCallback, useEffect, useMemo, useState } from "react";
import { FaCheckCircle } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategory } from "../../Redux/features/category/categoryApi";
import Check from "../../assets/svg/Check";

const StartSingleProject = () => {
  const dispatch = useDispatch();
  const { loading, category, error } = useSelector((state) => state.category);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedSubCategory, setSelectedSubCategory] = useState("");
  // const [selectedSubCategoryData, setSelectedSubCategoryData] = useState({});
  // console.log("hii", selectedSubCategoryData);

  useEffect(() => {
    dispatch(fetchCategory());
  }, [dispatch]);

  useEffect(() => {
    if (category) {
      setCategories(category);
      if (category.length > 0) {
        setSelectedCategory(category[0]?.categoryName);
      }
      // if (category.length > 0) {
      //   setSelectedCategory(category[0]?.categoryName);
      // }
    }
  }, [category]);

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };
  const handleSubCategoryChange = (e) => {
    setSelectedSubCategory(e.target.value);
  };

  const selectedCategoryData = categories?.find(
    (cat) => cat?.categoryName.toLowerCase() === selectedCategory.toLowerCase(),
  );

  useEffect(() => {
    const selectedCategoryData = categories.find(
      (cat) =>
        cat?.categoryName.toLowerCase() === selectedCategory.toLowerCase(),
    );
    if (selectedCategoryData) {
      setSelectedSubCategory(selectedCategoryData.subCategory[0].subTitle);
    }
    // if(selectedSubCategory){
    //   setSelectedSubCategoryData(selectedCategoryData.subCategory.find(
    //     (subCat) => subCat.subTitle === selectedSubCategory,
    //   ));
    // }
  }, [selectedCategory, categories, selectedSubCategory]);

  const selectedSubCategoryData = useCallback(() => {
    if (selectedSubCategory) {
      return selectedCategoryData?.subCategory?.find(
        (subCat) => subCat?.subTitle === selectedSubCategory,
      );
    }
  }, [selectedCategoryData?.subCategory, selectedSubCategory]);

  console.log(selectedSubCategoryData());
  

  return (
    <section>
      <div className="mx-auto max-w-[800px] border">
        <h3 className="bg-primary py-4 text-center text-xl font-semibold text-white">
          You are starting a project
        </h3>
        <div className="bg-lightskyblue p-4 pt-10">
          <p className="mb-2 text-lg">Choose the category you need</p>
          <div className="flex justify-between gap-2 border bg-white p-6">
            <img
              className="w-32 object-cover"
              src={selectedCategoryData?.image?.url}
              alt={selectedCategoryData?.image?.name}
            />
            <select
              name="subcategory"
              id="subcategory"
              value={selectedCategory}
              onChange={handleCategoryChange}
              className="w-full p-4 text-2xl font-semibold outline-none"
            >
              {categories?.map((category, idx) => (
                <option
                  key={idx}
                  className="text-base"
                  value={category?.categoryName}
                >
                  {category?.categoryName}
                </option>
              ))}
            </select>
          </div>
          <p className="mb-2 mt-6 text-lg">Choose the subcategory you need</p>
          <select
            name="subcategory"
            id="subcategory"
            value={selectedSubCategory}
            onChange={handleSubCategoryChange}
            className="w-full border p-4 font-medium outline-none"
          >
            {selectedCategoryData?.subCategory.map((i, idx) => (
              <option key={idx} value={i.subTitle}>
                {i.subTitle}
              </option>
            ))}
          </select>

          <div className="my-5 flex flex-wrap items-center gap-3 sm:flex-nowrap">
            <div className="w-full border bg-white p-3 text-sm sm:text-base">
              {} Days Delivery
            </div>
            <div className="flex w-full items-center gap-3 sm:justify-end">
              <div className="flex items-center gap-x-2 text-sm font-medium sm:text-base">
                <input
                  type="checkbox"
                  name="extraDelivery"
                  id="extraDelivery"
                  className="is-checked peer"
                  // onChange={handleFastDeliveryToggle}
                  // checked={isFastDelivery}
                  hidden
                />
                <label
                  htmlFor="extraDelivery"
                  className="flex h-[16px] w-[16px] cursor-pointer items-center justify-center border border-solid border-primary bg-white *:opacity-0 peer-[.is-checked]:peer-checked:*:opacity-100 sm:h-[20px] sm:w-[20px]"
                >
                  <Check className="h-[8px] sm:h-[10px]" />
                </label>
                Extra Fast -day delivery
              </div>
              <span className="mr-3 font-bold leading-none text-primary">
                {/* ${item.extraDeliveryPrice} */}
              </span>
            </div>
          </div>

          <div className="flex flex-wrap items-start gap-3 sm:flex-nowrap">
            <div className="w-full">
              {selectedCategoryData?.bulletPoints?.map((v, i) => (
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
                  // value={selectedQuantity}
                  // onChange={(e) => setSelectedQuantity(e.target.value)}
                >
                  {/* {quantities.map((q) => ( */}
                  <option
                  // key={q}
                  // value={q}
                  >
                    {/* {q} */}
                  </option>
                  {/* ))} */}
                </select>
              </div>
              <div className="mt-5 border bg-white p-3 text-center text-lg text-primary sm:text-2xl">
                Total -{" "}
                <span className="font-semibold">
                  ${/* {item.price}  */}
                  USD
                </span>
              </div>
            </div>
          </div>

          <p className="my-5 text-center text-sm sm:text-base">
            5 Days Delivery
          </p>
          <button className="my-5 block w-full bg-primary p-3 text-center font-semibold text-white">
            Continue ($130)
          </button>
          <p className="my-8 text-center text-sm sm:text-base">
            Go to the payment option by clicking &quot;Continue&quot;
          </p>
        </div>
      </div>
    </section>
  );
};

export default StartSingleProject;
