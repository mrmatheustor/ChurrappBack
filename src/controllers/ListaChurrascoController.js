const connection = require('../database/connection');
const crypto = require('crypto');

module.exports = {

  async list(request, response) {
    const {churras_id} = request.params;

    const listaChurrasco = await connection('listaChurrasco')
    .join('churras', 'churras.id', '=', 'listaChurrasco.churras_id')
    .where('churras_id', churras_id)
    .select(['listaChurrasco.*', 
    'churras.churrasNome']).catch(function(err) {
    console.error(err);
    });

    return response.json(listaChurrasco);
  },
};