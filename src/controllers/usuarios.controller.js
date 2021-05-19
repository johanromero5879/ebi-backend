import Persona from '../models/Persona'
import Usuario from '../models/Usuario'

const existeDocumento = async (n_documento) => {
    const persona = await Persona.findOne({ n_documento })

    if(persona)
        throw { message: "El documento ya existe" }

}

export const crearUsuario = async (req, res) => {
    let { persona, usuario } = req.body
    
    try{
        await existeDocumento(persona.n_documento)

        const nuevaPersona = new Persona(persona)
        await nuevaPersona.save()

        usuario.persona = nuevaPersona._id
       

        if(!usuario.contrasena){
            usuario.contrasena = persona.n_documento
        }

        usuario.contrasena = await Usuario.encriptarContrasena(usuario.contrasena)
        
        const nuevoUsuario = new Usuario(usuario)

        await nuevoUsuario.save()

        res.json({ ok: true })
    }catch(ex){
        console.log(ex)
        res.status(400).json({ error: true, message: ex.message})
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
