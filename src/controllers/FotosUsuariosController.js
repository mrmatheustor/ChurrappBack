const connection = require('../database/connection');
const crypto = require('crypto');
const { update } = require('../database/connection');
const aws = require('aws-sdk')

const s3 = new aws.S3();

module.exports = {

    async list(req, res) {
        const fotos = await connection('fotosUsuarios')
            .select('*')
            .catch(function (err) {
                console.error(err);
            });

        return res.json(fotos)
    },

    async create(request, response) {
        const { originalname: nomeImg, key, location: url = '' } = request.file;
        console.log(request.file)

        await connection('fotosUsuarios').insert({
            nomeImgU:nomeImg,
            keyU: key,
            urlU:url,
        }).catch(function (err) {
            console.error(err);
        });

        return response.json({
            nomeImgU: request.file.originalname,
            keyU: request.file.key,
            urlU: request.file.location,
        });

    },

    async delete(request, response) {
        const { key } = request.params;
        
        s3.deleteObject({
            Bucket: "churrappuploadteste",
            key: key,
        })

        await connection('fotosUsuarios')
            .where('key', key)
            .delete()

        return response.status(204).send();
    },
}