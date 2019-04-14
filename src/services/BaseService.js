
export default class BaseService {
    getHeaders(token) {
        return {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
        }
    }
}