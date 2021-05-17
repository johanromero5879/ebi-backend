import Kardex from '../models/Kardex'

export const crearKardex = async (req, res) => {
    const nuevoKardex = new Kardex(req.body)
    const almacenK = req.body.almacen
    const ultimoKardex = await Kardex.findOne({almacen: almacenK})
                                            .sort({fecha: "desc"}).exec()
    try{
        if(ultimoKardex){
                nuevoKardex.valorInicial =  ultimoKardex.valorFinal
                nuevoKardex.cantidadInicial =  ultimoKardex.cantidadFinal
                await nuevoKardex.save() //agregar el nuevo movimiento
        
                res.json({ ok: true })

        }else{
            nuevoKardex.valorInicial =  0
            nuevoKardex.cantidadInicial = 0
            await nuevoKardex.save() //agregar el nuevo movimiento
            res.json({ ok: true })
        }
    }catch(ex){
        console.log(ex.message)
        res.status(400).json({ error: true, message: "Tipo no valido" })}

    }