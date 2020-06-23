
exports.up = function(knex) {
    return knex.schema.createTable('quantidadeCome', function(table){
        table.increments();
        table.double('quantidade').notNullable();
        table.string('nomeQuantidadeCome').notNullable();
    });
  
};

exports.down = function(knex) {
    return knex.schema.dropTable('quantidadeCome');  
};
