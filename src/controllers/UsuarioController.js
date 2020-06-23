const connection = require('../database/connection');
const crypto = require('crypto');
const { update } = require('../database/connection');

module.exports = {

  async list(request, response) {
    const usuarios = await connection('usuarios')
      .select('*');

    return response.json(usuarios);
  },
  
  async listLogado(request, response) {
    const { id } = request.params;
    const usuarios = await connection('usuarios')
    .join('pontoCarne', 'pontoCarne.id', '=', 'usuarios.pontoCarne_id')
    .where('id', id)
    .select(['usuarios.*', 'pontoCarne.*'])
    .catch(function(err) {
      console.error(err);
      });

    return response.json(usuarios);
  },

  async create(request, response) {
    const { nome, sobrenome, email, cidade, uf, idade, foto, celular, apelido,
      pontoCarne_id,carnePreferida_id,quantidadeCome_id,bebidaPreferida_id,acompanhamentoPreferido_id } = request.body;
      var dateTime = require('node-datetime');
      var dt = dateTime.create();
      var formatted = dt.format('d/m/Y');
      const joined = formatted;

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
  },
  async update(request, response) {
    const {id} = request.params;
    const { nome, sobrenome, email, cidade, uf, idade, foto, celular, apelido,
      pontoCarne_id,carnePreferida_id,quantidadeCome_id,bebidaPreferida_id,acompanhamentoPreferido_id, joined } = request.body;

    const usuarios = await connection('usuarios').where('id', id).update({
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
    }).catch(function(err) {
      console.error(err);
      });

    return response.status(200).send()
  }
};