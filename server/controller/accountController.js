const accountService = require('../service/accountService');

class AccountController {

    // TODO authenticate
    async getAccountById(request, response) {
        response.send(await accountService.getAccount(request.params.accountId));
    }

    async createAccount(request, response) {
        response.send('account created (in theory)');
    }
}

module.exports = new AccountController();