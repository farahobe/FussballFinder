import db from '../db.js'

export async function getAllLocations(req, res) {
    try {
        const userId = req.user?.id || null

        const [rows] = await db.query(`
            SELECT
                l.*,
                EXISTS (
                    SELECT 1 FROM favorites f
                    WHERE f.location_id = l.id AND f.user_id = ?
                ) AS is_favorite
            FROM locations l
            WHERE l.approved = true
        `, [userId])

        res.json(rows)
    } catch (err) {
        console.error('Fehler beim Abrufen der Orte:', err)
        res.status(500).json({ error: err.message })
    }
}

// Einzelne freigegebene Location abrufen, inkl. Favoritenstatus
export async function getLocationById(req, res) {
    try {
        const userId = req.user?.id || null
        const locationId = req.params.id

        const [rows] = await db.query(`
            SELECT
                l.*,
                EXISTS (
                    SELECT 1 FROM favorites f
                    WHERE f.location_id = l.id AND f.user_id = ?
                ) AS is_favorite
            FROM locations l
            WHERE l.id = ? AND l.approved = true
        `, [userId, locationId])

        if (rows.length === 0) {
            return res.status(404).json({ error: 'Nicht gefunden' })
        }

        res.json(rows[0])
    } catch (err) {
        console.error('Fehler beim Abrufen der Location:', err)
        res.status(500).json({ error: err.message })
    }
}
