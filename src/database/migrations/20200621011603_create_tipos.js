
exports.up = function(knex) {
    return knex.schema.createTable('tipos', function(table){
        table.increments();
        table.string('tipo').notNullable();
        table.integer('subTipo').notNullable();
    });
  
};

exports.down = function(knex) {
    return knex.schema.dropTable('tipos');  
};
