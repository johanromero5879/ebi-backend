import { Router } from 'express'
import {
    crearUsuario,
    obtenerUsuarioPorDocumento,
    obtenerUsuarios,
    editarUsuario
} from '../controllers/usuarios.controller'

const router = Router()

router.route('/doc/:doc')
    .get(obtenerUsuarioPorDocumento)

router.route('/')
    .post(crearUsuario)
    .get(obtenerUsuarios)

router.route('/:id')
    .put(editarUsuario)


export default router
