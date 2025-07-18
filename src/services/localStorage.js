export const saveToLocalStorage = (tasks) => {
  localStorage.setItem("tasks", JSON.stringify(tasks || []));
};

export const saveDarkMode = (darkMode) => {
  localStorage.setItem("darkMode", JSON.stringify(!!darkMode));
};

export const getFromLocalStorage = (key) => {
  let data = localStorage.getItem(key);
  return data ? JSON.parse(data) : null;
};
