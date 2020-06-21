
exports.up = function(knex) {
    return knex.schema.createTable('pontoCarne', function(table){
        table.integer('id').primary();
        table.string('ponto').notNullable();
    });
  
};

exports.down = function(knex) {
    return knex.schema.dropTable('pontoCarne');  
};
