const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const passportJwt = require('passport-jwt');
const JwtStrategy = passportJwt.Strategy;
const ExtractJwt = passportJwt.ExtractJwt;

const Account = require('./model/Account');
const accountService = require('./service/accountService');

passport.use('local', new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password',
}, async (username, password, done) => {
    try {
        const account = await accountService.findByUsername(username);
        if (!account) {
            return done(null, false);
        }
        if (!account.verifyPassword(password)) {
            return done(null, false);
        }
        account.password = null;
        return done(null, account);
    } catch (e) {
        console.error(e);
        return done(null, false, e);
    }
}));

passport.use('jwt', new JwtStrategy({
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET,
}, (jwtPayload, done) => {
    if (!jwtPayload.account) {
        return done(null, false)
    }
    const account = new Account();
    account.id = jwtPayload.account.id;
    account.email = jwtPayload.account.email;
    account.username = jwtPayload.account.username;
    account.firstName = jwtPayload.account.firstName;
    account.middleName = jwtPayload.account.middleName;
    account.lastName = jwtPayload.account.lastName;

    done(null, account);
}));