//Ingredient class -- Duncan Henry

class Ingredient {

    constructor(){
        this.ingredient_id = 0;
        this.name = null;
    }

    getID() {
        return this.ingredient_id;
    }

    getName(){
        return this.name;
    }

    setID(newID){
        this.ingredient_id = newID;
    }

    setName(newName){
        this.name = newName;
    }
}

module.exports = Ingredient;