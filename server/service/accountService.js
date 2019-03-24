const knex = require('../db');
const Account = require('../model/Account');

class AccountService {

    _tableToModel(tableObj) {
        const account = new Account();
        account.id = tableObj.account_id;
        account.email = tableObj.email;
        account.username = tableObj.username;
        account.password = tableObj.password;
        account.paymentInfo = tableObj.payment_info;
        account.firstName = tableObj.first_name;
        account.middleName = tableObj.middle_name;
        account.lastName = tableObj.last_name;
        account.subscriptionLevel = tableObj.sub_level;
        account.confirmed = tableObj.confirmed === 1;
        return account;
    }

    async getAccount(id) {
        const account = await knex.select()
            .from('account')
            .where({ 'account_id': id });

        const accountModel = this._tableToModel(account[0]);
        accountModel.password = null;
        return accountModel;
    }

    async saveAccount(account) {

    }
}

module.exports = new AccountService();