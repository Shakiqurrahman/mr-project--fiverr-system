import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import img from "../../assets/images/project-thumbnail.jpg";
import { fetchCategory } from "../../Redux/features/category/categoryApi";

const StartSingleProject = () => {
  const dispatch = useDispatch();
  const { loading, category, error } = useSelector((state) => state.category);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");

  useEffect(() => {
    dispatch(fetchCategory());
  }, [dispatch]);

  useEffect(() => {
    if (category) {
      setCategories(category);
      if (category.length > 0) {
        setSelectedCategory(category[0]?.categoryName);
      }
    }
  }, [category]);

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  const selectedCategoryData = categories?.find(
    (cat) => cat?.categoryName.toLowerCase() === selectedCategory.toLowerCase(),
  );
  console.log(selectedCategoryData);

  return (
    <section>
      <div className="mx-auto max-w-[800px] border">
        <h3 className="bg-primary py-4 text-center text-xl font-semibold text-white">
          You are starting a project
        </h3>
        <div className="bg-lightskyblue p-4 pt-10">
          <p className="mb-2 text-lg">Choose the category you need</p>
          <div className="flex justify-between gap-2 border bg-white p-6">
            <img className="w-32 object-cover" src={img} alt="thumbnail" />
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
                  // value={}
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
            className="w-full border p-4 font-medium outline-none"
          >
            {selectedCategoryData?.subCategory.map((i, idx) => (
              <option key={idx} value={i.subTitle}>
                {i.subTitle}
              </option>
            ))}
          </select>
          <div className="mt-8 flex">
            <p className="w-full border bg-white p-4">2 Days Delivery</p>
            {/* TODO : add here the extra fast delivery content */}
          </div>
        </div>
      </div>
    </section>
  );
};

export default StartSingleProject;
