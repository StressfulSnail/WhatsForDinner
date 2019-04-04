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
}

export default new AccountService();