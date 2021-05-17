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
export const actualizarEditorialesNombre = async (req,res) => { // actualizar nombre del editorial
    const editorial = await Editorial.findById(req.params.id)

    try {
        const update = {
        nombre: req.body.nombre 
        }    
    await Editorial.updateOne({_id: editorial.id},update)
        res.json({ok: true})
    }catch(ex){
        console.log(ex.message)
        res.status(400).json({ error: true })
    }
}

export const actualizarEditorialesDireccion = async (req,res) => { // actualizar direccion del editorial
    const editorial = await Editorial.findById(req.params.id)

    try {
        const update = {
        direccion: req.body.direccion 
        }    
    await Editorial.updateOne({_id: editorial.id},update)
        res.json({ok: true})
    }catch(ex){
        console.log(ex.message)
        res.status(400).json({ error: true })
    }
}

export const actualizarEditorialesTelefono = async (req,res) => { // actualizar telefono del editorial
    const editorial = await Editorial.findById(req.params.id)

    try {
        const update = {
        telefono: req.body.telefono 
        }    
    await Editorial.updateOne({_id: editorial.id},update)
        res.json({ok: true})
    }catch(ex){
        console.log(ex.message)
        res.status(400).json({ error: true })
    }
}


export const actualizarEditorialesCorreo = async (req,res) => { // actualizar correo del editorial
    const editorial = await Editorial.findById(req.params.id)

    try {
        const update = {
        correo: req.body.correo 
        }    
    await Editorial.updateOne({_id: editorial.id},update)
        res.json({ok: true})
    }catch(ex){
        console.log(ex.message)
        res.status(400).json({ error: true })
    }
}


