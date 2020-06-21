
exports.up = function(knex) {
    return knex.schema.createTable('estoque', function(table){
        table.integer('id').primary();
        table.double('quantidade').notNullable();

        //foreingKeys
        table.integer('item_id').notNullable();
        table.integer('unidade_id').notNullable();
        table.integer('usuario_id').notNullable();
        
        table.foreign('item_id').references('id').inTable('itens');
        table.foreign('unidade_id').references('id').inTable('unidades');
        table.foreign('usuario_id').references('id').inTable('usuarios');
    });
  
};

exports.down = function(knex) {
    return knex.schema.dropTable('estoque');  
};
