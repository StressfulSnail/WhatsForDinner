

class IngredientCount {

    constructor(){
        this.measurementUnit = null;
        this.measurement = 0.0;
    }

    //getters

    getMeasurementUnit(){
        return this.measurementUnit;
    }

    getMeasurement(){
        return this.measurement;
    }

    //setters

    setMeasurementUnit(newMeasurementUnit){
        this.measurementUnit = newMeasurementUnit;
    }

    setMeasurement(newMeasurement){
        this.measurement = newMeasurement;
    }
}