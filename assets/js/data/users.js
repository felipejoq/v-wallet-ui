export const USERS = [
  {
    name: 'Felipe',
    password: '123123',
    email: 'test@test.com',
    balance: 60000,
    transactions: [
      {
        title: 'Transferencia a terceros',
        contact_id: 1,
        total: -10000,
      },
      {
        title: 'Deposito misma cuenta',
        contact_id: 0,
        total: 15000,
      },
      {
        title: 'Transferencia de terceros',
        contact_id: 2,
        total: 1000,
      },
      {
        title: 'Compra en línea',
        contact_id: -1,
        total: -15000,
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
  }
];