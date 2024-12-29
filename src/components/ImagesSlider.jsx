import React from "react";

const ImagesSlider = ({ files, selectedFileUrl }) => {
  const imageFiles = files?.attachments?.filter((file) =>
    file?.format?.startsWith("image/"),
  );
  return (
    <div className="fixed left-0 top-0 h-screen w-full bg-black/30">
      ImagesSlider
    </div>
  );
};

export default ImagesSlider;
