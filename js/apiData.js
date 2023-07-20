const storageKey = 'apiData';

export function setAPIData(data) {
  localStorage.setItem(storageKey, JSON.stringify(data));
}

export function getAPIData() {
  const data = localStorage.getItem(storageKey);
  return data ? JSON.parse(data) : null;
}