exports.up = function(knex) {
    return knex.schema.createTable('fotos', function(table){
      table.integer('id').primary();
      table.string('nomeImg').notNullable();
      table.string('key').notNullable();
      table.string('url').notNullable();
    });
  };
  
  exports.down = function(knex) {
    knex.schema.dropTable('fotos');
  };
  