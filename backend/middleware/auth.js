import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config()

const JWT_SECRET = process.env.JWT_SECRET || 'changeme'

export function authenticateJWT(req, res, next) {
    const authHeader = req.headers.authorization

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ error: 'Kein Token übermittelt' })
    }

    const token = authHeader.split(' ')[1]

    if (!token || token === 'null') {
        return res.status(401).json({ error: 'Ungültiger Token' })
    }

    try {
        const payload = jwt.verify(token, JWT_SECRET)
        req.user = payload
        return next()
    } catch (err) {
        console.error('JWT ungültig:', err.message)
        return res.status(401).json({ error: 'Token ungültig oder abgelaufen' })
    }
}

export function requireAdmin(req, res, next) {
    if (!req.user?.is_admin) {
        return res.status(403).json({ error: 'Nur für Admins erlaubt' })
    }
    next()
}

export function authorize(...roles) {
    return (req, res, next) => {
        const { is_admin } = req.user || {}

        if (roles.includes('admin') && !is_admin) {
            return res.status(403).json({ error: 'Zugriff verweigert (nur Admins)' })
        }

        next()
    }
}
