import { TRANSACTIONS_TYPE } from "../data/users.js";
import { logout } from "../login/logout.js";
import { formatDate } from "../utils/format.dates.js";
import { formatNumberToClp } from "../utils/format.numbers.js";
import { transactionsContainerUl } from "./elements.js"

export function transactionsInit(){
  logout();
  loadTransactions();
}

function getTransactions() {
  const { user: { transactions, contacts } } = JSON.parse(localStorage.getItem('data'));
  
  return transactions.map(transaction => {
    contacts.forEach(contact => {
      if(transaction.contact_id && transaction.contact_id === contact.id){
        delete transaction.contact_id;
        transaction.contact = contact;
      }
    });
    return transaction;
  });
}

function loadTransactions() {
  const transactions = getTransactions();
  let transactionsFinalTemplate = '';
  transactions.forEach(transaction => {
    transactionsFinalTemplate += getTransactionTemplate({ transaction })
  });

  transactionsContainerUl.innerHTML = transactionsFinalTemplate;
}

function getTransactionTemplate({transaction}) {

  const { contact, type, total, title, timestamp } = transaction;

  const transferStringWithContact = `
  <p>
    <small>
      Contacto: ${contact?.contact_name} (${contact?.account_email}) <br />
      Fecha: ${ formatDate({date: timestamp}) }
    </small>
  </p>
  `

  const transferStringBuy = `
  <p><small>Fecha: ${ formatDate({date: timestamp}) }</small></p>
  `;

  return `
  <li class="list-group-item fs-5 d-flex justify-content-between">
    <div>
      <p>${ title } &nbsp;&nbsp; <span class="${ type < 0 ? 'text-danger' : 'text-success' }">${formatNumberToClp({value: total})}</span></p>
      ${ contact ? transferStringWithContact : (type === TRANSACTIONS_TYPE.BUY) ? transferStringBuy : '' }
    </div>
    <i class="bi bi-eye text-secondary cursor-pointer"></i>
  </li>
  `;
}