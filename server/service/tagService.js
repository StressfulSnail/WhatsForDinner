const knex = require('../db');
const Tag = require('../model/Tag');

class TagService {

    async _tagTableToModel(tableObj) {
        const tag = new Tag();
        tag.setTagID(tableObj.tag_id);
        tag.setTagType(await this.getTagTypeByID(tableObj.tag_type_id));
        tag.setName(tableObj.tag_name);
        return tag;
    }

    _tagModelToTable(tagModel, tagTypeID) {
        return {
            tag_id: tagModel.getTagID(),
            tag_type_id: tagTypeID,
            tag_name: tagModel.getName()
        }
    }

    _tagTypeTableToModel(tableObj) {
        const tagTypeID = tableObj.tag_type_id;

        return tagTypeID;
    }

    _tagTypeModelToTable(tagTypeName) {
        return{
            type_name : tagTypeName
        }
    }

    _tagRecipeModelToTable(tagID, recipeID) {
        return {
            recipe_id : recipeID,
            tag_id : tagID
        }
    }

    async getTag(tagID) {
        const tags = await knex.select()
            .from('tag')
            .where({'tag_id' : tagID});

        return tags.length === 0 ? null : await this._tagTableToModel(tags[0]);
    }

    async getTagByName(tagName) {
        const tags = await knex.select()
            .from('tag')
            .where({'tag_name' : tagName});

        return tags.length === 0 ? null : await this._tagTableToModel(tags[0]);
    }

    async getTagsByType(tagTypeID) {
        const tags = await knex.select()
            .from('tag')
            .where({'tag_type_id' : tagTypeID});

        return tags.length === 0 ? null : tags;
    }

    async saveTag(tag) {
        let tagTypeID = await this.getTagTypeByName(tag.getTagType());
            if(tagTypeID === 0 || tagTypeID === null)
                tagTypeID = await this.saveTagType(tag.getTagType());
        const tagData = await this._tagModelToTable(tag,tagTypeID);
        tagData.tag_id = 0;

        await knex.transaction( async(transaction) => {
            const tag_id = await transaction.insert(tagData)
                .into('tag')
                .returning('tag_id');
            tag.setTagID(tag_id);
        })
    }

        /**If you have a tagTypeID, this will return a tag type name
         *
         * @param tagTypeID
         * @returns {Promise<null>}
         */

    async getTagTypeByID(tagTypeID) {
        const tagType = await knex.select()
            .from('tag_type')
            .where( {'tag_type_id' : tagTypeID});

        return tagType.length === 0 ? null : tagType[0].type_name;
    }

        /**For use if you have a tag type name, and want to get an ID.
         * Also works to check if a tag type already exists.
         *
         * @param tagTypeName
         * @returns {Promise<*>}
         */
    async getTagTypeByName(tagTypeName) {
        const tagType = await knex.select('tag_type_id')
            .from('tag_type')
            .where({'type_name' : tagTypeName})
            .returning('tag_type_id');
        const tagTypeID = await this._tagTypeTableToModel(tagType[0]);
        return tagType.length === 0 ? null : tagTypeID;
        }

        /**
         * Returns a tagTypeID when used. It checks if the tagTypeName already exists before saving.
         * If it already exists, it returns the ID of the already existing tag type. Otherwise, it saves the tag type
         * and returns the new ID.
         * @param tagTypeName
         * @returns {Promise<number>}
         */
    async saveTagType(tagTypeName) {
        let tag_type_id = 0;
        let tagType = await this._tagTypeModelToTable(tagTypeName);
        await knex.transaction( async(transaction) => {
              tag_type_id = await transaction.insert(tagType)
                .into('tag_type')
                .returning('tag_type_id')
        });

        return tag_type_id;
    }

    async saveRecipeTag(tagID, recipeID) {
        const recipeTag = this._tagRecipeModelToTable(tagID, recipeID);
        await knex.insert(recipeTag)
            .into('recipe_tag')
    }

    async getRecipeTags(recipe) {
        const tags = await knex
            .select('*')
            .from('tag')
            .join('recipe_tag', 'tag.tag_id', '=', 'recipe_tag.tag_id')
            .where({ 'recipe_id': recipe.getID() });
        const tagsModel = await Promise.all(tags.map(tag => this._tagTableToModel(tag)));
        recipe.setTags(tagsModel);
    }
}

module.exports = new TagService();