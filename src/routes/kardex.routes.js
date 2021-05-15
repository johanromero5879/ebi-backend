import { Router } from 'express'
import {
    crearKardex
} from '../controllers/kardex.controller'

const router = Router()

/*router.route('/referencia/:id')
    .get(obtenerMovimientoReferencia)

router.route('/almacen/:id')
    .get(obtenerMovimientoAlmacen)*/

router.route('/')
    .post(crearKardex)


export default router