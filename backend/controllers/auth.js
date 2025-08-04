import db from '../db.js'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

export async function registerController(req, res) {
    try {
        const { username, password } = req.body
        if (!username || !password) {
            return res.status(400).json({ error: 'Username und Passwort benötigt' })
        }

        const [existing] = await db.query('SELECT id FROM users WHERE username = ?', [username])
        if (existing.length > 0) {
            return res.status(409).json({ error: 'Username schon vergeben' })
        }

        const hashed = await bcrypt.hash(password, 10)
        await db.query(
            'INSERT INTO users (username, password, role) VALUES (?, ?, ?)',
            [username, hashed, 'user']
        )

        const [rows] = await db.query('SELECT id, role FROM users WHERE username = ?', [username])
        const user = rows[0]
        const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, {
            expiresIn: process.env.JWT_EXPIRES_IN
        })

        res.json({ token, role: user.role })
    } catch (err) {
        console.error('Error in registerController:', err)
        res.status(500).json({ error: 'Fehler bei der Registrierung' })
    }
}

export async function loginController(req, res) {
    try {
        const { username, password } = req.body
        if (!username || !password) {
            return res.status(400).json({ error: 'Username und Passwort benötigt' })
        }

        const [rows] = await db.query('SELECT id, password, role FROM users WHERE username = ?', [username])
        if (rows.length === 0) {
            return res.status(401).json({ error: 'Ungültiger Login' })
        }

        const user = rows[0]
        const match = await bcrypt.compare(password, user.password)
        if (!match) {
            return res.status(401).json({ error: 'Ungültiger Login' })
        }

        const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, {
            expiresIn: process.env.JWT_EXPIRES_IN
        })
        res.json({ token, role: user.role })
    } catch (err) {
        console.error('Error in loginController:', err)
        res.status(500).json({ error: 'Fehler beim Login' })
    }
}
