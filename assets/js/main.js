import { loginAction } from "./login/login.js";
import { loginForm } from "./login/elements.js";
import { logout } from "./login/logout.js";
import { menuInit } from "./menu/menu.js";
import { depositInit } from "./deposit/deposit.js";
import { sendMoneyInit } from "./send-money/send-money.js";
import { transactionsInit } from "./transactions/transactions.js";
import { homeInit } from "./home/home.js";
import { authGuard, isLoggedUser, setInitData } from "./login/auth.guard.js";

setInitData();

const pathname = window.location.pathname.split('/').at(-1);

switch (pathname) {
  case 'login.html':
    loginAction({ loginForm });
    break
  case 'menu.html':
    authGuard();
    if(isLoggedUser()) {
      menuInit();
    }
    break;
  case 'send-money.html':
    authGuard();
    if(isLoggedUser()) {
      sendMoneyInit();
    }
    break;
  case 'deposit.html':
    authGuard();
    if(isLoggedUser()) {
      depositInit();
    }
    break;
  case 'transactions.html':
    authGuard();
    if(isLoggedUser()) {
      transactionsInit();
    }
    break;
  case 'index.html':
    homeInit();
    break;
  default:
    break;
}

