import { loading } from "../utils/loading.js";
import { accordionContacts, addAccountContactForm, alertAddContactFail, modalAddContact } from "./elements.js";

export function sendMoneyInit() {
  alertAddContactFail.style.display = 'none'
  loadContacts();
  accountValidations();
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

function addConctact({ contact }) {

  const data = JSON.parse(localStorage.getItem('data'));

  contact.id = data.user.contacts.length + 1;

  const newContacts = [...data.user.contacts, contact];
  localStorage.setItem('data', JSON.stringify({
    user: {
      ...data.user,
      contacts: newContacts
    }
  }));

  loading({location: '', timeMs: 2000});
  $(modalAddContact).modal('hide');
  loadContacts();
}

function loadContacts() {
  const { user: { contacts } } = JSON.parse(localStorage.getItem('data'));
  let contactHTMLText = '';
  contacts.forEach(contact => {
    contactHTMLText += getContactTemplate(contact)
  });
  accordionContacts.innerHTML = contactHTMLText;
}

function getContactTemplate({ id, contact_name, nick_name, account_type, account_number, bank, account_email }) {
  return `
    <div class="accordion-item border">
      <h2 class="accordion-header">
        <button class="accordion-button collapsed fs-4" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapse${id}" aria-expanded="false" aria-controls="flush-collapseOne">
          <i class="bi bi-person-circle"></i> &nbsp ${contact_name}
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