const connection = require('../database/connection');
const crypto = require('crypto');
const { json } = require('express');
const { distinctOn } = require('../database/connection');

module.exports = {
  async list(request, response) {

    const [count] = await connection('churras')
      .count().catch(function (err) {
        console.error(err);
      });;

    const churras = await connection('churras')
      .join('usuarios', 'usuarios.id', '=', 'churras.usuario_id')
      .orderBy('data')
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

    const [count] = await connection('churras').where('usuario_id', usuario_id)
      .whereRaw("data >= (now() - interval '1 day')")
      .count('usuario_id');
    const churras = await connection('churras')
      .join('usuarios', 'usuarios.id', '=', 'churras.usuario_id')
      .orderBy('data')
      .where('usuario_id', usuario_id)
      .whereRaw("data >= (now() - interval '1 day')")
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

    // const churras = await connection('churras')
    //   .join('convidados', 'convidados.churras_id', '=', 'churras.id')
    //   .join('usuarios', 'usuarios.id', '=', 'churras.usuario_id')
    //   .where(function () {
    //     this.where('convidados.usuario_id', '=', usuario_id)
    //     this.where('convidados.confirmado', '=', true)
    //     this.andWhere('churras.data', '<', data)
    //   })
    //   .orWhere(function () {
    //     this.where('churras.usuario_id', '=', usuario_id)
    //     this.andWhere('churras.data', '<', data)
    //   })      
    //   .distinctOn('id')
    //   .orderBy('churras.data')
    //   .select (['churras.*',
    //     'convidados.confirmado',
    //     'convidados.valorPagar',
    //     'convidados.churras_id',
    //     'usuarios.nome',
    //     'usuarios.celular',
    //     'usuarios.apelido',
    //     'usuarios.idade',
    //     'usuarios.fotoUrlU'])
    //   .catch(function (err) {
    //     console.error(err);
    //   });

    const churras = await connection.raw('select DISTINCT on (churras.id, churras.data) ' +
      'churras.id, churras."fotoUrlC", ' +
      'churras."nomeChurras", usuarios.nome, churras.data, churras."hrInicio", churras."hrFim" ' +
      'from churras ' +
      'full outer join convidados on churras.id = convidados.churras_id ' +
      'join usuarios on usuarios.id = churras.usuario_id ' +
      'where ((convidados.usuario_id = ? ' +
      'and convidados.confirmado = ? ' +
      "and churras.data < (now() - interval '1 day'))" +
      'or(churras.usuario_id = ? ' +
      "and churras.data < (now() - interval '1 day'))) order by churras.data desc",
      [usuario_id, true, usuario_id])

    return response.json(churras.rows);
  },

  async dataFuturo(request, response) {
    const { usuario_id } = request.params;

    const churras = await connection('churras')
      .join('convidados', 'convidados.churras_id', '=', 'churras.id')
      .join('usuarios', 'usuarios.id', '=', 'churras.usuario_id')
      .where('convidados.usuario_id', usuario_id)
      .whereRaw("data >= (now() - interval '1 day')")
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
      descricao, fotoUrlC, valorTotal, valorPago, limiteConfirmacao, latitude, longitude } = request.body;
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
      valorPago,
      latitude,
      longitude
    }).catch(function (err) {
      console.error(err);
    });

    return response.json({ id: id });
  },

  async setValorTotal(req, res) {
    const { churras_id } = req.params;
    const { valorTotal } = req.body;

    var valorTotalAtual = await connection('churras')
      .where('id', churras_id)
      .select('churras.valorTotal')
      .catch(function (err) {
        console.error(err);
      });

    var valorFinal = valorTotalAtual[0].valorTotal + valorTotal

    await connection('churras')
      .where('id', churras_id)
      .update({
        valorTotal: valorFinal
      }).catch(function (err) {
        console.error(err);
        return res.json({ mensagem: "Falha ao definir valor total!" });
      });

    return res.json({ mensagem: "Valor total definido!" });
  },

  async somaConvidadoPagto(req, res) {
    const { valorPago } = req.body;
    const { churras_id } = req.params;

    var valorTotalPago = await connection('churras')
      .where('id', churras_id)
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
    const { nomeChurras, data, hrInicio, hrFim, local, descricao, fotoUrlC, limiteConfirmacao, latitude, longitude } = request.body;
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
        latitude,
        longitude
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
      .timeout(1000)
      .select(['churras.*', 'usuarios.fotoUrlU', 'usuarios.nome'])
      .catch(function (err) {
        return response.status(404).send();
      });

    return response.json(churras);
  },
};