
exports.up = function (knex) {
    return knex.schema.createTable('convidados', function (table) {
        table.integer('id').primary();
        table.double('valorPagar').notNullable();

        //foreingKeys
        table.integer('usuario_id').notNullable();
        table.integer('churras_id').notNullable();

        table.foreign('usuario_id').references('id').inTable('usuarios');
        table.foreign('churras_id').references('id').inTable('churras');
    });
};
exports.down = function (knex) {
    return knex.schema.dropTable('convidados');

};
