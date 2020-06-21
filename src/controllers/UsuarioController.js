const connection = require('../database/connection');
const crypto = require('crypto');

module.exports = {

  async list(request, response) {
    const { id } = request.query;
    const usuarios = await connection('usuarios')
      .select('*');

    return response.json(usuarios);
  },

  async create(request, response) {
    const { nome, sobrenome, email, cidade, uf, idade, joined, foto, celular, apelido,
      pontoCarne_id,carnePreferida_id,quantidadeCome_id,bebidaPreferida_id,acompanhamentoPreferido_id } = request.body;

    const id = crypto.randomBytes(8).toString('HEX');


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
      apelido,
      pontoCarne_id,
      carnePreferida_id,
      quantidadeCome_id,
      bebidaPreferida_id,
      acompanhamentoPreferido_id
    })


    return response.json({ id });
  }
};