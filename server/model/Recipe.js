//Recipe class- Duncan Henry



class Recipe {

    constructor() {
        this.id = null;
        this.name = null;
        this.ingredients = null;
        this.prepInstructions = null;
        this.prepTime = 0;
        this.cookTime = 0;
        this.caloricEstimate = 0;
        this.tasteRating = 0;
        this.difficultyRating = 0;
        this.imageURL = null;
        this.tags = null;
    }


    //Getters
    getID(){
        return this.id;
    }

    getName(){
        return this.name;
    }


    //Keep an eye on this, it may need to change from just returning the whole list.
    getIngredients(){
        return this.ingredients;
    }

    getPrepInstructions(){
        return this.prepInstructions;
    }

    getPrepTime() {
        return this.prepTime;
    }
    getCookTime() {
        return this.cookTime;
    }
    getCaloricEstimate() {
        return this.caloricEstimate;
    }
    getTasteRating() {
        return this.tasteRating;
    }
    getDifficultyRating(){
        return this.difficultyRating;
    }

    //Setters
    setPrepTime(newPrepTime){
        this.prepTime = newPrepTime;
    }
}

module.exports = Recipe;