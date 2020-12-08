exports.up = function(knex, Promise) {
  return knex.schema
    .createTable('users', function(table) {
      table.increments('id');
      table.string('email').notNullable();
      table.string('password').notNullable();
      table.string('username').notNullable();
      table.timestamp('created_at').defaultTo(knex.fn.now())
      table.timestamp('updated_at').defaultTo(knex.fn.now())
    })
    .createTable('shows', function(table) {
      table.increments('id');
      table.string('name').notNullable();
      table.text('description').notNullable();
      table.string('embed_link').notNullable();
      table.timestamp('created_at').defaultTo(knex.fn.now())
      table.timestamp('updated_at').defaultTo(knex.fn.now())
    })
    .createTable('products', function(table) {
      table.increments('id');
      table.string('name').notNullable();
      table.text('description').notNullable();
      table.string('image_link').notNullable();
      table.string('creator').notNullable();
      table.timestamp('created_at').defaultTo(knex.fn.now())
      table.timestamp('updated_at').defaultTo(knex.fn.now())
    })
    .createTable('posts', function(table) {
      table.increments('id');
      table.text('content').notNullable();
      table.integer('author_id').notNullable().references('id').inTable('users');
      table.timestamp('created_at').defaultTo(knex.fn.now())
      table.timestamp('updated_at').defaultTo(knex.fn.now())
    });
}

exports.down = function(knex, Promise) {
  return knex.schema
    .dropTable('posts')
    .dropTable('products')
    .dropTable('shows')
    .dropTable('users');
}
