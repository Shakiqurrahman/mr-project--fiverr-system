import StartMultipleProject from "../components/projectStart/StartMultipleProject";

const Project = () => {
  return (
    <div className="max-width">
      <h1 className="my-10 text-center text-lg font-bold sm:text-2xl">
        Please select each step below carefully
      </h1>
      <StartMultipleProject />
    </div>
  );
};

export default Project;
