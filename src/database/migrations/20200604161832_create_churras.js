
exports.up = function(knex) {
  return knex.schema.createTable('churras', function(table){
    table.integer('id').primary();
    table.string('nomeChurras').notNullable();
    table.string('data').notNullable();
    table.string('hrInicio').notNullable();
    table.string('hrFim');
    table.string('local').notNullable();
    table.string('descricao');
    table.string('foto');

    //foreingKeys
    table.string('usuario_id').notNullable();

    table.foreign('usuario_id').references('id').inTable('usuarios');

  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('churras');
};
