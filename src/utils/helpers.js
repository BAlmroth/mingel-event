// initals fallback function
export const getInitials = (firstName, lastName) => {
  return `${firstName?.[0] ?? ""}${lastName?.[0] ?? ""}`.toUpperCase();
};