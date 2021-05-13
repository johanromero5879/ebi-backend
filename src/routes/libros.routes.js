import { Router } from 'express'
import {
    crearLibro,
    obtenerLibro
} from '../controllers/libros.controller'

const router = Router()

router.route('/:id')
    .get(obtenerLibro)

router.route('/')
    .post(crearLibro)


export default router