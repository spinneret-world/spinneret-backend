exports.up = function(knex, Promise) {
  return knex.schema
    .createTable('settings', function(table) {
      table.increments('id');
      table.boolean('experience_mode').notNullable();
      table.timestamp('created_at').defaultTo(knex.fn.now());
      table.timestamp('updated_at').defaultTo(knex.fn.now());
    });
}

exports.down = function(knex, Promise) {
  return knex.schema
    .dropTable('settings')
}
