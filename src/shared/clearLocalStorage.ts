const clearLocalStorage = (keys: Array<string>) => {
  if (keys?.[0] === "all") {
    clearLocalStorage(["user"]);

    return;
  }

  for (const key of keys) {
    localStorage.removeItem(key);
  }
};

export default clearLocalStorage;
