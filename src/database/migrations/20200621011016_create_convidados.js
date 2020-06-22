
exports.up = function (knex) {
    return knex.schema.createTable('convidados', function (table) {
        table.increments();
        table.double('valorPagar').notNullable();

        //foreingKeys
        table.string('usuario_id').notNullable();
        table.string('churras_id').notNullable();

        table.foreign('usuario_id').references('id').inTable('usuarios');
        table.foreign('churras_id').references('id').inTable('churras');
    });
};
exports.down = function (knex) {
    return knex.schema.dropTable('convidados');

};
