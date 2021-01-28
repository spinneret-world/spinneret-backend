exports.up = function(knex, Promise) {
  return knex.schema
    .table('orders', function(table) {
       table.boolean('is_shipped').defaultTo(false);
    });
}

exports.down = function(knex, Promise) {
  return knex.schema
    .table('orders', function(table) {
      table.dropColumn('is_shipped');
    });
    
}
