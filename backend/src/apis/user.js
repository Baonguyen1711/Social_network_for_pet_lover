const express = require('express')
const router = express.Router()

const userController = require('../controllers/UserController')

router.use(express.json())

router.get('/info',userController.getInfo)
router.use('/avatar', userController.setAvatar)
router.use('/verify', userController.verify)
router.use('/getbyid/:userId', userController.getUserById)


module.exports = router

//end_point

