// File icon imports (you can replace these with your actual icon paths)
import FileIcon from "./FileIcon";

const getExtension = (filename) => {
  const lastDotIndex = filename.lastIndexOf(".");
  if (lastDotIndex === -1) return ""; // No extension found

  return filename.slice(lastDotIndex + 1); // Get everything after the last dot
};

const FilePreview = ({ file }) => {
  const isImage = file?.type?.startsWith("image/");
  const extension = getExtension(file?.name);
  const isZip = extension === "zip";
  const isRar = extension === "rar";
  const isAI = extension === "ai";
  const isPSD = extension === "psd";

  const renderPreview = () => {
    if (isImage) {
      return (
        <img
          src={file.url}
          alt="preview"
          style={{
            maxWidth: "100%",
            maxHeight: "80px",
            height: "100%",
            objectFit: "cover",
          }}
        />
      );
    } else if (isZip) {
      return <FileIcon name={"ZIP"} />;
    } else if (isRar) {
      return <FileIcon name={"RAR"} />;
    } else if (isAI) {
      return <FileIcon name={"AI"} />;
    } else if (isPSD) {
      return <FileIcon name={"PSD"} />;
    } else {
      return <FileIcon />;
    }
  };

  return renderPreview();
};

export default FilePreview;
