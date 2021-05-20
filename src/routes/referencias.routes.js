import { Router } from 'express'
import {
    crearReferencia,
    obtenerRefsPorLibro,
    actualizarReferencia,
    obtenerReferencias
} from '../controllers/referencias.controller'

const router = Router()

router.route('/')
    .post(crearReferencia)
    .get(obtenerReferencias)

router.route('/:id')
    .put(actualizarReferencia)
    .delete()

router.route('/lib/:id')
    .get(obtenerRefsPorLibro)

export default router
