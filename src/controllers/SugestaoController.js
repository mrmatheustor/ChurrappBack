const connection = require('../database/connection');
const crypto = require('crypto');

module.exports = {

  async list(request, response) {
    const {subTipo_id} = request.params;

    const sugestao = await connection('sugestao')
    .join('unidades', 'unidades.id', '=', 'sugestao.unidade_id')
    .join('itens', 'itens.id', '=', 'sugestao.item_id')
    .join('tipos', 'tipos.id', '=', 'itens.tipo_id')
    .join('subTipos', 'tipos.subTipo_id','=','subTipos.id')
    .where('subTipos.id',subTipo_id)
    .select(['sugestao.quantidade','unidades.unidade', 'unidades.id as unidade_id', 'itens.nomeItem', 'itens.id as item_id', 'tipos.tipo', 'itens.tipo_id','itens.precoMedio'])
    .catch(function(err) {
      console.error(err);
      });

    return response.json(sugestao);
  },
};