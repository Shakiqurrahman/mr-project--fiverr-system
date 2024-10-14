// File icon imports (you can replace these with your actual icon paths)
import FileIcon from "./FileIcon";

const FilePreview = ({ file }) => {
  const isImage = file.type.startsWith("image/");
  const isZip = file.format === "zip";
  const isRar = file.format === "rar";

  const renderPreview = () => {
    if (isImage) {
      return (
        <img
          src={file.url}
          alt="preview"
          style={{
            maxWidth: "100%",
            maxHeight: "200px",
            height: "100%",
            objectFit: "contain",
          }}
        />
      );
    } else if (isZip) {
      return (
        <div>
          <FileIcon name={"ZIP"} />
        </div>
      );
    } else if (isRar) {
      return <FileIcon name={"RAR"} />;
    } else if (file.format in { psd: true, ai: true }) {
      return (
        <>
          {file.format === "ai" ? (
            <FileIcon name={"AI"} />
          ) : (
            <FileIcon name={"PSD"} />
          )}
        </>
      );
    } else {
      return <FileIcon />;
    }
  };

  return renderPreview();
};

export default FilePreview;
