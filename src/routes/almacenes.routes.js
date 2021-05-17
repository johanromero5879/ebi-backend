import { Router } from 'express'
import { 
    obtenerAlmacenes,
    crearAlmacen,
    eliminarAlmacen,
    actualizarAlmacenNombre,
    actualizarAlmacenDireccion,
    actualizarAlmacenTelefono,
    actualizarAlmacenCorreo

} from '../controllers/almacenes.controller'

const router = Router()

router.route('/')
    .get(obtenerAlmacenes)
    .post(crearAlmacen)

router.route('/delete')
    .delete(eliminarAlmacen)

router.route('/actualizar/nombre/:id')
    .put(actualizarAlmacenNombre)

router.route('/actualizar/direccion/:id')
    .put(actualizarAlmacenDireccion)

router.route('/actualizar/telefono/:id')
    .put(actualizarAlmacenTelefono)

router.route('/actualizar/correo/:id')
    .put(actualizarAlmacenCorreo)

export default router