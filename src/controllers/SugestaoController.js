const connection = require('../database/connection');
const crypto = require('crypto');

module.exports = {

  async list(request, response) {
    const sugestao = await connection('sugestao')
      .select('*');

    return response.json(sugestao);
  },
};