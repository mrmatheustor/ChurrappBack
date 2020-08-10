const connection = require('../database/connection');
const crypto = require('crypto');
const aws = require('aws-sdk')

const s3 = new aws.S3();

module.exports = {
    async create(request, response) {
        response.json(request.file);

    },
}