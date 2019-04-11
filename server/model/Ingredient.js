//Ingredient class -- Duncan Henry
//Unsure as to how this relates to IngredientCount and Recipe.

class Ingredient {

    constructor(){
        this.ingredient_ID = null;
        this.name = null;
    }

    getID() {
        return this.ingredient_ID;
    }

    getName(){
        return this.name;
    }

    setID(newID){
        this.ingredient_ID = newID;
    }

    setName(newName){
        this.name = newName;
    }
}

module.exports = Ingredient;