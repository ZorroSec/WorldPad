const multer = require("multer")

const storage = multer.diskStorage({
    destination: (req, file, cb)=>{
        cb(null, 'images/')
    },
    
})

const upload = multer({ storage })

module.exports = upload
