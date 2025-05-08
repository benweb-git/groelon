const coinControllers = require('../Controllers/home/coinController')
const { authMiddleware } = require('../middlewares/Authmiddleware')
const router = require('express').Router()

//home has already been added in the server part dont include it here
router.post('/create-coins',coinControllers.create_coin)
router.put('/update-coin-details/:id',coinControllers.update_coin)
router.delete('/delete-coin-detail/:id',coinControllers.delete_coin)
router.get('/get-all-coins',coinControllers.get_all_coins)
router.get('/get-coin/:id',coinControllers.get_coin)

module.exports = router