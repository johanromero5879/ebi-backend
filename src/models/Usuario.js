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

export default model('usuarios', usuarioSchema)