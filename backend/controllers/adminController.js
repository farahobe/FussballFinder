import db from '../db.js'

export async function listPendingLocations(req, res) {
    try {
        const [rows] = await db.query('SELECT * FROM locations WHERE approved = FALSE')
        res.json(rows)
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}

export async function approveLocation(req, res) {
    const { id } = req.params
    try {
        await db.query('UPDATE locations SET approved = TRUE WHERE id = ?', [id])
        res.json({ message: 'Location genehmigt' })
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}
