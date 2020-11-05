const connection = require('../database/connection');

module.exports = {
  async limpaNotificacoes(request, response) {    
        await connection('notificacoes')
          .where('validade','<', new Date())
          .delete()    
        return response.status(204).send();
      },
}