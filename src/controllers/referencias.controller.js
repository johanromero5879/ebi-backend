import Referencia from '../models/Referencia'

export const crearReferencia  = async (req, res) => {
    const nuevaReferencia = new Referencia(req.body)

    try{
        await nuevaReferencia.save()
        res.json({ ok: true })
    }catch(ex){
        console.log(ex)
        res.status(400).json({ error: true })
    }
}