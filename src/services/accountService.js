import BaseService from './BaseService';

const host = 'http://localhost:3001';

class AccountService extends BaseService {
    /**
     * Validates account
     * @param username
     * @param password
     * @returns {Promise<string>} token
     */
    async validateAccount(username, password) {
        const response = await fetch(`${host}/api/account/validate`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password }),
        });

        if (!response.ok) {
            throw new Error(await response.text());
        }

        const json = await response.json();
        return json.token;
    }

    async getAccountByUsername(token, username) {
        const response = await fetch(`${host}/api/account/find`, {
            method: 'GET',
            headers: super.getHeaders(token),
            user: JSON.stringify(username)
        });

        if (!response.ok) {
            console.log('get by username failed');
            throw new Error(await response.text());

        }
        const json = await response.json();
        console.log(json);
        let item = JSON.parse(json);
        console.log("parsed");
        return item;
    }

    async createAccount(username, password, email, firstName, lastName, middleName) {
        const response = await fetch(`${host}/api/account`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, email, password, firstName, lastName, middleName })
        });

        if (!response.ok) {
            throw new Error('Account not created');
        }
    }
}

export default new AccountService();