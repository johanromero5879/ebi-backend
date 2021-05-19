import { Router } from 'express'
import {
    crearLibro,
    obtenerLibro,
    eliminarLibro,
    actualizarLibro,
    obtenerLibros
} from '../controllers/libros.controller'

const router = Router()

router.route('/:id')
    .get(obtenerLibro)

router.route('/')
    .get(obtenerLibros)
    .post(crearLibro)

router.route('/eliminar/:id')
    .delete(eliminarLibro)

router.route('/actualizar/:id')
    .put(actualizarLibro)

export default router