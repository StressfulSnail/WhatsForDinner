const accountService = jest.requireActual('./accountService');
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

describe('account data converters', () => {
   it('can convert table object to modal', () => {
      const output = accountService._tagTableToModel(table);
      expect(output.id).toEqual(modal.id);
      expect(output.email).toEqual(modal.email);
      expect(output.username).toEqual(modal.username);
      expect(output.password).toEqual(modal.password);
      expect(output.paymentInfo).toEqual(modal.paymentInfo);
      expect(output.firstName).toEqual(modal.firstName);
      expect(output.middleName).toEqual(modal.middleName);
      expect(output.lastName).toEqual(modal.lastName);
      expect(output.subscriptionLevel).toEqual(modal.subscriptionLevel);
      expect(output.confirmed).toEqual(modal.confirmed);
   });

   it('can convert modal to table object', () => {
      const output = accountService._tagModelToTable(modal);
      expect(output).toEqual(table);
   });
});