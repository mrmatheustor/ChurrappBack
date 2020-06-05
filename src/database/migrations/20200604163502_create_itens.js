
exports.up = function(knex) {
  return knex.schema.createTable('itens', function(table){
    table.increments().primary();

    table.string('nomeItem').notNullable();
    table.string('descricao');
    table.string('unidade').notNullable();

  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('itens');
};
