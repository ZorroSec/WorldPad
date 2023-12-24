const multer = require("multer")

const storage = multer.diskStorage({
    destination: (req, file, cb)=>{
        cb(null, 'images/')
    },
    filename: (req, file, cb)=>{
        const ext = file.originalname.split('.')[1]

        const newFileName = require("crypto").randomBytes(64).toString('hex')

        if(ext != 'jpg' && ext != 'jpeg' && ext != 'png'){
            cb(null, `${newFileName}.jpg`)
        }else{
            cb(null, `${newFileName}.${ext}`)
        }
    }
})

const upload = multer({ storage })

module.exports = upload
