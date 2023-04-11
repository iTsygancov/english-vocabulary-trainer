export const useLocalStorage = (name: string): Function[] => {
  const getLocalStorage = () => {
    const local = window.localStorage.getItem(name);
    if (local != null) {
      return JSON.parse(local);
    }
    return null;
  };
  const setLocalStorage = (item: Object) => {
    window.localStorage.setItem(name, JSON.stringify(item));
  };
  const removeLocalStorage = () => {
    return window.localStorage.removeItem(name);
  };
  return [getLocalStorage, setLocalStorage, removeLocalStorage];
};
