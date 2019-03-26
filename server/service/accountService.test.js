const accountService = require('./accountService');
const Account = require('../model/Account');

let modal;
let table;

beforeEach(() => {
   modal = Object.assign(new Account(), {
      id: 1,
      email: 'test@test.com',
      username: 'test',
      password: 'hash',
      paymentInfo: 'paykey',
      firstName: 'Jeff',
      middleName: 'J',
      lastName: 'Jefferson',
      subscriptionLevel: 0,
      confirmed: true,
   });

   table = {
      account_id: 1,
      email: 'test@test.com',
      username: 'test',
      password: 'hash',
      payment_info: 'paykey',
      first_name: 'Jeff',
      middle_name: 'J',
      last_name: 'Jefferson',
      sub_level: 0,
      confirmed: 1,
   };
});

it('can convert table object to modal', () => {
   const output = accountService._tableToModel(table);
   expect(output).toEqual(modal);
});

it('can convert modal to table object', () => {
   const output = accountService._modelToTable(modal);
   expect(output).toEqual(table);
});