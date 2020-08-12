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
    .orderBy('tipo_id')
    .select(['itens.*']).catch(function(err) {
      console.error(err);
    });


    return response.json(item);
  },

  async listLimit(request, response) {
    const { tipo } = request.query;

    const item = await connection('itens')
      .orderBy('tipo_id')
      .where('tipo_id', '=', tipo)
      .select(['itens.*']).catch(function (err) {
        console.error(err);
      });


    return response.json(item);
  },
  async create(request, response) {
    const { nomeItem, descricao, tipo_id, unidade_id, precoMedio, fotoUrlI} = request.body;

    const item = await connection('itens').insert({
        id,
        nomeItem,
        descricao,
        tipo_id,
        unidade_id,
        fotoUrlI,
        precoMedio
    }).catch(function(err) {
      console.error(err);
    });
    response.json( item );
  },

  async delete(request, response) {
    const { id } = request.params;


    await connection('itens').where('id', id).delete();

    return response.status(204).send();
  }
}