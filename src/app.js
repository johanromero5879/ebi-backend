/**
 * Variables de entorno
 */
import { config } from 'dotenv'
config()

import express, { json } from 'express'
import cors from 'cors'

const app = express()

/**
 * Configuraciones
 */

app.set('port', process.env.PORT || 3000)

/**
 * Middlewares
 */

app.use(json())
app.use(cors())

/**
 * Routes
 */

app.get("/", (req, res) => {
    res.send("Proyecto EBI Easy Book Inventory")
})

export default app

