import { Router } from 'express'
import { 
    obtenerEditoriales,
    crearEditorial
} from '../controllers/editorales.controller'

const router = Router()

router.route('/')
    .get(obtenerEditoriales)
    .post(crearEditorial)

export default router