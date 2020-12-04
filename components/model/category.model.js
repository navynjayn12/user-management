// const BaseModel = require('../../database/db');

class CategoryModel 
// extends BaseModel 
{

    static get tableName() {
        return 'category';
    }

    static get idColumn() {
        return 'cid';
    }

    static get jsonSchema() {
        return {
            type: 'object',
            properties: {
                cid: {
                    type: 'integer'
                },
                categoryName: {
                    type: 'string'
                },
                description: {
                    type: 'string'
                },
                status: {
                    type: 'number'
                },
                createdAt: {
                    type: 'date'
                },
                updatedAt: {
                    type: 'date'
                },
            }
        };
    }
}

module.exports = CategoryModel;
