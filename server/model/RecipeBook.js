//Recipe Book Class - Duncan Henry
//This class is intended for use with the Account class and to store several Personal Recipes. Users should be able to
//add recipes, remove recipes, and view recipes inside.

class RecipeBook{

    constructor(){
        this.recipes = new Array(); //Supposed to be a list/array of PersonalRecipes.
    }


    //Keep an eye on this method. An array/list of objects might be trickier than expected in react. -DH
    //Needs testing
    addRecipe(personalRecipe){
        this.recipes.push(personalRecipe);
    }


    //Needs testing
    /*I don't like the idea of scanning the entire array every time we want to remove something. I'm going to rewrite
    this in the future to utilize the recipe IDs when I get more familiar with javascript variables and how the ID
    process works -DH*/
    removeRecipe(personalRecipe) {
        for (var x = 0; x < this.recipes.length; x++) {
            if (personalRecipe.getID === this.recipes[x].getID())
            {
                this.recipes.splice(x-1, 1);
            }
        }
    }

    //May change this to print each individual recipe object, depending on how front-end wants to utilize this method.
    getRecipes() {
        return this.recipes;
    }
}