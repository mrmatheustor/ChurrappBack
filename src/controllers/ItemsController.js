const connection = require('../database/connection');


module.exports = {
  async list(request, response) {
    const { churras_code } = request.query;

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
  async listAll(request, response) {

    const item = await connection('itens')
      .orderBy('tipo_id')
      .select(['itens.*']).catch(function (err) {
        console.error(err);
      });


    return response.json(item);
  },

  async listLimit(request, response) {
    const { min, max } = request.query;

    const item = await connection('itens')
      .orderBy('tipo_id')
      .where('tipo_id', '>=', min)
      .where('tipo_id', '<=', max)
      .select(['itens.*']).catch(function (err) {
        console.error(err);
      });


    return response.json(item);
  },
  async create(request, response) {
    const { nomeItem, descricao, tipo_id, unidade_id, precoMedio, fotoUrlI } = request.body;

    const [id] = await connection('itens').insert({
        nomeItem,
        descricao,
        tipo_id,
        unidade_id,
        fotoUrlI,
        precoMedio
    }).catch(function(err) {
      console.error(err);
    });
    response.json({ id });
  },

  async uploadFotoS3(request, response) {

    response.json(request.file);

  },

  async delete(request, response) {
    const { id } = request.params;


    await connection('itens').where('id', id).delete();

    return response.status(204).send();
  }
}