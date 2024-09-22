export default function formatFileSize(bytes) {
  const parsedBytes = Number(bytes);
  if (parsedBytes < 1024) {
    return parsedBytes + " bytes";
  } else if (parsedBytes < 1024 * 1024) {
    return (parsedBytes / 1024).toFixed(2) + " kb";
  } else if (parsedBytes < 1024 * 1024 * 1024) {
    return (parsedBytes / (1024 * 1024)).toFixed(2) + " mb";
  } else {
    return (parsedBytes / (1024 * 1024 * 1024)).toFixed(2) + " gb";
  }
}
