
exports.up = function(knex) {
  return knex.schema.createTable('churras', function(table){
    table.increments();

    table.string('nomeChurras').notNullable();
    table.date('data').notNullable();
    table.time('hrInicio').notNullable();
    table.time('hrFim');
    table.string('local').notNullable();
    table.string('descricao');
    table.integer('convidados');

    table.string('usuario_id').notNullable();

    table.foreign('usuario_id').references('id').inTable('usuarios');

  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('churras');
};
