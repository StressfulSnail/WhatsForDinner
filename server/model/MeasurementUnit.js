

class MeasurementUnit {

    constructor() {
        this.measurement_id = null;
        this.name = null;
    }

    getID(){
        return this.measurement_id;
    }

    getName() {
        return this.name;
    }

    setID(newID) {
        this.measurement_id = newID;
    }

    setName(newName) {
        this.name = newName;
    }
}

module.exports = new MeasurementUnit();