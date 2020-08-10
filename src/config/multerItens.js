const path = require('path');
const crypto = require('crypto')
const aws = require('aws-sdk')
const multerS3 = require('multer-s3')

module.exports = {
    storage: multerS3({
        s3: new aws.S3(),
        bucket:'churrappuploadteste/itens',
        acl:'public-read',
        metadata(req,file,cb){
            cb(null, {fieldName: file.fieldname});
        },
        key: (require, file, callBack) =>{
            crypto.randomBytes(16,(error,hash)=>{
                if(error) {
                    callBack(error);
                }
                const fileName = `${hash.toString('hex')}-itens.png`
    
                callBack(null, fileName)
            })
        }
    }),
    limits:{
        //aqui estamos pegando imagens de ate 5mb
        fileSize: 5*1024*1024,
    },
}