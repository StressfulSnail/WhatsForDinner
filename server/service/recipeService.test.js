const recipeService = jest.requireActual('./recipeService');
const Recipe = require('../model/Recipe');

let modal;
let table;

beforeEach(() => {
    modal = Object.assign(new Recipe(), {
        recipe_id: 1,
        name: 'Granny Creams Hot Butter Iced Cream',
        imageURL: 'test',
        prepInstructions: 'Take the hot butter, mix it with the iced cream. Freeze it up cool, you can see it on your screen!',
        prepTime: 10,
        cookTime: 5,
        caloricEstimate: 2000,
        tasteRating: 1,
        difficultyRating: 1,
    });

    table = {
        recipe_id: 1,
        name: 'Granny Creams Hot Butter Iced Cream',
        imageURL: 'test',
        prepInstructions: 'Take the hot butter, mix it with the iced cream. Freeze it up cool, you can see it on your screen!',
        prepTime: 10,
        cookTime: 5,
        caloricEstimate: 2000,
        tasteRating: 1,
        difficultyRating: 1,
    };
});

describe('Recipe data converters', () => {
    it('can convert table object to modal', () => {
        const output = recipeService._recipeTableToModel(table);
        expect(output.recipe_id).toEqual(modal.recipe_id);
        expect(output.name).toEqual(modal.name);
        expect(output.imageURL).toEqual(modal.imageURL);
        expect(output.prepInstructions).toEqual(modal.prepInstructions);
        expect(output.prepTime).toEqual(modal.prepTime);
        expect(output.cookTime).toEqual(modal.cookTime);
        expect(output.caloricEstimate).toEqual(modal.caloricEstimate);
        expect(output.tasteRating).toEqual(modal.tasteRating);
        expect(output.difficultyRating).toEqual(modal.difficultyRating);
    });

    it('can convert modal to table object', () => {
        const output = recipeService._recipeModelToTable(modal);
        expect(output).toEqual(table);
    });
});