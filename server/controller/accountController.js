const accountService = require('../service/accountService');
const Account = require('../model/Account');
const errorResponses = require('./errorResponses');

class AccountController {

    // TODO authenticate
    async getAccountById(request, response) {
        try {
            const account = await accountService.getAccount(request.params.accountId);
            account.password = null;
            response.send(account);
        } catch (e) {
            console.error(e);
            response.sendStatus(500);
        }
    }

    async createAccount(request, response) {
        try {
            const account = new Account();
            account.email = request.body.email;
            account.username = request.body.username;
            account.password = request.body.password;
            account.firstName = request.body.firstName;
            account.middleName = request.body.middleName;
            account.lastName = request.body.lastName;

            const duplicateEmail = await accountService.findByEmail(account.email);
            const duplicateUsername = await accountService.findByUsername(account.username);

            if (duplicateEmail) {
                const {status, message} = errorResponses.duplicateEmail;
                return response.status(status).send(message);
            }

            if (duplicateUsername) {
                const {status, message} = errorResponses.duplicateUsername;
                return response.status(status).send(message);
            }

            await accountService.saveAccount(account);
            response.sendStatus(200);
        } catch (e) {
            console.error(e);
            response.sendStatus(500);
        }
    }
}

module.exports = new AccountController();