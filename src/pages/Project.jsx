// import StartMultipleProject from "../components/projectStart/StartMultipleProject";
import StartSingleProject from "../components/projectStart/StartSingleProject";

const Project = () => {
  return (
    <div className="max-width">
      <h1 className="my-10 text-center text-lg font-semibold sm:text-[28px]">
        Please select each step below carefully
      </h1>
      <StartSingleProject />
      {/* <StartMultipleProject /> */}
    </div>
  );
};

export default Project;
