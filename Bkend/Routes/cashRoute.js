const CashPayController = require('../Controllers/home/CashPayController')
const router = require('express').Router()

//cash has already been added in the server part dont include it here
router.post('/create-cash',CashPayController.create_cash)
router.put('/update-cash-details/:id',CashPayController.update_cash)
router.delete('/delete-cash-detail/:id',CashPayController.delete_cash)
router.get('/get-all-cash',CashPayController.get_all_cashes)
router.get('/get-cash/:id',CashPayController.get_cash)

module.exports = router