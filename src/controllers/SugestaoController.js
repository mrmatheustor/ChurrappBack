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
    .select(['sugestao.quantidade','unidades.unidade', 'itens.nomeItem', 'tipos.tipo', 'itens.tipo_id'])
    .catch(function(err) {
      console.error(err);
      });

    return response.json(sugestao);
  },
};