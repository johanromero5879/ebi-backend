// import jwt from "jsonwebtoken"

import Persona from '../models/Persona'
import Usuario from '../models/Usuario'

// const obtenerToken = (id) => {
//     return jwt.sign({ id }, process.env.SECRET, {
//         expiresIn: 86400 // 24 horas
//     })
// }
    

export const signin = async (req, res) => {
    let { n_documento, contrasena } = req.body
    
    const persona = await Persona.findOne({ n_documento })
    try{
        if(!persona) throw "Usuario no encontrado"

        const usuario = await Usuario.findOne({ persona: persona._id })

        const bandera = await Usuario.compararContrasena(contrasena, usuario.contrasena)

        if(!bandera) throw "Credenciales no validas"

        // const token = obtenerToken(usuario._id)  

        res.json({
            _id: usuario._id,
            n_documento: persona.n_documento,
            nombres: persona.nombres,
            apellidos: persona.apellidos,
            tipo: usuario.tipo
         })
    }catch(ex){
        console.log(ex)
        res.status(400).json({
            error: true,
            message: ex
        })
    }
}