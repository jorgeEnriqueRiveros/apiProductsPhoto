const controller = require('../controllers/upload')

const router = express.Router()

router.post(
    `/`,
    controller.upload,
    controller.uploadFile
)

module.exports = router