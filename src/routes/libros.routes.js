import { Router } from 'express'

const router = Router()

router.route('/')
    .post((req, res) => {
        res.json("Libros")
    })


export default router