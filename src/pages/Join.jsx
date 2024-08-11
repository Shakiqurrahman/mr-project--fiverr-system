import { useState } from "react";
import SignInForm from "../components/SignInForm";
import SignUpForm from "../components/SignUpForm";

function Join() {
  const [tab, setTab] = useState("Sign Up");
  const handleClick = (e) => {
    setTab(e.target.value);
  };
  return (
    <>
      <div className="max-width my-10">
        <div className="w-full max-w-[500px] bg-[#F2F9FF] mx-auto">
          <div className="flex items-stretch join">
            <button
              type="button"
              value="Sign In"
              onClick={handleClick}
              className={`w-1/2 p-2 sm:p-4 bg-[#D1E6F9] text-base sm:text-lg font-semibold relative ${
                tab === "Sign In" ? "active" : ""
              }`}
            >
              Sign In
            </button>
            <button
              type="button"
              value="Sign Up"
              onClick={handleClick}
              className={`w-1/2 p-2 sm:p-4 bg-[#D1E6F9] text-base sm:text-lg font-semibold relative ${
                tab === "Sign Up" ? "active" : ""
              }`}
            >
              Sign Up
            </button>
          </div>
          <div className="py-5 px-3">
            {tab === "Sign In" ? (
              <SignInForm handleClick={handleClick} />
            ) : (
              <SignUpForm handleClick={handleClick} />
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default Join;
