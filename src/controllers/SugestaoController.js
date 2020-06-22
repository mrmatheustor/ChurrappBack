const connection = require('../database/connection');
const crypto = require('crypto');

module.exports = {

  async list(request, response) {
    const sugestao = await connection('sugestao')
    .join('unidades', 'unidades.id', '=', 'sugestao.unidade_id')
    .join('itens', 'itens.id', '=', 'sugestao.item_id')
    .join('tipos', 'tipos.id', '=', 'itens.tipo_id')
    .select(['sugestao.quantidade','unidades.unidade', 'itens.nomeItem', 'tipos.tipo'])
    .catch(function(err) {
      console.error(err);
      });

    return response.json(sugestao);
  },
};