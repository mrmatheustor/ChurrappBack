
exports.up = function(knex) {
  return knex.schema.createTable('usuarios', function(table){
    table.string('id').unique().primary();
    table.string('nome').notNullable();
    table.string('sobrenome').notNullable();
    table.string('email').unique().notNullable();
    table.string('cidade').notNullable();
    table.string('uf', 2).notNullable();
    table.date('idade').notNullable();
    table.date('joined').notNullable();
    table.string('celular').unique().notNullable();
    table.string('apelido').notNullable();
    table.string('senha').notNullable();
    table.boolean('cadastrado').defaultTo(false);
    table.string('fotoUrlU');


    //foreignKeys
    table.integer('pontoCarne_id').defaultTo(0);
    table.integer('carnePreferida_id').defaultTo(0);
    table.integer('quantidadeCome_id').defaultTo(0);
    table.integer('bebidaPreferida_id').defaultTo(0);
    table.integer('acompanhamentoPreferido_id').defaultTo(0);

    table.foreign('pontoCarne_id').references('id').inTable('pontoCarne');
    table.foreign('carnePreferida_id').references('id').inTable('tipos');
    table.foreign('bebidaPreferida_id').references('id').inTable('tipos');
    table.foreign('acompanhamentoPreferido_id').references('id').inTable('tipos');
    table.foreign('quantidadeCome_id').references('id').inTable('quantidadeCome');
  });
};

exports.down = function(knex) {
  knex.schema.dropTable('usuarios');
};
