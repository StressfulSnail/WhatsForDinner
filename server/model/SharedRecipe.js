//Shared Recipe class - Duncan Henry
//This class is meant for the recipes that anybody can view.
const Recipe = require('./Recipe');

class SharedRecipe extends Recipe{

    constructor(){
        super();
        this.commentTree = new Array();
    }

    addComment(newComment) {
        this.commentTree.push(newComment);
    }

    removeComment(comment) {
        for (var x = 0; x < this.commentTree.length; x++) {
            if (this.commentTree[x].getName() === ingredientName) {
                this.ingredientList.splice(x-1, 1);
            }
        }

    }
}