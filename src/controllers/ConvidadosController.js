const { where } = require('../database/connection');
const connection = require('../database/connection');

module.exports = {

  async list(request, response) {
    const convidados = await connection('convidados')
      .select('*');

    return response.json(convidados);
  },

  async listChurras(request, response) {
    const { churras_id } = request.params;

    const convidados = await connection('convidados')
      .join('usuarios', 'usuarios.id', '=', 'convidados.usuario_id')
      .join('churras', 'churras.id', '=', 'convidados.churras_id')
      .where('churras_id', churras_id)
      .select(['churras.*', 'convidados.*', 'usuarios.nome',
        'usuarios.apelido', 'usuarios.celular', 'usuarios.fotoUrlU'])
      .catch(function (err) {
        console.error(err);
      });

    return response.json(convidados);
  },
  async listChurrasVai(request, response) {
    const { churras_id } = request.params;

    const convidados = await connection('convidados')
      .join('usuarios', 'usuarios.id', '=', 'convidados.usuario_id')
      .join('churras', 'churras.id', '=', 'convidados.churras_id')
      .where('churras_id', churras_id)
      .where(function () {
        this.where('convidados.confirmado', '=', true)
        this.orWhereNull('convidados.confirmado')
      })
      .select(['churras.*', 'convidados.*', 'usuarios.nome',
        'usuarios.apelido', 'usuarios.celular', 'usuarios.fotoUrlU'])
      .catch(function (err) {
        console.error(err);
      });

    return response.json(convidados);
  },


  async getConvidadoPeloCelular(request, response) {
    const { churras_id, celular } = request.params;

    const convidado = await connection('convidados')
      .join('usuarios', 'usuarios.id', '=', 'convidados.usuario_id')
      .where('churras_id', churras_id)
      .andWhere('celular', celular)
      .select('*')
      .catch(function (err) {
        console.error(err);
      });

    return response.json(convidado);
  },

  async updatePresenca(request, response) {
    const { usuario_id, churras_id } = request.params;

    await connection('convidados')
      .where('usuario_id', usuario_id)
      .andWhere('churras_id', churras_id)
      .select('*')
      .then(async res => {
        if (res[0].confirmado == null) {
          await connection('convidados')
            .where('usuario_id', usuario_id)
            .andWhere('churras_id', churras_id)
            .update({
              confirmado: true,
            })
        } else if (!res[0].confirmado) {
          await connection('convidados')
            .where('usuario_id', usuario_id)
            .andWhere('churras_id', churras_id)
            .update({
              confirmado: true,
            })

          await connection('convidados')
            .where('usuario_id', usuario_id)
            .andWhere('churras_id', churras_id)
            .select('*')
            .then(async res => {
              var valorPagar = res[0].valorPagar;
              await connection('churras')
                .where('id', res[0].churras_id)
                .then(async res3 => {
                  var valorTotalFinal = res3[0].valorTotal + valorPagar
                  await connection('churras')
                    .where('id', res[0].churras_id)
                    .update('valorTotal', valorTotalFinal)
                })
            })

          await connection('convidados')
            .where('churras_id', churras_id)
            .andWhere(function () {
              this.where('convidados.confirmado', '=', true)
              this.orWhereNull('convidados.confirmado')
            })
            .select('*')
            .then(async res => {
              var convQtd = res.length
              console.log("convQtd ", res.length)
              await connection('listaChurrasco')
                .where('churras_id', churras_id)
                .select('*')
                .then(async res2 => {
                  res2.forEach(item => {
                    var sum = item.quantidade / convQtd
                    var valorFinal = item.quantidade + sum
                    console.log("sum ", sum)
                    console.log("item.quantidade ", item.quantidade)
                    console.log("valorFinal ", valorFinal)
                    connection('listaChurrasco')
                      .where('churras_id', churras_id)
                      .andWhere('id', item.id)
                      .update({
                        quantidade: valorFinal
                      })
                      .catch(function (err) {
                        console.error(err);
                      });
                  });
                })
            })
        }
      })

    return response.status(204).send();
  },

  async updatePagamento(request, response) {
    const { id } = request.params;

    await connection('convidados')
      .where('id', id)
      .update({
        pagou: true,
      })

    await connection('convidados')
      .where('id', id)
      .select('*')
      .then(async res => {
        await connection('convidados')
          .where('churras_id', res[0].churras_id)
          .select('*')
          .then(async res2 => {
            var convidQtd = res2.length + 1
            await connection('churras')
              .where('id', res[0].churras_id)
              .then(async res3 => {
                var valorPagoConvid = res3[0].valorPago + (res3[0].valorTotal / convidQtd)
                await connection('churras')
                  .where('id', res[0].churras_id)
                  .update('valorPago', valorPagoConvid)
              })
          })
      })

    return response.status(204).send();
  },

  async atualizarValor(req, res) {
    const { id } = req.params;
    const { valorPagar } = req.body;

    await connection('convidados')
      .where('id', id)
      .update({
        valorPagar
      })

    return res.status(200).send();
  },

  async negarPresenca(request, response) {
    const { usuario_id, churras_id } = request.params;

    await connection('convidados')
      .where('usuario_id', usuario_id)
      .andWhere('churras_id', churras_id)
      .update({
        confirmado: false,
      })

    await connection('convidados')
      .where('usuario_id', usuario_id)
      .andWhere('churras_id', churras_id)
      .select('*')
      .then(async res => {
        var valorPagar = res[0].valorPagar;
        await connection('churras')
          .where('id', res[0].churras_id)
          .then(async res3 => {
            var valorTotalFinal = res3[0].valorTotal - valorPagar
            await connection('churras')
              .where('id', res[0].churras_id)
              .update('valorTotal', valorTotalFinal)
          })
      })

    await connection('convidados')
      .where('churras_id', churras_id)
      .andWhere(function () {
        this.where('convidados.confirmado', '=', true)
        this.orWhereNull('convidados.confirmado')
      })
      .select('*')
      .then(async res => {
        var convQtd = res.length + 2
        await connection('listaChurrasco')
          .where('churras_id', churras_id)
          .select('*')
          .then(async res2 => {
            res2.forEach(item => {
              var sub = item.quantidade / convQtd
              var valorFinal = item.quantidade - sub
              connection('listaChurrasco')
                .where('churras_id', churras_id)
                .andWhere('id', item.id)
                .update({
                  quantidade: valorFinal
                })
                .catch(function (err) {
                  console.error(err);
                });
            });
          })
      })

    return response.status(204).send();
  },

  async deleteConvite(request, response) {
    const { usuario_id, churras_id } = request.params;

    await connection('convidados')
      .where('usuario_id', usuario_id)
      .andWhere('churras_id', churras_id)
      .delete()

    return response.status(204).send();
  },

  async create(request, response) {
    const { valorPagar, churras_id, usuarioLogado_id } = request.body;
    const { usuario_id } = request.params;

    await connection('convidados')
      .join('churras as churras', 'churras.id', '=', 'convidados.churras_id')
      .where('convidados.usuario_id', usuario_id)
      .andWhere('churras_id', churras_id)
      .select('*')
      .then(async function (rows) {
        if (rows.length === 0) {
          await connection('convidados')
            .insert({
              valorPagar,
              churras_id,
              usuario_id
            }).then(async function (res) {
              const convidadoChurras = await connection('convidados')
                .join('churras', 'churras.id', '=', 'convidados.churras_id')
                .join('usuarios', 'usuarios.id', '=', 'churras.usuario_id')
                .where('churras_id', churras_id)
                .select(['churras.*', 'convidados.*', 'usuarios.nome'])
                .catch(function (err) {
                  console.error(err);
                });

              return response.json(convidadoChurras);
            }).catch(function (err) {
              console.error(err);
            });
        } else {
          return response.json(rows);
        }
      })

  },

  async adicionar(request, response) {
    const { churras_id } = request.body;
    const { usuario_id } = request.params;

    await connection('convidados')
      .join('churras as churras', 'churras.id', '=', 'convidados.churras_id')
      .where('convidados.usuario_id', usuario_id)
      .andWhere('churras_id', churras_id)
      .select(['*'])
      .then(async function (rows) {
        if (rows.length === 0) {
          await connection('convidados')
            .where('churras_id', churras_id)
            .andWhere(function () {
              this.where('convidados.confirmado', '=', true)
              this.orWhereNull('convidados.confirmado')
            })
            .select('*')
            .then(async (res) => {
              var convidQtd = res.length
              var valorConvid = res[0].valorPagar
              var valorTotalFinal = valorConvid * (convidQtd + 2)
              if (convidQtd == 0) {
                var valorPagar = 0
              } else {
                var valorPagar = res[0].valorPagar
              }
              var multiplicador = (1 / (convidQtd + 1)) + 1
              await connection('churras')
                .where('id', churras_id)
                .select('*')
                .then(async (res2) => {
                  console.log(res2, valorTotalFinal)
                  await connection('churras')
                    .where('id', churras_id)
                    .update('valorTotal', valorTotalFinal)
                })

              await connection('listaChurrasco')
                .where('churras_id', churras_id)
                .select('*')
                .then(async (res2) => {
                  res2.forEach(item => {
                    connection('listaChurrasco')
                      .where('churras_id', churras_id)
                      .andWhere('id', item.id)
                      .update({
                        quantidade: item.quantidade * multiplicador
                      })
                      .catch(function (err) {
                        console.error(err);
                      });
                  });
                })
                .catch(function (err) {
                  console.error(err);
                });

              await connection('convidados').insert({
                valorPagar: valorPagar,
                churras_id,
                usuario_id
              }).then(async function (res) {
                const convidadoChurras = await connection('convidados')
                  .join('churras', 'churras.id', '=', 'convidados.churras_id')
                  .join('usuarios', 'usuarios.id', '=', 'churras.usuario_id')
                  .where('churras_id', churras_id)
                  .select(['churras.*', 'convidados.*', 'usuarios.nome'])
                  .catch(function (err) {
                    console.error(err);
                  });
                return response.json(convidadoChurras);
              }).catch(function (err) {
                console.error(err);
              });
            });
        } else {
          return response.json(rows);
        }
      })
  },
};