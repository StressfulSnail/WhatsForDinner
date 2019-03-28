const passport = require('passport');
const jwt = require('jsonwebtoken');
const accountService = require('../service/accountService');
const emailService = require('../service/emailService');
const Account = require('../model/Account');
const Invitation = require('../model/Invitation');
const errorResponses = require('./errorResponses');

class AccountController {

    async getAccountById(request, response) {
        try {
            const account = await accountService.getAccount(request.user.id);
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
            const email = request.body.email;
            const password = request.body.password;

            const validEmail = !!email.match(/^.+@.+\..+$/);
            const validPassword = password.length >= 8 && // verify length
                                !!password.match(/[^a-zA-Z0-9]/) && // verify at least 1 special character
                                !!password.match(/[A-Z]/) &&  // verify at least 1 capital letter
                                !!password.match(/[0-9]/);  // verify at least 1 number
            if (!validEmail || !validPassword) {
                return response.sendStatus(400);
            }

            const account = new Account();
            account.email = request.body.email;
            account.username = request.body.username;
            account.firstName = request.body.firstName;
            account.middleName = request.body.middleName;
            account.lastName = request.body.lastName;
            account.setHashedPassword(request.body.password);

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

    async validateUser(request, response, done) {
        passport.authenticate('local', { session: false }, (err, account) => {
            if (err || !account) {
                return response.sendStatus(400);
            }

            request.login(account, { session: false }, (err) => {
                if (err) {
                    console.error(err);
                    return response.sendStatus(500);
                }

                const token = jwt.sign({ account } , process.env.JWT_SECRET);
                return response.json({ token });
            });
        })(request, response, done);
    }
}

module.exports = new AccountController();