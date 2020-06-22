
exports.up = function(knex) {
    return knex.schema.createTable('sugestao', function(table){
        table.increments();
        table.double('quantidade').notNullable();

        //foreingKeys
        table.integer('item_id').notNullable();
        table.integer('unidade_id').notNullable();

        table.foreign('item_id').references('id').inTable('itens');
        table.foreign('unidade_id').references('id').inTable('unidades');
    });
  
};

exports.down = function(knex) {
    return knex.schema.dropTable('sugestao');  
};
