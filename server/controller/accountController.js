const accountService = require('../service/accountService');
const emailService = require('../service/emailService');
const Account = require('../model/Account');
const Invitation = require('../model/Invitation');
const errorResponses = require('./errorResponses');

class AccountController {

    // TODO authenticate
    async getAccountById(request, response) {
        try {
            const account = await accountService.getAccount(request.params.accountId);
            if (!account) {
                return response.sendStatus(404);
            }
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

            const validEmail = !!account.email.match(/^.+@.+\..+$/);
            const validPassword = account.password.length >= 8 && // verify length
                                !!account.password.match(/[^a-zA-Z0-9]/) && // verify at least 1 special character
                                !!account.password.match(/[A-Z]/) &&  // verify at least 1 capital letter
                                !!account.password.match(/[0-9]/);  // verify at least 1 number
            if (!validEmail || !validPassword) {
                return response.sendStatus(400);
            }

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

            const invitation = new Invitation();
            invitation.account = account;

            await accountService.saveAccount(account, invitation);
            emailService.sendInvitation(account.email, invitation.key);
            response.sendStatus(200);
        } catch (e) {
            console.error(e);
            response.sendStatus(500);
        }
    }

    async confirmAccount(request, response) {
        try {
            const invitationId = await accountService.getInviteId(request.params.invitationId);
            if (!invitationId) {
                return response.sendStatus(404);
            }
            await accountService.confirmAccount(invitationId);
            response.sendStatus(200);
        } catch (e) {
            console.error(e);
            response.sendStatus(500);
        }
    }
}

module.exports = new AccountController();