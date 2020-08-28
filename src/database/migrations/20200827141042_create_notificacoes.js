
exports.up = function (knex) {
    return knex.schema.createTable('notificacoes', function (table) {
        table.increments();
        table.string('mensagem').notNullable();
        table.string('negar');
        table.string('confirmar');

        //foreingKeys
        table.string('usuario_id').notNullable();
        table.string('churras_id');

        table.foreign('usuario_id').references('id').inTable('usuarios');
        table.foreign('churras_id').references('id').inTable('churras');
    });

};

exports.down = function (knex) {
    knex.schema.dropTable('notificacoes');
};
