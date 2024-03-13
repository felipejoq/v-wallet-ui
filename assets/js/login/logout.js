import {logoutLink} from "./elements.js";

export const logout = () => {
  $(logoutLink).on('click', logoutInit);
}

export function logoutInit() {
  console.log('Logout init')
  localStorage.clear();
  window.location.href = '/index.html'
}