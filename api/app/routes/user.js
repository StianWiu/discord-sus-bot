const router = require('express').Router()
const controllers = require('../controllers/user.js')

router.post('/join', controllers.join)
router.get('/check:code', controllers.check)
router.get('/kick', controllers.kick)
router.get('/gone:userid', controllers.gone)

module.exports = router;
