const connection = require('../database/connection');
const crypto = require('crypto');

module.exports = {

  async list(request, response) {
    const { churras_id } = request.params;

    const listaChurrasco = await connection('listaChurrasco')
      .join('unidades', 'unidades.id', '=', 'listaChurrasco.unidade_id')
      .join('itens', 'itens.id', '=', 'listaChurrasco.item_id')
      .join('churras', 'churras.id', '=', 'listaChurrasco.churras_id')
      .join('formatos', 'formatos.id', '=', 'listaChurrasco.formato_id')
      .join('tipos', 'tipos.id', '=', 'itens.tipo_id')
      .join('subTipos', 'subTipos.id', '=', 'tipos.subTipo_id')
      .where('churras_id', churras_id)
      .select(['listaChurrasco.quantidade',
        'listaChurrasco.id',
        'listaChurrasco.formato_id',
        'formatos.formato',
        'itens.nomeItem',
        'itens.fotoUrlI',
        'itens.precoMedio',
        'itens.fotoUrlI',
        'unidades.unidade',
        'churras.nomeChurras',
        'tipos.fotoUrlT',
      'subTipos.subTipo'])
      .catch(function (err) {
        console.error(err);
      });

    return response.json(listaChurrasco);
  },

  async listSubTipo(request, response) {
    const { churras_id, subTipo } = request.params;

    const listaChurrasco = await connection('listaChurrasco')
      .join('unidades', 'unidades.id', '=', 'listaChurrasco.unidade_id')
      .join('itens', 'itens.id', '=', 'listaChurrasco.item_id')
      .join('tipos', 'itens.tipo_id', '=', 'tipos.id')
      .join('subTipos', 'tipos.subTipo_id', '=', 'subTipos.id')
      .join('churras', 'churras.id', '=', 'listaChurrasco.churras_id')
      .join('formatos', 'formatos.id', '=', 'listaChurrasco.formato_id')
      .where('churras_id', churras_id)
      .andWhere('subTipos.id', subTipo)
      .select(['listaChurrasco.quantidade',
        'listaChurrasco.id',
        'itens.nomeItem',
        'unidades.unidade',
        'churras.nomeChurras',
        'tipos.tipo',
        'subTipos.subTipo'])
      .catch(function (err) {
        console.error(err);
      });

    return response.json(listaChurrasco);
  },

  async update(req, res) {
    const { quantidade, unidade_id, formato_id} = req.body;
    const {id} = req.params;

    await connection('listaChurrasco')
      .where('id', id)
      .update({
        unidade_id: unidade2,
        quantidade: quantidade2,
        formato_id
      })
      .catch(function (err) {
        console.error(err);
      });
    return res.json({ quantidade, formato_id, unidade_id });
  },

  async create(request, response) {
    const { quantidade, unidade_id, formato_id, item_id, churras_id } = request.body;

    await connection('listaChurrasco')
      .select('*')
      .where('churras_id', churras_id)
      .andWhere('item_id', item_id)
      .then(async function (rows) {
        if (rows.length === 0) {
          let quantidade2 = quantidade;
          let unidade2 = unidade_id;
          if (unidade2 == 3 && quantidade2 >= 1000) {
            //converte de mg para g
            unidade2 = 1;
            quantidade2 = quantidade2 / 1000;
          }
          if (unidade2 == 1 && quantidade2 >= 1000) {
            //converte de g para kg
            unidade2 = 2;
            quantidade2 = quantidade2 / 1000;
          }
          await connection('listaChurrasco').insert({
            quantidade: quantidade2,
            churras_id,
            unidade_id: unidade2,
            item_id,
            formato_id
          }).catch(function (err) {
            console.error(err);
          });
          return response.json({ quantidade, formato_id, churras_id, unidade_id, item_id });
        } else {
          const quantidadeAntiga = await connection('listaChurrasco')
            .where('churras_id', churras_id)
            .andWhere('item_id', item_id)
            .select(['listaChurrasco.quantidade', 'listaChurrasco.unidade_id as unidadeAntiga_id'])
            .catch(function (err) {
              console.error(err);
            });

          let quantidade2 = 0;
          let unidade2 = 0;

          if (unidade_id == quantidadeAntiga[0].unidadeAntiga_id) {
            //se sao a mesma unidade soma as quantidades e mantem a unidade
            quantidade2 = quantidade + quantidadeAntiga[0].quantidade;
            unidade2 = unidade_id;
          } else if (unidade_id == 2 && quantidadeAntiga[0].unidadeAntiga_id == 1) {
            //se o novo eh em kg e o velho eh em gramas, salva tudo em kg
            quantidade2 = (quantidadeAntiga[0].quantidade / 1000) + quantidade;
            unidade2 = 2;
          } else if (unidade_id == 1 && quantidadeAntiga[0].unidadeAntiga_id == 2) {
            //se o velho eh em kg e o novo eh em gramas, salva tudo em kg
            quantidade2 = (quantidade / 1000) + quantidadeAntiga[0].quantidade;
            unidade2 = 2;
          } else if (unidade_id == 1 && quantidadeAntiga[0].unidadeAntiga_id == 3) {
            //se o velho eh em mg e o novo eh em gramas, salva tudo em gramas
            quantidade2 = (quantidadeAntiga[0].quantidade / 1000) + quantidade;
            unidade2 = 1;
          } else if (unidade_id == 3 && quantidadeAntiga[0].unidadeAntiga_id == 1) {
            //se o novo eh em mg e o velho eh em gramas, salva tudo em gramas
            quantidade2 = (quantidade / 1000) + quantidadeAntiga[0].quantidade;
            unidade2 = 1;
          } else if (unidade_id == 2 && quantidadeAntiga[0].unidadeAntiga_id == 3) {
            //se o velho eh em mg e o novo eh em kg, salva tudo em kg
            quantidade2 = (quantidadeAntiga[0].quantidade / 1000000) + quantidade;
            unidade2 = 2;
          } else if (unidade_id == 3 && quantidadeAntiga[0].unidadeAntiga_id == 2) {
            //se o novo eh em mg e o velho eh em kg, salva tudo em kg
            quantidade2 = (quantidade / 1000000) + quantidadeAntiga[0].quantidade;
            unidade2 = 2;
          }

          if (unidade2 == 3 && quantidade2 >= 1000) {
            //converte de mg para g
            unidade2 = 1;
            quantidade2 = quantidade2 / 1000;
          }
          if (unidade2 == 1 && quantidade2 >= 1000) {
            //converte de g para kg
            unidade2 = 2;
            quantidade2 = quantidade2 / 1000;
          }

          await connection('listaChurrasco')
            .where('churras_id', churras_id)
            .andWhere('item_id', item_id)
            .update({
              churras_id,
              unidade_id: unidade2,
              item_id,
              quantidade: quantidade2,
              formato_id
            })
            .catch(function (err) {
              console.error(err);
            });
          return response.json({ quantidade, formato_id, churras_id, unidade_id, item_id });
        }
      });
  },

  async delete(request, response) {
    const { id } = request.params;

    await connection('listaChurrasco').where('id', id).delete();

    return response.status(204).send();
  }
};