import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import StartMultipleProject from "../components/projectStart/StartMultipleProject";
import StartSingleProject from "../components/projectStart/StartSingleProject";

const Project = () => {
  const { state } = useLocation();
  const { user } = useSelector((state) => state.user);
  const item = state?.item;
  const items = state?.items;
  return (
    <div className="max-width">
      {user?.block_for_chat ? (
        <p className="mb-[300px] mt-10 text-center text-lg font-semibold text-revision">
          You Are not able to start a project!!!
        </p>
      ) : (
        <>
          <h1 className="my-10 text-center text-lg font-semibold sm:text-[28px]">
            Please select each step below carefully
          </h1>
          {!state && <StartSingleProject />}
          {item && <StartSingleProject item={item} />}
          {items && <StartMultipleProject items={items} />}
        </>
      )}
    </div>
  );
};

export default Project;
