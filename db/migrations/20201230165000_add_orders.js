exports.up = function(knex, Promise) {
  return knex.schema
    .createTable('orders', function(table) {
      table.increments('id');
      table.string('name').notNullable();
      table.string('email').notNullable();
      table.text('address').notNullable();
      table.text('order').notNullable();
      table.timestamp('created_at').defaultTo(knex.fn.now());
      table.timestamp('updated_at').defaultTo(knex.fn.now());
    });
}

exports.down = function(knex, Promise) {
  return knex.schema
    .dropTable('orders')
}
