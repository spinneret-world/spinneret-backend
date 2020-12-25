const { Model } = require('objection');

class Post extends Model {
  static get tableName() {
    return 'posts';
  }

  $beforeInsert() {
    const date = new Date().toISOString()

    this.created_at = date
    this.updated_at = date
  }

  $beforeUpdate() {
    this.updated_at = new Date().toISOString()
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
      required: ['content', 'author_id'],

      properties: {
        id: { type: 'integer' },
        author_id: { type: 'integer' },
        content: { type: 'string', minLength: 1 },
        created_at: { type: 'string', minLength: 1, maxLength: 255 },
        updated_at: { type: 'string', minLength: 1, maxLength: 255 },
      }
    };
  }

  static get relationMappings() {
    const User = require('./User');

    return {
      users: {
        relation: Model.BelongsToOneRelation,
        modelClass: User,
        join: {
          from: 'posts.author_id',
          to: 'users.id'
        }
      },
    };
  }
}

module.exports = Post;
