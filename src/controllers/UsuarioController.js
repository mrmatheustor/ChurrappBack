const connection = require('../database/connection');
const crypto = require('crypto');

module.exports = {

  async list(request, response) {
    const { id } = request.query;
    const usuarios = await connection('usuarios')
      // .where('id', id)
      .select('*');

    return response.json(usuarios);
  },

  async create(request, response) {
    const { nome, sobrenome, email, cidade, uf, idade, joined, foto, celular, apelido } = request.body;

    const id = crypto.randomBytes(8).toString('HEX');

    try {
      await connection('usuarios').insert({
        id,
        nome,
        sobrenome,
        email,
        cidade,
        uf,
        idade,
        joined,
        foto,
        celular,
        apelitdo
      })
    } catch (erro) {
      return response(erro)
    }


    return response.json({ id });
  }
};