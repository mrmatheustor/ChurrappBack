const connection = require('../database/connection');


module.exports = {
  async create (request, response) {
    const { id } = request.body;

    const usuario = await connection('usuarios')
    .where('id' ,id)
    .first();
    
    if(!usuario) {
      return response.status(400).json({ error: 'Usuário não encontrado.' })
    }

    return response.json(usuario);
  }
}