/**
 * Variables de entorno
 */
import { config } from 'dotenv'
config()

import express, { json } from 'express'
import cors from 'cors'

import authRoutes from './routes/auth.routes'
import librosRoutes from './routes/libros.routes'
import editorialesRoutes from './routes/editoriales.routes'
import almacenesRoutes from './routes/almacenes.routes'
import referenciasRoutes from './routes/referencias.routes'
import inventariosRoutes from './routes/inventarios.routes'
import usuariosRoutes from './routes/usuarios.routes'
import movimientosRoutes from './routes/movimientos.routes'
import kardexRoutes from './routes/kardex.routes'
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

app.use("/api/auth", authRoutes)
app.use("/api/libros", librosRoutes)
app.use("/api/editoriales", editorialesRoutes)
app.use("/api/almacenes", almacenesRoutes)
app.use("/api/referencias", referenciasRoutes)
app.use("/api/inventarios", inventariosRoutes)
app.use("/api/usuarios", usuariosRoutes)
app.use("/api/movimientos", movimientosRoutes)
app.use("/api/kardex", kardexRoutes)


export default app

