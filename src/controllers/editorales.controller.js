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
        console.log(ex)
        res.status(400).json({ error: true })
    }
}