const multer = require('multer')

const require = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, '.storage/imgs')
    },
    filename: function (req, file, cb) {
        cb(null, `${Date.now()}-${file.originalname}`)
    } 
})
const upload = multer({storage: storage})
expport.upload = upload.single ('myFile')

exports.uploadFile = (req, res) => {
    res.send ({data: 'Enviar un archivo'});
}