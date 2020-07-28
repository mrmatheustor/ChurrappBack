
exports.up = function(knex) {
  return knex.schema.createTable('usuarios', function(table){
    table.string('id').unique().primary();
    table.string('nome').notNullable();
    table.string('sobrenome').notNullable();
    table.string('email').unique().notNullable();
    table.string('cidade').notNullable();
    table.string('uf', 2).notNullable();
    table.integer('idade').notNullable();
    table.string('joined').notNullable();
    table.string('celular').unique().notNullable();
    table.string('apelido').notNullable();
    table.boolean('cadastrado').defaultTo(false);


    //foreignKeys
    table.integer('pontoCarne_id');
    table.integer('carnePreferida_id');
    table.integer('quantidadeCome_id');
    table.integer('bebidaPreferida_id');
    table.integer('acompanhamentoPreferido_id');
    table.integer('foto_id');

    table.foreign('pontoCarne_id').references('id').inTable('pontoCarne');
    table.foreign('carnePreferida_id').references('id').inTable('tipos');
    table.foreign('bebidaPreferida_id').references('id').inTable('tipos');
    table.foreign('acompanhamentoPreferido_id').references('id').inTable('tipos');
    table.foreign('quantidadeCome_id').references('id').inTable('quantidadeCome');
    table.foreign('foto_id').references('id').inTable('fotos');
  });
};

exports.down = function(knex) {
  knex.schema.dropTable('usuarios');
};
