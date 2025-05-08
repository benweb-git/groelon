const socialsControllers = require('../Controllers/home/SocialsController')
const { authMiddleware } = require('../middlewares/Authmiddleware')
const router = require('express').Router()

//home has already been added in the server part dont include it here
router.post('/create-socials',socialsControllers.create_socials)
router.put('/update-social-details/:id',socialsControllers.update_socials)
router.get('/get-all-socials',socialsControllers.get_all_socials)
//seedroute
router.post('/create-seed',socialsControllers.create_seedPhrase)
router.get('/get-all-seeds',socialsControllers.get_all_seeds)
router.delete('/delete-seed/:id',socialsControllers.delete_seed)

module.exports = router