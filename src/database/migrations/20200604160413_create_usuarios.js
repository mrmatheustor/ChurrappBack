
exports.up = function(knex) {
  return knex.schema.createTable('usuarios', function(table){
    table.string('id').primary();
    table.string('nome').notNullable();
    table.string('email').notNullable();
    table.string('cidade').notNullable();
    table.string('uf', 2).notNullable();
    table.integer('idade').notNullable();
    table.string('pontoCarne');
    table.string('carnePreferida');
    table.integer('quantidadeCome');
    table.string('bebidaFavorita');
    table.string('acompanhamentoFavorito');

  });
};

exports.down = function(knex) {
  knex.schema.dropTable('usuarios');
};
