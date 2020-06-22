const connection = require('../database/connection');


module.exports = {
  async list (request, response) {
    const {churras_code} = request.query;

    const item = await connection('itens')
    .join('churras', 'churras.id', '=', 'itens.churras_code')
    .where('churras_code', churras_code)
    .orderBy('tipo')
    .select(['itens.*',
    'churras.nomeChurras',
    'churras.local',
    'churras.hrInicio']);


    return response.json(item);
  },
  async listAll (request, response) {

    const item = await connection('itens')
    .orderBy('tipo')
    .select(['itens.*']);


    return response.json(item);
  },
  async create(request, response) {
    const { nomeItem, descricao, tipo, unidade, quantidade, churras_code} = request.body;

    const [id] = await connection('itens').insert({
        nomeItem,
        descricao,
        tipo,
        unidade,
        quantidade,
        churras_code
    })
    response.json({ id });
  },

  async delete(request, response) {
    const { id } = request.params;


    await connection('itens').where('id', id).delete();

    return response.status(204).send();
  }
}