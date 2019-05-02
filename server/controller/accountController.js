const passport = require('passport');
const jwt = require('jsonwebtoken');
const uuidv4 = require('uuid/v4');
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
                const { status, message } = errorResponses.accountNotFound;
                return response.status(status).send(message);  //404 means we can't find it!
            }
            account.password = "";
            const json = JSON.stringify(account, (key, value) => {
                if (value === null) {
                    return "";
                }
                return value;
            });
            return response.json(json);
        } catch (e) {
            console.error(e);
            const { status, message } = errorResponses.serverError;
            return response.status(status).send(message);
        }
    }

    async getAccountByUserName(request, response) {
        try {
            const account = await accountService.findByUsername(request.user.username);
            if (!account) {
                const { status, message } = errorResponses.cantFindUsername;
                return response.status(status).send(message);
            }
            account.password = "";
            const json = JSON.stringify(account, (key, value) => {
                if (value === null) {
                    return "";
                }
                return value;
            });
            return response.json(json);
        } catch (e) {
            console.error(e);
            const { status, message } = errorResponses.serverError;
            return response.status(status).send(message);
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
            const { status, message } = errorResponses.serverError;
            return response.status(status).send(message);
        }
    }

    async confirmAccount(request, response) {
        try {
            const invitationId = await accountService.getInviteId(request.params.invitationId);
            if (!invitationId) {
                return response.sendStatus(404);
            }
            await accountService.confirmAccount(invitationId);
            response.redirect('/');
        } catch (e) {
            console.error(e);
            const { status, message } = errorResponses.serverError;
            return response.status(status).send(message);
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

    async recoverUser(request, response) {
        try {
            console.log("start recover")
            const account = await accountService.findByEmail(request.body.email);

            if (!account) {
                const { status, message } = errorResponses.accountNotFound;
                return response.status(status).send(message);  //404 means we can't find it!
            }

            const newPassword = uuidv4(); // generate random password
            account.setHashedPassword(newPassword);
            await accountService.editAccount(account);
            emailService.sendRecovery(account.email, newPassword);

            console.log("emailed");

            return response.sendStatus(200);
        } catch (e) {
            console.error(e);
            const { status, message } = errorResponses.serverError;
            return response.status(status).send(message);
        }
    }

    async deleteAccount(request, response) {
        try {
            const account = await accountService.getAccount(request.user.id);
            if (!account)
            {
                const { status, message } = errorResponses.accountNotFound;
                return response.status(status).send(message);  //404 means we can't find it!
            }
            await accountService.deleteAccount(account.id);
            response.sendStatus(200); //200 is OK!
        } catch (e) {
            console.error(e);
            const { status, message } = errorResponses.serverError;
            return response.status(status).send(message);
        }
    }

    async editAccount(request, response)
    {
        try {

            const account = await accountService.getAccount(request.user.id);
            if (!account)
                {
                    const { status, message } = errorResponses.accountNotFound;
                    return response.sendStatus(status).send(message);  //404 means we dcan't find it!
                }


            account.id = request.user.id;
            account.email = request.body.email;
            account.username = request.body.username;
            account.firstName = request.body.firstName;
            account.middleName = request.body.middleName;
            account.lastName = request.body.lastName;

            const duplicateEmail = await accountService.findByEmail(account.email);
            const duplicateUsername = await accountService.findByUsername(account.username);

            if (duplicateEmail && (duplicateEmail.id !== account.id))
                {
                const {status, message} = errorResponses.duplicateEmail;
                return response.status(status).send(message);
                }

            if (duplicateUsername && (duplicateUsername.id !== account.id))
                {
                const {status, message} = errorResponses.duplicateUsername;
                return response.status(status).send(message);
                }

            await accountService.editAccount(account);
            response.sendStatus(200);
        }
        catch (e)
        {
            console.error(e);
            const { status, message } = errorResponses.serverError;
            return response.status(status).send(message);
        }
    }

    async changePassword(request, response)
    {
        try {

            const account = await accountService.getAccount(request.body.id);
            if (!account)
            {
                const { status, message } = errorResponses.accountNotFound;
                return response.status(status).send(message);  //404 means we can't find it!
            }

            account.id = request.body.id;
            account.setHashedPassword(request.body.password);

            await accountService.changePassword(account);
            response.sendStatus(200);
        }
        catch (e)
        {
            console.error(e);
            const { status, message } = errorResponses.serverError;
            return response.status(status).send(message);
        }
    }

}

module.exports = new AccountController();