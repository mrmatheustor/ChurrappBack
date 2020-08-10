
exports.up = function(knex) {
  return knex.schema.createTable('itens', function(table){
    table.increments();
    table.string('nomeItem').notNullable();
    table.string('descricao');
    table.double('precoMedio');
    table.integer('fotoUrlI');

    //foreingKeys
    table.integer('tipo_id').notNullable();
    table.integer('unidade_id').notNullable();

    table.foreign('tipo_id').references('id').inTable('tipos');
    table.foreign('unidade_id').references('id').inTable('unidades');
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('itens');
};
