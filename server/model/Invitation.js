const uuidv4 = require('uuid/v4');

class Invitation {
    constructor() {
        this.id = null;
        this.account = null;
        this.key = uuidv4();
    }
}

module.exports = Invitation;