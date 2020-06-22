const connection = require('../database/connection');
const crypto = require('crypto');

module.exports = {

  async list(request, response) {
    const {churras_id} = request.params;

    const listaChurrasco = await connection('listaChurrasco')
    .join('itens', 'itens.id', '=', 'listaChurrasco.item_id')
    .join('churras', 'churras.id', '=', 'listaChurrasco.churras_id')
    .where('churras_id', churras_id)
    .select(['listaChurrasco.quantidade',
    'itens.nomeItem', 
    'churras.nomeChurras']).catch(function(err) {
    console.error(err);
    });

    return response.json(listaChurrasco);
  },
};