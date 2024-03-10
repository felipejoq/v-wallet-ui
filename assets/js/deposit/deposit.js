import {btnDeposit, depositAmount, alertDeposit} from "./elements.js";
import {loading} from "../utils/loading.js";
import {navigateTo} from "../utils/navigate.js";

export const depositInit = () => {
  depositAmount.focus();
  btnDeposit.addEventListener('click', (event) => {
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