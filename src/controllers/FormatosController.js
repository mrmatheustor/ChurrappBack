const connection = require('../database/connection');
const crypto = require('crypto');

module.exports = {

  async list(request, response) {
    const formatos = await connection('formatos')
      .select('*');

    return response.json(formatos);
  },
};