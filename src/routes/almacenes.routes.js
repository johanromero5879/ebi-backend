import { Router } from 'express'
import { 
    obtenerAlmacenes,
    crearAlmacen,
    eliminarAlmacen,
    actualizarAlmacen,

} from '../controllers/almacenes.controller'

const router = Router()

router.route('/')
    .get(obtenerAlmacenes)
    .post(crearAlmacen)

router.route('/eliminar')
    .delete(eliminarAlmacen)

router.route('/actualizar/nombre/:id')
    .put(actualizarAlmacen)

export default router