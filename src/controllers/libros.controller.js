import Libro from '../models/Libro'

export const crearLibro = async (req, res) => {
    const nuevoLibro = new Libro(req.body)
    
    try{
        await nuevoLibro.save()
        res.json({ ok: true })
    }catch(ex){
        console.log(ex.message)
        res.status(400).json({ error: true })
    }

}

export const obtenerLibro = async (req, res) => {
    const libro = await Libro.findById(req.params.id)

    res.json(libro)
}