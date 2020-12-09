const Password = require('objection-password')();
const { Model } = require('objection');

class User extends Password(Model) {
  static get tableName() {
    return 'users';
  }

  async $beforeInsert() {
    await super.$beforeInsert();

    const date = new Date().toISOString();
    this.created_at = date
    this.updated_at = date
  }

  async $beforeUpdate() {
    await super.$beforeUpdate();

    this.updated_at = new Date().toISOString();
  }

  $parseJson(json, opt) {
    Object.keys(json).forEach(key => {
      if (!(key in this.constructor.jsonSchema.properties)) {
        delete json[key];
      }
    });

    return super.$parseJson(json, opt);
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['username', 'email', 'password'],

      properties: {
        id: { type: 'integer' },
        email: { type: 'string', minLength: 1, maxLength: 255 },
        password: { type: 'string', minLength: 1, maxLength: 255 },
        username: { type: 'string', minLength: 1, maxLength: 255 },
        created_at: { type: 'string', minLength: 1, maxLength: 255 },
        updated_at: { type: 'string', minLength: 1, maxLength: 255 },
      }
    };
  }

  static get relationMappings() {
    const Post = require('./Post');

    return {
      posts: {
        relation: Model.HasManyRelation,
        modelClass: Post,
        join: {
          from: 'users.id',
          to: 'posts.author_id'
        }
      },
    };
  }
}

module.exports = User;
