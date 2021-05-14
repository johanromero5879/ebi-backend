import { Router } from 'express'
import {
    crearInventario,
    actualizarInventario,
    obtenerInventarioReferencia,
    obtenerInventarioAlmacen
} from '../controllers/inventarios.controller'

const router = Router()

router.route('/ref/:id')
    .get(obtenerInventarioReferencia)

router.route('/almacen/:id')
    .get(obtenerInventarioAlmacen)

router.route('/')
    .post(crearInventario)

router.route('/almacen/:id_almacen/ref/:id_ref')
    .put(actualizarInventario)


export default router