const knex = require('../db');
const Ingredient = require('../model/Ingredient');
const MeasurementUnit = require('../model/MeasurementUnit');

class ingredientService {

    _ingredientTableToModel(tableObj) {
        const ingredient = new Ingredient();
        ingredient.setID(tableObj.ingredient_id);
        ingredient.setName(tableObj.name);
        return ingredient;
    }

    _measurementTableToModel(tableObj) {
        const measurement = new MeasurementUnit();
        measurement.setID(tableObj.unit_id);
        measurement.setName(tableObj.unit_name);
        return measurement;
    }


    _ingredientModelToTable(ingredientModel) {
            return {
                ingredient_id: ingredientModel.ingredient_id,
                name: ingredientModel.name
            }
    }

    _measurementModelToTable(measurementModel) {
        return {
            unit_id : measurementModel.measurement_id,
            unit_name: measurementModel.name
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

    async getMeasurement(measurementID) {
        const measurements = await knex.select()
            .from('measurement_unit')
            .where({'unit_id': measurementID});

        return measurements.length === 0 ? null : this._measurementTableToModel(measurements[0]);
    }

    async getIngredientByName(ingredientName) {
        const ingredients = await knex.select()
            .from('ingredient')
            .where({'name' : ingredientName});

        return ingredients.length === 0 ? null : this._ingredientTableToModel(ingredients[0]);
    }

    async getMeasurementByName(measurementName) {
        const measurements = await knex.select()
            .from('measurement_unit')
            .where({'unit_name' : measurementName});

        return measurements.length === 0 ? null : this._ingredientTableToModel(measurements[0]);
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

    async saveMeasurement(measurement) {
        const measurementData = this._measurementModelToTable(measurement);
        measurementData.unit_id = null;

        await knex.transaction( async(transaction) => {
            const measurementID = await transaction.insert(measurementData)
                .int('measurement_unit')
                .returning('unit_id');

            measurement.setID(measurementID);
        });
    }
}

module.exports = new ingredientService();