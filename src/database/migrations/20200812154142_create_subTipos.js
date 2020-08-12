
exports.up = function(knex) {
    return knex.schema.createTable('subTipos', function(table){
        table.increments();
        table.string('subTipo').notNullable();
    });
  
};

exports.down = function(knex) {
    return knex.schema.dropTable('subTipos');  
};
