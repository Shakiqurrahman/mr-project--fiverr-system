import { Link } from "react-router-dom";

function CategoryLayout({ children, title, path }) {
  return (
    <div className="mt-10 rounded-lg border border-solid bg-white p-4">
      <div className="mb-5 flex items-center justify-between">
        <h1 className="text-base font-semibold sm:text-xl">{title}</h1>
        <Link
          to={path}
          className="text-base font-medium text-primary sm:text-lg"
        >
          All Designs
        </Link>
      </div>
      {children}
    </div>
  );
}

export default CategoryLayout;
