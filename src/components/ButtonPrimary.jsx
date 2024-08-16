function ButtonPrimary({ children, className }) {
  return (
    <button
      className={`${
        className ? className : ""
      } py-1 sm:py-2 px-2 sm:px-4 rounded-[30px] bg-[#edf7fd] hover:bg-primary hover:text-white duration-300 text-sm sm:text-base`}
    >
      {children}
    </button>
  );
}

export default ButtonPrimary;
