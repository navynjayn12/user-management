// const BaseModel = require('../../database/db');

class UserModel 
// extends BaseModel 
{

    static get tableName() {
        return 'projects';
    }

    static get idColumn() {
        return 'projectId';
    }

    static get jsonSchema() {
        return {
            type: 'object',
            properties: {
                projectId: {
                    type: 'integer'
                },
                userId: {
                    type: 'string'
                },
                cid: {
                    type: 'string'
                },
                projectName: {
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
                }
            }
        };
    }
}

module.exports = UserModel;
