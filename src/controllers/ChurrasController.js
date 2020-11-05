const connection = require('../database/connection');
const crypto = require('crypto');
const { json } = require('express');

module.exports = {
  async list(request, response) {

    const [count] = await connection('churras')
      .count().catch(function (err) {
        console.error(err);
      });;

    const churras = await connection('churras')
      .join('usuarios', 'usuarios.id', '=', 'churras.usuario_id')
      .orderBy('nome')
      .select(['churras.*',
        'usuarios.nome',
        'usuarios.email',
        'usuarios.cidade',
        'usuarios.idade'])
      .catch(function (err) {
        console.error(err);
      });

    response.header('X-Total-Count', count['count(*)']);
    return response.json(churras);
  },

  async logado(request, response) {
    const { usuario_id } = request.params;
    var dateTime = require('node-datetime');
    var dt = dateTime.create();
    var formatted = dt.format('d/m/Y');

    const [count] = await connection('churras').where('usuario_id', usuario_id).where('data', '>=', formatted)
      .count('usuario_id');
    const churras = await connection('churras')
      .join('usuarios', 'usuarios.id', '=', 'churras.usuario_id')
      .orderBy('data')
      .where('usuario_id', usuario_id)
      .where('data', '>=', formatted)
      .select(['churras.*',
        'usuarios.nome',
        'usuarios.celular',
        'usuarios.apelido',
        'usuarios.idade',
        'usuarios.fotoUrlU'
      ])
      .catch(function (err) {
        console.error(err);
      });

    response.header('Total-Meu', count['count(*)']);
    return response.json(churras);
  },

  async dataPassado(request, response) {
    const { usuario_id } = request.params;
    var dateTime = require('node-datetime');
    var dt = dateTime.create();
    var formatted = dt.format('d/m/Y');
    console.log("Data de Hoje = " + formatted)

    const churras = await connection('churras')
      .join('convidados', 'convidados.churras_id', '=', 'churras.id')
      .join('usuarios', 'usuarios.id', '=', 'churras.usuario_id')
      .where('convidados.usuario_id', '=', usuario_id)
      .orWhere('churras.nome', '=', 'usuarios.nome')
      .andWhere('convidados.confirmado', '=', true)
      .where('data', '<', formatted)
      .orderBy('data')
      .select(['churras.*',
        'convidados.confirmado',
        'convidados.valorPagar',
        'convidados.churras_id',
        'usuarios.nome',
        'usuarios.celular',
        'usuarios.apelido',
        'usuarios.idade',
        'usuarios.fotoUrlU'])
      .catch(function (err) {
        console.error(err);
      });

    return response.json(churras);
  },

  async dataFuturo(request, response) {
    const { usuario_id } = request.params;
    var dateTime = require('node-datetime');
    var dt = dateTime.create();
    var formatted = dt.format('d/m/Y');

    const churras = await connection('churras')
      .join('convidados', 'convidados.churras_id', '=', 'churras.id')
      .join('usuarios', 'usuarios.id', '=', 'churras.usuario_id')
      .where('convidados.usuario_id', usuario_id)
      .where('data', '>=', formatted)
      .orderBy('data')
      .select(['churras.*',
        'convidados.confirmado',
        'convidados.valorPagar',
        'convidados.churras_id',
        'usuarios.nome',
        'usuarios.celular',
        'usuarios.apelido',
        'usuarios.idade',
        'usuarios.fotoUrlU'])
      .catch(function (err) {
        console.error(err);
      });

    return response.json(churras);
  },

  async create(request, response) {
    const { nomeChurras, data, hrInicio, hrFim, local, 
      descricao, fotoUrlC, valorTotal, valorPago, limiteConfirmacao } = request.body;
    const usuario_id = request.headers.authorization;
    const id = crypto.randomBytes(8).toString('HEX');

    await connection('churras').insert({
      id,
      nomeChurras,
      data,
      hrInicio,
      hrFim,
      local,
      descricao,
      usuario_id,
      fotoUrlC,
      valorTotal,
      limiteConfirmacao,
      valorPago
    }).catch(function (err) {
      console.error(err);
    });

    return response.json({ id: id });
  },

  async setValorTotal(req,res){
    const {valorTotal} = req.body;
    const { churras_id } = req.params;

    var valorTotalAtual = await connection('churras')
    .where('id',churras_id)
    .select('churras.valorTotal')
    .catch(function (err) {
      console.error(err);
    });
    
    var valorFinal = valorTotalAtual[0].valorTotal + valorTotal

    console.log({valorFinal:valorFinal,valorAtual:valorTotalAtual[0].valorTotal, valorNovo:valorTotal})

    await connection('churras')
      .where('id', churras_id)
      .update({
        valorTotal: valorFinal
      }).catch(function (err) {
        console.error(err);
        return res.json({ mensagem: "Falha ao definir valor total!" });
      });

      console.log({ mensagem: "Valor total definido!" })
      
    return res.json({ mensagem: "Valor total definido!" });
  },

  async somaConvidadoPagto(req,res){
    const {valorPago} = req.body;
    const { churras_id } = req.params;

    var valorTotalPago = await connection('churras')
    .where('id',churras_id)
    .select('churras.valorPago')
    .catch(function (err) {
      console.error(err);
    });

    await connection('churras')
      .where('id', churras_id)
      .update({
        valorPago: valorTotalPago[0].valorPago + valorPago
      }).catch(function (err) {
        console.error(err);
        return res.json({ mensagem: "Falha ao definir valor total!" });
      });

    return res.json({ mensagem: "Valor total definido!" });
  },

  async updateChurrasInfo(request, response) {
    const { nomeChurras, data, hrInicio, hrFim, local, descricao, fotoUrlC ,limiteConfirmacao} = request.body;
    const { churras_id } = request.params;

    await connection('churras')
      .where('id', churras_id)
      .update({
        nomeChurras,
        data,
        hrInicio,
        hrFim,
        local,
        limiteConfirmacao,
        descricao,
        fotoUrlC,
      }).catch(function (err) {
        console.error(err);
        return response.json({ mensagem: "Falha ao alterar, tente novamente mais tarde!" });
      });

    return response.json({ mensagem: "Alterado com sucesso!" });
  },

  async delete(request, response) {
    const { id } = request.params;
    const usuario_id = request.headers.authorization;

    const churras = await connection('churras').where('id', id).select('usuario_id').first();

    if (churras.usuario_id !== usuario_id) {
      return response.status(401).json({ error: 'Operação não permitida.' });

    }

    await connection('convidados').where('churras_id', id).delete();
    await connection('listaChurrasco').where('churras_id', id).delete();
    await connection('notificacoes').where('churras_id', id).delete();
    await connection('churras').where('id', id).delete();

    return response.status(204).send();
  },

  async listByChurrasId(request, response) {
    const { id } = request.params;

    const churras = await connection('churras')
      .join('usuarios', 'usuarios.id', '=', 'churras.usuario_id')
      .where('churras.id', id)
      .select(['churras.*','usuarios.fotoUrlU','usuarios.nome'])
      .catch(function (err) {
        return response.status(404).send(false);
      });

    return response.json(churras);
  },
};