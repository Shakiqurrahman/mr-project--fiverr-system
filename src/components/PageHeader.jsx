import Image from "../assets/images/Page Title Backround.jpg";
function PageHeader({ children, bgImage, color }) {
  return (
    <div
      className={`h-[150px] sm:h-[200px] lg:h-[300px] xl:h-[400px] bg-cover flex items-center justify-center text-lg sm:text-xl md:text-3xl font-semibold bg-[100%] ${
        color ? color : "text-primary"
      }`}
      style={{ backgroundImage: `url(${bgImage ? bgImage : Image})` }}
    >
      {children}
    </div>
  );
}

export default PageHeader;
