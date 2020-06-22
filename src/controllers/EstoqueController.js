const connection = require('../database/connection');
const crypto = require('crypto');

module.exports = {

  async list(request, response) {
    const {usuario_id} = request.params;

    const estoque = await connection('estoque')
    .join('usuarios', 'usuarios.id', '=', 'estoque.churras_id')
    .join('unidades', 'unidades.id', '=', 'estoque.unidade_id')
    .join('itens', 'itens.id', '=', 'estoque.item_id')
    .where('usuario_id', usuario_id)
    .select(['estoque.quantidade', 'unidades.unidade', 'itens.nomeItem'])
    .catch(function(err) {
      console.error(err);
      });

    return response.json(estoque);
  },
};