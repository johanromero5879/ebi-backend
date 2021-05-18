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

//Eliminar Libros Por ID
export const eliminarLibro = async (req,res) =>{
    try{
        let libro  = await Libro.deleteOne({_id: req.body.id}) 
        res.json({ message: "El libro se elimino correctamente" })
    }catch(ex){
        console.log(ex.message)
        res.status(400).json({ error: true })
    }
}

//Actualizar datos de Libros
export const actualizarLibro = async (req,res) => {
    const libro = await Libro.findById(req.params.id)

    try { 
    await Libro.updateOne({_id: libro.id},req.body)
        res.json({ok: true})
    }catch(ex){
        console.log(ex.message)
        res.status(400).json({ error: true, message: "Fallo en actualizar el datos"})
    }
}