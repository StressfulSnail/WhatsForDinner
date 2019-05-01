const knex = require('../db');
const Tag = require('../model/Tag');

    class TagService {

    _tagTableToModel(tableObj) {
        const tag = new Tag();
        tag.setTagID(tableObj.tag_id);
        tag.setTagType(tableObj.tag_type_id);
        tag.setName(tableObj.tag_name);
    }

    _tagModelToTable(tagModel) {
        return {
            tag_id: tagModel.getTagID(),
            tag_type_id: this.saveTagType(tagModel.getTagType()),
            tag_name: tagModel.getName()
        }
    }

    async getTag(tagID) {
        const tags = await knex.select()
            .from('tag')
            .where({'tag_id' : tagID});

        return tags.length === 0 ? null : this._tagTableToModel(tags[0]);
    }

    async getTagByName(tagName) {
        const tags = await knex.select()
            .from('tag')
            .where({'tag_name' : tagName});

        return tags.length === 0 ? null : this._tagTableToModel(tags[0]);
    }

    async getTagsByType(tagTypeID) {
        const tags = await knex.select()
            .from('tag')
            .where({'tag_type_id' : tagTypeID});

        return tags.length === 0 ? null : tags;
    }

    async saveTag(tag) {
        const tagData = this._tagModelToTable(tag);
        tagData.setTagID(null);

        await knex.transaction( async(transaction) => {
            const tag_id = await transaction.insert(tagData)
                .into('tag')
                .returning('tag_id');
        })

    }

    async getTagType(tagTypeName) {
        const tagType = await knex.select()
            .from('tag_type')
            .where({'tag_type_id' : tagTypeName});

        return tagType.length === 0 ? null : tagType.tag_type_id;
        }

        /**
         * Returns a tagTypeID when used. It checks if the tagTypeName already exists before saving.
         * If it already exists, it returns the ID of the already existing tag type. Otherwise, it saves the tag type
         * and returns the new ID.
         * @param tagTypeName
         * @returns {Promise<number>}
         */
    async saveTagType(tagTypeName) {
        var tag_type_id = 0;
        if (this.getTagType(tagTypeName)) {
            return this.getTagType(tagTypeName);
        }
        await knex.transaction( async(transaction) => {
              tag_type_id = await transaction.insert(tagTypeName)
                .into('tag_type')
                .returning('tag_type_id')
        })

        return tag_type_id;
    }
    }

