import { Router } from 'express'
import { 
    obtenerEditoriales,
    crearEditorial,
    obtenerEditorial
} from '../controllers/editorales.controller'

const router = Router()

router.route('/')
    .get(obtenerEditoriales)
    .post(crearEditorial)

router.route('/:id')
    .get(obtenerEditorial)

export default router