const connection = require('../database/connection');
const crypto = require('crypto');
const { update } = require('../database/connection');
const { getPackedSettings } = require('http2');

module.exports = {

  async list(request, response) {
    const usuarios = await connection('usuarios')
      .orderBy('nome')
      .select('*')
      .catch(function (err) {
        console.error(err);
      });

    return response.json(usuarios);
  },

  async listCelularUsuario(request, response) {
    const { celular, senha } = request.params;

    const pessoa = await connection('usuarios')
      .where('celular', celular)
      .andWhere('senha', senha)
      .select('*')
      .catch(function (err) {
        console.error(err);
      });

    return response.json(pessoa);
  },

  async getLoginUserCel(request, response) {
    const { celular } = request.params;

    const pessoa = await connection('usuarios')
      .where('celular', celular)
      .select('*')
      .catch(function (err) {
        console.error(err);
      });

    return response.json(pessoa);
  },

  async listLogado(request, response) {
    const { id } = request.params;

    const usuarios = await connection('usuarios')
      .join('pontoCarne', 'pontoCarne.id', '=', 'usuarios.pontoCarne_id')
      .join('quantidadeCome', 'quantidadeCome.id', '=', 'usuarios.quantidadeCome_id')
      .join('itens as cp', 'cp.id', '=', 'usuarios.carnePreferida_id')
      .join('itens as ap', 'ap.id', '=', 'usuarios.acompanhamentoPreferido_id')
      .join('itens as bp', 'bp.id', '=', 'usuarios.bebidaPreferida_id')
      .join('itens as sp', 'sp.id', '=', 'usuarios.sobremesaPreferida_id')
      .where('usuarios.id', id)
      .select(['usuarios.*', 'pontoCarne.ponto', 'quantidadeCome.nomeQuantidadeCome', 'cp.nomeItem as carnePreferida', 'sp.nomeItem as sobremesaPreferida', 'ap.nomeItem as acompanhamentoPreferido', 'bp.nomeItem as bebidaPreferida'])
      .catch(function (err) {
        console.error(err);
      });

    return response.json(usuarios);
  },

  async create(request, response) {
    const { nome, sobrenome, email, cidade, uf, senha, idade, celular, fotoUrlU, cadastrado, apelido,
      pontoCarne_id, carnePreferida_id, churrasCriados, churrasParticipados, quantidadeCome_id, bebidaPreferida_id, sobremesaPreferida_id, acompanhamentoPreferido_id } = request.body;
    var dateTime = require('node-datetime');
    var dt = dateTime.create();
    var formatted = dt.format('d/m/Y');
    const joined = formatted;

    await connection('usuarios')
      .where("celular", celular)
      .select('*')
      .then(async function (rows) {
        if (rows.length === 0) {
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
            fotoUrlU,
            celular,
            apelido,
            senha,
            churrasCriados,
            churrasParticipados,
            pontoCarne_id,
            carnePreferida_id,
            quantidadeCome_id,
            bebidaPreferida_id,
            acompanhamentoPreferido_id,
            sobremesaPreferida_id,
            cadastrado
          }).catch(function (err) {
            console.error(err);
          });

          return response.json({
            usuario: [{
              id: id,
              nome: nome,
              sobrenome: sobrenome,
              email: email,
              cidade: cidade,
              uf: uf,
              idade: idade,
              joined: joined,
              fotoUrlU: fotoUrlU,
              celular: celular,
              apelido: apelido,
              senha: senha,
              churrasCriados: churrasCriados,
              churrasParticipados: churrasParticipados,
              pontoCarne_id: pontoCarne_id,
              carnePreferida_id: carnePreferida_id,
              quantidadeCome_id: quantidadeCome_id,
              bebidaPreferida_id: bebidaPreferida_id,
              acompanhamentoPreferido_id: acompanhamentoPreferido_id,
              sobremesaPreferida_id: sobremesaPreferida_id,
              cadastrado: cadastrado,
            }]
          });
        } else {
          if (!rows[0].cadastrado && rows[0].celular == celular) {
            await connection('usuarios').where('id', rows[0].id).update({
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
              senha,
              churrasCriados,
              churrasParticipados,
              pontoCarne_id,
              carnePreferida_id,
              quantidadeCome_id,
              bebidaPreferida_id,
              acompanhamentoPreferido_id,
              sobremesaPreferida_id,
              cadastrado
            }).catch(function (err) {
              console.error(err);
            });

            return response.json({
              usuario: [{
                id: rows[0].id,
                nome: nome,
                sobrenome: sobrenome,
                email: email,
                cidade: cidade,
                uf: uf,
                idade: idade,
                joined: joined,
                fotoUrlU: fotoUrlU,
                celular: celular,
                apelido: apelido,
                senha: senha,
                churrasCriados: churrasCriados,
                churrasParticipados: churrasParticipados,
                pontoCarne_id: pontoCarne_id,
                carnePreferida_id: carnePreferida_id,
                quantidadeCome_id: quantidadeCome_id,
                bebidaPreferida_id: bebidaPreferida_id,
                acompanhamentoPreferido_id: acompanhamentoPreferido_id,
                sobremesaPreferida_id: sobremesaPreferida_id,
                cadastrado: cadastrado,
              }]
            });
          } else {
            return response.json({ mensagem: "Usuário já cadastrado", usuario: rows })
          }
        }
      })



  },
  async attChurrasCriado(request, response) {
    const { id } = request.params;
    const { churrasCriados } = request.body;

    await connection('usuarios').where('id', id).select(['usuarios.churrasCriados'])
      .then(async function (rows) {
        if (rows.length === 0) {
          let newChurrasCriados = churrasCriados;

          await connection('usuarios').where('id', id).update({
            churrasCriados: newChurrasCriados
          }).catch(function (err) {
            console.error(err);
          });
          return response.json({ churrasCriados });

        } else {
          const qntCriado = await connection('usuarios').where('id', id).select(['usuarios.churrasCriados as oldChurrasCriados'])
            .catch(function (err) {
              console.error(err);
            });
          let newChurrasCriados = 0;

          if (churrasCriados == qntCriado[0].oldChurrasCriados) {
            newChurrasCriados = churrasCriados;
          } else if (churrasCriados > qntCriado[0].oldChurrasCriados) {
            newChurrasCriados = qntCriado[0].oldChurrasCriados + 1;
          } else if (churrasCriados < qntCriado[0].oldChurrasCriados) {
            newChurrasCriados = qntCriado[0].oldChurrasCriados - 1;
          }

          await connection('usuarios').where('id', id).update({
            churrasCriados: newChurrasCriados
          }).catch(function (err) {
            console.error(err);
          });
          return response.json({ churrasCriados, newChurrasCriados });
        }
      })
      .catch(function (err) {
        console.error(err);
      });

  },
  async attChurrasParticipado(request, response) {
    const { id } = request.params;
    const { churrasParticipados } = request.body;

    await connection('usuarios').where('id', id).update({
      churrasParticipados
    }).catch(function (err) {
      console.error(err);
    });
    return response.json({ churrasParticipados });
  },
  async getPIN(request, response) {
    const { id } = request.params;

    const pin = await connection('usuarios')
      .where('id', id)
      .select(['usuarios.pin'])
      .catch(function (err) {
        console.error(err);
      });
    return response.json(pin);
  },
  async update(request, response) {
    const { id } = request.params;
    const { sobrenome, email, cidade, uf, senha, idade, fotoUrlU, celular, apelido,
      pontoCarne_id, carnePreferida_id, quantidadeCome_id, sobremesaPreferida_id,
      bebidaPreferida_id, acompanhamentoPreferido_id, pin } = request.body;

    await connection('usuarios')
      .where('id', id)
      .update({
        sobrenome,
        email,
        cidade,
        uf,
        idade,
        senha,
        fotoUrlU,
        celular,
        apelido,
        pontoCarne_id,
        carnePreferida_id,
        quantidadeCome_id,
        bebidaPreferida_id,
        acompanhamentoPreferido_id,
        sobremesaPreferida_id,
        pin,
      }).catch(function (err) {
        console.error(err);
        return response.json({ mensagem: "Falha ao atualizar perfil, tente novamente mais tarde!" })

      });

    return response.json({ mensagem: "Perfil atualizado com sucesso!" })
  }
};