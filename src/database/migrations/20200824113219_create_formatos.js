
exports.up = function(knex) {
    return knex.schema.createTable('formatos', function(table){
        table.increments();
        table.string('formato').notNullable();
    });
  
};

exports.down = function(knex) {
    knex.schema.dropTable('formatos');  
};
