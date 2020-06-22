const connection = require('../database/connection');
const crypto = require('crypto');

module.exports = {

  async list(request, response) {
    const estoque = await connection('estoque')
      .select('*');

    return response.json(estoque);
  },
};