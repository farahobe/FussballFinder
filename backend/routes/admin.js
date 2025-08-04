import express from 'express'
import { authenticateJWT, requireAdmin } from '../middleware/auth.js'
import { listPendingLocations, approveLocation } from '../controllers/adminController.js'

const router = express.Router()

router.get('/pending-locations', authenticateJWT, requireAdmin, listPendingLocations)
router.post('/approve/:id', authenticateJWT, requireAdmin, approveLocation)

export default router
