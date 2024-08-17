function ButtonSecondary({ children, className }) {
  return (
    <button
      className={`${
        className ? className : ""
      } py-1 sm:py-2 px-2 sm:px-4 rounded-[30px] bg-[#ffefef] hover:bg-secondary hover:text-white duration-300 text-sm sm:text-base font-medium`}
    >
      {children}
    </button>
  );
}

export default ButtonSecondary;
