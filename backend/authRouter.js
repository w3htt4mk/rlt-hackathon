const Router = require('express')
const router = new Router()
const controller = require('./authController')
const {check} = require('express-validator')
const authMiddleware = require('./middleware/authMiddleware')
const roleMiddleware = require('./middleware/roleMiddleware')

router.post('/registration', [
	check('email', "Incorrect email").notEmpty(),
	check('password', "Incorrect password").notEmpty()
], controller.registration)
router.post('/login', controller.login)
router.patch('/update', controller.update)

module.exports = router