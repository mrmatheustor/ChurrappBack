const connection = require('../database/connection');
const crypto = require('crypto');
const { update } = require('../database/connection');
const aws = require('aws-sdk')

const s3 = new aws.S3();

module.exports = {

    async list(req, res) {
        const fotos = await connection('fotos')
            .select('*')
            .catch(function (err) {
                console.error(err);
            });

        return res.json(fotos)
    },

    async create(request, response) {
        const { originalname: nomeImg, key, location: url = '' } = request.file;
        console.log(request.file)

        await connection('fotos').insert({
            nomeImg,
            key,
            url,
        }).catch(function (err) {
            console.error(err);
        });

        return response.json({
            nomeImg: request.file.originalname,
            key: request.file.key,
            url: request.file.location,
        });

    },

    async delete(request, response) {
        const { key } = request.params;

        await connection('fotos')
            .where('key', key)
            .delete()
            .then(function () {
                s3.deleteObject({
                    Bucket: "churrappuploadteste",
                    key: key
                })
            });

        return response.status(204).send();
    },
}