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

    async getAccountByID(token, id) {
        const response = await fetch(`${host}/api/account`, {
            method: 'GET',
            headers: super.getHeaders(token),
            user: JSON.stringify(id)
        });

        if (!response.ok) {
            console.log('get by username failed');
            throw new Error(await response.text());

        }
        const json = await response.json();
        let item = JSON.parse(json);
        return item;
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
        let item = JSON.parse(json);
        return item;
    }

    async createAccount(username, password, email, firstName, lastName, middleName) {
        const response = await fetch(`${host}/api/account`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, email, password, firstName, lastName, middleName })
        });

        if (!response.ok) {
            throw new Error(await response.text());
        }
    }

    async editAccount(token, id, username, email, firstName, lastName, middleName) {
        const response = await fetch(`${host}/api/account/edit`, {
            method: 'POST',
            headers: super.getHeaders(token),
            body: JSON.stringify({ id, username, email, firstName, lastName, middleName })
        });

        if (!response.ok) {
            throw new Error(await response.text());
        }
    }

    async recoverAccount(email) {
        const response = await fetch(`${host}/api/account/recover`, {
            method: 'POST',
            body: JSON.stringify(email)
        });
        console.log(email)

        if (!response.ok) {
            throw new Error(await response.text());
        }
    }

    async changePassword(token, id, password) {
        const response = await fetch(`${host}/api/account/change`, {
            method: 'POST',
            headers: super.getHeaders(token),
            body: JSON.stringify({ id, password }),
        });

        if (!response.ok) {
            throw new Error(await response.text());
        }
    }

    async deleteAccount(token, id) {
        const response = await fetch(`${host}/api/account/delete`, {
            method: 'DELETE',
            headers: super.getHeaders(token),
            user: JSON.stringify(id),
        });

        if (!response.ok) {
            throw new Error(await response.text());
        }
    }
}

export default new AccountService();