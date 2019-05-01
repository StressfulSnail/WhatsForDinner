

class Tag {

    constructor(){
        this.tag_id = 0;
        this.tag_type = null;
        this.name = null;
    }

    getTagID(){
        return this.tag_id;
    }

    getTagType() {
        return this.tag_type
    }

    getName() {
        return this.name;
    }

    setTagID(newID){
        this.tag_id = newID;
    }

    setTagType(newTagType) {
        this.tag_type = newTagType;
    }

    setName(newName){
        this.name = newName;
    }
}

module.exports = Tag;