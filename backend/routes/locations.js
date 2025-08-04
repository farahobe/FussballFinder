import { Router } from 'express'
import { authenticateJWT } from '../middleware/auth.js'
import { getAllLocations, getLocationById } from '../controllers/locationsController.js'

const router = Router()


router.get('/', getAllLocations)
router.get('/:id', getLocationById)


export default router
