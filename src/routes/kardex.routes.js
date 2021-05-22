import { Router } from 'express'
import {
    crearKardex,
    obtenerKardexPorAlm,
    obtenerDetalleKardex
} from '../controllers/kardex.controller'

const router = Router()

// router.route('/referencia/:id')
//     .get(obtenerMovimientoReferencia)

router.route('/almacen/:id')
    .get(obtenerKardexPorAlm)

router.route('/')
    .post(crearKardex)

router.route('/:id')
    .get(obtenerDetalleKardex)


export default router