const connection = require('../database/connection');
const crypto = require('crypto');

module.exports = {

  async list(request, response) {
    const tipos = await connection('tipos')
      .select('*');

    return response.json(tipos);
  },
};