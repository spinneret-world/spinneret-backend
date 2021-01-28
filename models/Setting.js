const { Model } = require('objection');

class Setting extends Model {
  static get tableName() {
    return 'settings';
  }

  static get modifiers() {
    return {
      defaultSelects(query) {
         query.select('experience_mode');
      }
    }
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
      required: ['experience_mode'],

      properties: {
        id: { type: 'integer' },
        experience_mode: { type: 'boolean' },
        created_at: { type: 'string', minLength: 1, maxLength: 255 },
        updated_at: { type: 'string', minLength: 1, maxLength: 255 },
      }
    };
  }
}

module.exports = Setting;
