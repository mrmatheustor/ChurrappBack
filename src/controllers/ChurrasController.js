const connection = require('../database/connection');

module.exports = {
  async list (request, response) {
    const { page = 1 } = request.query;
    const { id } = request.query;

    const [count] = await connection('churras')
    .count();

    const churras = await connection('churras')
    .join('usuarios', 'usuarios.id', '=', 'churras.usuario_id')
    .limit(5)
    .offset((page - 1) * 5)
    // .where('churras.id', id)
    .select(['churras.*', 
    'usuarios.nome', 
    'usuarios.email', 
    'usuarios.cidade', 
    'usuarios.idade']);

    response.header('X-Total-Count', count['count(*)']);
    return response.json(churras);
  },


  async create(request, response) {
    const { nomeChurras, data, hrInicio, hrFim, local, descricao, convidados } = request.body;
    const usuario_id = request.headers.authorization;

    const [id] = await connection('churras').insert({
      nomeChurras,
      data,
      hrInicio,
      hrFim,
      local,
      descricao,
      convidados,
      usuario_id,
    })
    response.json({ id });
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