import Kardex from '../models/Kardex'
import Movimiento from '../models/Movimiento'

const calcularValoresFinales = (movimientos, kardex) => {
    kardex.valorFinal = kardex.valorInicial
    kardex.cantidadFinal = kardex.cantidadInicial

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

const detallarKardex = (kardex, movimientos) => {

    kardex.movimientos.push({
        fecha: kardex.fecha, 
        tipo: 'Entrada',
        detalle: 'Inventario inicial',
        cantidad: kardex.cantidadInicial,
        valorUnitario: '-',
        valorTotal: kardex.valorFinal,
        cantidadTotal: kardex.cantidadInicial,
        saldoTotal: kardex.valorFinal
    })

    //Calcular valor y cantidad final del kardex
    for (const movimiento of movimientos) {
        const { cantidad, tipo, referencia, detalle, fecha } = movimiento
        const { precioCosto } = referencia
        if(tipo == "adquisicion" || tipo == "dev_distribucion"){
            kardex.cantidadFinal += cantidad
            kardex.valorFinal += precioCosto * cantidad
        }else if(tipo == "distribucion" || tipo == "dev_adquisicion"){
            kardex.cantidadFinal -= cantidad
            kardex.valorFinal -= precioCosto * cantidad
        }

        kardex.movimientos.push({ 
            fecha, 
            tipo,
            detalle,
            cantidad,
            valorUnitario: precioCosto,
            valorTotal: precioCosto * cantidad,
            cantidadTotal: kardex.cantidadFinal,
            saldoTotal: kardex.valorFinal
        })
    }
}

export const crearKardex = async (req, res) => {
    const nuevoKardex = new Kardex(req.body)
    const ultimoKardex = await Kardex.findOne({ almacen: nuevoKardex.almacen })
        .sort({ fecha: "desc" }).exec()
    try {
        let consultaMov = { almacen: nuevoKardex.almacen }
        if (ultimoKardex) {
            consultaMov.fecha = { $gte: ultimoKardex.fecha, $lte: new Date()} 
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
            throw "No se encontraron movimientos recientes para generar el kardex"

        
        calcularValoresFinales(movimientos, nuevoKardex)    
        
        nuevoKardex.movimientos = movimientos.map((movimiento) => movimiento._id)
        
        await nuevoKardex.save() //agregar el nuevo movimiento

        res.json({ ok: true })
    } catch (ex) {
        console.log(ex)
        res.status(400).json({ error: true, message: ex })
    }

}

export const obtenerKardexPorAlm = async (req, res) => {
    const kardex = await Kardex.find({ almacen: req.params.id })
                                .sort({ fecha: 'desc'})
    
    res.json(kardex)
}

export const obtenerDetalleKardex = async (req, res) => {
    try{
        const kardex = await Kardex.findById(req.params.id)
                                .populate({
                                    path: 'movimientos',
                                    populate: { path: 'referencia', select: '_id precioCosto' },
                                    options: { sort: { fecha: 'asc' } }
                                })
        
        if(!kardex)
            throw { message: 'El kardex no existe' }

        const detallesKardex = {
            _id: kardex._id,
            fecha: kardex.fecha,
            valorInicial: kardex.cantidadInicial,
            cantidadInicial: kardex.valorInicial,
            valorFinal: kardex.valorInicial,
            cantidadFinal: kardex.cantidadInicial,
            movimientos: []
        }

        detallarKardex(detallesKardex, kardex.movimientos)
        
        res.json(detallesKardex)
    }catch(ex){
        res.status(400).json({ error: true, message: ex.message })
    }
    
}