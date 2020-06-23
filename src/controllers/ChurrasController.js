const connection = require('../database/connection');
const crypto = require('crypto');

module.exports = {
  async list (request, response) {
    const { page = 1 } = request.query;

    const [count] = await connection('churras')
    .count().catch(function(err) {
      console.error(err);
      });;

    const churras = await connection('churras')
    .join('usuarios', 'usuarios.id', '=', 'churras.usuario_id')
    .limit(5)
    .orderBy('nome')
    .offset((page - 1) * 5)
    .select(['churras.*', 
    'usuarios.nome', 
    'usuarios.email', 
    'usuarios.cidade', 
    'usuarios.idade'])
    .catch(function(err) {
    console.error(err);
    });  

    response.header(['X-Total-Count'], count['count(*)']);
    return response.json(churras);
  },

  async logado (request, response) {
    const { page = 1 } = request.query;
    const { usuario_id } = request.params;
    var dateTime = require('node-datetime');
    var dt = dateTime.create();
    var formatted = dt.format('d/m/Y');

    const [count] = await connection('churras').where('usuario_id', usuario_id).where('data', '>=', '19/06/2020')
    .count();

    const churras = await connection('churras')
    .join('usuarios', 'usuarios.id', '=', 'churras.usuario_id')
    .limit(5)
    .orderBy('data')
    .offset((page - 1) * 5)
    .where('usuario_id', usuario_id)
    .where('data', '>=', formatted)
    .select(['churras.*', 
    'usuarios.nome', 
    'usuarios.email', 
    'usuarios.cidade', 
    'usuarios.idade']);

    response.header('Total-Meu', count['count(*)']);
    return response.json(churras);
  },

  async dataPassado(request, response) {
    const { page = 1 } = request.query;
    var dateTime = require('node-datetime');
    var dt = dateTime.create();
    var formatted = dt.format('d/m/Y');

    const churras = await connection('churras')
    .join('usuarios', 'usuarios.id', '=', 'churras.usuario_id')
    .where('data', '<', formatted)
    .offset((page - 1) * 10)
    .orderBy('data')
    .limit(10)
    .select(['churras.*', 
    'usuarios.nome', 
    'usuarios.email', 
    'usuarios.cidade', 
    'usuarios.idade']);

    return response.json(churras);
  },

  async dataFuturo(request, response) {
    const { page = 1 } = request.query;
    var dateTime = require('node-datetime');
    var dt = dateTime.create();
    var formatted = dt.format('d/m/Y');

    const churras = await connection('churras')
    .join('usuarios', 'usuarios.id', '=', 'churras.usuario_id')
    .where('data', '>=', formatted)
    .offset((page - 1) * 5)
    .orderBy('data')
    .limit(5)
    .select(['churras.*', 
    'usuarios.nome', 
    'usuarios.email', 
    'usuarios.cidade', 
    'usuarios.idade']);    

    return response.json(churras);
  },

  async create(request, response) {
    const { nomeChurras, data, hrInicio, hrFim, local, descricao, foto,} = request.body;
    const usuario_id = request.headers.authorization;
    const id = crypto.randomBytes(8).toString('HEX');

    const churras = await connection('churras').insert({
      id,
      nomeChurras,
      data,
      hrInicio,
      hrFim,
      local,
      descricao,
      usuario_id,
      foto
    }).catch(function(err) {
      console.error(err);
    });
    
    return response.json({churras});
  },

  async delete(request, response) {
    const { id } = request.params;
    const usuario_id = request.headers.authorization;

    const churras = await connection('churras').where('id', id).select('usuario_id').first();

    if(churras.usuario_id !== usuario_id) {
      return response.status(401).json({ error: 'Operação não permitida.' });

    }

    await connection('churras').where('id', id).delete();

    return response.status(204).send();
  }
};