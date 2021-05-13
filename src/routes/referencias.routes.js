import { Router } from 'express'
import {
    crearReferencia
} from '../controllers/referencias.controller'

const router = Router()

router.route('/')
    .post(crearReferencia)

export default router
