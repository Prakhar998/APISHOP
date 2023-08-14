export const isValidUrl = (url: string): boolean => {
  if (url.includes("?")) {
    return false;
  }
  return true;
};
