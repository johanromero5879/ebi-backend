import Persona from '../models/Persona'
import Usuario from '../models/Usuario'

export const crearUsuario = async (req, res) => {
    const { persona, usuario } = req.body
    try{
        const nuevaPersona = new Persona(persona)
        await nuevaPersona.save()

        usuario.persona = nuevaPersona._id
        const nuevoUsuario = new Usuario(usuario)
        await nuevoUsuario.save()

        res.json({ ok: true })
    }catch(ex){
        console.log(ex.message)
        res.status(400).json({ error: true })
    }
}

export const obtenerUsuarioPorDocumento = async (req, res) => {
    const persona = await Persona.findOne({ n_documento: req.params.doc })

    if(persona){
        const usuario = await Usuario.findOne({ persona: persona._id }, { contrasena: 0 })
                                .populate('persona')
                                .exec()
                                
        res.json(usuario)
    }else{
        res.json(persona)
    }
}
