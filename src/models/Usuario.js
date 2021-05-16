import bcrypt from 'bcryptjs'
import { Schema, model } from 'mongoose'

const usuarioSchema = new Schema({
    persona: {
        ref: 'personas',
        type: Schema.Types.ObjectId
    },
    contrasena: String,
    tipo: String
}, {
    versionKey: false
})

usuarioSchema.statics.encriptarContrasena = async (contrasena) => {
    const salt = await bcrypt.genSalt(10)
    return await bcrypt.hash(contrasena, salt)
}

usuarioSchema.statics.compararContrasena = async (contrasena, recibida) => {
    return await bcrypt.compare(contrasena, recibida)
}

export default model('usuarios', usuarioSchema)