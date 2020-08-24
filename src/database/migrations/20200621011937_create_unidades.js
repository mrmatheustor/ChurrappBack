
exports.up = function(knex) {
    return knex.schema.createTable('unidades', function(table){
        table.increments();
        table.string('unidade').notNullable();
    });
  
};

exports.down = function(knex) {
    knex.schema.dropTable('unidades');  
};
