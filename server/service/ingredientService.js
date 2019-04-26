const knex = require('../db');
const Ingredient = require('../model/Ingredient');
const IngredientCount = require('../model/IngredientCount');
const MeasurementUnit = require('../model/MeasurementUnit');

class ingredientService {

    _ingredientTableToModel(tableObj) {
        const ingredient = new Ingredient();
        ingredient.setID(tableObj.ingredient_id);
        ingredient.setName(tableObj.name);
        return ingredient;
    }


    _ingredientModelToTable(ingredientModel) {
            return {
                ingredient_id: ingredientModel.ingredient_id,
                name: ingredientModel.name
            }
    }

    _measurementTableToModel(tableObj) {
        const measurement = new MeasurementUnit();
        measurement.setID(tableObj.unit_id);
        measurement.setName(tableObj.unit_name);
        return measurement;
    }

    _measurementModelToTable(measurementModel) {
        return {
            unit_id : measurementModel.measurement_id,
            unit_name: measurementModel.name
        }
    }

    _ingredientCountTableToModel(tableObj) {
        const ingredientCount = new IngredientCount();
        ingredientCount.setIngredient(this.getIngredient(tableObj.ingredient_id));
        ingredientCount.setMeasurementUnit(this.getIngredient(tableObj.unit_id));
        ingredientCount.setMeasurement(tableObj.measurement);
        return ingredientCount;
    }

    _ingredientCountModelToTable(ingredientCountModel, recipeID) {
        return {
            recipe_id: recipeID,
            ingredient_id: ingredientCountModel.getIngredientID(),
            unit_id: ingredientCountModel.getMeasurementID(),
            measurement: ingredientCountModel.getMeasurement()
        }
    }

    async getIngredient(ingredientID) {
        const ingredients = await knex.select()
            .from('ingredient')
            .where({'ingredient_id' : ingredientID});

        console.log(ingredients[0].name);
        console.log(this._ingredientTableToModel(ingredients[0]));
        return ingredients.length === 0 ? null : this._ingredientTableToModel(ingredients[0]);
    }

    async getIngredientByName(ingredientName) {
        const ingredients = await knex.select()
            .from('ingredient')
            .where({'name' : ingredientName});

        return ingredients.length === 0 ? null : this._ingredientTableToModel(ingredients[0]);
    }

    async saveIngredient(ingredient) {
        const ingredientData = this._ingredientModelToTable(ingredient);
        ingredientData.ingredient_id = null;

        await knex.transaction( async (transaction) => {
            const ingredientID = await transaction.insert(ingredientData)
                .into('ingredient')
                .returning('ingredient_id');

            ingredient.setID(ingredientID);
        });
    }


    async getMeasurement(measurementID) {
        const measurements = await knex.select()
            .from('measurement_unit')
            .where({'unit_id': measurementID});

        return measurements.length === 0 ? null : this._measurementTableToModel(measurements[0]);
    }

    async getMeasurementByName(measurementName) {
        const measurements = await knex.select()
            .from('measurement_unit')
            .where({'unit_name' : measurementName});

        return measurements.length === 0 ? null : this._measurementTableToModel(measurements[0]);
    }

    async saveMeasurement(measurement) {
        const measurementData = this._measurementModelToTable(measurement);
        measurementData.unit_id = null;

        await knex.transaction( async(transaction) => {
            const measurementID = await transaction.insert(measurementData)
                .into('measurement_unit')
                .returning('unit_id');

            measurement.setID(measurementID);
        });
    }

    async getIngredientCount(ingredientID, measurementID, measurement) {
        const measurementUnit = await this.getMeasurement(measurementID);
        const ingredient = await this.getIngredient(ingredientID);
        const ingredientCount = new IngredientCount();

        ingredientCount.setIngredient(ingredient);
        ingredientCount.setMeasurementUnit(measurementUnit);
        ingredientCount.setMeasurement(measurement);

        return ingredientCount;
    }

    async getRecipeIngredientCounts(recipe) {
        const ingredientCounts = await knex.select()
            .from('ingredient_count')
            .where( {'recipe_id' : recipe.getID()});

        for (let x = 0; x < ingredientCounts.length; x++) {
            const ingredientCount = this._ingredientCountTableToModel(ingredientCounts[x]);
            recipe.addIngredient(ingredientCount);
        }
    }

    async getIngredientCountByName(ingredient_name, measurement_name, measurement) {
        const measurementUnit = await this.getMeasurementByName(measurement_name);
        const ingredient = await this.getIngredientByName(ingredient_name);
        const ingredientCount = new IngredientCount();

        ingredientCount.setIngredient(ingredient);
        ingredientCount.setMeasurementUnit(measurementUnit);
        ingredientCount.setMeasurement(measurement);

        return ingredientCount;
    }


    async saveIngredientCount(ingredientCount, recipeID) {
        const ingredientCountData = this._ingredientCountModelToTable(ingredientCount, recipeID);

        await knex.insert(ingredientCountData)
            .into('ingredient_count');
    }
}

module.exports = new ingredientService();