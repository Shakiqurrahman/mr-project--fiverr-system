function ButtonSecondary({
  children,
  className,
  items,
  onClick,
  industrySelectedValue,
  value,
}) {
  return (
    <button
      onClick={onClick}
      className={`${
        className ? className : ""
      } ${industrySelectedValue === value ? "bg-secondary text-white" : ""} rounded-[30px] bg-[#ffefef] px-2 py-1 text-sm font-medium duration-300 hover:bg-secondary hover:text-white sm:px-4 sm:py-2 sm:text-base`}
    >
      {children} ({items && items})
    </button>
  );
}

export default ButtonSecondary;
