const bcrypt = require('bcryptjs');

class Account {

    constructor() {
        this.id = null;
        this.email = null;
        this.username = null;
        this._password = null;
        this.paymentInfo = null;
        this.firstName = null;
        this.middleName = null;
        this.lastName = null;
        this.subscriptionLevel = 0;
        this.confirmed = false;
    }

    get password() {
        return this._password;
    }

    set password(password) {
        this._password = password;
    }

    setHashedPassword(password) {
        this._password = bcrypt.hashSync(password, 10);
    }

    verifyPassword(password) {
        return bcrypt.compareSync(password, this._password);
    }
}

module.exports = Account;