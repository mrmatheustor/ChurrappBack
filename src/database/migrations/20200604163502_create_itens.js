
exports.up = function(knex) {
  return knex.schema.createTable('itens', function(table){
    table.increments();
    table.string('nomeItem').notNullable();
    table.string('descricao');
    table.double('precoMedio');

    //foreingKeys
    table.integer('tipo_id').notNullable();
    table.integer('unidade_id').notNullable();
    table.integer('foto_id');

    table.foreign('tipo_id').references('id').inTable('tipos');
    table.foreign('unidade_id').references('id').inTable('unidades');
    table.foreign('foto_id').references('id').inTable('fotosItens');
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('itens');
};
