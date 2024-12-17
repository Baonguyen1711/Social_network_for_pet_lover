const express = require('express')
const router = express.Router()

const followController = require('../controllers/FollowController')
//const { validate, sanitizeInput } = require('../middlewares/login/validate')

router.use(express.json())
// router.use('/', loginController.get)
router.use('/create', followController.createFollow)
router.use('/ignore', followController.createIgnore)
router.use('/isfollowed', followController.isFollowed)

router.use('/recommentfollow/:followerId', followController.getNotFollows)
module.exports = router