export const saveDataToStorage = (name, data, defaultValue) => {
  sessionStorage.setItem(`${name}`, JSON.stringify(data || defaultValue));
};

export const getDataFromStorage = (name) => {
  if (sessionStorage.getItem(`${name}`) === null) {
    return 1;
  }

  return JSON.parse(sessionStorage.getItem(`${name}`));
};
