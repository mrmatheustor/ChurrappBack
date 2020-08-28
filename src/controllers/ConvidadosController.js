const connection = require('../database/connection');

module.exports = {

  async list(request, response) {
    const convidados = await connection('convidados')
      .select('*');

    return response.json(convidados);
  },

  async listChurras(request, response) {
      const {churras_id} = request.params;

      const convidados = await connection('convidados')
      .join('usuarios', 'usuarios.id', '=', 'convidados.usuario_id')
      .join('churras', 'churras.id', '=', 'convidados.churras_id')
      .where('churras_id', churras_id)
      .select(['churras.*', 'convidados.*', 'usuarios.nome',
      'usuarios.apelido','usuarios.fotoUrlU'])
      .catch(function(err) {
        console.error(err);
      });

      return response.json(convidados);
  },
  
  async updatePresenca(request, response){
    const {usuario_id, churras_id} = request.params;

    await connection('convidados')
    .where('usuario_id',usuario_id)
    .andWhere('churras_id',churras_id)
    .update({
      confirmado:true,
    })

    return response.status(204).send();
  },

  
  async negarPresenca(request, response){
    const {usuario_id, churras_id} = request.params;

    await connection('convidados')
    .where('usuario_id',usuario_id)
    .andWhere('churras_id',churras_id)
    .update({
      confirmado:false,
    })

    return response.status(204).send();
  },
  
  async deleteConvite(request, response){
    const {usuario_id, churras_id} = request.params;

    await connection('convidados')
    .where('usuario_id',usuario_id)
    .andWhere('churras_id',churras_id)
    .delete()
    
    return response.status(204).send();
  },

  async create(request, response){
    const {valorPagar, churras_id} = request.body;
    const {usuario_id} = request.params;

    await connection('convidados')
    .where('usuario_id',usuario_id)
    .andWhere('churras_id',churras_id)
    .select('*')
    .then(async function (rows) {
      if (rows.length === 0) {
        await connection('convidados').insert({
            valorPagar,
            churras_id,
            usuario_id
        }).catch(function(err) {
          console.error(err);
        });        
    
        return response.json({valorPagar, churras_id, usuario_id});
      }else{
        return response.json(rows);
      }
    })

  },

};