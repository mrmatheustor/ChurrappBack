const connection = require('../database/connection');
const crypto = require('crypto');

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

    const churras = await connection('churras')
      .join('convidados', 'convidados.churras_id', '=', 'churras.id')
      .join('usuarios', 'usuarios.id', '=', 'churras.usuario_id')
      .where('convidados.usuario_id', usuario_id)
      .where('convidados.confirmado', true)
      .where('convidados.confirmado', null)
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
      .where('convidados.confirmado', true)
      .orWhere('convidados.confirmado', null)
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
    const { nomeChurras, data, hrInicio, hrFim, local, descricao, fotoUrlC, valorTotal, valorPago } = request.body;
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
      valorPago
    }).catch(function (err) {
      console.error(err);
    });

    return response.json({ id: id });
  },

  async update(request, response) {
    const { nomeChurras, data, hrInicio, hrFim, local, descricao, fotoUrlC} = request.body;
    const id = request.params;

    const res = await connection('churras')
    .where('id',id)
    .update({
      nomeChurras,
      data,
      hrInicio,
      hrFim,
      local,
      descricao,
      fotoUrlC,
    }).catch(function (err) {
      console.error(err);
      return response.json({mensagem:"Falha ao alterar, tente novamente mais tarde!"});
    });
console.log(nomeChurras, data, hrInicio, hrFim, local, descricao, fotoUrlC)
    return response.json({mensagem:"Alterado com sucesso!"});
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
    await connection('notificacoes').where('churras_id',id).delete();
    await connection('churras').where('id', id).delete();

    return response.status(204).send();
  },

  async listByChurrasId(request, response) {
    const { id } = request.params;

    const churras = await connection('churras')
      .where('id', id)
      .select('*')
      .catch(function (err) {
        return response.status(404).send(false);
      });

    return response.json(churras);
  },
};