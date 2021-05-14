import Movimiento from '../models/Movimiento'

export const crearMovimiento = async (req, res) => {
    const nuevoMovimientos = new Movimiento(req.body)
    
    try{
        await nuevoMovimientos.save()
        res.json({ ok: true })
    }catch(ex){
        console.log(ex)
        res.status(400).json({ error: true })
    }

}

    export const obtenerMovimientoReferencia = async (req, res) => {
    const movimientos = await Movimiento.find({referencia:req.params.id})

    res.json(movimientos)
}
    
    export const obtenerMovimientoAlmacen = async (req, res) => {
    const movimientos = await Movimiento.find({almacen:req.params.id})

    res.json(movimientos)
}