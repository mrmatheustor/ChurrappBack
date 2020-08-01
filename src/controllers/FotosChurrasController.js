const connection = require('../database/connection');
const crypto = require('crypto');
const { update } = require('../database/connection');
const aws = require('aws-sdk')

const s3 = new aws.S3();

module.exports = {

    async list(req, res) {
        const fotos = await connection('fotosChurras')
            .select('*')
            .catch(function (err) {
                console.error(err);
            });

        return res.json(fotos)
    },

    async create(request, response) {
        const { originalname: nomeImg, key, location: url = '' } = request.file;
        console.log(request.file)

        await connection('fotosChurras').insert({
            nomeImgC:nomeImg,
            keyC: key,
            urlC:url,
        }).catch(function (err) {
            console.error(err);
        });

        return response.json({
            nomeImgC: request.file.originalname,
            keyC: request.file.key,
            urlC: request.file.location,
        });

    },

    async delete(request, response) {
        const { key } = request.params;
        
        s3.deleteObject({
            Bucket: "churrappuploadteste",
            key: key,
        })

        await connection('fotosChurras')
            .where('key', key)
            .delete()

        return response.status(204).send();
    },
}