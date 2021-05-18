import { Router } from 'express'
import {
    crearLibro,
    obtenerLibro,
    eliminarLibro,
    actualizarLibro
} from '../controllers/libros.controller'

const router = Router()

router.route('/:id')
    .get(obtenerLibro)

router.route('/')
    .post(crearLibro)

router.route('/eliminar/:id')
    .delete(eliminarLibro)

router.route('/actualizar/:id')
    .put(actualizarLibro)

export default router