import BaseService from "./BaseService";

const host = 'http://localhost:3001';

class RecipeService extends BaseService {
    async getPersonalRecipes(token) {
        const response = await fetch(`${host}/api/recipe`, {
            headers: super.getHeaders(token),
        });

        if(!response.ok) {
            throw new Error(await response.text());
        }

        return await response.json();
    }
}

export default new RecipeService();