import express from 'express'
import { authenticateJWT } from '../middleware/auth.js'
import {
    createLocation,
    addFavorite,
    addRating,
    checkFavoriteStatus,
    removeFavorite
} from '../controllers/userController.js'
import db from '../db.js'

const router = express.Router()

router.post('/locations', authenticateJWT, createLocation)
router.post('/favorites', authenticateJWT, addFavorite)
router.get('/favorites/:locationId', authenticateJWT, checkFavoriteStatus)
router.delete('/favorites/:locationId', authenticateJWT, removeFavorite)
router.post('/rating', authenticateJWT, addRating)

router.get('/rating', authenticateJWT, async (req, res) => {
    try {
        const userId = req.user.id
        const [rows] = await db.query(
            'SELECT * FROM ratings WHERE user_id = ?',
            [userId]
        )
        res.json(rows)
    } catch (err) {
        console.error('Fehler beim Laden der Bewertungen:', err)
        res.status(500).json({ error: 'Fehler beim Laden der Bewertungen' })
    }
})

export default router
