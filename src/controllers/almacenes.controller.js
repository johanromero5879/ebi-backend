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