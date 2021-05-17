import Inventario from '../models/Inventario'
import Movimiento from '../models/Movimiento'
import { actualizarInventario } from './inventarios.controller'



export const crearMovimiento = async (req, res) => { // crea nuevo movimiento con su respectiva cargue o descargue de inventarios
    try{
        const id_almacen=req.body.almacen
        const id_referencia=req.body.referencia
        let ver_inven= await Inventario.findOne({
            almacen: id_almacen,
            referencia: id_referencia
        })
        if(req.body.tipo == "adquisicion" || req.body.tipo == "dev_distribucion"){ //se compara adquicion o devolucion de distribucion teniendo en cuenta la cantidad del req
            const nuevoMovimiento = new Movimiento(req.body)
            await nuevoMovimiento.save() //agregar el nuevo movimiento
            actualizarInventario(req.body.cantidad,id_almacen,id_referencia)
            res.json({ ok: true })
        }else if(req.body.tipo == "dev_adquisicion" || req.body.tipo == "distribucion"){//se compara devolucion adquicion o distribucion teniendo en cuenta la cantidad del req
            try{
                if(ver_inven.cantidad>=req.body.cantidad){
                    const nuevoMovimiento = new Movimiento(req.body)
                    await nuevoMovimiento.save() //agregar el nuevo movimiento
                    actualizarInventario(-req.body.cantidad,id_almacen,id_referencia)
                    res.json({ ok: true })
                }else{ 
                    throw "La cantidad solicitada no puede ser mayor a la cantidad existente"
                }
            }catch(ex2){
                    res.status(400).json({ error: true,message:ex2})
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