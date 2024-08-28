export default function formatFileSize(bytes) {
  if (bytes < 1024) {
    return bytes + " bytes";
  } else if (bytes < 1024 * 1024) {
    return (bytes / 1024).toFixed(2) + " kb";
  } else if (bytes < 1024 * 1024 * 1024) {
    return (bytes / (1024 * 1024)).toFixed(2) + " mb";
  } else {
    return (bytes / (1024 * 1024 * 1024)).toFixed(2) + " gb";
  }
}
