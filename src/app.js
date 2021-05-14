/**
 * Variables de entorno
 */
import { config } from 'dotenv'
config()

import express, { json } from 'express'
import cors from 'cors'

import librosRoutes from './routes/libros.routes'
import editorialesRoutes from './routes/editoriales.routes'
import almacenesRoutes from './routes/almacenes.routes'
import referenciasRoutes from './routes/referencias.routes'
import movimientoRoutes from './routes/movimientos.routes'

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

app.use("/api/libros", librosRoutes)
app.use("/api/editoriales", editorialesRoutes)
app.use("/api/almacenes", almacenesRoutes)
app.use("/api/referencias", referenciasRoutes)
app.use("/api/movimientos", movimientoRoutes)

export default app

