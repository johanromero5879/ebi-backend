import Persona from '../models/Persona'
import Usuario from '../models/Usuario'

export const crearUsuario = async (req, res) => {
    const { persona, usuario } = req.body
    try{
        const nuevaPersona = new Persona(persona)
        await nuevaPersona.save()

        usuario.persona = nuevaPersona._id
        usuario.contrasena = await Usuario.encriptarContrasena(usuario.contrasena)
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

export const obtenerUsuarios = async (req, res) => {
    const usuarios = await Usuario.find({}, { contrasena: 0 })
                                .populate('persona')
                                .exec()
                                
    res.json(usuarios)
}

export const editarUsuario = async (req, res) => {
    const { usuario, persona } = req.body
    
    try{
        const usuarioEncontrado = await Usuario.findById(req.params.id, 'persona')

        if(!usuarioEncontrado)
            throw "Usuario no encontrado"

        if(usuario){
            if(usuario.contrasena){
                usuario.contrasena = await Usuario.encriptarContrasena(usuario.contrasena)
            }

            await Usuario.findByIdAndUpdate(req.params.id, usuario)
        }

        if(persona){
            await Persona.findByIdAndUpdate(usuarioEncontrado.persona, persona)
        }
        
        res.json({ ok: true })
    }catch(ex){
        console.log(ex)
        res.status(400).json({ error: true, message: ex })
    }
}
