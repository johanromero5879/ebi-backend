import Almacen from '../models/Almacen'

export const obtenerAlmacenes = async (req, res) => {
    const almacenes = await Almacen.find()
    
    res.json(almacenes)
}

export const crearAlmacen = async (req, res) => {
    const nuevoAlmacen = new Almacen(req.body)

    try{
        await nuevoAlmacen.save()
        res.json({ ok: true })
    }catch(ex){
        console.log(ex.message)
        res.status(400).json({ error: true })
    }
}

//Eliminar Libros Por ID
export const eliminarAlmacen = async (req,res) =>{
    try{
        let almacen  = await Almacen.deleteOne({_id: req.body.id}) 
        res.json({ message: "El Almacen se elimino correctamente" })
    }catch(ex){
        console.log(ex.message)
        res.status(400).json({ error: true })
    }
}
//Actualizar datos de almacen
export const actualizarAlmacenNombre = async (req,res) => { // actualizar nombre del almacen
    const almacen = await Almacen.findById(req.params.id)

    try {
        const update = {
        nombre: req.body.nombre 
        }    
    await Almacen.updateOne({_id: almacen.id},update)
        res.json({ok: true})
    }catch(ex){
        console.log(ex.message)
        res.status(400).json({ error: true })
    }
}
export const actualizarAlmacenDireccion = async (req,res) => { // actualizar dirección del almacen
    const almacen = await Almacen.findById(req.params.id)

    try {
        const update = {
        direccion: req.body.direccion 
        }    
    await Almacen.updateOne({_id: almacen.id},update)
        res.json({ok: true})
    }catch(ex){
        console.log(ex.message)
        res.status(400).json({ error: true })
    }
}
export const actualizarAlmacenTelefono = async (req,res) => { // actualizar telefono del almacen
    const almacen = await Almacen.findById(req.params.id)

    try {
        const update = {
        telefono: req.body.telefono 
        }    
    await Almacen.updateOne({_id: almacen.id},update)
        res.json({ok: true})
    }catch(ex){
        console.log(ex.message)
        res.status(400).json({ error: true })
    }
}
export const actualizarAlmacenCorreo = async (req,res) => { // actualizar correo del almacen
    const almacen = await Almacen.findById(req.params.id)

    try {
        const update = {
        correo: req.body.correo 
        }    
    await Almacen.updateOne({_id: almacen.id},update)
        res.json({ok: true})
    }catch(ex){
        console.log(ex.message)
        res.status(400).json({ error: true })
    }
}
