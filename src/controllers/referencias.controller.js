import Referencia from '../models/Referencia'

export const crearReferencia  = async (req, res) => {
    const nuevaReferencia = new Referencia(req.body)

    try{
        await nuevaReferencia.save()
        res.json({ ok: true })
    }catch(ex){
        console.log(ex.message)
        res.status(400).json({ error: true })
    }
}

export const obtenerReferencias = async (req, res) => {
    const referencias = await Referencia.find().populate('libro', '_id titulo').exec()
    
    res.json(referencias)
}

export const obtenerRefsPorLibro = async (req, res) => {
    const refs = await Referencia.find({ libro: req.params.id }, { libro: 0 })
    res.json(refs)
}

export const actualizarReferencia  = async (req, res) => {
    try{
        await Referencia.findByIdAndUpdate(req.params.id, req.body)
        res.json({ ok: true })
    }catch(ex){
        console.log(ex.message)
        res.status(400).json({ error: true })
    }
}

export const eliminarReferencia  = async (req, res) => {
    try{
        await Referencia.findByIdAndRemove(req.params.id)

        res.json({ ok: true })
    }catch(ex){
        console.log(ex.message)
        res.status(400).json({ error: true })
    }
}