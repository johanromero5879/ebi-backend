import { Router } from 'express'
import {
    crearMovimiento,
    obtenerMovimientoReferencia,
    obtenerMovimientoAlmacen
} from '../controllers/movimiento.controller'

const router = Router()

router.route('/referencia/:id')
    .get(obtenerMovimientoReferencia)

router.route('/almacen/:id')
    .get(obtenerMovimientoAlmacen)

router.route('/')
    .post(crearMovimiento)


export default router