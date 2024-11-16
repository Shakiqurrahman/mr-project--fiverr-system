// File icon imports (you can replace these with your actual icon paths)
import FileIcon from "./FileIcon";

const FilePreview = ({ file }) => {
  const isImage = file?.type?.startsWith("image/");
  const isZip = file.format === "application/zip";
  const isRar = file.format === "application/vnd.rar";
  const isAI = file.format === "application/postscript";

  console.log(file);

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
    } else {
      return <FileIcon />;
    }
  };

  return renderPreview();
};

export default FilePreview;
