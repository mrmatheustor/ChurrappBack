const connection = require('../database/connection');
const crypto = require('crypto');

module.exports = {

  async list(request, response) {
    const {churras_id} = request.params;

    const listaChurrasco = await connection('listaChurrasco')
    .join('unidades', 'unidades.id', '=', 'listaChurrasco.unidade_id')
    .join('itens', 'itens.id', '=', 'listaChurrasco.item_id')
    .join('churras', 'churras.id', '=', 'listaChurrasco.churras_id')
    .where('churras_id', churras_id)
    .select(['listaChurrasco.quantidade',
    'itens.nomeItem',
    'unidades.unidade', 
    'churras.nomeChurras']).catch(function(err) {
    console.error(err);
    });

    return response.json(listaChurrasco);
  },
  async create(request, response) {
    const { quantidade, unidade_id, item_id} = request.body;
    const {churras_id} = request.body;

    const listaChurrasco = await connection('listaChurrasco').insert({
      quantidade,
      churras_id,
      unidade_id,
      item_id
    }).catch(function(err) {
      console.error(err);
      });

    return response.json({listaChurrasco});
  },
};