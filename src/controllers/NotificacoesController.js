const connection = require('../database/connection');

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
    const { mensagem , negar, confirmar } = request.body;

    await connection('notificacoes')
    .insert({
      usuario_id,
      churras_id,
      mensagem,
      negar,
      confirmar 
    })

    return response.status(204).send();
  },

  async delete(request, response) {
    const { id } = request.params;

    await connection('notificacoes')
    .where('id',id)
    .delete()

    return response.status(204).send();
  },
}