const userAuthController =require("../Controllers/UserAuthController")
const router = require('express').Router()

router.post('/client/client-login',userAuthController.client_login)
router.post('/client/client-register',userAuthController.client_register)
router.get('/client/get-details' ,userAuthController.getUser)
//delete_client_account
router.delete('/client/delete-client/:id',userAuthController.delete_client_account)
router.get('/client/get-all-client/:role',userAuthController.get_all_client)
router.get('/client/get-client/:userId',userAuthController.get_client)
//update_client_info
router.put('/client/update-client',userAuthController.update_client_info)
//get_all_client
// //logout
router.get('/client/logout',userAuthController.logout)


module.exports = router