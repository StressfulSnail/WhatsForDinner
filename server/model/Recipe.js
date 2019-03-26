//Recipe class- Duncan Henry
//General class to be inherited and used by PersonalRecipe and SharedRecipe


class Recipe {

    //0 Arg constructor- may replace this with a Name-Arg constructor later.
    constructor() {
        this.id = null;                 //Replace with ID Generation later
        this.name = null;
        this.ingredientList = null;        //List<Ingredient>
        this.prepInstructions = null;
        this.prepTime = 0;
        this.cookTime = 0;
        this.caloricEstimate = 0;
        this.tasteRating = 0;
        this.difficultyRating = 0;
        this.imageURL = null;
        this.tags = null;               //List<Tag>
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
        return this.ingredientList;
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
    getImageURL(){
        return this.imageURL;
    }

    //Setters
    setID(newID){
        this.id = newID;
    }
    setName(newName) {
        this.name = newName;
    }

    //Placeholder- will likely remove this method in the future.
    setIngredients(newIngredients){
        this.ingredientList = newIngredients;
    }

    setPrepInstructions(newPrepInstructions){
        this.prepInstructions = newPrepInstructions;
    }
    setPrepTime(newPrepTime){
        this.prepTime = newPrepTime;
    }
    setCookTime(newCookTime){
        this.cookTime = newCookTime;
    }
    setCaloricEstimate(newCaloricEstimate){
        this.caloricEstimate = newCaloricEstimate;
    }
    setTasteRating(newTasteRating){
        this.tasteRating = newTasteRating;
    }
    setDifficultyRating(newDifficultyRating){
        this.difficultyRating = newDifficultyRating;
    }
    setImageURL(newImageURL){
        this.imageURL = newImageURL;
    }

    //Placeholder, will likely remove this method in the future.
    setTags(newTags){
        this.tags = newTags;
    }

}

module.exports = Recipe;