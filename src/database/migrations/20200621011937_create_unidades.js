
exports.up = function(knex) {
    return knex.schema.createTable('unidades', function(table){
        table.integer('id').primary();
        table.string('unidade').notNullable();
    });
  
};

exports.down = function(knex) {
    return knex.schema.dropTable('unidades');  
};
