//PersonalRecipe class- Duncan Henry
//This class is meant for the recipes that an individual (and maybe their selected friends) can view.

class PersonalRecipe extends Recipe{

    constructor() {
        super();
        this.note = null;
    }

    getNote(){
        return this.note;
    }

    setNote(newNote){
        this.note = newNote;
    }

    addNote(newNote) {
        this.note += " " + newNote;
    }

    //I put this in here in case we needed users to be able to append to their currently existing notes. If you do
    //not think it is necessary feel free to remove it.
}

module.exports = PersonalRecipe;