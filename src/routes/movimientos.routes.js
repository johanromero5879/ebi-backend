import { Router } from 'express'
import {
    crearMovimiento,
    obtenerMovimientoReferencia,
    obtenerMovimientoAlmacen,
    obtenerMovimientos
} from '../controllers/movimiento.controller'

const router = Router()

router.route('/referencia/:id')
    .get(obtenerMovimientoReferencia)

router.route('/almacen/:id')
    .get(obtenerMovimientoAlmacen)

router.route('/')
    .post(crearMovimiento)
    .get(obtenerMovimientos)


export default router