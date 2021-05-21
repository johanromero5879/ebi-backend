import Inventario from '../models/Inventario'
import Libro from '../models/Libro'

export const actualizarInventario = async (cantidad,almacen,referencia) => { // funcion para la actulizar inventarios al crear un movimiento
    let inventario = await Inventario.find({almacen,referencia})
    const update = {
        $inc:{
            cantidad:cantidad
        }
    }

    //Crea un inventario si este no existe
    if(!inventario){
       const nuevoInventario = new Inventario({almacen,referencia, cantidad: 0})
       await nuevoInventario.save()
    }
    
    await Inventario.updateOne({almacen,referencia},update)
}


export const crearInventario = async (req, res) => {
    const nuevoInventario = new Inventario(req.body)
    
    try{
        await nuevoInventario.save()
        res.json({ ok: true })
    }catch(ex){
        console.log(ex.message)
        res.status(400).json({ error: true })
    }
}

export const obtenerInventarioReferencia = async (req, res) => {
    const inventario = await Inventario.find({referencia:req.params.id})
                                            .populate({
                                                path: 'referencia',
                                                populate: { 
                                                    path: 'libro', 
                                                    select: '_id titulo' 
                                                }
                                            })
                                            .exec()

    res.json(inventario)
}
export const obtenerInventarioAlmacen = async (req, res) => {
    try{
        const inventario = await Inventario.find({almacen:req.params.id})
                                            .populate({
                                                path: 'referencia',
                                                populate: { 
                                                    path: 'libro', 
                                                    select: '_id titulo' 
                                                }
                                            })
                                            .exec()

        if(inventario.length == 0)
            throw { message: 'El almacen no tiene existencias' }
        
        res.json(inventario)
    }catch(ex){
        res.status(400).json({ error: true, message: ex.message })
    }
    
}

export const obtenerInventarioAlmLib = async (req, res) => {
    try{
        const libro = await Libro.findById(req.params.libro)
        if(!libro)
            throw { message: 'El libro no existe' }

        const inventario = await Inventario.find({
            almacen:req.params.almacen
        }).populate({
            path: 'referencia',
            populate: { 
                path: 'libro', 
                select: '_id titulo' 
            }
        })
        .exec()

        const invPorLibro = inventario.filter(({referencia}) => referencia.libro._id == req.params.libro)

        if(invPorLibro.length == 0)
            throw { message: 'No hay registro de existencias' }

        res.json(invPorLibro)
    }catch(ex){
        res.status(400).json({ error: true, message: ex.message })
    }
}


/*export const actualizarInventario = async (req, res) => {
    try{
    const update = {
        $inc:{
            cantidad:req.body.cantidad
        }
    }
    await Inventario.updateOne({almacen:req.params.id_almacen,referencia:req.params.id_ref},update)
    
    res.json({
        ok:true
    })
    }catch(ex){
        console.log(ex.message)
        res.status(400).json({ error: true })
    }
}*/
