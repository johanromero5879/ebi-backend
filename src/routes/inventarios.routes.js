import { Router } from 'express'
import {
    crearInventario,
    actualizarInventario,
    obtenerInventarioLibro,
    obtenerInventarioAlmacen
} from '../controllers/inventarios.controller'

const router = Router()

router.route('/libro/:id')
    .get(obtenerInventarioLibro)

router.route('/almacen/:id')
    .get(obtenerInventarioAlmacen)

router.route('/')
    .post(crearInventario)

router.route('/almacen/:id_almacen/libro/:id_libro')
    .put(actualizarInventario)


export default router