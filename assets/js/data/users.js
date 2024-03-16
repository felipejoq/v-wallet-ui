import { generateRandomPastDate } from "../utils/randoms.js";

export const TRANSACTIONS_TYPE = {
  DEPOSIT: 1,
  OTHER_TRANSFER: 0,
  TRANSFER: -2,
  BUY: -1,
}

export const USERS = [
  {
    name: 'Felipe',
    password: '123123',
    email: 'test@test.com',
    balance: 60000,
    logged: false,
    transactions: [
      {
        title: 'Transferencia a terceros',
        contact_id: 1,
        total: -10000,
        type: TRANSACTIONS_TYPE.TRANSFER,
        timestamp: generateRandomPastDate()
      },
      {
        title: 'Deposito misma cuenta',
        contact_id: 0,
        total: 15000,
        type: TRANSACTIONS_TYPE.DEPOSIT,
        timestamp: generateRandomPastDate()
      },
      {
        title: 'Transferencia de terceros',
        contact_id: 2,
        total: 1000,
        type: TRANSACTIONS_TYPE.OTHER_TRANSFER,
        timestamp: generateRandomPastDate()
      },
      {
        title: 'Compra en línea',
        contact_id: -1,
        total: -15000,
        type: TRANSACTIONS_TYPE.BUY,
        timestamp: generateRandomPastDate()
      }
    ],
    contacts: [
      {
        id: 1,
        contact_name: 'John Doe',
        nick_name: 'john.doe',
        account_number: 123456789,
        account_type: 'cuenta corriente',
        bank: 'ABC Bank',
        account_email: 'john@test.com'
      },
      {
        id: 2,
        contact_name: 'Jane Smith',
        nick_name: 'jane.smith',
        account_number: 987654321,
        account_type: 'cuenta de ahorros',
        bank: 'XYZ Bank',
        account_email: 'jane@test.com'
      }
    ]
  },
  {
    name: 'Isaura',
    password: '123123',
    email: 'isaura@test.com',
    balance: 75000,
    logged: false,
    transactions: [
      {
        title: 'Transferencia a terceros',
        contact_id: 0,
        total: -20000,
        type: TRANSACTIONS_TYPE.TRANSFER,
        timestamp: generateRandomPastDate()
      },
      {
        title: 'Depósito misma cuenta',
        contact_id: 1,
        total: 20000,
        type: TRANSACTIONS_TYPE.DEPOSIT,
        timestamp: generateRandomPastDate()
      },
      {
        title: 'Compra en línea',
        contact_id: -1,
        total: -10000,
        type: TRANSACTIONS_TYPE.BUY,
        timestamp: generateRandomPastDate()
      }
    ],
    contacts: [
      {
        id: 0,
        contact_name: 'Maria Martinez',
        nick_name: 'maria.martinez',
        account_number: 111111111,
        account_type: 'cuenta de ahorros',
        bank: 'XYZ Bank',
        account_email: 'maria@test.com'
      }
    ]
  },
  {
    name: 'Cesar',
    password: '123123',
    email: 'cesar@test.com',
    balance: 50000,
    logged: false,
    transactions: [
      {
        title: 'Compra en línea',
        contact_id: -1,
        total: -20000,
        type: TRANSACTIONS_TYPE.BUY,
        timestamp: generateRandomPastDate()
      },
      {
        title: 'Transferencia a terceros',
        contact_id: 1,
        total: -10000,
        type: TRANSACTIONS_TYPE.TRANSFER,
        timestamp: generateRandomPastDate()
      },
      {
        title: 'Depósito misma cuenta',
        contact_id: 2,
        total: 15000,
        type: TRANSACTIONS_TYPE.DEPOSIT,
        timestamp: generateRandomPastDate()
      }
    ],
    contacts: [
      {
        id: 1,
        contact_name: 'John Smith',
        nick_name: 'john.smith',
        account_number: 123456789,
        account_type: 'cuenta corriente',
        bank: 'ABC Bank',
        account_email: 'john@example.com'
      },
      {
        id: 2,
        contact_name: 'Jane Doe',
        nick_name: 'jane.doe',
        account_number: 987654321,
        account_type: 'cuenta de ahorros',
        bank: 'XYZ Bank',
        account_email: 'jane@example.com'
      }
    ]
  }
];