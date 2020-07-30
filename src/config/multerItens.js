const path = require('path');
const crypto = require('crypto')
const aws = require('aws-sdk')
const multerS3 = require('multer-s3')

module.exports = {
    dest: path.resolve(__dirname,'..','..','tmp','uploads'),
    storage: multerS3({
        s3: new aws.S3(),
        bucket:'churrappuploadteste/itens',
        contentType:multerS3.AUTO_CONTENT_TYPE,
        acl:'public-read',
        key: (require, file, callBack) =>{
            crypto.randomBytes(16,(error,hash)=>{
                if(error) {
                    callBack(error);
                }
                const fileName = `${hash.toString('hex')}-${file.originalname}`
    
                callBack(null, fileName)
            })
        }
    }),
    limits:{
        //aqui estamos pegando imagens de ate 5mb
        fileSize: 5*1024*1024,
    },
    fileFilter:(require,file,callBack)=>{
        const allowedMimes =[
            'image/jpeg',
            'image/pjpeg',
            'image/png',
            'image/gif',
        ]

        if(allowedMimes.includes(file.mimetype)){
            callBack(null,true)
        }else{
            callBack(new Error("Invalid file type."))
        }
    }
}