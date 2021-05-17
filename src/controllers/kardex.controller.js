import Kardex from '../models/Kardex'
import Movimiento from '../models/Movimiento'

const calcularValoresFinales = (movimientos, kardex) => {
    kardex.valorFinal = 0
    kardex.cantidadFinal = 0

    //Calcular valor y cantidad final del kardex
    for (const movimiento of movimientos) {
        const { cantidad, tipo, referencia } = movimiento
        const { precioCosto } = referencia
        
        if(tipo == "adquisicion" || tipo == "dev_distribucion"){
            kardex.cantidadFinal += cantidad
            kardex.valorFinal += precioCosto * cantidad
        }else if(tipo == "distribucion" || tipo == "dev_adquisicion"){
            kardex.cantidadFinal -= cantidad
            kardex.valorFinal -= precioCosto * cantidad
        }
    }
}

export const crearKardex = async (req, res) => {
    const nuevoKardex = new Kardex(req.body)
    const ultimoKardex = await Kardex.findOne({ almacen: nuevoKardex.almacen })
        .sort({ fecha: "desc" }).exec()
    try {
        let consultaMov = { almacen: nuevoKardex.almacen }
        if (ultimoKardex) {
            consultaMov.fecha = { $gte: ultimoKardex.fecha, $lte: Date.now } 
            nuevoKardex.valorInicial = ultimoKardex.valorFinal
            nuevoKardex.cantidadInicial = ultimoKardex.cantidadFinal
        } else {
            nuevoKardex.valorInicial = 0
            nuevoKardex.cantidadInicial = 0
        }

        const movimientos = await Movimiento.find(consultaMov, { detalle: 0, almacen: 0 } ) 
                                        .populate('referencia', 'precioCosto')
                                        .sort({ fecha: "asc" }).exec()

        if(movimientos.length <= 0)
            throw "No se encontraron movimientos"

        
        calcularValoresFinales(movimientos, nuevoKardex)    
        
        nuevoKardex.movimientos = movimientos.map((movimiento) => movimiento._id)
        
        await nuevoKardex.save() //agregar el nuevo movimiento

        res.json({ ok: true })
    } catch (ex) {
        console.log(ex)
        res.status(400).json({ error: true, message: ex })
    }

}