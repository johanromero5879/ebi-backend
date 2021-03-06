import Inventario from '../models/Inventario'
import Movimiento from '../models/Movimiento'
import { actualizarInventario } from './inventarios.controller'

const crearInventario = async(almacen, referencia) => {
    const inventario = new Inventario({ almacen, referencia })
    await inventario.save()

    return inventario
}

export const crearMovimiento = async (req, res) => { // crea nuevo movimiento con su respectiva cargue o descargue de inventarios
    const { movimientos } = req.body
    try{
        for(const movimiento of movimientos){
            const { almacen, referencia, tipo } = movimiento
            let { cantidad } = movimiento
            let ver_inven= await Inventario.findOne({ almacen, referencia })

            if(!ver_inven)
                ver_inven = await crearInventario(almacen, referencia)

            if(tipo == "dev_adquisicion" || tipo == "distribucion"){//se compara devolucion adquicion o distribucion teniendo en cuenta la cantidad del req
                
                if(ver_inven.cantidad>=cantidad){
                    cantidad = -cantidad
                }else{ 
                    throw "La cantidad solicitada no puede ser mayor a la cantidad existente"
                }
            }else if(tipo != "adquisicion" && tipo != "dev_distribucion"){
                throw "El tipo de movimiento no es valido"
            }


            const nuevoMovimiento = new Movimiento(movimiento)
            await nuevoMovimiento.save() //agregar el nuevo movimiento
            actualizarInventario(cantidad,almacen,referencia)
        }
        res.json({ ok: true })
    }catch(ex){
        console.log(ex)
        res.status(400).json({ error: true, message: ex })
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

export const obtenerMovimientos = async (req, res) => {
    const movimientos = await Movimiento.find()
                                .populate({
                                    path: 'referencia',
                                    populate: { path: 'libro', select: '_id titulo'}
                                })
                                .populate('almacen', '_id nombre')
                                .sort({ fecha: 'desc' })
                                .exec()

    res.json(movimientos)
}