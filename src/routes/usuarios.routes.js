import { Router } from 'express'
import {
    crearUsuario,
    obtenerUsuarioPorDocumento
} from '../controllers/usuarios.controller'

const router = Router()

router.route('/doc/:doc')
    .get(obtenerUsuarioPorDocumento)

router.route('/')
    .post(crearUsuario)


export default router
