
exports.up = function(knex) {
    return knex.schema.createTable('quantidadeCome', function(table){
        table.integer('id').primary();
        table.double('quantidade').notNullable();
        table.string('nome').notNullable();
    });
  
};

exports.down = function(knex) {
    return knex.schema.dropTable('quantidadeCome');  
};
