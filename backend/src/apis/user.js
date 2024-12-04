const express = require('express')
const router = express.Router()

const userController = require('../controllers/UserController')
//const { validate, sanitizeInput } = require('../middlewares/login/validate')

router.use(express.json())
// router.use('/', loginController.get)
router.use('/getbyid', userController.getUserById)

module.exports = router