import ButtonPrimary from "./ButtonPrimary";
import ButtonSecondary from "./ButtonSecondary";
import Divider from "./Divider";

function HomeKeywords() {
  const designBtns = [
    "Bussiness Card",
    "Door Hanger",
    "Flyer",
    "Postcard",
    "Brochure",
    "Billboard",
    "Yard Sign",
    "See More",
  ];
  const industryBtns = [
    "Solar",
    "Pressure Washing",
    "Real Estate",
    "Lawn Care",
    "Moving",
    "Cleaning Services",
    "See More",
  ];
  return (
    <>
      <div className="max-width mt-10">
        <div className="flex gap-3 flex-wrap">
          {designBtns.map((value) => (
            <ButtonPrimary key={Math.random()}>{value}</ButtonPrimary>
          ))}
        </div>
      </div>
      <Divider className={"bg-[#1b8cdc!important] h-1 w-full my-8"} />
      <div className="max-width">
        <div className="flex gap-3 flex-wrap">
          {industryBtns.map((value) => (
            <ButtonSecondary key={Math.random()}>{value}</ButtonSecondary>
          ))}
        </div>
      </div>
    </>
  );
}

export default HomeKeywords;
