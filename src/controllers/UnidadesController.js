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
        
    },
};