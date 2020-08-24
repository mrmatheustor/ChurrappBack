
exports.up = function(knex) {
    return knex.schema.createTable('tipos', function(table){
        table.increments();
        table.string('tipo').notNullable();
        table.string('fotoUrlT')

        //Foreing key
        table.integer('subTipo_id').defaultTo(0);

        table.foreign('subTipo_id').references('id').inTable('subTipos');

});
  
};

exports.down = function(knex) {
    knex.schema.dropTable('tipos');
  };
