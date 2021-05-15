import Inventario from '../models/Inventario'
import Movimiento from '../models/Movimiento'

/*export const crearMovimiento = async (req, res) => {
    const nuevoMovimientos = new Movimiento(req.body)
    
    try{
        await nuevoMovimientos.save()
        res.json({ ok: true })
    }catch(ex){
        console.log(ex.message)
        res.status(400).json({ error: true })
    }

}*/
export const crearMovimiento = async (req, res) => {
    try{
        //const nuevoMovimientos = new Movimiento(req.body)
        const id_almacen=req.body.almacen
        const id_referencia=req.body.referencia
        let ver_inven= await Inventario.findOne({
            almacen: id_almacen,
            referencia: id_referencia
        })
        try{
        if(ver_inven.cantidad>=req.body.cantidad){
            const nuevoMovimiento = new Movimiento(req.body)
            await nuevoMovimiento.save() //agregar el nuevo movimiento
            console.log(ver_inven.cantidad)
            console.log(req.body.cantidad)
            res.json({ ok: true })
        }}catch(ex){
            console.log(ex.message)
            res.status(400).json({ error: true,message: "La cantidad solicitada no puede ser mayor a la cantidad existente"})
    }
        /*else{
            res.json({ok: false})
            res.status(400).json({ error: true, message: "La cantidad solicitada no puede ser mayor a la cantidad existente"})
        }*/ 
    }catch(ex){
            console.log(ex.message)
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