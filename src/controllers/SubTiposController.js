const connection = require('../database/connection');
const crypto = require('crypto');

module.exports = {

  async list(request, response) {
    const subTipos = await connection('subTipos')
    .orderBy('id')  
    .select('*');

    return response.json(subTipos);
  },
};