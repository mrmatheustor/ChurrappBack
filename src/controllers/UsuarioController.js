const connection = require('../database/connection');
const crypto = require('crypto');

module.exports = {

  async list (request, response) {
    const usuarios = await connection('usuarios').select('*');

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