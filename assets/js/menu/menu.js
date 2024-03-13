import {balanceTitle, welcomeMessage} from "./elements.js";
import {formatNumberToClp} from "../utils/format.numbers.js";
import {capitalizeWords} from "../utils/format.strings.js";
import {toastLiveExample} from "../deposit/elements.js";

export const menuInit = () => {
  const {user: {balance, name}} = JSON.parse(localStorage.getItem('data'));
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
  const isDepositOk = params.get('deposit')
  if (isDepositOk) {
    const toastBootstrap = bootstrap.Toast.getOrCreateInstance(toastLiveExample)
    toastBootstrap.show();
  }
}