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
export const actualizarLibroIsbn = async (req,res) => { // actualizar isbn del libro
    const libro = await Libro.findById(req.params.id)

    try {
        const update = {
        isbn: req.body.isbn 
        }    
    await Libro.updateOne({_id: libro.id},update)
        res.json({ok: true})
    }catch(ex){
        console.log(ex.message)
        res.status(400).json({ error: true })
    }
}

export const actualizarLibroTitulo = async (req,res) => { // actualizar titulo del libro
    const libro = await Libro.findById(req.params.id)

    try {
        const update = {
        titulo: req.body.titulo 
        }    
    await Libro.updateOne({_id: libro.id},update)
        res.json({ok: true})
    }catch(ex){
        console.log(ex.message)
        res.status(400).json({ error: true })
    }
}

export const actualizarLibroAutor = async (req,res) => { // actualizar autor del libro
    const libro = await Libro.findById(req.params.id)

    try {
        const update = {
            autor: req.body.autor 
        }    
    await Libro.updateOne({_id: libro.id},update)
        res.json({ok: true})
    }catch(ex){
        console.log(ex.message)
        res.status(400).json({ error: true })
    }
}

export const actualizarLibroCategoria = async (req,res) => { // actualizar categoria del libro
    const libro = await Libro.findById(req.params.id)

    try {
        const update = {
            categoria: req.body.categoria 
        }    
    await Libro.updateOne({_id: libro.id},update)
        res.json({ok: true})
    }catch(ex){
        console.log(ex.message)
        res.status(400).json({ error: true })
    }
}

export const actualizarLibroTema = async (req,res) => { // actualizar tema del libro
    const libro = await Libro.findById(req.params.id)

    try {
        const update = {
            tema: req.body.tema 
        }    
    await Libro.updateOne({_id: libro.id},update)
        res.json({ok: true})
    }catch(ex){
        console.log(ex.message)
        res.status(400).json({ error: true })
    }
}

export const actualizarLibroAnio = async (req,res) => { // actualizar Año del libro
    const libro = await Libro.findById(req.params.id)

    try {
        const update = {
            anio: req.body.anio 
        }    
    await Libro.updateOne({_id: libro.id},update)
        res.json({ok: true})
    }catch(ex){
        console.log(ex.message)
        res.status(400).json({ error: true })
    }
}
