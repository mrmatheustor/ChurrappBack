const connection = require('../database/connection');
const crypto = require('crypto');

module.exports = {

  async list(request, response) {
    const { usuario_id } = request.params;

    const notificacoes = await connection('notificacoes')
    .where('usuario_id',usuario_id)
    .select('*')

    return response.json(notificacoes);
  }
}