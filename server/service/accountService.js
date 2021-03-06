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

    _editToTable(editModel) {
        return {
            email: editModel.email,
            username: editModel.username,
            first_name: editModel.firstName,
            middle_name: editModel.middleName,
            last_name: editModel.lastName
        }
    }

    _passToTable(model) {
        return {
            password: model.password
        }
    }

    async getAccount(id) {
        const accounts = await knex.select()
            .from('account')
            .where({ 'account_id': id });

        return accounts.length === 0 ? null : this._tableToModel(accounts[0]);
    }

    async findByEmail(email) {
        console.log(`serivce ${email}`)
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
            const accountId = await transaction.insert(accountData)
                .into('account')
                .returning('account_id');

            await transaction.insert({
                invitation_key: invitation.key,
                account_id: accountId,
            })
                .into('account_invitation');
        });
    }

    async getInviteId(inviteKey) {
        const matchingInvites = await knex
            .select('invitation_id')
            .from('account_invitation')
            .where({ invitation_key: inviteKey })
            .limit(1);
        return matchingInvites.length === 0 ? null : matchingInvites[0].invitation_id;
    }

    async confirmAccount(inviteId) {
        await knex.transaction(async (transaction) => {
            const accountId = await transaction
                .select('account_id')
                .from('account_invitation')
                .where({ invitation_id: inviteId })
                .limit(1);

            await transaction('account_invitation').delete().where({ invitation_id: inviteId });

            await transaction('account')
                .update({ confirmed: 1 })
                .where({ account_id: accountId[0].account_id });
        });
    }

    async deleteAccount(id)
    {
        await knex.delete()
            .from('account_invitation')
            .where({ 'account_id': id }); //there is a foreign key restraint in place ( FOREIGN KEY (`account_id`) REFERENCES `account`(`account_id`)) , so do this one first.

        await knex.delete()
            .from('account')
            .where({ 'account_id': id }); //not a lot of discussion here, just do it.

    }

    async editAccount(account)
    {
        await knex.from('account')
            .where({ account_id: account.id })
            .update(this._editToTable(account));
    }

    async changePassword(account)
    {
        await knex.from('account')
            .where({ account_id: account.id })
            .update(this._passToTable(account));

    }
}

module.exports = new AccountService();