import { Schema, model } from 'mongoose'

const personaSchema = new Schema({
    n_documento: String,
    nombres: String,
    apellidos: String,
    telefono: String,
    correo: String
}, {
    versionKey: false
})

export default model('personas', personaSchema)