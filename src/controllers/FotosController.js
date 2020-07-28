const connection = require('../database/connection');
const crypto = require('crypto');
const { update } = require('../database/connection');

module.exports = {

    async posts(request, response) {
        const { originalname: nomeImg, key, location: url=''} = request.file;

        const foto = await connection('fotos').insert({
            nomeImg,
            key,
            url,
        }).catch(function (err) {
            console.error(err);
        });

        return response.json({originalname: nomeImg, key, location: url=''});

    },
}