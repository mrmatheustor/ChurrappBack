const connection = require('../database/connection');


module.exports = {
  async list (request, response) {
    const usuario_id = request.headers.authorization;

    const churras = await connection('churras')
    .where('usuario_id', usuario_id)
    .select('*');

    return response.json(churras);
  }
}