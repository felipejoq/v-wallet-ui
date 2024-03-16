import { TRANSACTIONS_TYPE } from "../data/users.js";
import { logout } from "../login/logout.js";
import { loading } from "../utils/loading.js";
import { navigateTo } from '../utils/navigate.js';
import { accordionContacts, addAccountContactForm, alertAddContactFail, alertInfoSendMoneyQty, contactNameLabel, modalAddContact, modalSendMoney, searchContactsInput, sendMoneyBtn, sendMoneyQtyInput, showAllContactsBtn } from "./elements.js";

export function sendMoneyInit() {
  $(alertAddContactFail).hide();
  $(showAllContactsBtn).hide();
  $(alertInfoSendMoneyQty).hide();

  logout();
  loadContacts({ contacts: getContacts() });
  accountValidations();
  searchContact();
}

function getUser() {
  const { user } = JSON.parse(localStorage.getItem('data'));
  return user;
}

function getContacts() {
  const { user: { contacts } } = JSON.parse(localStorage.getItem('data'));
  return contacts;
}

function getBalance(){
  const { user: { balance } } = JSON.parse(localStorage.getItem('data'));
  return balance;
}

function accountValidations() {
  const objetoFormulario = {};
  let isFullForm = false;

  $(addAccountContactForm).on('submit', (event) => {
    event.preventDefault();
    const contactFormData = new FormData(addAccountContactForm);

    for (const [clave, valor] of contactFormData.entries()) {
      if (!valor) {
        alertAddContactFail.style.display = 'block'
        isFullForm = false;
        break;
      } else {
        isFullForm = true;
        alertAddContactFail.style.display = 'none'
        objetoFormulario[clave] = valor;
      }
    }

    if (isFullForm) addConctact({ contact: objetoFormulario });
  });
}

function searchContact() {
  const contacts = getContacts();
  $(searchContactsInput).on('input', (event) => {
    event.preventDefault();
    const term = event.target.value;
    if (term.length > 0) {
      const contactsFinded = contacts.filter(contact => {
        return Object.values(contact).some(value => {
          return typeof value === 'string' && value.toLowerCase().includes(term);
        });
      });
      loadContacts({ contacts: contactsFinded });
      showAllContacts();
    } else {
      loadContacts({ contacts });
      $(showAllContactsBtn).hide();
    }
  });
}

function showAllContacts() {
  $(showAllContactsBtn).show();
  $(showAllContactsBtn).on('click', () => {
    loadContacts({ contacts: getContacts() });
  });
}

async function addConctact({ contact }) {

  const data = JSON.parse(localStorage.getItem('data'));

  contact.id = data.user.contacts.length + 1;

  const newContacts = [...data.user.contacts, contact];
  localStorage.setItem('data', JSON.stringify({
    user: {
      ...data.user,
      contacts: newContacts
    }
  }));

  await loading({ location: '', timeMs: 2000 });
  $(modalAddContact).modal('hide');
  loadContacts({ contacts: getContacts() });
}

function loadContacts({ contacts }) {

  let contactHTMLText = '';
  contacts.forEach(contact => {
    contactHTMLText += getContactTemplate(contact)
  });
  accordionContacts.innerHTML = contactHTMLText;

  contacts.forEach(contact => {
    const id = contact.id;
    const sendButton = document.querySelector(`button[data-contact-id="${id}"]`);
    if (sendButton) {
      sendButton.addEventListener('click', () => sendMoneyContact(id));
    }
  });
}

function sendMoneyContact(id) {
  const user = getUser();
  const { contact_name } = searchContactById({contactId: id});
  const balance = getBalance();
  contactNameLabel.innerText = `¿Cuanto dinero quieres transferir a ${contact_name}? Tu saldo es: ${balance}`;
  $(sendMoneyBtn).on('click', async () => {
    const qty = Number(sendMoneyQtyInput.value);
    if(qty > balance){
      $(alertInfoSendMoneyQty).show();
      alertInfoSendMoneyQty.innerText = 'El monto supera su saldo actual';
    } else if (qty <= 0) {
      $(alertInfoSendMoneyQty).show();
      alertInfoSendMoneyQty.innerText = 'Ingresa un monto mayor a cero';
    } else {

      const transaction = {
        title: 'Transferencia a terceros',
        contact_id: id,
        total: -qty,
        timestamp: new Date(),
        type: TRANSACTIONS_TYPE.TRANSFER
      }

      user.balance = balance - qty;
      user.transactions.unshift(transaction);

      localStorage.setItem('data', JSON.stringify({
        user,
      }));

      $(modalSendMoney).modal('hide');

      await loading({ location: 'menu.html?transfer=true', timeMs: 2000, callback: navigateTo})

    }
  });
}

function searchContactById({contactId}) {
  const contacts = getContacts();
  return contacts.find(contact => contact.id === contactId);
}

function getContactTemplate({ id, contact_name, nick_name, account_type, account_number, bank, account_email }) {
  return `
    <div class="accordion-item border">
      <h2 class="accordion-header d-flex justify-content-between">
        <button class="accordion-button collapsed fs-4" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapse${id}" aria-expanded="false" aria-controls="flush-collapseOne">
          <i class="bi bi-person-circle"></i> &nbsp ${contact_name}
        </button>
        <button data-contact-id="${id}" data-bs-target="#modal-send-money" data-bs-toggle="modal" class="btn btn-sm btn-outline-primary">
          <i class="bi bi-coin"></i> Enviar
        </button>
      </h2>
      <div id="flush-collapse${id}" class="accordion-collapse collapse" data-bs-parent="#accordionFlushExample">
        <div class="accordion-body d-flex justify-content-between">
          <div>
            <span class="badge text-bg-secondary fs-6">Alias: ${nick_name}</span>
            <strong>Tipo cuenta:</strong> ${account_type} - <strong>Nro:</strong> ${account_number} - <strong>Banco:</strong> ${bank} - <strong>Email:</strong> ${account_email}
          </div>
          <i class="bi bi-pencil-square fs-5 cursor-pointer"></i>
        </div>
      </div>
    </div>
  `
}