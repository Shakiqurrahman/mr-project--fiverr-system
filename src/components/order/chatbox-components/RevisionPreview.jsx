import React from "react";

const RevisionPreview = ({ messageObj, value }) => {
  return (
    <div className="border border-gray-200">
      <h1 className="bg-gray-200 p-2 font-medium">REVISION REQUEST</h1>
      <p className="p-4 whitespace-pre-wrap">{value?.text}</p>
    </div>
  );
};

export default RevisionPreview;
