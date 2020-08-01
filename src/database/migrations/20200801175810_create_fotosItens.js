exports.up = function(knex) {
    return knex.schema.createTable('fotosItens', function(table){
      table.increments();
      table.string('nomeImgI').notNullable();
      table.string('keyI').notNullable();
      table.string('urlI').notNullable();
    });
  };
  
  exports.down = function(knex) {
    knex.schema.dropTable('fotosItens');
  };
  