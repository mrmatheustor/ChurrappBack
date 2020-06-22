const connection = require('../database/connection');
const crypto = require('crypto');

module.exports = {

  async list(request, response) {
    const quantidadeCome = await connection('quantidadeCome')
      .select('*');

    return response.json(quantidadeCome);
  },
};