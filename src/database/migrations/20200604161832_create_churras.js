
exports.up = function(knex) {
  return knex.schema.createTable('churras', function(table){
    table.string('id').primary();
    table.string('nomeChurras').notNullable();
    table.date('data').notNullable();
    table.time('hrInicio').notNullable();
    table.time('hrFim');
    table.string('local').notNullable();
    table.string('descricao');
    table.double('valorTotal');
    table.double('valorPago');
    table.string('fotoUrlC');
    table.date('limiteConfirmacao');
    
    //foreingKeys
    table.string('usuario_id').notNullable();

    table.foreign('usuario_id').references('id').inTable('usuarios');

  });
};

exports.down = function(knex) {
  knex.schema.dropTable('churras');
};
