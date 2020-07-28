const connection = require('../database/connection');
const crypto = require('crypto');
const { update } = require('../database/connection');

module.exports = {

    async posts(request, response) {
        const { originalname: nomeFoto, key, location: url=''} = request.file;

        const foto = await connection('fotos').insert({
            nomeFoto,
            key,
            url,
        }).catch(function (err) {
            console.error(err);
        });

        return response.json(foto);

    },
}