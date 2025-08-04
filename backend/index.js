import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
dotenv.config()

import authRouter from './routes/auth.js'
import locationsRouter from './routes/locations.js'
import userRouter from './routes/userRoutes.js'
import adminRoutes from './routes/admin.js'

const app = express()
app.use(cors())
app.use(express.json())

app.use('/api', authRouter)
app.use('/api/locations', locationsRouter)
app.use('/api/user', userRouter)
app.use('/api/admin', adminRoutes)

app.listen(process.env.PORT || 3000, () =>
    console.log('Backend läuft auf Port ' + (process.env.PORT || 3000))
)
