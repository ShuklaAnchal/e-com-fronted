const MEDIA_BASE_URL = process.env.NEXT_PUBLIC_MEDIA_BASE_URL;

export const getMediaUrl = (path) => {
  if (!path) return null;

  // Already a complete URL
  if (
    path.startsWith("http://") ||
    path.startsWith("https://") ||
    path.startsWith("blob:")
  ) {
    return path;
  }

  // Remove accidental leading slash
  const cleanPath = path.replace(/^\/+/, "");

  // Remove accidental trailing slash from base URL
  const baseUrl = MEDIA_BASE_URL?.replace(/\/+$/, "");

  return `${baseUrl}/${cleanPath}`;
};