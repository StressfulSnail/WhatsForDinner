import BaseService from "./BaseService";

const dummyRecipes = [
    { id: 1, name: 'Billys Grape Juice', cookTime: 50, prepTime: 23, caloricEstimate: 1400, tasteRating: 5, difficultyRating: 2, ingredientCount: [ { measurementUnit: 'whole', measurementCount: 3, ingredientName: 'Grape' }, { measurementUnit: 'cups', measurementCount: 16, ingredientName: 'Sugar' } ]},
    { id: 2, name: 'Cat Food', cookTime: 4, prepTime: 54, caloricEstimate: 300, tasteRating: 5, difficultyRating: 4, ingredientCount: [ { measurementUnit: 'whole', measurementCount: 3, ingredientName: 'Grape' }, { measurementUnit: 'cups', measurementCount: 16, ingredientName: 'Sugar' } ]},
    { id: 3, name: 'Llama Steak', cookTime: 3, prepTime: 32, caloricEstimate: 45, tasteRating: 2, difficultyRating: 3, ingredientCount: [ { measurementUnit: 'whole', measurementCount: 3, ingredientName: 'Grape' }, { measurementUnit: 'cups', measurementCount: 16, ingredientName: 'Sugar' } ]},
    { id: 4, name: 'REeeeEEeEEeE Mellons', cookTime: 2, prepTime: 12, caloricEstimate: 342, tasteRating: 5, difficultyRating: 5, ingredientCount: [ { measurementUnit: 'whole', measurementCount: 3, ingredientName: 'Grape' }, { measurementUnit: 'cups', measurementCount: 16, ingredientName: 'Sugar' } ]},
    { id: 5, name: 'sandwich', cookTime: 5, prepTime: 23, caloricEstimate: 766, tasteRating: 5, difficultyRating: 1, ingredientCount: [ { measurementUnit: 'whole', measurementCount: 3, ingredientName: 'Grape' }, { measurementUnit: 'cups', measurementCount: 16, ingredientName: 'Sugar' } ]},
    { id: 6, name: 'Backflip Buffalo Sauce', cookTime: 2, prepTime: 54, caloricEstimate: 900, tasteRating: 5, difficultyRating: 1, ingredientCount: [ { measurementUnit: 'whole', measurementCount: 3, ingredientName: 'Grape' }, { measurementUnit: 'cups', measurementCount: 16, ingredientName: 'Sugar' } ]},
];

class RecipeService extends BaseService {
    async getPersonalRecipes(token) {
        return dummyRecipes;
    }
}

export default new RecipeService();