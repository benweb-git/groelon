const homeControllers = require('../Controllers/home/homeController')
const { authMiddleware } = require('../middlewares/Authmiddleware')
const router = require('express').Router()

//home has already been added in the server part dont include it here
router.post('/create-dome-details',homeControllers.create_home_info)
router.put('/update-home-details/:id',homeControllers.update_home_info)
router.get('/get-all-details',homeControllers.get_home_info)
router.get('/get-all-web-details',homeControllers.get_general_info)


module.exports = router