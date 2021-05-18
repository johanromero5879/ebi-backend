import Editorial from "../models/Editorial"

export const obtenerEditoriales = async (req, res) => {
    const editoriales = await Editorial.find()
    
    res.json(editoriales)
}

export const crearEditorial = async (req, res) => {

    const nuevaEditorial = new Editorial(req.body)

    try{
        await nuevaEditorial.save()
        res.json({ ok: true })
    }catch(ex){
        console.log(ex.message)
        res.status(400).json({ error: true })
    }
}

export const obtenerEditorial = async (req, res)=>{
    const editorial = await Editorial.findById(req.params.id)

    res.json(editorial)
}


//Eliminar Editoriales Por ID
export const eliminarEditorial = async (req,res) =>{
    try{
        let editorial  = await Editorial.deleteOne({_id: req.body.id}) 
        res.json({ message: "La editorial se elimino correctamente" })
    }catch(ex){
        console.log(ex.message)
        res.status(400).json({ error: true })
    }
}

//Actualizar datos de Editoriales
export const actualizarEditoriales = async (req,res) => {
    const editorial = await Editorial.findById(req.params.id)

    try {
    await Editorial.updateOne({_id: editorial.id},req.body)
        res.json({ok: true})
    }catch(ex){
        console.log(ex.message)
        res.status(400).json({ error: true })
    }
}