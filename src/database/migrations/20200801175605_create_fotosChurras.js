exports.up = function(knex) {
    return knex.schema.createTable('fotosChurras', function(table){
      table.increments();
      table.string('nomeImgC').notNullable();
      table.string('keyC').notNullable();
      table.string('urlC').notNullable();
    });
  };
  
  exports.down = function(knex) {
    knex.schema.dropTable('fotosChurras');
  };
  