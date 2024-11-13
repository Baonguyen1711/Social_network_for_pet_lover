const express = require('express')
const router = express.Router()

const userController = require('../controllers/UserController')



router.use(express.json())
router.get('/info',userController.getInfo)
router.use('/avatar', userController.setAvatar)

// router.delete('/delete',UserController.delete)

module.exports = router

//end_point