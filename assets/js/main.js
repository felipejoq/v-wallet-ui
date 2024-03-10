import {loginAction} from "./login/login.js";
import {loginForm} from "./login/elements.js";
import {logout} from "./login/logout.js";
import {menuInit} from "./menu/menu.js";
import {depositInit} from "./deposit/deposit.js";

const data = localStorage.getItem('data');

if(!data) {
  const siteData = {
    user: null,
  }
  localStorage.setItem('data', JSON.stringify(siteData));
}

const pathname = window.location.pathname.split('/').at(-1);

switch (pathname) {
  case 'login.html':
    loginAction({loginForm});
    break
  case 'menu.html':
    menuInit()
    logout();
    break;
  case 'send-money.html':
    logout();
    break;
  case 'deposit.html':
    depositInit();
    logout();
    break;
  case 'transactions.html':
    logout();
    break;
  case 'index.html':
    break;
  default:
    break;
}

