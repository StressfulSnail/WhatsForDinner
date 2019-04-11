

class IngredientCount {

    constructor(){
        this.measurementUnit = null;
        this.measurement = 0.0;
        this.Ingredient = null;
    }

    //getters

    getMeasurementUnit(){
        return this.measurementUnit;
    }

    getMeasurement(){
        return this.measurement;
    }

    getIngredient(){
        return this.Ingredient;
    }

    //setters

    setMeasurementUnit(newMeasurementUnit){
        this.measurementUnit = newMeasurementUnit;
    }

    setMeasurement(newMeasurement){
        this.measurement = newMeasurement;
    }

    setIngredient(newIngredient) {
        this.Ingredient = newIngredient;
    }
}

module.exports = IngredientCount;