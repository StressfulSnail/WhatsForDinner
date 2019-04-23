const host = 'http://localhost:3001';

class AccountService {
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
            throw new Error('Account not authenticated!');
        }

        const json = await response.json();
        return json.token;
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