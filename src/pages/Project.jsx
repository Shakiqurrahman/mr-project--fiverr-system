import { useLocation } from "react-router-dom";
import StartMultipleProject from "../components/projectStart/StartMultipleProject";
import StartSingleProject from "../components/projectStart/StartSingleProject";

const Project = () => {
  const {state} = useLocation();
  // console.log(state);
  
  return (
    <div className="max-width">
      <h1 className="my-10 text-center text-lg font-semibold sm:text-[28px]">
        Please select each step below carefully
      </h1>
      <StartSingleProject item={state?.item}/>
      {/* <StartMultipleProject /> */}
    </div>
  );
};

export default Project;
