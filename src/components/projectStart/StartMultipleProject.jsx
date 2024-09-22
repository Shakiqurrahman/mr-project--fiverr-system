import { useEffect, useState } from "react";
import { FaCheckCircle } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import Check from "../../assets/svg/Check";
import { useFetchMultiProjectQuery } from "../../Redux/api/multiProjectApiSlice";
import { fetchCategory } from "../../Redux/features/category/categoryApi";

const StartMultipleProject = ({ items }) => {
  const { data } = useFetchMultiProjectQuery();
  const dispatch = useDispatch();
  const { category: categories } = useSelector((state) => state.category);
  const [multiProjectData, setMultiProjectData] = useState(null);
  const [choosenItems, setChoosenItems] = useState(() =>
    items.map(
      ({
        images,
        checked,
        description,
        designs,
        fileFormat,
        folder,
        industrys,
        relatedDesigns,
        size,
        subFolder,
        tags,
        ...newItem
      }) => {
        const designImage = images.find((i) => i.thumbnail === true).url;

        return {
          ...newItem,
          designImage,
          quantity: 1,
          isFastDelivery: false,
          save: false,
        };
      },
    ),
  );
  const [selectedItem, setSelectedItem] = useState(choosenItems[0].id);
  const quantities = Array.from({ length: 9 }, (_, i) => i + 1);

  // Set the multi-project data from API
  useEffect(() => {
    if (data) {
      setMultiProjectData(data[0]);
    }
  }, [data]);

  // Get the category data from API
  useEffect(() => {
    dispatch(fetchCategory());
  }, [dispatch]);

  // Update choosenItems with category data and filter subcategories
  useEffect(() => {
    if (categories) {
      setChoosenItems((prevItems) =>
        prevItems.map((item) => {
          const categoryObj = categories.find(
            (cat) => cat.categoryName === item.category,
          );
          const subCategoryObj = categories
            .filter((cat) => cat.categoryName === item.category)[0]
            ?.subCategory?.find((sub) => sub.subTitle === item.subCategory);

          return {
            ...item,
            category: categoryObj || item.category,
            subCategory: subCategoryObj || item.subCategory,
            subTotal: subCategoryObj?.subAmount,
            regularDeliveryDays: subCategoryObj?.regularDeliveryDays,
            fastDeliveryDays: subCategoryObj?.fastDeliveryDays,
            fastDeliveryPrice: subCategoryObj?.fastDeliveryPrice,
          };
        }),
      );
    }
  }, [categories]);

  const handleFastDeliveryToggle = (e, id) => {
    const isChecked = e.target.checked;
    console.log(e.target.checked, id);
    setChoosenItems((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          if (isChecked) {
            return {
              ...item,
              isFastDelivery: true,
              save: false,
              subTotal:
                (parseInt(item.subCategory.subAmount) +
                  parseInt(item.subCategory.fastDeliveryPrice)) *
                item.quantity,
            };
          } else {
            return {
              ...item,
              isFastDelivery: false,
              save: false, // or set to true if you want to change this when unchecked
              subTotal: parseInt(item.subCategory.subAmount) * item.quantity,
            };
          }
        }
        return item; // Return the original item if id does not match
      }),
    );
  };
  const handleSelectedQuantity = (quantity, id) => {
    setChoosenItems((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          return {
            ...item,
            quantity,
            save: false,
            regularDeliveryDays:
              parseInt(item.subCategory.regularDeliveryDays) * quantity,
            fastDeliveryPrice:
              parseInt(item.subCategory.fastDeliveryPrice) * quantity,
            fastDeliveryDays:
              parseInt(item.subCategory.fastDeliveryDays) * quantity,
            subTotal: parseInt(item.subCategory.subAmount) * quantity,
          };
        } else {
          return item;
        }
      }),
    );
  };
  const handleSave = (id) => {
    setChoosenItems((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          return {
            ...item,
            save: true,
          };
        } else {
          return item;
        }
      }),
    );
  };

  const totalDays = choosenItems?.reduce((total, item) => {
    // Check if fast delivery is selected
    const deliveryDays = item?.isFastDelivery
      ? item?.fastDeliveryDays || 0 // Use fastDeliveryDays if true
      : item?.regularDeliveryDays || 0; // Otherwise, use regularDeliveryDays

    return total + Number(deliveryDays); // Convert to number and accumulate
  }, 0);

  const totalAmount = choosenItems?.reduce(
    (total, item) => total + Number(item.subTotal),
    0,
  );

  const allSaved = choosenItems?.every((item) => item.save === true);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (allSaved && choosenItems && multiProjectData) {
      const newItems = choosenItems.map(({ save, id, ...item }) => {
        const {
          bulletPoint,
          order,
          requirements,
          subCategory,
          id: categoryId,
          ...restCategory
        } = item.category;
        return {
          ...item,
          designId: id,
          category: { categoryId, ...restCategory },
        };
      });
      const data = {
        categoryName : multiProjectData.projectTitle,
        image : multiProjectData.projectImage,
        requirements : multiProjectData.requirements,
        duration: totalDays,
        totalAmount,
        designs: newItems,
      };
      console.log(data);
    }
  };

  return (
    <div className="mx-auto max-w-[800px] border bg-lightskyblue">
      <h1 className="bg-primary p-4 text-center text-xl font-semibold text-white">
        You are starting a project
      </h1>
      <div className="px-3">
        <p className="my-3 text-center text-sm sm:text-base">
          Each section of each design should be carefully checked and saved
          below
        </p>
        <div className="flex gap-3 overflow-x-auto">
          {choosenItems.map((i) => (
            <button
              className="border"
              key={i.id}
              onClick={() => setSelectedItem(i.id)}
            >
              <img
                src={i.designImage}
                alt=""
                className="w-[80px] object-cover sm:w-[100px]"
              />
            </button>
          ))}
        </div>
        {choosenItems
          .filter((item) => item.id === selectedItem)
          .map((item) => (
            <div key={item.id}>
              <label className="mt-3 block px-3 font-medium">
                Design Title
              </label>
              <p className="border bg-white p-3 text-sm sm:text-base">
                <span className="line-clamp-1">{item.title}</span>
              </p>
              <label className="mt-3 block px-3 font-medium">Category</label>
              <div className="flex gap-3 border bg-white p-3">
                <img
                  src={item?.category?.image?.url}
                  alt=""
                  className="w-[100px] object-cover"
                />
                <h1 className="text-base font-semibold sm:text-lg">
                  {item?.category?.categoryName}
                </h1>
              </div>
              <label className="mt-5 block px-3 font-medium">Subcategory</label>
              <p className="line-clamp-1 border bg-white p-3 text-sm sm:text-base">
                {item?.subCategory?.subTitle}
              </p>
              <div className="my-5 flex flex-wrap items-center gap-3 sm:flex-nowrap">
                <div className="w-full border bg-white p-3 text-sm sm:text-base">
                  {item?.regularDeliveryDays} Days Delivery
                </div>
                <div className="flex w-full items-center gap-3 sm:justify-end">
                  <div className="flex items-center gap-x-2 text-sm font-medium sm:text-base">
                    <input
                      type="checkbox"
                      name="extraDelivery"
                      id="extraDelivery"
                      className="is-checked peer"
                      onChange={(e) => handleFastDeliveryToggle(e, item?.id)}
                      checked={item?.isFastDelivery}
                      hidden
                    />
                    <label
                      htmlFor="extraDelivery"
                      className="flex h-[16px] w-[16px] cursor-pointer items-center justify-center border border-solid border-primary bg-white *:opacity-0 peer-[.is-checked]:peer-checked:*:opacity-100 sm:h-[20px] sm:w-[20px]"
                    >
                      <Check className="h-[8px] sm:h-[10px]" />
                    </label>
                    Extra Fast {item?.fastDeliveryDays}
                    -day delivery
                  </div>
                  <span className="mr-3 font-bold leading-none text-primary">
                    ${item?.fastDeliveryPrice}
                  </span>
                </div>
              </div>
              <div className="flex flex-wrap items-start gap-3 sm:flex-nowrap">
                <div className="w-full">
                  {item?.category?.bulletPoint?.map((v, i) => (
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
                      value={item?.quantity}
                      onChange={(e) =>
                        handleSelectedQuantity(e.target.value, item?.id)
                      }
                    >
                      {quantities.map((q) => (
                        <option key={q} value={q}>
                          {q}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="mt-5 border bg-white p-3 text-center text-lg text-primary sm:text-2xl">
                    Subtotal -{" "}
                    <span className="font-semibold">
                      ${item?.subTotal}
                      USD
                    </span>
                  </div>
                </div>
              </div>
              <button
                className="my-5 block w-full bg-revision p-3 text-center text-lg font-semibold text-white disabled:cursor-not-allowed disabled:bg-revision/50 sm:text-2xl"
                disabled={item?.save}
                onClick={() => handleSave(item?.id)}
              >
                {item?.save ? "Saved" : "Save"}
              </button>
            </div>
          ))}
        <p className="my-5 text-center text-sm sm:text-base">
          {totalDays} Days Delivery
        </p>
        <button
          className="my-5 block w-full bg-primary p-3 text-center text-lg font-semibold text-white disabled:cursor-not-allowed disabled:bg-primary/50 sm:text-2xl"
          disabled={!allSaved}
          onClick={handleSubmit}
        >
          Continue (Total - ${totalAmount || 0})
        </button>
        <p className="my-8 text-center text-sm sm:text-base">
          Go to the payment option by clicking &quot;Continue&quot;
        </p>
      </div>
    </div>
  );
};

export default StartMultipleProject;
