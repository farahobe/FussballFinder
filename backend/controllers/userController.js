import db from '../db.js'

// Neue Location vorschlagen (initial nicht freigegeben)
export async function createLocation(req, res) {
    try {
        const {
            name,
            city,
            size,
            latitude,
            longitude,
            address,
            opening_hours,
            image_url_1,
            image_url_2,
            place_type,
            tribune,
            barrier_free,
            cost_type,
            parking,
            quality
        } = req.body

        const rating = 3
        const approved = false

        const parsedLat = latitude ? parseFloat(latitude) : null
        const parsedLng = longitude ? parseFloat(longitude) : null

        if (isNaN(parsedLat) || isNaN(parsedLng)) {
            return res.status(400).json({error: 'Ungültige Koordinatenangabe'})
        }

        const [result] = await db.query(
            `INSERT INTO locations (name, city, rating, size, latitude, longitude, address, opening_hours,
                                    image_url_1, image_url_2, place_type, tribune, barrier_free, cost_type, parking,
                                    quality, approved)
             VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [
                name,
                city,
                rating,
                size,
                parsedLat,
                parsedLng,
                address,
                opening_hours,
                image_url_1,
                image_url_2,
                place_type,
                tribune,
                barrier_free,
                cost_type,
                parking,
                quality,
                approved
            ]
        )

        res.status(201).json({id: result.insertId})
    } catch (err) {
        console.error('Fehler beim Erstellen der Location:', err)
        res.status(500).json({error: 'Fehler beim Erstellen der Location'})
    }
}

// Favorit speichern
export async function addFavorite(req, res) {
    try {
        if (!req.user || !req.user.id) {
            return res.status(401).json({error: 'Nicht authentifiziert'})
        }

        const userId = req.user.id
        const {locationId} = req.body

        if (!locationId) {
            return res.status(400).json({error: 'locationId ist erforderlich'})
        }

        await db.query(
            'INSERT IGNORE INTO favorites (user_id, location_id) VALUES (?, ?)',
            [userId, locationId]
        )

        res.status(201).json({message: 'Favorit gespeichert'})
    } catch (err) {
        console.error('Fehler beim Speichern des Favoriten:', err)
        res.status(500).json({error: 'Fehler beim Speichern des Favoriten'})
    }
}

// Favorit entfernen
export async function removeFavorite(req, res) {
    try {
        if (!req.user || !req.user.id) {
            return res.status(401).json({error: 'Nicht authentifiziert'})
        }

        const userId = req.user.id
        const locationId = req.params.locationId

        await db.query(
            'DELETE FROM favorites WHERE user_id = ? AND location_id = ?',
            [userId, locationId]
        )

        res.json({message: 'Favorit entfernt'})
    } catch (err) {
        console.error('Fehler beim Entfernen des Favoriten:', err)
        res.status(500).json({error: 'Fehler beim Entfernen des Favoriten'})
    }
}

// Favoritenstatus prüfen
export async function checkFavoriteStatus(req, res) {
    try {
        if (!req.user || !req.user.id) {
            return res.status(401).json({error: 'Nicht authentifiziert'})
        }

        const userId = req.user.id
        const locationId = req.params.locationId

        const [rows] = await db.query(
            'SELECT 1 FROM favorites WHERE user_id = ? AND location_id = ?',
            [userId, locationId]
        )

        res.json({is_favorite: rows.length > 0})
    } catch (err) {
        console.error('Fehler beim Abrufen des Favoritenstatus:', err)
        res.status(500).json({error: 'Fehler beim Abrufen des Favoritenstatus'})
    }
}

// Bewertung abgeben
export async function addRating(req, res) {
    try {
        if (!req.user || !req.user.id) {
            return res.status(401).json({ error: 'Nicht eingeloggt' });
        }

        const userId = req.user.id;
        const { locationId, rating } = req.body;

        if (!locationId || !rating || isNaN(Number(rating))) {
            return res.status(400).json({ error: 'Ungültige Daten' });
        }

        // Prüfen obb Nutzer existiert
        const [[userExists]] = await db.query(
            'SELECT id FROM users WHERE id = ?',
            [userId]
        );

        if (!userExists) {
            return res.status(401).json({ error: 'Ungültiger oder unbekannter Nutzer' });
        }

        // Prüfen ob bereits eine Bewertung existiert
        const [existing] = await db.query(
            'SELECT 1 FROM ratings WHERE user_id = ? AND location_id = ?',
            [userId, locationId]
        );

        if (existing.length > 0) {
            return res.status(400).json({ error: 'Du hast diesen Ort bereits bewertet' });
        }

        // Bewertung speichern
        await db.query(
            'INSERT INTO ratings (user_id, location_id, rating) VALUES (?, ?, ?)',
            [userId, locationId, rating]
        );

        // Durchschnitt neu berechnen
        await db.query(
            `UPDATE locations
             SET rating = (SELECT ROUND(AVG(rating), 1) FROM ratings WHERE location_id = ?)
             WHERE id = ?`,
            [locationId, locationId]
        );

        return res.status(201).json({ message: 'Bewertung gespeichert' });
    } catch (err) {
        console.error('Fehler beim Speichern der Bewertung:', err);
        return res.status(500).json({ error: err.message || 'Fehler beim Speichern der Bewertung' });
    }


}
