// Generate random ID for each task
export const generateRandomId = () => {
  return Math.round(Math.random() * 100000) + 1;
};
