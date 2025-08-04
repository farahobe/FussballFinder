import { jest } from '@jest/globals'

// ESM-kompatible dynamische Mocks
const bcrypt = {
    compare: jest.fn(),
    hash: jest.fn()
}
jest.unstable_mockModule('bcryptjs', () => ({ default: bcrypt }))

const jwt = {
    sign: jest.fn()
}
jest.unstable_mockModule('jsonwebtoken', () => ({ default: jwt }))

const db = {
    query: jest.fn()
}
jest.unstable_mockModule('../db.js', () => ({ default: db }))

// Controller-Module dynamisch importieren (nach Mocks!)
const { loginController, registerController } = await import('../controllers/authController.js')
const { addFavorite, addRating, createLocation } = await import('../controllers/userController.js')
const { getLocationById } = await import('../controllers/locationsController.js')

function mockReqRes(body = {}, params = {}, user = {}) {
    return {
        req: { body, params, user },
        res: {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        }
    }
}

describe('Unit Tests TC1–TC8', () => {
    beforeEach(() => {
        jest.clearAllMocks()
    })

    test('TC1: Login mit gültigen Zugangsdaten', async () => {
        const { req, res } = mockReqRes({ username: 'test', password: 'pw' })
        db.query.mockResolvedValueOnce([[{ id: 1, password: 'hash', role: 'user' }]])
        bcrypt.compare.mockResolvedValue(true)
        jwt.sign.mockReturnValue('token')

        await loginController(req, res)
        expect(res.json).toHaveBeenCalledWith({ token: 'token' })
    })

    test('TC2: Registrierung mit gültigen Daten', async () => {
        const { req, res } = mockReqRes({ username: 'new', password: 'pw' })
        db.query
            .mockResolvedValueOnce([[]])                                 // kein User vorhanden
            .mockResolvedValueOnce([{ insertId: 2 }])                    // User wird erstellt
            .mockResolvedValueOnce([[{ id: 2, role: 'user' }]])          // User abrufen
        bcrypt.hash.mockResolvedValue('hashedpw')
        jwt.sign.mockReturnValue('regToken')

        await registerController(req, res)
        expect(res.json).toHaveBeenCalledWith({ token: 'regToken' })
    })

    test('TC3: Registrierung mit vorhandenem Username', async () => {
        const { req, res } = mockReqRes({ username: 'exists', password: 'pw' })
        db.query.mockResolvedValueOnce([[{ id: 1 }]])
        await registerController(req, res)
        expect(res.status).toHaveBeenCalledWith(409)
    })

    test('TC4: Favorisieren einer Location', async () => {
        const { req, res } = mockReqRes({ locationId: 10 }, {}, { id: 1 })
        db.query.mockResolvedValueOnce({ affectedRows: 1 })
        await addFavorite(req, res)
        expect(res.status).toHaveBeenCalledWith(201)
        expect(res.json).toHaveBeenCalledWith({ message: 'Favorit gespeichert' })
    })

    test('TC5: Bewertung einer Location', async () => {
        const { req, res } = mockReqRes({ locationId: 2, rating: 4 }, {}, { id: 1 })
        db.query
            .mockResolvedValueOnce([[{ id: 1 }]]) // Nutzer existiert
            .mockResolvedValueOnce([[]])          // keine Bewertung vorhanden
            .mockResolvedValueOnce([{ affectedRows: 1 }]) // Bewertung speichern
            .mockResolvedValueOnce([{ affectedRows: 1 }]) // Durchschnitt aktualisieren
        await addRating(req, res)
        expect(res.status).toHaveBeenCalledWith(201)
        expect(res.json).toHaveBeenCalledWith({ message: 'Bewertung gespeichert' })
    })

    test('TC6: Location vorschlagen', async () => {
        const newLoc = {
            name: 'Testplatz',
            city: 'Mainz',
            size: 'groß',
            latitude: '49.0',
            longitude: '8.0',
            address: 'Musterstraße',
            opening_hours: 'immer',
            image_url_1: '',
            image_url_2: '',
            place_type: 'Bolzplatz',
            tribune: false,
            barrier_free: true,
            cost_type: 'kostenlos',
            parking: true,
            quality: 'gut'
        }
        const { req, res } = mockReqRes(newLoc)
        db.query.mockResolvedValueOnce([{ insertId: 999 }]) // passt zum echten Code
        await createLocation(req, res)
        expect(res.status).toHaveBeenCalledWith(201)
    })

    test('TC8: Interaktive Karte – Marker Details', async () => {
        const { req, res } = mockReqRes({}, { id: 5 }, { id: 1 })
        db.query.mockResolvedValueOnce([[{ id: 5, name: 'Platz A' }]])
        await getLocationById(req, res)
        expect(res.json).toHaveBeenCalledWith({ id: 5, name: 'Platz A' }) // kein Array außenrum!
    })

    // TC7 ist Frontend
})
