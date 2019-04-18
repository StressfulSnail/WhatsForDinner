const Ingredient = require('../model/Ingredient');
const MeasurementUnit = require('../model/MeasurementUnit');

class IngredientCount {

    constructor(){
        this.measurementUnit = null;
        this.measurement = 0.0;
        this.ingredient = null;
    }

    //getters

    getMeasurementUnit(){
        return this.measurementUnit;
    }

    getMeasurement(){
        return this.measurement;
    }

    getIngredient(){
        return this.ingredient;
    }

    getIngredientID() {
        return this.ingredient.ingredient_id;
    }

    getMeasurementID(){
        return this.measurementUnit.measurement_id;
    }

    //setters

    setMeasurementUnit(newMeasurementUnit){
        this.measurementUnit = new MeasurementUnit();
        this.measurementUnit = newMeasurementUnit;
        console.log(this.measurementUnit.name);
        console.log(this.measurementUnit.measurement_id);
    }

    setMeasurement(newMeasurement){
        this.measurement = newMeasurement;
    }

    setIngredient(newIngredient) {
        this.ingredient = new Ingredient();
        this.ingredient = newIngredient;
    }
}

module.exports = IngredientCount;