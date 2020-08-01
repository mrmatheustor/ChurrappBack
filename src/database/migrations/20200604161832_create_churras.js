
exports.up = function(knex) {
  return knex.schema.createTable('churras', function(table){
    table.string('id').primary();
    table.string('nomeChurras').notNullable();
    table.string('data').notNullable();
    table.string('hrInicio').notNullable();
    table.string('hrFim');
    table.string('local').notNullable();
    table.string('descricao');
    table.double('valorTotal');
    table.double('valorPago');

    //foreingKeys
    table.string('usuario_id').notNullable();
    table.integer('foto_id');

    table.foreign('usuario_id').references('id').inTable('usuarios');
    table.foreign('foto_id').references('id').inTable('fotosChurras');

  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('churras');
};
