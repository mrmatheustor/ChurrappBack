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

  
  async getConvidadoPeloCelular(request, response) {
    const { churras_id, celular } = request.params;

    const convidado = await connection('convidados')
      .join('usuarios', 'usuarios.id', '=', 'convidados.usuario_id')
      .where('churras_id', churras_id)
      .andWhere('celular',celular)
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
      .update({
        confirmado: true,
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
    const { valorPagar, churras_id } = request.body;
    const { usuario_id } = request.params;

    await connection('convidados')
      .where('usuario_id', usuario_id)
      .andWhere('churras_id', churras_id)
      .select('*')
      .then(async function (rows) {
        if (rows.length === 0) {
          await connection('convidados').insert({
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
      .where('usuario_id', usuario_id)
      .andWhere('churras_id', churras_id)
      .select('*')
      .then(async function (rows) {
        if (rows.length === 0) {
          await connection('convidados')
            .where('churras_id', churras_id)
            .select('*')
            .then(async (res) => {
              console.log(res)
              var convidQtd = res.length
              if(convidQtd == 0){
                var valorPagar = 0
              }else{
                var valorPagar = res[0].valorPagar 
              }        
              var multiplicador = (1/convidQtd)+1
              console.log("Multiplicador "+multiplicador)
              await connection('listaChurrasco')
              .where('churras_id',churras_id)
              .update({
                quantidade: quantidade*multiplicador
              }).catch(function (err) {
                console.error(err);
              });

              await connection('convidados').insert({
                valorPagar:valorPagar,
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