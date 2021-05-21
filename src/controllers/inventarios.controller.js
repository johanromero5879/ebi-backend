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

    res.json(inventario)
}
export const obtenerInventarioAlmacen = async (req, res) => {
    const inventario = await Inventario.find({almacen:req.params.id})

    res.json(inventario)
}

export const obtenerInventarioAlmLib = async (req, res) => {
    const libro = await Libro.findById(req.params.libro)

    if(libro){
        let inventario = await Inventario.find({
            almacen:req.params.almacen
        }).populate('referencia', '_id nombre libro')
        .exec()
        
        inventario = inventario.filter(inv => inv.referencia.libro == libro._id)
        
        res.json(inventario)
    }else{
        res.json([])
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
