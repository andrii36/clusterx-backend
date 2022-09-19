const Router = require('express').Router
const userController = require('../controllers/user-controller')
const realEstateController = require('../controllers/real-estate-controller')
const verify = require('../verifyToken')
const searchController = require('../controllers/search-controller')
const transportController = require('../controllers/transport-controller')

const router = new Router()

router.post('/register', userController.registration)
router.post('/login', userController.login)
router.post('/authme', verify, userController.authme)
router.get('/real-estate', realEstateController.getAllRealEstate)
router.post('/real-estate', realEstateController.postNewRealEstateItem)
router.get('/search', verify, searchController.search)
router.get('/transport', transportController.getAllTransport)
router.get('/transport/profile', transportController.getTransportById)
router.get('/transport/mbi', transportController.getMBITransport)
router.post('/transport', transportController.postNewTransportItem)

module.exports = router