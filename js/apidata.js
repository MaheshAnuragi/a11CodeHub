const storageKey = 'apiData';
const storageKey2 = 'resourcesBlogData';

export function setAPIData(data) {
  localStorage.setItem(storageKey, JSON.stringify(data));
}

export function getAPIData() {
  const data = localStorage.getItem(storageKey);
  return data ? JSON.parse(data) : null;
}

export function setresourcesBlogData(data) {
  localStorage.setItem(storageKey2, JSON.stringify(data));
}

export function getresourcesBlogData() {
  const data = localStorage.getItem(storageKey2);
  return data ? JSON.parse(data) : null;
}