const Router = require('express')
const router = new Router()
const controller = require('./procedureController')
// const {check} = require('express-validator')
const authMiddleware = require('./middleware/authMiddleware')
const roleMiddleware = require('./middleware/roleMiddleware')

router.post('/create', roleMiddleware("CUSTOMER"), controller.create)

module.exports = router