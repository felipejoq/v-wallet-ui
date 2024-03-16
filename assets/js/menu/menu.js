import {balanceTitle, welcomeMessage} from "./elements.js";
import {formatNumberToClp} from "../utils/format.numbers.js";
import {capitalizeWords} from "../utils/format.strings.js";
import {toastLiveExample, toastLiveTransfer} from "../deposit/elements.js";
import { logout } from "../login/logout.js";

export const menuInit = () => {
  const {user: {balance, name}} = JSON.parse(localStorage.getItem('data'));
  logout();
  changeWelcomeMessage({userName: name});
  changeBalance({balance});
  showToastDeposit();
}

function changeBalance({balance}) {
  const formatCurrency = formatNumberToClp({value: balance})
  balanceTitle.innerText = `${formatCurrency} CLP`;
}

function changeWelcomeMessage({userName}) {
  const formatUserName = capitalizeWords({str: userName});
  welcomeMessage.innerText = `¡Hola ${formatUserName}!`
}

function showToastDeposit() {
  const params = new URLSearchParams(document.location.search);
  const isDepositOk = params.get('deposit');
  const isTransferOk = params.get('transfer');

  if (isDepositOk) {
    const toastBootstrap1 = bootstrap.Toast.getOrCreateInstance(toastLiveExample)
    toastBootstrap1.show();
  } else if (isTransferOk){
    const toastBootstrap2 = bootstrap.Toast.getOrCreateInstance(toastLiveTransfer)
    toastBootstrap2.show();
  }
}