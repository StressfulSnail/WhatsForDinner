//Shared Recipe class - Duncan Henry
//This class is meant for the recipes that anybody can view.
const Recipe = require('./Recipe');

class SharedRecipe extends Recipe{

    constructor(){
        super();
        this.commentTree = null;
    }
}