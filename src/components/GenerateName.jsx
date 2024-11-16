import React from "react";

const GenerateName = ({ name }) => {
  const extension = "." + name?.split(".").pop();

  // Remove the last occurrence of the extension
  const nameWithoutExtName = name.replace(new RegExp(`${extension}$`), "");

  return (
    <div className="flex items-center">
      <p className="shrink truncate">{nameWithoutExtName}</p>{" "}
      <span className="shrink-0 grow">{extension}</span>
    </div>
  );
};

export default GenerateName;
