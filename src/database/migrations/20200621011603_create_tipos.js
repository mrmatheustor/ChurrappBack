
exports.up = function(knex) {
    return knex.schema.createTable('tipos', function(table){
        table.increments();
        table.string('tipo').notNullable();

        //Foreing key
        table.strin('subTipo_id').defaultTo(0);

        table.foreign('subTipo_id').references('id').inTable('subTipos');

});
  
};

exports.down = function(knex) {
    return knex.schema.dropTable('tipos');  
};
