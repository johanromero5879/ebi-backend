import Inventario from '../models/Inventario'
import Movimiento from '../models/Movimiento'

export const crearMovimiento = async (req, res) => {
    try{
        const id_almacen=req.body.almacen
        const id_referencia=req.body.referencia
        let ver_inven= await Inventario.findOne({
            almacen: id_almacen,
            referencia: id_referencia
        })
        if(req.body.tipo == "adquisicion" || req.body.tipo == "dev_distribucion"){ //se compara adquicion o devolucion de distribucion teniendo en cuenta la cantidad del req
            console.log("suma: " + req.body.tipo)
            const nuevoMovimiento = new Movimiento(req.body)
            await nuevoMovimiento.save() //agregar el nuevo movimiento
            res.json({ ok: true })
        }else if(req.body.tipo == "dev_adquisicion" || req.body.tipo == "distribucion"){//se compara devolucion adquicion o distribucion teniendo en cuenta la cantidad del req
            console.log("resta: " + req.body.tipo)
            try{
                if(ver_inven.cantidad>=req.body.cantidad){
                    const nuevoMovimiento = new Movimiento(req.body)
                    await nuevoMovimiento.save() //agregar el nuevo movimiento
                    res.json({ ok: true })
                }else{ex2}
            }catch(ex2){
                    console.log(ex2.message)
                    res.status(400).json({ error: true,message: "La cantidad solicitada no puede ser mayor a la cantidad existente"})
            }
        }else{ex}
    }catch(ex){
            console.log(ex.message)
            res.status(400).json({ error: true, message: "Tipo no valido" })
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