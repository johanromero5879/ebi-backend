import Inventario from '../models/Inventario'

export const crearInventario = async (req, res) => {
    const nuevoInventario = new Inventario(req.body)
    
    try{
        await nuevoInventario.save()
        res.json({ ok: true })
    }catch(ex){
        console.log(ex.message)
        res.status(400).json({ error: true })
    }
}

export const obtenerInventarioReferencia = async (req, res) => {
    const inventario = await Inventario.find({referencia:req.params.id})

    res.json(inventario)
}
export const obtenerInventarioAlmacen = async (req, res) => {
    const inventario = await Inventario.find({almacen:req.params.id})

    res.json(inventario)
}
export const actualizarInventario = async (req, res) => {
    try{
    const update = {
        $inc:{
            cantidad:req.body.cantidad
        }
    }
    await Inventario.updateOne({almacen:req.params.id_almacen,referencia:req.params.id_ref},update)
    
    res.json({
        ok:true
    })
    }catch(ex){
        console.log(ex.message)
        res.status(400).json({ error: true })
    }
}