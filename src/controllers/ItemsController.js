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

  async listItensBySubTipo(req,res){
    const {subTipo} =req.query;

    const itens =await connection('itens')
    .join('tipos', 'itens.tipo_id', '=', 'tipos.id')
    .join('subTipos','tipos.subTipo_id' ,'=','subTipos.id')
    .where('subTipos.id',subTipo)
    .select(['itens.*','tipos.tipo','tipos.fotoUrlT','tipos.subTipo_id','subTipos.subTipo'])
    .catch(function (err) {
      console.error(err);
    });

    return res.json(itens);
  },

  async listLimit(request, response) {
    const { tipo } = request.query;

    const item = await connection('itens')
      .orderBy('nomeItem')
      .join('tipos','tipos.id','=','itens.tipo_id')
      .where('tipo_id', '=', tipo)
      .select(['itens.*','tipos.tipo','tipos.fotoUrlT',]).catch(function (err) {
        console.error(err);
      });


    return response.json(item);
  },
  async create(request, response) {
    const { nomeItem, descricao, tipo_id, unidade_id, precoMedio, fotoUrlI} = request.body;

    await connection('itens').insert({
        nomeItem,
        descricao,
        tipo_id,
        unidade_id,
        fotoUrlI,
        precoMedio
    }).catch(function(err) {
      console.error(err);
    });
    response.json( {nomeItem} );
  },

  async delete(request, response) {
    const { id } = request.params;


    await connection('itens').where('id', id).delete();

    return response.status(204).send();
  }
}