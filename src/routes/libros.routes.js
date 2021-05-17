import { Router } from 'express'
import {
    crearLibro,
    obtenerLibro,
    eliminarLibro,
    actualizarLibroIsbn,
    actualizarLibroTitulo,
    actualizarLibroAutor,
    actualizarLibroCategoria,
    actualizarLibroTema,
    actualizarLibroAnio
} from '../controllers/libros.controller'

const router = Router()

router.route('/:id')
    .get(obtenerLibro)

router.route('/')
    .post(crearLibro)

router.route('/delete')
    .delete(eliminarLibro)

router.route('/actualizar/isbn/:id')
    .put(actualizarLibroIsbn)

router.route('/actualizar/titulo/:id')
    .put(actualizarLibroTitulo)

router.route('/actualizar/autor/:id')
    .put(actualizarLibroAutor)

router.route('/actualizar/categoria/:id')
    .put(actualizarLibroCategoria)

router.route('/actualizar/tema/:id')
    .put(actualizarLibroTema)

router.route('/actualizar/anio/:id')
    .put(actualizarLibroAnio)

export default router