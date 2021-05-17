import { Router } from 'express'
import { 
    obtenerEditoriales,
    crearEditorial,
    obtenerEditorial,
    eliminarEditorial,
    actualizarEditorialesNombre,
    actualizarEditorialesDireccion,
    actualizarEditorialesTelefono,
    actualizarEditorialesCorreo
} from '../controllers/editorales.controller'

const router = Router()

router.route('/')
    .get(obtenerEditoriales)
    .post(crearEditorial)

router.route('/:id')
    .get(obtenerEditorial)

router.route('/delete')
    .delete(eliminarEditorial)

router.route('/actualizar/nombre/:id')
    .put(actualizarEditorialesNombre)

router.route('/actualizar/direccion/:id')
    .put(actualizarEditorialesDireccion)

router.route('/actualizar/telefono/:id')
    .put(actualizarEditorialesTelefono)

router.route('/actualizar/correo/:id')
    .put(actualizarEditorialesCorreo)

export default router