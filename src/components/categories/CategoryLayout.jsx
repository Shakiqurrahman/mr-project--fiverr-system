import { Link } from "react-router-dom";

function CategoryLayout({ children, title, path }) {
  return (
    <div className="bg-white p-4 border border-solid rounded-lg mt-10">
      <div className="flex items-center justify-between mb-5">
        <h1 className="text-base sm:text-xl font-semibold">{title}</h1>
        <Link
          to={path}
          className="text-primary text-base sm:text-lg font-medium"
        >
          All Designs
        </Link>
      </div>
      {children}
    </div>
  );
}

export default CategoryLayout;
