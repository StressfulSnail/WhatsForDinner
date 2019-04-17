const jwt = require('jsonwebtoken');
const Ingredient = require('../model/Ingredient');
const ingredientService = require('../service/ingredientService');
const IngredientCount = require('../model/IngredientCount');
const MeasurementUnit = require('../model/MeasurementUnit');
//const RecipeBook = require('../model/RecipeBook');
const errorResponses = require('./errorResponses');

class ingredientController {

    async getIngredientByID(request, response) {
        try {
            const ingredient = await ingredientService.getIngredient(request.body.id);
            if (!ingredient) {
                return response.sendStatus(404);
            }
            console.log(ingredient.name);
            response.send(ingredient);
        } catch (e) {
            console.error(e);
            response.sendStatus(500);
        }
    }

    async getMeasurementByID(request, response) {
        try {
            const measurement = await ingredientService.getMeasurement(request.body.id);
            if (!measurement) {
                return response.sendStatus(404);
            }
            response.send(measurement);
        } catch (e) {
            console.error(e);
            response.sendStatus(500);
        }
    }

    async createIngredient(request, response) {
        try {
            const ingredient = new Ingredient();
            ingredient.name = request.body.name;
            const duplicateName = await ingredientService.getIngredientByName(ingredient.name);

            if(duplicateName) {
                const {status, message} = errorResponses.duplicateName;
                return response.status(status).send(message);
            }

            await ingredientService.saveIngredient(ingredient);
            response.sendStatus(200);
        } catch (e) {
            console.error(e);
            response.sendStatus(500);
        }
    }

    async createMeasurement(request, response) {
        try {
            const measurement = new MeasurementUnit();
            measurement.name = request.body.name;
            const duplicateName = await ingredientService.getMeasurementByName(measurement.name);

            if(duplicateName) {
                const {status, message} = errorResponses.duplicateName;
                return response.status(status).send(message);
            }

            await ingredientService.saveMeasurement(measurement);
            response.sendStatus(200):

        }catch (e) {
            console.error(e);
            response.sendStatus(500);
        }
    }
}

module.exports = new ingredientController();