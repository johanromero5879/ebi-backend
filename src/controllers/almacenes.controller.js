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

//Eliminar almacen Por ID
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
export const actualizarAlmacen = async (req,res) => { // actualizar nombre del almacen
    const almacen = await Almacen.findById(req.params.id)
    try {  
        await Almacen.updateOne({_id: almacen.id},req.body)
        res.json({ok: true})
    }catch(ex){
        console.log(ex.message)
        res.status(400).json({ error: true, message:"Fallo al actualizar almacen"})
    }
}

