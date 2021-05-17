import { Router } from 'express'
import { 
    obtenerAlmacenes,
    crearAlmacen,
    eliminarAlmacen
} from '../controllers/almacenes.controller'

const router = Router()

router.route('/')
    .get(obtenerAlmacenes)
    .post(crearAlmacen)

router.route('/delete')
    .delete(eliminarAlmacen)

export default router