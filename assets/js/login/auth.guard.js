import { navigateTo } from "../utils/navigate.js";

export function authGuard () {
  if(!isLoggedUser()){
    return navigateTo({ path: '/pages/login.html'});
  }
}

export function setInitData(){
  const data = localStorage.getItem('data');
  if(!data) {
    const siteData = {
      user: null,
    }
    localStorage.setItem('data', JSON.stringify(siteData));
  }
}

export function isLoggedUser() {
  const { user } = JSON.parse(localStorage.getItem('data'));
  return user && user.logged
}