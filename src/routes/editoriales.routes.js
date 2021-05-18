import { Router } from 'express'
import { 
    obtenerEditoriales,
    crearEditorial,
    obtenerEditorial,
    eliminarEditorial,
    actualizarEditoriales
} from '../controllers/editorales.controller'

const router = Router()

router.route('/')
    .get(obtenerEditoriales)
    .post(crearEditorial)

router.route('/:id')
    .get(obtenerEditorial)

router.route('/eliminar/:id')
    .delete(eliminarEditorial)

router.route('/actualizar/:id')
    .put(actualizarEditoriales)

export default router