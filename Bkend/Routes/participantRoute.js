const participantControllers = require('../Controllers/home/participantController')
const { authMiddleware } = require('../middlewares/Authmiddleware')
const router = require('express').Router()

//participant has already been added in the server part dont include it here
router.post('/create-client',participantControllers.create_client)
//trasaction_Confirm
router.post('/trasaction-Confirm',participantControllers.create_trasaction)
router.get('/get-user-transactions/:userId',participantControllers.get_all_user_transactions)
//particpant
router.delete('/delete-transactions/:id',participantControllers.delete_transaction)
//router.get('/get-all-client',participantControllers.get_all_clients)
router.get('/get-client/:coinName',participantControllers.get_network)
// router.get('/get-participant/:email',participantControllers.get_participant)
router.get('/get-transactions',participantControllers.get_all_transactions)
router.put('/update-transaction/:id/:confirmationStatus',participantControllers.update_transaction)


//contacts
router.post('/create-contact',participantControllers.create_contact)
router.delete('/delete-contact/:id',participantControllers.delete_contact)
router.get('/get-contacts',participantControllers.get_contacts)


module.exports = router