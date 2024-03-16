import {btnDeposit, depositAmount, alertDeposit} from "./elements.js";
import {loading} from "../utils/loading.js";
import {navigateTo} from "../utils/navigate.js";
import { TRANSACTIONS_TYPE } from "../data/users.js";
import { logout } from "../login/logout.js";

export const depositInit = () => {
  logout();
  depositAmount.focus();
  $(btnDeposit).on('click', (event) => {
    addDeposit();
  })
}

function addDeposit() {
  const deposit = parseInt(depositAmount.value.trim());
  if (deposit <= 0 || isNaN(deposit)) {
    alertDeposit.style.display = 'block';
  } else {
    alertDeposit.style.display = 'none';
    depositAmount.value = '';
    const {user} = JSON.parse(localStorage.getItem('data'));
    const newBalance = user.balance + deposit;

    const newTransaction = {
      title: 'Deposito misma cuenta',
      total: deposit,
      timestamp: new Date(),
      type: TRANSACTIONS_TYPE.DEPOSIT
    }

    user.transactions?.unshift(newTransaction)

    localStorage.setItem('data', JSON.stringify({
      user: {
        ...user,
        balance: newBalance,
      }
    }));

    loading({
      location: '/pages/menu.html?deposit=true',
      timeMs: 2000,
      callback: navigateTo
    });
  }
}