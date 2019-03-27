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

    _modelToTable(accountModel) {
        return {
            account_id: accountModel.id,
            email: accountModel.email,
            username: accountModel.username,
            password: accountModel.password,
            payment_info: accountModel.paymentInfo,
            first_name: accountModel.firstName,
            middle_name: accountModel.middleName,
            last_name: accountModel.lastName,
            sub_level: accountModel.subscriptionLevel,
            confirmed: accountModel.confirmed ? 1 : 0,
        }
    }

    async getAccount(id) {
        const accounts = await knex.select()
            .from('account')
            .where({ 'account_id': id });

        return accounts.length === 0 ? null : this._tableToModel(accounts[0]);
    }

    async findByEmail(email) {
        const accounts = await knex.select()
            .from('account')
            .where({ 'email': email });
        return accounts.length === 0 ? null : this._tableToModel(accounts[0]);
    }

    async findByUsername(username) {
        const accounts = await knex.select()
            .from('account')
            .where({ 'username': username });
        return accounts.length === 0 ? null : this._tableToModel(accounts[0]);
    }

    async saveAccount(account, invitation) {
        const accountData = this._modelToTable(account);
        accountData.account_id = null;

        await knex.transaction(async (transaction) => {
            const accountId = await transaction.insert({
                ...accountData,
                created_on: knex.fn.now(),
                modified_on: knex.fn.now(),
            })
                .into('account')
                .returning('account_id');

            await transaction.insert({
                invitation_key: invitation.key,
                account_id: accountId,
                created_on: knex.fn.now(),
                modified_on: knex.fn.now(),
            })
                .into('account_invitation');
        });
    }
}

module.exports = new AccountService();