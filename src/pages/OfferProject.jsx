import { useEffect, useState } from "react";
import { FaCheckCircle } from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";
import Check from "../assets/svg/Check";
function OfferProject() {
  const navigate = useNavigate();
  const location = useLocation();
  const { state } = location;

  const [categories, setCategories] = useState(state?.designs || []);
  const [freeDesign, setFreeDesign] = useState({
    designName: state?.freeDesignName || "",
    subDesignNames:
      state?.freeDesignTypographys.map((v) => {
        return {
          subDesignName: v,
          isSelected: false,
        };
      }) || [],
    isDesignSelected: true,
  });
  const [isFastDelivery, setIsFastDelivery] = useState(false);
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    // Get the selected categories
    const selectedCategories = categories.filter((item) => item.isSelected);

    // Check if there are at least 3 selected categories
    const hasThreeSelectedCategories = selectedCategories.length >= 3;

    // Check if each of the selected categories has at least one selected subcategory
    const allSelectedCategoriesHaveSubcategory = selectedCategories.every(
      (item) => item.subCategories.some((sub) => sub.isSelected),
    );

    const hasFreeDesignSubcategorySelected = freeDesign.isDesignSelected
      ? freeDesign.subDesignNames.some((sub) => sub.isSelected)
      : true;

    const isValidSubmission =
      hasThreeSelectedCategories &&
      allSelectedCategoriesHaveSubcategory &&
      hasFreeDesignSubcategorySelected;
    setIsSubmitDisabled(
      !(
        hasThreeSelectedCategories &&
        allSelectedCategoriesHaveSubcategory &&
        hasFreeDesignSubcategorySelected
      ),
    );

    // Set error messages based on conditions
    let newErrorMessage = "";
    if (!hasThreeSelectedCategories) {
      newErrorMessage = "Please select at least 3 designs.";
    } else if (!allSelectedCategoriesHaveSubcategory) {
      newErrorMessage =
        "Each selected design must have at least one subcategory.";
    } else if (
      freeDesign.isDesignSelected &&
      !hasFreeDesignSubcategorySelected
    ) {
      newErrorMessage = "Please select a subcategory for the free design.";
    }

    setErrorMessage(newErrorMessage);
  }, [categories, freeDesign]);

  // Handle free design checkbox change
  const handleFreeDesignChange = () => {
    setFreeDesign((prevState) => {
      const newIsDesignSelected = !prevState.isDesignSelected;
      return {
        ...prevState,
        isDesignSelected: newIsDesignSelected,
        subDesignNames: prevState.subDesignNames.map((subItem) => ({
          ...subItem,
          isSelected: newIsDesignSelected ? subItem.isSelected : false,
        })),
      };
    });
  };

  // Handle fast delivery checkbox toggle
  const handleFastDeliveryToggle = () => {
    setIsFastDelivery((prevIsFastDelivery) => !prevIsFastDelivery);
  };

  // Handle category checkbox change
  const handleCategoryChange = (categoryName, event) => {
    const isCategorySelected = event.target.checked;

    setCategories((prevItems) => {
      const selectedCount = prevItems.filter((item) => item.isSelected).length;

      // If trying to select a new category and there are already 3 selected, prevent it
      if (isCategorySelected && selectedCount >= 3) {
        return prevItems;
      }

      return prevItems.map((item) =>
        item.categoryName === categoryName
          ? {
              ...item,
              isSelected: isCategorySelected,
              subCategories: item.subCategories.map((subItem) => ({
                ...subItem,
                isSelected: isCategorySelected ? subItem.isSelected : false,
              })),
            }
          : item,
      );
    });
  };

  // Handle subcategory checkbox change
  const handleSubCategoryChange = (categoryName, subCategoryName, event) => {
    setCategories((prevItems) =>
      prevItems.map((item) =>
        item.categoryName === categoryName && item.isSelected
          ? {
              ...item,
              subCategories: item.subCategories.map((subItem) => ({
                ...subItem,
                isSelected:
                  subItem.subCategoryName === subCategoryName
                    ? event.target.checked
                    : false,
              })),
            }
          : item,
      ),
    );
  };

  // Handle subdesign checkbox change
  const handleSubDesignChange = (subName, e) => {
    if (!freeDesign.isDesignSelected) {
      return;
    }
    setFreeDesign((prevState) => ({
      ...prevState,
      subDesignNames: prevState.subDesignNames.map((subItem) => ({
        ...subItem,
        isSelected:
          subItem.subDesignName === subName ? e.target.checked : false,
      })),
    }));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    const selectedDesigns = categories
      .filter((d) => d.isSelected)
      .map(({ subCategories, ...rest }) => {
        const selectedSubcategories = subCategories?.find(
          (sub) => sub.isSelected,
        );
        return {
          ...rest,
          subCategory: selectedSubcategories,
        };
      });

    const updatedFreeDesign = freeDesign?.subDesignNames?.find(
      (data) => data.isSelected,
    );

    const data = {
      title: "Free Offer Project",
      image: state?.projectImage,
      subTotal: state?.offerAmount,
      fastDeliveryDuration: state?.extraFastDelivery,
      fastDeliveryAmount: state?.extraFastDeliveryAmount,
      freeDesign: {
        designName: freeDesign.designName,
        freeSubDesign: updatedFreeDesign,
      },
      designs: selectedDesigns,
      isFastDelivery,
      from: "offerProject",
    };
    navigate("/payment", { state: data });
  };

  return (
    <div className="max-width">
      <h1 className="my-10 text-center text-lg font-semibold sm:text-2xl">
        Please select each step below carefully
      </h1>

      {/* Project Form Section */}
      <form
        onSubmit={handleSubmit}
        className="mx-auto max-w-[800px] border border-solid bg-lightskyblue"
      >
        <h1 className="bg-primary p-4 text-center text-lg text-white sm:text-xl">
          You are starting a project
        </h1>
        <div className="p-3">
          <p className="my-4 text-xs font-medium sm:text-sm">
            Choose the required option for your design
          </p>

          {/* Already Selected Field */}
          <div className="flex items-start gap-3">
            <div className="">
              <input
                type="checkbox"
                name={freeDesign.designName}
                id={freeDesign.designName}
                className="is-checked peer"
                checked={freeDesign?.isDesignSelected}
                hidden
                onChange={handleFreeDesignChange}
              />
              <label
                htmlFor={freeDesign.designName}
                className="flex h-[30px] w-[30px] cursor-pointer items-center justify-center border border-solid border-primary bg-white *:opacity-0 peer-[.is-checked]:peer-checked:*:opacity-100 sm:h-[40px] sm:w-[40px]"
              >
                <Check className="h-[14px] sm:h-[18px]" />
              </label>
            </div>
            <div className="flex-grow">
              <div className="flex h-[30px] items-center border border-solid bg-white px-3 text-xs font-semibold sm:h-[40px] sm:text-base">
                {freeDesign.designName}
              </div>
              <div className="mt-5 flex items-center gap-x-3 sm:gap-x-10">
                {freeDesign.subDesignNames?.map((sub, i) => (
                  <div key={i} className="flex items-center gap-x-3">
                    <input
                      type="radio"
                      name={sub.subDesignName}
                      id={sub.subDesignName}
                      className="is-checked peer"
                      checked={sub.isSelected}
                      onChange={(e) =>
                        handleSubDesignChange(sub.subDesignName, e)
                      }
                      hidden
                    />
                    <label
                      htmlFor={sub.subDesignName}
                      className="flex h-[16px] w-[16px] cursor-pointer items-center justify-center border border-solid border-primary bg-white *:opacity-0 peer-[.is-checked]:peer-checked:*:opacity-100 sm:h-[20px] sm:w-[20px]"
                    >
                      <Check className="h-[8px] sm:h-[10px]" />
                    </label>
                    <p className="text-xs font-medium sm:text-sm">
                      {sub.subDesignName}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <p className="mb-4 mt-8 text-xs font-medium sm:text-sm">
            Choose the 3 designs you need and Choose the required options for
            the designs
          </p>

          {/* Selectable Fields */}
          {categories?.map((item) => (
            <div className="mb-8 flex items-start gap-3" key={Math.random()}>
              <div className="">
                <input
                  type="checkbox"
                  name={item.categoryName}
                  id={item.categoryName}
                  onChange={(e) => handleCategoryChange(item.categoryName, e)}
                  className="is-checked peer"
                  checked={item.isSelected}
                  hidden
                />
                <label
                  htmlFor={item.categoryName}
                  className="flex h-[30px] w-[30px] cursor-pointer items-center justify-center border border-solid border-primary bg-white *:opacity-0 peer-[.is-checked]:peer-checked:*:opacity-100 sm:h-[40px] sm:w-[40px]"
                >
                  <Check className="h-[14px] sm:h-[18px]" />
                </label>
              </div>
              <div className="flex-grow">
                <div className="flex h-[30px] items-center border border-solid bg-white px-3 text-xs font-semibold sm:h-[40px] sm:text-base">
                  {item.categoryLabel}
                </div>
                <div className="mt-5 flex items-center gap-x-3 sm:gap-x-10">
                  {item?.subCategories.map((i, idx) => (
                    <div key={idx} className="flex items-center gap-x-3">
                      <input
                        type="radio"
                        name={item.categoryName}
                        id={item.categoryName + i.subCategoryName}
                        className="is-checked peer"
                        hidden
                        onChange={(e) =>
                          handleSubCategoryChange(
                            item.categoryName,
                            i.subCategoryName,
                            e,
                          )
                        }
                        checked={i.isSelected}
                        value={i.subCategoryName}
                      />
                      <label
                        htmlFor={item.categoryName + i.subCategoryName}
                        className="flex h-[16px] w-[16px] cursor-pointer items-center justify-center border border-solid border-primary bg-white *:opacity-0 peer-[.is-checked]:peer-checked:*:opacity-100 sm:h-[20px] sm:w-[20px]"
                      >
                        <Check className="h-[8px] sm:h-[10px]" />
                      </label>
                      <p className="text-xs font-medium sm:text-sm">
                        {i.subCategoryLabel}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}

          {/* Extra Delivery Field */}
          <div className="flex flex-wrap items-center justify-between gap-3 sm:flex-nowrap">
            <div className="w-full border border-solid bg-white p-2 text-xs font-medium sm:w-1/2 sm:text-sm">
              {state?.delivery} Days Delivery
            </div>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-x-2 text-xs font-medium sm:text-sm">
                <input
                  type="checkbox"
                  name="extraDelivery"
                  id="extraDelivery"
                  className="is-checked peer"
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
                Extra Fast {state?.extraFastDelivery}-days delivery
              </div>
              <span className="mr-3 font-bold leading-none text-primary">
                ${state?.extraFastDeliveryAmount}
              </span>
            </div>
          </div>

          {/* Bullet Point and Total Price Section */}
          <div className="my-8 flex flex-wrap items-stretch gap-3 sm:flex-nowrap">
            <ul className="flex h-auto w-full flex-col justify-center text-sm font-medium *:my-1 *:flex *:items-center *:gap-3 sm:w-1/2">
              {state?.bullPoints?.map((i, idx) => (
                <li key={idx}>
                  <FaCheckCircle className="text-primary" /> {i}
                </li>
              ))}
            </ul>
            <div className="flex flex-grow items-center justify-center border border-solid bg-white p-5">
              <div className="text-center">
                <h1 className="font-semibold">Total</h1>
                <span className="text-xl font-bold text-primary">
                  $
                  {isFastDelivery
                    ? parseInt(state?.offerAmount) +
                      parseInt(state?.extraFastDeliveryAmount)
                    : parseInt(state?.offerAmount)}{" "}
                  USD
                </span>
              </div>
            </div>
          </div>

          {/* Form Submit Button */}
          <button
            type="submit"
            disabled={isSubmitDisabled}
            className="block w-full bg-primary p-2 text-white disabled:bg-primary/60"
          >
            Continue (
            {isFastDelivery
              ? parseInt(state?.offerAmount) +
                parseInt(state?.extraFastDeliveryAmount)
              : parseInt(state?.offerAmount)}
            $)
          </button>
          {errorMessage && (
            <p className="mt-4 text-center text-sm font-medium text-red-500">
              {errorMessage}
            </p>
          )}

          {/* Tips message Section */}
          <p className="my-8 mb-2 text-center text-xs sm:text-sm">
            Go to the payment option by clicking &quot;Continue&quot;
          </p>
        </div>
      </form>
    </div>
  );
}

export default OfferProject;
