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
    .delete(eliminarLibro)
    .put(actualizarLibro)

router.route('/')
    .get(obtenerLibros)
    .post(crearLibro)
    

export default router