export const setObjectOn = (key, data) => {
  localStorage.setItem(key, JSON.stringify(data));
};

export const getObjectFrom = (key) => {
  const data = localStorage.getItem(key);
  return data? JSON.parse(data):data;
};

export const setPlainOn = (key, data) => {
  localStorage.setItem(key, data);
};

export const getPlainFrom = (key) => {
  return localStorage.getItem(key);
};

export const removeKey = (key) => {
  localStorage.removeItem(key);
};

export const clearAll = () => {
  localStorage.clear();
}