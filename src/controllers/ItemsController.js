const connection = require('../database/connection');


module.exports = {
  async list (request, response) {

    const item = await connection('itens')
    .orderBy('tipo');


    return response.json(item);
  },
  async create(request, response) {
    const { nomeItem, descricao, tipo, unidade, quantidade} = request.body;

    const [id] = await connection('itens').insert({
        nomeItem,
        descricao,
        tipo,
        unidade,
        quantidade,
    })
    response.json({ id });
  },

  async delete(request, response) {
    const { id } = request.params;


    await connection('itens').where('id', id).delete();

    return response.status(204).send();
  }
}