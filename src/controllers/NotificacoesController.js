const connection = require('../database/connection');
const crypto = require('crypto');

module.exports = {

  async list(request, response) {
    const { usuario_id } = request.params;

    const notificacoes = await connection('notificacoes')
    .where('usuario_id',usuario_id)
    .select('*')

    return response.json(notificacoes);
  },
  
  async create(request, response) {
    const { usuario_id , churras_id } = request.params;
    const { mensagem , btn1, btn2 } = request.body;

    const notificacoes = await connection('notificacoes')
    .insert({
      usuario_id,
      churras_id,
      mensagem,
      btn1,
      btn2 
    })

    return response.json(notificacoes);
  },

  async delete(request, response) {
    const { id } = request.params;

    const notificacoes = await connection('notificacoes')
    .where('id',id)
    .delete()

    return response.json(notificacoes);
  },
}