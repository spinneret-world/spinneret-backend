const { Model } = require('objection');

class Order extends Model {
  static get tableName() {
    return 'orders';
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
      required: ['name', 'email', 'address', 'order'],

      properties: {
        id: { type: 'integer' },
        name: { type: 'string', minLength: 1, maxLength: 255 },
        email: { type: 'string', minLength: 1 },
        address: { type: 'string', minLength: 1 },
        order: { type: 'string', minLength: 1 },
        created_at: { type: 'string', minLength: 1, maxLength: 255 },
        updated_at: { type: 'string', minLength: 1, maxLength: 255 },
      }
    };
  }
}

module.exports = Order;
