/**
 * Entity for Meal
 */
class Meal {
    constructor() {
        this.id = null;
        this.date = null;
        this.mealTime = null;
        this.servingsRequired = null;
        this.recipe = null; // Recipe object
        this.note = null;
    }
}

module.exports = Meal;