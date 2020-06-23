const connection = require('../database/connection');
const crypto = require('crypto');
const { create } = require('./UsuarioController');

module.exports = {

  async list(request, response) {
    const convidados = await connection('convidados')
      .select('*');

    return response.json(convidados);
  },
  async listChurras(request, response) {
      const {churras_id} = request.params;

      const convidados = await connection('convidados')
      .join('usuarios', 'usuarios.id', '=', 'convidados.usuario_id')
      .join('churras', 'churras.id', '=', 'convidados.churras_id')
      .where('churras_id', churras_id)
      .select(['*'])
      .catch(function(err) {
        console.error(err);
      });

      return response.json(convidados);
  },
  async create(request, response){
    const {valorPagar, churras_id} = request.body;
    const {usuario_id} = request.params;

    const [id] = await connection('convidados').insert({
        valorPagar,
        churras_id,
        usuario_id
    }).catch(function(err) {
      console.error(err);
    });

    return response.json({id});

  },
};