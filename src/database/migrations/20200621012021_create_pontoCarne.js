
exports.up = function(knex) {
    return knex.schema.createTable('pontoCarne', function(table){
        table.increments();
        table.string('ponto').notNullable();
    });
  
};

exports.down = function(knex) {
    return knex.schema.dropTable('pontoCarne');  
};
