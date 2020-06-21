
exports.up = function(knex) {
    return knex.schema.createTable('listaChurrasco', function(table){
        table.integer('id').primary();
        table.double('quantidade').notNullable();

        //foreingKeys
        table.integer('churras_id').notNullable();
        table.integer('unidade_id').notNullable();
        table.integer('item_id').notNullable();
        
        table.foreign('churras_id').references('id').inTable('churras');
        table.foreign('unidade_id').references('id').inTable('unidades');
        table.foreign('item_id').references('id').inTable('itens');
    });
};

exports.down = function(knex) {
    return knex.schema.dropTable('listaChurrasco');
  
};
