
exports.up = function(knex) {
    return knex.schema.createTable('tipos', function(table){
        table.integer('id').primary();
        table.string('tipo').notNullable();
    });
  
};

exports.down = function(knex) {
    return knex.schema.dropTable('tipos');  
};
