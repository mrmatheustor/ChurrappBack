const connection = require('../database/connection');
const crypto = require('crypto');
const { update } = require('../database/connection');

module.exports = {

  async list(request, response) {
    const usuarios = await connection('usuarios')
    .select('*')
    .catch(function(err) {
      console.error(err);
      });

    return response.json(usuarios);
  },

  async listCelularUsuario(request, response) {
    const {celular} = request.params;

    const pessoa = await connection('usuarios')
    .where('celular', celular)
    .select('*')
    .catch(function(err) {
      console.error(err);
      });
      
    return response.json(pessoa);
  },
  
  async listLogado(request, response) {
    const { id } = request.params;
    const { page = 1 } = request.query;

    const usuarios = await connection('usuarios')
    .join('pontoCarne', 'pontoCarne.id', '=', 'usuarios.pontoCarne_id')
    .join('quantidadeCome', 'quantidadeCome.id', '=', 'usuarios.quantidadeCome_id')
    .limit(1)
    .offset((page - 1) * 1)
    .where('usuarios.id', id)
    .select(['usuarios.*','pontoCarne.ponto','quantidadeCome.nomeQuantidadeCome'])
    .catch(function(err) {
      console.error(err);
      });

    return response.json(usuarios);
  },

  async create(request, response) {
      const { nome, sobrenome, email, cidade, uf, idade, celular, fotoUrlU, cadastrado, apelido,
      pontoCarne_id,carnePreferida_id,quantidadeCome_id,bebidaPreferida_id,acompanhamentoPreferido_id } = request.body;
      var dateTime = require('node-datetime');
      var dt = dateTime.create();
      var formatted = dt.format('d/m/Y');
      const joined = formatted;

    const id = crypto.randomBytes(8).toString('HEX');


    const usuarios = await connection('usuarios').insert({
      id,
      nome,
      sobrenome,
      email,
      cidade,
      uf,
      idade,
      joined,
      fotoUrlU,
      celular,
      apelido,
      pontoCarne_id,
      carnePreferida_id,
      quantidadeCome_id,
      bebidaPreferida_id,
      acompanhamentoPreferido_id,
      cadastrado
    }).catch(function(err) {
      console.error(err.detail);
    });

    console.log(usuarios);


    return response.json({
      id:id,
      nome:nome,
      sobrenome:sobrenome,
      email:email,
      cidade:cidade,
      uf:uf,
      idade:idade,
      joined:joined,
      fotoUrlU:fotoUrlU,
      celular:celular,
      apelido:apelido,
      pontoCarne_id:pontoCarne_id,
      carnePreferida_id:carnePreferida_id,
      quantidadeCome_id:quantidadeCome_id,
      bebidaPreferida_id:bebidaPreferida_id,
      acompanhamentoPreferido_id:acompanhamentoPreferido_id,
      cadastrado:cadastrado,    
    });
    
  },
  async update(request, response) {
    const {id} = request.params;
    const { nome, sobrenome, email, cadastrado,cidade, uf, idade, fotoUrlU, celular, apelido,
      pontoCarne_id,carnePreferida_id,quantidadeCome_id,bebidaPreferida_id,acompanhamentoPreferido_id, joined } = request.body;

    const usuarios = await connection('usuarios').where('id', id).update({
      nome,
      sobrenome,
      email,
      cidade,
      uf,
      idade,
      joined,
      fotoUrlU,
      celular,
      apelido,
      pontoCarne_id,
      carnePreferida_id,
      quantidadeCome_id,
      bebidaPreferida_id,
      acompanhamentoPreferido_id,
      cadastrado
    }).catch(function(err) {
      console.error(err);
      });

    return response.status(200).send()
  }
};