const connection = require('../database/connection');
const crypto = require('crypto');

module.exports = {

  async list(request, response) {
    const tipos = await connection('tipos')
      .select('*');

    return response.json(tipos);
  },
  async listPorSubTipo(request, response) {
    const { subTipo } = request.query;

    const tipo = await connection('tipos')
      .orderBy('tipo')
      .where('subTipo', '=', subTipo)
      .select(['tipos.*']).catch(function (err) {
        console.error(err);
      });


    return response.json(tipo);
  },
};