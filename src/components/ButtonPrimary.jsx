function ButtonPrimary({
  children,
  className,
  items,
  onClick,
  selectedValue,
  value,
}) {
  return (
    <button
      onClick={onClick}
      className={`${
        className ? className : ""
      } ${selectedValue === value ? "bg-primary text-white" : ""} rounded-[30px] bg-[#edf7fd] px-2 py-1 text-sm font-medium duration-300 hover:bg-primary hover:text-white sm:px-4 sm:py-2 sm:text-base`}
    >
      {children} ({items && items})
    </button>
  );
}

export default ButtonPrimary;
