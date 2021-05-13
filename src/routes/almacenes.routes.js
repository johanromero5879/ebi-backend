import { Router } from 'express'
import { 
    obtenerAlmacenes,
    crearAlmacen
} from '../controllers/almacenes.controller'

const router = Router()

router.route('/')
    .get(obtenerAlmacenes)
    .post(crearAlmacen)

export default router