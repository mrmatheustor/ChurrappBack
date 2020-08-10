const connection = require('../database/connection');
const crypto = require('crypto');
const { create } = require('./ChurrasController');

module.exports = {

  async list(request, response) {
    const unidades = await connection('unidades')
      .select('*');

    return response.json(unidades);
  },
    async create(request, response)
    {
      const {unidade} = request.body;
      
      const [id] = await connection('unidades').insert({
        unidade
    }).catch(function(err) {
      console.error(err);
    });
    response.json({ id });

    },
};