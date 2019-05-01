const knex = require('../db');
const Tag = require('../model/Tag');

    class TagService {

    _tableToModel(tableObj) {
        const tag = new Tag();
        tag.setTagID(tableObj.tag_id);
        tag.setTagType(tableObj.tag_type_id);
        tag.setName(tableObj.tag_name);
    }

    _modelToTable(tagModel) {
        return {
            tag_id: tagModel.getTagID(),
            tag_type_id: tagModel.getTagType(),
            tag_name: tagModel.getName()
        }
    }

    async getTag(tagID) {
        const tags = await knex.select()
            .from('tag')
            .where({'tag_id' : tagID});

        return tags.length === 0 ? null : this._tableToModel(tags[0]);
    }

    async getTagByName(tagName) {
        const tags = await knex.select()
            .from('tag')
            .where({'tag_name' : tagName});

        return tags.length === 0 ? null : this._tableToModel(tags[0]);
    }
    }