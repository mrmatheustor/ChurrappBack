const connection = require('../database/connection');
const crypto = require('crypto');
const { update } = require('../database/connection');

module.exports = {

    async posts(request, response) {
        const { originalname: nomeFoto, key, url=''} = request.file;

        const [id] = await connection('fotos').insert({
            nome,
            sobrenome,
            email,
            cidade,
            uf,
            idade,
            joined,
            foto_id,
            celular,
            apelido,
            pontoCarne_id,
            carnePreferida_id,
            quantidadeCome_id,
            bebidaPreferida_id,
            acompanhamentoPreferido_id,
            cadastrado
        }).catch(function (err) {
            console.error(err);
        });

        return response.json({
            id: id,
            nome: nome,
            sobrenome: sobrenome,
            email: email,
            cidade: cidade,
            uf: uf,
            idade: idade,
            joined: joined,
            foto_id: foto_id,
            celular: celular,
            apelido: apelido,
            pontoCarne_id: pontoCarne_id,
            carnePreferida_id: carnePreferida_id,
            quantidadeCome_id: quantidadeCome_id,
            bebidaPreferida_id: bebidaPreferida_id,
            acompanhamentoPreferido_id: acompanhamentoPreferido_id,
            cadastrado: cadastrado,
        });

    },
}