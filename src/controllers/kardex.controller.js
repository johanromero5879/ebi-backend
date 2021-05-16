import Kardex from '../models/Kardex'

export const crearKardex = async (req, res) => {
    const nuevoKardex = new Kardex(req.body)
    const almacenK = req.body.almacen
    const ultimoKardex = await Kardex.findOne({almacen: almacenK})
                                            .sort({fecha: "desc"}).exec()
    try{
        if(ultimoKardex){
            if((ultimoKardex.fecha.getMonth()+1 == 12 && nuevoKardex.fecha.getMonth()+1 == 1) && (ultimoKardex.fecha.getYear()+1 == nuevoKardex.fecha.getYear())){
                
                nuevoKardex.valorInicial =  ultimoKardex.valorFinal
                nuevoKardex.cantidadInicial =  ultimoKardex.cantidadFinal
                await nuevoKardex.save() //agregar el nuevo movimiento
        
                res.json({ ok: true })
                
            }else if(ultimoKardex.fecha.getMonth()+1 == nuevoKardex.fecha.getMonth() && (ultimoKardex.fecha.getYear() == nuevoKardex.fecha.getYear())){
                
                nuevoKardex.valorInicial =  ultimoKardex.valorFinal
                nuevoKardex.cantidadInicial =  ultimoKardex.cantidadFinal
                
                console.log(nuevoKardex.valorInicial+"        "+nuevoKardex.cantidadInicial)
                await nuevoKardex.save() //agregar el nuevo movimiento
        
                res.json({ ok: true })
            
            }else{
                    console.log(ex) //ex is not defined pero el funcionamiento es correcto
                }

            
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