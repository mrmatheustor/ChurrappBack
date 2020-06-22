const connection = require('../database/connection');
const crypto = require('crypto');

module.exports = {

  async list(request, response) {
    const pontoCarne = await connection('pontoCarne')
      .select('*');

    return response.json(pontoCarne);
  },
};