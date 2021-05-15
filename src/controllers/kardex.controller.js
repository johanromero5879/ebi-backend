import Kardex from '../models/Kardex'

export const crearKardex = async (req, res) => {
    const nuevoKardex = new Kardex()
    const almacenK = req.body.almacen
    const ultimoKardex = await Kardex.findOne({almacen: almacenK})
                                        .sort({fecha: "desc"}).exec()

    if(ultimoKardex){
        nuevoKardex.valorInicial =  ultimoKardex.valorFinal
        nuevoKardex.cantidadInicial =  ultimoKardex.cantidadFinal
    }else{
        nuevoKardex.valorInicial =  0
        nuevoKardex.cantidadInicial = 0  
    }
}