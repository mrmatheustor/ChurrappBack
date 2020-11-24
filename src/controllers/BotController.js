const connection = require('../database/connection');

module.exports = {
  async limpaNotificacoes(request, response) {    
        await connection('notificacoes')
          .whereRaw("validade < (now() - interval '1 day')")
          .delete()    
        return response.status(204).send();
      },
}