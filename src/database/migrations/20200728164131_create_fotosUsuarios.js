exports.up = function(knex) {
    return knex.schema.createTable('fotosUsuarios', function(table){
      table.increments();
      table.string('nomeImgU').notNullable();
      table.string('keyU').notNullable();
      table.string('urlU').notNullable();
    });
  };
  
  exports.down = function(knex) {
    knex.schema.dropTable('fotosUsuarios');
  };
  