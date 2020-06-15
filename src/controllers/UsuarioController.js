const connection = require('../database/connection');
const crypto = require('crypto');

module.exports = {

  async list (request, response) {
    const {id} = request.query;
    const usuarios = await connection('usuarios')
    .where('id', id)
    .select('*');

    return response.json(usuarios);
  },

  async create(request, response) {
    const { nome, email, cidade, uf, idade } = request.body;

    const id = crypto.randomBytes(8).toString('HEX');

    await connection('usuarios').insert({
      id,
      nome,
      email,
      cidade,
      uf,
      idade
    })


    return response.json({ id });
  }
};