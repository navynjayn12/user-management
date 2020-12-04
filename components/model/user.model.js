// const BaseModel = require('../../database/db');

class UserModel 
// extends BaseModel 
{

    static get tableName() {
        return 'users';
    }

    static get idColumn() {
        return 'userId';
    }

    static get jsonSchema() {
        return {
            type: 'object',
            properties: {
                userId: {
                    type: 'integer'
                },
                firstname: {
                    type: 'string'
                },
                lastname: {
                    type: 'string'
                },
                email: {
                    type: 'string'
                },
                userName: {
                    type: 'string'
                },
                password: {
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

module.exports = UserModel;
